export const categoryMap = {
  writing: {
    name: 'Writing Assistant',
    icon: '✍️',
    description: 'Professional writing assistance tools to help you create articles, copy, and content'
  },
  coding: {
    name: 'Programming & Development',
    icon: '💻',
    description: 'Programming-related prompts including code generation, debugging, and optimization'
  },
  marketing: {
    name: 'Marketing & Copywriting',
    icon: '📢',
    description: 'Marketing and promotion-related copywriting and strategy development tools'
  },
  learning: {
    name: 'Learning Assistant',
    icon: '📚',
    description: 'Learning and education-related prompts to help improve learning efficiency'
  },
  life: {
    name: 'Life Assistant',
    icon: '🌟',
    description: 'Daily life-related prompts including health, psychology, entertainment, etc.'
  },
  design: {
    name: 'Design Assistant',
    icon: '🎨',
    description: 'Design-related prompts including UI design, graphic design, 3D design, etc.'
  },
  translation: {
    name: 'Translation & Editing',
    icon: '🌐',
    description: 'Translation-related prompts including translation, editing, and proofreading'
  },
  business: {
    name: 'Business & Office',
    icon: '💼',
    description: 'Business and office-related prompts including meeting minutes, report writing, data analysis, etc.'
  },
  data: {
    name: 'Data Analysis',
    icon: '📊',
    description: 'Data analysis-related prompts including data analysis, visualization, and mining'
  },
  academic: {
    name: 'Academic Research',
    icon: '📚',
    description: 'Academic research-related prompts including paper writing, literature review, data analysis, etc.'
  },
  education: {
    name: 'Education & Teaching',
    icon: '🏫',
    description: 'Education and teaching-related prompts including course design, learning plans, etc.'
  },
  language: {
    name: 'Language Learning',
    icon: '🗣️',
    description: 'Language learning-related prompts including conversation practice, learning plans, etc.'
  },
  'mental-health': {
    name: 'Mental Health',
    icon: '🧠',
    description: 'Mental health-related prompts including emotional regulation, mindfulness meditation, etc.'
  },
  'business-plan': {
    name: 'Business Planning',
    icon: '📈',
    description: 'Business planning-related prompts including startup plans, business models, etc.'
  },
  'content-creation': {
    name: 'Content Creation',
    icon: '📹',
    description: 'Content creation-related prompts including video scripts, social media content, etc.'
  },
  other: {
    name: 'Other',
    icon: '📁',
    description: 'Other related prompts covering various fields'
  }
}

export const getCategoryName = (categoryKey) => {
  return categoryMap[categoryKey]?.name || categoryKey
}

export const getCategoryIcon = (categoryKey) => {
  return categoryMap[categoryKey]?.icon || '📁'
}