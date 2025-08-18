<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full text-center">
      <div class="mb-8">
        <h1 class="text-6xl font-bold text-gray-300 mb-4">{{ error.statusCode }}</h1>
        <h2 class="text-2xl font-semibold text-gray-900 mb-2">
          {{ error.statusCode === 404 ? '页面未找到' : '出现错误' }}
        </h2>
        <p class="text-gray-600 mb-8">
          {{ error.statusMessage || '抱歉，您访问的页面不存在或出现了错误。' }}
        </p>
      </div>
      
      <div class="space-y-4">
        <NuxtLink
          to="/"
          class="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          返回首页
        </NuxtLink>
        
        <button
          @click="handleError"
          class="block w-full px-6 py-3 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
        >
          重试
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object
})

const handleError = () => {
  clearError({ redirect: '/' })
}
</script>