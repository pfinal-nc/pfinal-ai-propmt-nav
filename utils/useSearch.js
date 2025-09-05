import Fuse from 'fuse.js'

export const useSearch = (items) => {
  // Create Fuse.js instance
  const fuse = new Fuse(items.value || [], {
    keys: ['title', 'description', 'tags'],
    threshold: 0.3, // Match threshold, 0 means exact match, 1 means no match
    includeScore: true
  })

  // Search function
  const search = (query) => {
    if (!query) return items.value || []
    return fuse.search(query).map(result => result.item)
  }

  return {
    search
  }
}