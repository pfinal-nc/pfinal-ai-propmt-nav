export default defineNuxtConfig({
  // 兼容性日期
  compatibilityDate: '2025-08-18',
  
  // 静态生成配置
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  },
  
  // 模块配置
  modules: [
    '@nuxt/content',
    '@nuxt/ui'
  ],
  
  // Content模块配置
  content: {
    highlight: {
      theme: 'github-light'
    },
    markdown: {
      remarkPlugins: ['remark-gfm']
    }
  },
  
  // SEO配置
  app: {
    head: {
      title: 'AI提示词导航站 - 最全的AI Prompts集合',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '收集最全面的AI提示词，包括ChatGPT、Claude、Gemini等AI工具的写作、编程、营销、学习提示词' },
        { name: 'keywords', content: 'AI提示词,ChatGPT,Claude,Gemini,Prompts,人工智能' }
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
    transpile: ['@nuxt/content']
  },
  
  // CSS配置
  css: [
    '~/assets/css/main.css'
  ],
  
  // Nuxt UI配置
  ui: {
    icons: ['mdi', 'simple-icons']
  }
})