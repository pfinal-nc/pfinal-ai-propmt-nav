export default defineNuxtConfig({
  // Compatibility date
  compatibilityDate: '2025-08-18',
  

  
  // Module configuration
  modules: [
    '@nuxt/ui'
  ],
  
  // Configuration options
  
  // SEO configuration
  app: {
    head: {
      title: 'AI Prompts Navigation - Complete AI Prompts Collection',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Discover the most comprehensive collection of AI prompts, including writing, programming, marketing, and learning prompts for ChatGPT, Claude, Gemini and other AI tools to help you better utilize AI tools and improve work efficiency' },
        { name: 'keywords', content: 'AI prompts,ChatGPT,Claude,Gemini,Prompts,artificial intelligence,AI tools,prompt templates,writing assistant,programming assistant,marketing tools,learning assistant' },
        { name: 'author', content: 'AI Prompts Navigation' },
        { name: 'robots', content: 'index, follow' },
        { name: 'googlebot', content: 'index, follow' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'AI Prompts Navigation - Complete AI Prompts Collection' },
        { property: 'og:description', content: 'Discover the most comprehensive collection of AI prompts, including writing, programming, marketing, and learning prompts for ChatGPT, Claude, Gemini and other AI tools' },
        { property: 'og:site_name', content: 'AI Prompts Navigation' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'AI Prompts Navigation - Complete AI Prompts Collection' },
        { name: 'twitter:description', content: 'Discover the most comprehensive collection of AI prompts, including writing, programming, marketing, and learning prompts for ChatGPT, Claude, Gemini and other AI tools' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://pnav.friday-go.icu' }
      ],
      script: [
        {
          src: 'https://fenoofaussut.net/act/files/tag.min.js?z=9738661',
          'data-cfasync': 'false',
          async: true
        },
        {
          src: 'https://pertawee.net/act/files/tag.min.js?z=9738661',
          'data-cfasync': 'false',
          async: true
        },
        {
          innerHTML: "(function(d,z,s){s.src='https://'+d+'/401/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('gizokraijaw.net',9739035,document.createElement('script'))"
        }
      ]
    }
  },
  
  // Static generation
  ssr: true,
  
  // Route configuration
  routeRules: {
    '/prompts/**': { swr: true },
    '/category/**': { swr: true }
  },
  
  // Build configuration
  build: {
    transpile: []
  },
  
  // CSS configuration
  css: [
    '~/assets/css/main.css'
  ],
  

  
  // Nuxt UI configuration
  ui: {
    global: true,
    icons: ['heroicons', 'simple-icons', 'lucide']
  },

  // Color mode
  colorMode: {
    preference: 'light'
  }
})