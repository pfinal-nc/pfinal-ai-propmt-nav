import Fuse from 'fuse.js'

export const useSearch = (items) => {
  // 创建Fuse.js实例
  const fuse = new Fuse(items.value || [], {
    keys: ['title', 'description', 'tags'],
    threshold: 0.3, // 匹配阈值，0表示完全匹配，1表示完全不匹配
    includeScore: true
  })

  // 搜索函数
  const search = (query) => {
    if (!query) return items.value || []
    return fuse.search(query).map(result => result.item)
  }

  return {
    search
  }
}