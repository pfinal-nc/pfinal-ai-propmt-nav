<template>
  <div v-if="prompt">
    <!-- 面包屑导航 -->
    <nav class="flex items-center space-x-2 text-sm text-gray-500 mb-6">
      <NuxtLink to="/" class="hover:text-primary-600">首页</NuxtLink>
      <span>/</span>
      <NuxtLink :to="`/prompts/${prompt.category}`" class="hover:text-primary-600">
        {{ getCategoryName(prompt.category) }}
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
              <span class="px-3 py-1 text-sm font-medium bg-primary-100 text-primary-700 rounded-full">
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
              <pre class="text-sm text-gray-800 whitespace-pre-wrap font-mono leading-relaxed">{{ typeof prompt.body === 'string' ? prompt.body : JSON.stringify(prompt.body, null, 2) }}</pre>
              <button
                @click="copyPrompt"
                class="absolute top-4 right-4 px-3 py-1 text-sm bg-white text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                {{ copied ? '已复制!' : '复制' }}
              </button>
            </div>
          </div>
          
          <!-- 参数说明 -->
          <div v-if="prompt.parameters && prompt.parameters.length > 0" class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">参数说明</h2>
            <div class="bg-blue-50 rounded-lg p-6">
              <p class="text-sm text-blue-800 mb-4">使用时请将以下参数替换为实际内容：</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  v-for="param in prompt.parameters"
                  :key="param"
                  class="flex items-center space-x-2"
                >
                  <code class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">{{ '{' + param + '}' }}</code>
                  <span class="text-sm text-blue-700">{{ getParameterDescription(param) }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 使用示例 -->
          <div v-if="prompt.example" class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">使用示例</h2>
            <div class="bg-green-50 rounded-lg p-6">
              <h3 class="text-sm font-medium text-green-800 mb-2">示例场景：</h3>
              <p class="text-sm text-green-700 mb-4">{{ prompt.example.scenario }}</p>
              <h3 class="text-sm font-medium text-green-800 mb-2">填入参数后的提示词：</h3>
              <div class="bg-white rounded border border-green-200 p-4">
                <pre class="text-sm text-gray-800 whitespace-pre-wrap">{{ prompt.example.result }}</pre>
              </div>
            </div>
          </div>
          
          <!-- 使用技巧 -->
          <div v-if="prompt.tips" class="mb-8">
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
              class="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
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
        <!-- 相关标签 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">相关标签</h3>
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
        
        <!-- 相关提示词 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">相关提示词</h3>
          <div class="space-y-3">
            <div
              v-for="related in relatedPrompts"
              :key="related.id"
              class="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0"
            >
              <NuxtLink
                :to="`/prompt/${related.id}`"
                class="block hover:text-primary-600 transition-colors"
              >
                <h4 class="text-sm font-medium text-gray-900 mb-1">{{ related.name }}</h4>
                <p class="text-xs text-gray-600 line-clamp-2">{{ related.description }}</p>
              </NuxtLink>
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
      class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
    >
      返回首页
    </NuxtLink>
  </div>
</template>

<script setup>
const route = useRoute()
const id = route.params.id

// 响应式数据
const copied = ref(false)
const liked = ref(false)

// 获取提示词数据
const { data: prompts } = await useAsyncData('prompts', () => queryContent('/prompts').find())
const prompt = computed(() => prompts.value?.find(p => p._id === id))

// 相关提示词
const relatedPrompts = computed(() => {
  if (!prompts.value || !prompt.value) return []
  return prompts.value
    .filter(p => p.category === prompt.value.category && p._id !== prompt.value._id)
    .slice(0, 3)
    .map(p => ({
      id: p._id,
      name: p.title,
      description: p.description
    }))
})

// 页面元数据
useHead({
  title: `${prompt.value?.title || '提示词详情'} - AI提示词导航站`,
  meta: [
    { name: 'description', content: prompt.value?.description || '查看AI提示词详情' }
  ]
})

// 类别名称映射
const categoryNames = {
  'coding': '编程开发',
  'writing': '写作助手',
  'marketing': '营销文案',
  'learning': '学习辅助'
}

// 参数描述映射
const parameterDescriptions = {
  'function_name': '函数名称',
  'description': '功能描述',
  'code': '代码内容',
  'language': '编程语言',
  'topic': '主题',
  'content': '内容'
}

// 计算属性
const displayPrompt = computed(() => {
  return typeof prompt.value?.body === 'string' ? prompt.value.body : JSON.stringify(prompt.value.body, null, 2)
})

// 方法
const getCategoryName = (category) => {
  return categoryNames[category] || category
}

const getParameterDescription = (param) => {
  return parameterDescriptions[param] || param
}

const copyPrompt = async () => {
  try {
    const bodyText = typeof prompt.value.body === 'string' 
      ? prompt.value.body 
      : JSON.stringify(prompt.value.body)
    
    await navigator.clipboard.writeText(bodyText)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
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
        title: prompt.value.title,
        text: prompt.value.description,
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

// 如果提示词不存在，显示404
if (!prompt.value) {
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