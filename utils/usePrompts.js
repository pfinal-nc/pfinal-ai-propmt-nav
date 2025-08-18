import { useAsyncData, queryContent } from '#imports'
import { getCategoryName } from '~/utils/categories'

/**
 * 获取所有提示词
 */
export const usePrompts = async () => {
  const { data } = await useAsyncData('prompts', () => queryContent('/prompts').find())
  return data
}

/**
 * 根据分类获取提示词
 */
export const usePromptsByCategory = async (category) => {
  const { data } = await useAsyncData(`prompts-${category}`, () => 
    queryContent('/prompts').where({ category }).find()
  )
  return data
}

/**
 * 获取提示词详情
 */
export const usePromptBySlug = async (category, slug) => {
  const { data } = await useAsyncData(`prompt-${category}-${slug}`, () => 
    queryContent('/prompts').where({ 
      category: category
    }).findOne()
  )
  return data
}

/**
 * 获取所有分类
 */
export const useCategories = async () => {
  const { data } = await useAsyncData('categories', async () => {
    const prompts = await queryContent('/prompts').find()
    const categories = {}
    
    prompts.forEach(prompt => {
      if (!categories[prompt.category]) {
        categories[prompt.category] = {
          name: getCategoryName(prompt.category),
          count: 0
        }
      }
      categories[prompt.category].count++
    })
    
    return Object.entries(categories).map(([key, value]) => ({
      key,
      ...value
    }))
  })
  
  return data
}