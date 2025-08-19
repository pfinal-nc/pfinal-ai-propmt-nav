<template>

  
  <div v-if="prompt">
    <!-- 面包屑导航 -->
    <nav class="flex items-center space-x-2 text-sm text-gray-500 mb-6">
      <NuxtLink to="/" class="hover:text-blue-600">首页</NuxtLink>
      <span>/</span>
      <NuxtLink :to="`/prompts/${category}`" class="hover:text-blue-600">
        {{ getCategoryName(category) }}
      </NuxtLink>
      <span>/</span>
      <span class="text-gray-900">{{ prompt.title }}</span>
    </nav>
    
    <!-- 提示词详情 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- 主要内容 -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <!-- 标题和基本信息 -->
          <div class="mb-6">
            <div class="flex items-start justify-between mb-4">
              <h1 class="text-3xl font-bold text-gray-900">{{ prompt.title }}</h1>
                              <span class="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full">
                  {{ getCategoryName(prompt.category) }}
                </span>
            </div>
            
            <p class="text-lg text-gray-600 mb-4">{{ prompt.description }}</p>
            
            <div class="flex items-center space-x-6 text-sm text-gray-500">
              <div class="flex items-center space-x-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <span>{{ prompt.views || 0 }} 次浏览</span>
              </div>
              <div class="flex items-center space-x-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                <span>{{ prompt.likes || 0 }} 次收藏</span>
              </div>
              <div class="flex items-center space-x-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a4 4 0 118 0v4m-4 8a2 2 0 100-4 2 2 0 000 4zm0 0v4a2 2 0 002 2h6a2 2 0 002-2v-4a2 2 0 00-2-2H10a2 2 0 00-2 2z"></path>
                </svg>
                <span>{{ prompt.copies || 0 }} 次复制</span>
              </div>
            </div>
          </div>
          
          <!-- 提示词内容 -->
          <div class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">提示词内容</h2>
            <div class="bg-gray-50 rounded-lg p-6 relative">
              <pre class="text-sm text-gray-800 whitespace-pre-wrap font-mono leading-relaxed">{{ prompt && prompt.body ? prompt.body : (prompt && prompt.content ? prompt.content : '内容加载中...') }}</pre>
              <button
                @click="copyPrompt"
                class="absolute top-4 right-4 px-3 py-1 text-sm bg-white text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                {{ copied ? '已复制!' : '复制' }}
              </button>
            </div>
          </div>
          
          <!-- 标签 -->
          <div v-if="prompt && prompt.tags && prompt.tags.length > 0" class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">标签</h2>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in prompt.tags"
                :key="tag"
                class="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          
          <!-- 使用技巧 -->
          <div v-if="prompt && prompt.tips" class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">使用技巧</h2>
            <div class="bg-yellow-50 rounded-lg p-6">
              <ul class="space-y-2">
                <li
                  v-for="tip in prompt.tips"
                  :key="tip"
                  class="flex items-start space-x-2 text-sm text-yellow-800"
                >
                  <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>{{ tip }}</span>
                </li>
              </ul>
            </div>
          </div>
          
          <!-- 操作按钮 -->
          <div class="flex items-center space-x-4">
            <button
              @click="copyPrompt"
              class="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              <span>{{ copied ? '已复制到剪贴板' : '复制提示词' }}</span>
            </button>
            
            <button
              @click="toggleLike"
              :class="[
                'flex items-center space-x-2 px-6 py-3 rounded-lg border transition-colors',
                liked ? 'bg-red-50 text-red-600 border-red-200' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
              ]"
            >
              <svg class="w-5 h-5" :fill="liked ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              <span>{{ liked ? '已收藏' : '收藏' }}</span>
            </button>
            
            <button
              @click="sharePrompt"
              class="flex items-center space-x-2 px-6 py-3 bg-white text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
              </svg>
              <span>分享</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- 侧边栏 -->
      <div class="lg:col-span-1">
        <!-- 适用AI工具 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">适用AI工具</h3>
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
              <span class="text-sm text-gray-700">ChatGPT</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
              <span class="text-sm text-gray-700">Claude</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
              <span class="text-sm text-gray-700">Gemini</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span class="text-sm text-gray-700">文心一言</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- 404状态 -->
  <div v-else class="text-center py-12">
    <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.816-6.207-2.175.193-.39.398-.778.618-1.158A8.962 8.962 0 0112 13.5c2.34 0 4.5-.816 6.207-2.175-.193-.39-.398-.778-.618-1.158A7.962 7.962 0 0112 12z"></path>
    </svg>
    <h3 class="text-lg font-medium text-gray-900 mb-2">提示词不存在</h3>
    <p class="text-gray-600 mb-4">您访问的提示词可能已被删除或不存在</p>
    <NuxtLink
      to="/"
      class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
    >
      返回首页
    </NuxtLink>
  </div>
</template>

<script setup>
import { usePromptBySlug } from '~/utils/usePrompts'
import { getCategoryName } from '~/utils/categories'

const route = useRoute()
const { category, slug } = route.params

// 响应式数据
const copied = ref(false)
const liked = ref(false)

// 获取提示词详情
const promptRef = await usePromptBySlug(category, slug)
const prompt = promptRef.value

// 页面元数据
useHead(() => ({
  title: `${prompt?.title || '提示词详情'} - AI提示词导航站 | ${prompt?.category || 'AI工具'}`,
  meta: [
    { name: 'description', content: prompt?.description || '查看AI提示词详情，获取实用的AI工具使用技巧和模板。' },
    { name: 'keywords', content: `${prompt?.title || 'AI提示词'},${prompt?.category || 'AI工具'},ChatGPT,Claude,Gemini,AI工具,提示词模板` },
    { property: 'og:title', content: `${prompt?.title || '提示词详情'} - AI提示词导航站` },
    { property: 'og:description', content: prompt?.description || '查看AI提示词详情，获取实用的AI工具使用技巧和模板。' },
    { property: 'og:type', content: 'article' },
    { property: 'article:section', content: prompt?.category || 'AI工具' },
    { property: 'article:tag', content: prompt?.tags?.join(', ') || 'AI提示词' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `${prompt?.title || '提示词详情'} - AI提示词导航站` },
    { name: 'twitter:description', content: prompt?.description || '查看AI提示词详情，获取实用的AI工具使用技巧和模板。' }
  ],
  link: [
    { rel: 'canonical', href: `https://pnav.friday-go.icu/prompts/${category}-${slug}` }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: prompt?.title,
        description: prompt?.description,
        author: {
          '@type': 'Organization',
          name: 'AI提示词导航站'
        },
        publisher: {
          '@type': 'Organization',
          name: 'AI提示词导航站',
          url: 'https://pnav.friday-go.icu'
        },
        datePublished: new Date().toISOString(),
        dateModified: new Date().toISOString(),
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://pnav.friday-go.icu/prompts/${category}-${slug}`
        },
        keywords: prompt?.tags?.join(', ') || 'AI提示词',
        articleSection: prompt?.category
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: '首页',
            item: 'https://pnav.friday-go.icu'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: getCategoryName(category),
            item: `https://pnav.friday-go.icu/prompts/${category}`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: prompt?.title || '提示词详情',
            item: `https://pnav.friday-go.icu/prompts/${category}-${slug}`
          }
        ]
      })
    }
  ]
}))

// 方法
const copyPrompt = async () => {
  // 尝试多种字段
  let bodyText = ''
  if (prompt?.body && typeof prompt.body === 'string') {
    bodyText = prompt.body
  } else if (prompt?.content && typeof prompt.content === 'string') {
    bodyText = prompt.content
  } else {
    // 安全地序列化对象，避免循环引用
    try {
      bodyText = JSON.stringify({
        title: prompt?.title,
        description: prompt?.description,
        body: prompt?.body,
        content: prompt?.content,
        tags: prompt?.tags
      }, null, 2)
    } catch (jsonErr) {
      bodyText = prompt?.body || prompt?.content || '内容不可用'
    }
  }
  
  try {
    // 检查 clipboard API 是否可用
    if (!navigator.clipboard) {
      // 备用方法：创建临时文本区域
      const textArea = document.createElement('textarea')
      textArea.value = bodyText
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    } else {
      await navigator.clipboard.writeText(bodyText)
    }
    
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
    // 尝试备用方法
    try {
      const textArea = document.createElement('textarea')
      textArea.value = bodyText || '复制失败'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    } catch (backupErr) {
      console.error('备用复制方法也失败:', backupErr)
    }
  }
}

const toggleLike = () => {
  liked.value = !liked.value
  // 这里可以添加API调用来更新收藏状态
}

const sharePrompt = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: prompt.title,
        text: prompt.description,
        url: window.location.href
      })
    } catch (err) {
      console.log('分享取消或失败')
    }
  } else {
    // 降级到复制链接
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert('链接已复制到剪贴板')
    } catch (err) {
      console.error('分享失败:', err)
    }
  }
}

// 如果提示词不存在，显示404 - 只在客户端执行
if (process.client && !prompt) {
  throw createError({
    statusCode: 404,
    statusMessage: '提示词不存在'
  })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>