export const categoryMap = {
  writing: {
    name: '写作助手',
    icon: '✍️',
    description: '专业的写作辅助工具，帮助你创作各类文章、文案和内容'
  },
  coding: {
    name: '编程开发',
    icon: '💻',
    description: '编程相关的提示词，包括代码生成、调试、优化等'
  },
  marketing: {
    name: '营销文案',
    icon: '📢',
    description: '营销推广相关的文案创作和策略制定工具'
  },
  learning: {
    name: '学习辅助',
    icon: '📚',
    description: '学习和教育相关的提示词，帮助提高学习效率'
  },
  life: {
    name: '生活助手',
    icon: '🌟',
    description: '日常生活相关的提示词，包括健康、心理、娱乐等'
  }
}

export const getCategoryName = (categoryKey) => {
  return categoryMap[categoryKey]?.name || categoryKey
}

export const getCategoryIcon = (categoryKey) => {
  return categoryMap[categoryKey]?.icon || '📁'
}