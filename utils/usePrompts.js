import { useAsyncData } from '#imports'
import { getCategoryName } from '~/utils/categories'
import { parseMd } from '~/utils/parseMd'

// 导入所有提示词数据
const promptsContext = import.meta.glob('~/content/prompts/**/*.md', { eager: true, query: '?raw', import: 'default' })

/**
 * 获取所有提示词
 */
export const usePrompts = async () => {
  const { data } = await useAsyncData('prompts', () => {
    return Object.entries(promptsContext).map(([path, content]) => {
      const slug = path.split('/').pop()?.replace('.md', '') || '';
      const category = path.split('/prompts/')[1]?.split('/')[0] || '';
      const parsed = parseMd(content);
      return {
        ...parsed,
        slug,
        category,
        _path: path.replace(/^.*\/content\/prompts\//, '').replace(/\.md$/, '')
      };
    });
  });
  return data
}

/**
 * 根据分类获取提示词
 */
export const usePromptsByCategory = async (category) => {
  const { data } = await useAsyncData(`prompts-${category}`, () => {
    return Object.entries(promptsContext)
      .filter(([path]) => path.includes(`/prompts/${category}/`))
      .map(([path, content]) => {
        const slug = path.split('/').pop()?.replace('.md', '') || '';
        const parsed = parseMd(content);
        return {
          ...parsed,
          slug,
          category,
          path: path.replace(/^.*\/content\/prompts\//, '').replace(/\.md$/, '')
        };
      })
  })
  return data
}

/**
 * 获取提示词详情
 */
export const usePromptBySlug = async (category, slug) => {
  const { data } = await useAsyncData(`prompt-${category}-${slug}`, () => {
    const path = Object.keys(promptsContext).find(p => 
      p.includes(`/prompts/${category}/`) && p.endsWith(`/${slug}.md`)
    )
    
    if (!path) return null;
    
    const content = promptsContext[path];
    const parsed = parseMd(content);
    return {
      ...parsed,
      category,
      slug,
      path: path.replace(/^.*\/content\/prompts\//, '').replace(/\.md$/, '')
    };
  })
  return data
}

/**
 * 获取所有分类
 */
export const useCategories = async () => {
  const { data } = await useAsyncData('categories', () => {
    const categories = {}
    
    Object.entries(promptsContext).forEach(([path, content]) => {
      const category = path.split('/prompts/')[1]?.split('/')[0] || '';
      if (category && !categories[category]) {
        categories[category] = {
          name: getCategoryName(category),
          count: 0
        }
      }
      if (category) {
        categories[category].count++
      }
    })
    
    return Object.entries(categories).map(([key, value]) => ({
      key,
      ...value
    }))
  })
  
  return data
}