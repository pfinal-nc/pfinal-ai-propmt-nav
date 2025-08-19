export default defineNuxtConfig({
  // 兼容性日期
  compatibilityDate: '2025-08-18',
  

  
  // 模块配置
  modules: [
    '@nuxt/ui'
  ],
  
  // 配置项
  
  // SEO配置
  app: {
    head: {
      title: 'AI提示词导航站 - 最全的AI Prompts集合',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '收集最全面的AI提示词，包括ChatGPT、Claude、Gemini等AI工具的写作、编程、营销、学习提示词，帮助您更好地使用AI工具提升工作效率' },
        { name: 'keywords', content: 'AI提示词,ChatGPT,Claude,Gemini,Prompts,人工智能,AI工具,提示词模板,写作助手,编程助手,营销工具,学习助手' },
        { name: 'author', content: 'AI提示词导航站' },
        { name: 'robots', content: 'index, follow' },
        { name: 'googlebot', content: 'index, follow' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'AI提示词导航站 - 最全的AI Prompts集合' },
        { property: 'og:description', content: '收集最全面的AI提示词，包括ChatGPT、Claude、Gemini等AI工具的写作、编程、营销、学习提示词' },
        { property: 'og:site_name', content: 'AI提示词导航站' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'AI提示词导航站 - 最全的AI Prompts集合' },
        { name: 'twitter:description', content: '收集最全面的AI提示词，包括ChatGPT、Claude、Gemini等AI工具的写作、编程、营销、学习提示词' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://pnav.friday-go.icu' }
      ]
    }
  },
  
  // 静态生成
  ssr: true,
  
  // 路由配置
  routeRules: {
    '/prompts/**': { swr: true },
    '/category/**': { swr: true }
  },
  
  // 构建配置
  build: {
    transpile: []
  },
  
  // CSS配置
  css: [
    '~/assets/css/main.css'
  ],
  

  
  // Nuxt UI配置
  ui: {
    global: true,
    icons: ['heroicons', 'simple-icons', 'lucide']
  },

  // 颜色模式
  colorMode: {
    preference: 'light'
  }
})