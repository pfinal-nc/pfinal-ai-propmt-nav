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
  },
  design: {
    name: '设计辅助',
    icon: '🎨',
    description: '设计相关的提示词，包括UI设计、平面设计、3D设计等'
  },
  translation: {
    name: '翻译润色',
    icon: '🌐',
    description: '翻译相关的提示词，包括翻译、润色、校对等'
  },
  business: {
    name: '商务办公',
    icon: '💼',
    description: '商务办公相关的提示词，包括会议纪要、报告撰写、数据分析等'
  },
  data: {
    name: '数据分析',
    icon: '📊',
    description: '数据分析相关的提示词，包括数据分析、数据可视化、数据挖掘等'
  },
  academic: {
    name: '学术研究',
    icon: '📚',
    description: '学术研究相关的提示词，包括论文写作、文献综述、数据分析等'
  },
  education: {
    name: '教育教学',
    icon: '🏫',
    description: '教育和教学相关的提示词，包括课程设计、学习计划等'
  },
  language: {
    name: '语言学习',
    icon: '🗣️',
    description: '语言学习相关的提示词，包括对话练习、学习计划等'
  },
  'mental-health': {
    name: '心理健康',
    icon: '🧠',
    description: '心理健康相关的提示词，包括情绪调节、正念冥想等'
  },
  'business-plan': {
    name: '商业计划',
    icon: '📈',
    description: '商业计划相关的提示词，包括创业计划、商业模式等'
  },
  'content-creation': {
    name: '内容创作',
    icon: '📹',
    description: '内容创作相关的提示词，包括视频脚本、社交媒体内容等'
  },
  other: {
    name: '其他',
    icon: '📁',
    description: '其他相关的提示词，包括其他领域'
  }
}

export const getCategoryName = (categoryKey) => {
  return categoryMap[categoryKey]?.name || categoryKey
}

export const getCategoryIcon = (categoryKey) => {
  return categoryMap[categoryKey]?.icon || '📁'
}