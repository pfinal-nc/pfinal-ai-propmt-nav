<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1 group">
    <div class="p-5 lg:p-6">
      <!-- 标题和类别 -->
      <div class="flex items-start justify-between mb-4">
        <h3 class="text-lg lg:text-xl font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {{ prompt.title }}
        </h3>
        <span class="ml-3 px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full whitespace-nowrap flex-shrink-0">
          {{ getCategoryName(prompt.category) }}
        </span>
      </div>
      
      <!-- 描述 -->
      <p class="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
        {{ prompt.description }}
      </p>
      
      <!-- 提示词预览 -->
      <div class="bg-gray-50 rounded-xl p-3 mb-4 border border-gray-100">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">预览</span>
          <div class="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
        <p class="text-sm text-gray-700 line-clamp-2 font-mono leading-relaxed">
          {{ getPromptPreview(prompt.body) }}
        </p>
      </div>
      
      <!-- 参数标签 -->
      <div v-if="prompt.tags && prompt.tags.length > 0" class="mb-4">
        <div class="flex flex-wrap gap-2">
                      <span
              v-for="tag in prompt.tags.slice(0, 3)"
              :key="tag"
              class="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full font-medium"
            >
              {{ tag }}
            </span>
            <span
              v-if="prompt.tags.length > 3"
              class="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full font-medium"
            >
              +{{ prompt.tags.length - 3 }}
            </span>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4 text-xs text-gray-500">
          <!-- 使用次数 -->
          <div class="flex items-center space-x-1">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            <span>{{ prompt.views || 0 }}</span>
          </div>
          
          <!-- 收藏次数 -->
          <div class="flex items-center space-x-1">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
            <span>{{ prompt.likes || 0 }}</span>
          </div>
        </div>
        
        <div class="flex items-center space-x-2">
          <!-- 复制按钮 -->
          <button
            @click="copyPrompt"
            class="px-3 py-1.5 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-all duration-200 font-medium min-w-[50px]"
          >
            复制
          </button>
          
          <!-- 查看详情按钮 -->
          <NuxtLink
            :to="`/prompts/${prompt.category}-${prompt.slug}`"
            class="px-3 py-1.5 text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white !text-white hover:from-blue-700 hover:to-purple-700 rounded-md transition-all duration-200 font-medium shadow-sm hover:shadow-md min-w-[70px] text-center"
          >
            详情
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCategoryName } from '~/utils/categories'

const props = defineProps({
  prompt: {
    type: Object,
    required: true
  }
})

const getPromptPreview = (promptBody) => {
  // 确保 promptBody 是字符串
  if (!promptBody || typeof promptBody !== 'string') {
    return '暂无预览内容...'
  }
  
  // 移除参数占位符，显示纯文本预览
  const text = promptBody.replace(/\{[^}]+\}/g, '[参数]').substring(0, 100) + '...'
  return text
}

const copyPrompt = async (event) => {
  try {
    // 确保 body 是字符串
    const bodyText = typeof props.prompt.body === 'string' 
      ? props.prompt.body 
      : JSON.stringify(props.prompt.body)
    
    await navigator.clipboard.writeText(bodyText)
    
    // 显示成功提示
    const button = event.target
    const originalText = button.textContent
    button.textContent = '已复制!'
    button.classList.add('bg-green-100', 'text-green-700')
    
    setTimeout(() => {
      button.textContent = originalText
      button.classList.remove('bg-green-100', 'text-green-700')
    }, 2000)
    
  } catch (err) {
    console.error('复制失败:', err)
    // 显示错误提示
    const button = event.target
    const originalText = button.textContent
    button.textContent = '复制失败'
    button.classList.add('bg-red-100', 'text-red-700')
    
    setTimeout(() => {
      button.textContent = originalText
      button.classList.remove('bg-red-100', 'text-red-700')
    }, 2000)
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>