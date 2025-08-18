<template>
  <div class="space-y-16 lg:space-y-24">
    <!-- 英雄区域 -->
    <section class="text-center py-12 lg:py-20">
      <div class="max-w-4xl mx-auto">
        <div class="mb-8">
          <h1 class="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            AI提示词
            <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              导航站
            </span>
          </h1>
          <p class="text-lg lg:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            收集最全面的AI提示词，帮助你更好地使用ChatGPT、Claude、Gemini等AI工具。
            涵盖写作、编程、营销、学习等各个领域。
          </p>
        </div>
        
        <!-- 搜索框 -->
        <div class="max-w-3xl mx-auto mb-8">
          <div class="bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-8 shadow-soft">
            <SearchBar @search="handleSearch" />
          </div>
        </div>
        
        <!-- 统计信息 -->
        <div class="flex justify-center items-center space-x-8 text-sm text-gray-500">
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>1000+ 精选提示词</span>
          </div>
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>5+ 主要分类</span>
          </div>
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>持续更新</span>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 分类导航 -->
    <section class="py-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          探索分类
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          按领域分类浏览，快速找到你需要的AI提示词
        </p>
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
        <NuxtLink 
          v-for="category in categories" 
          :key="category.key"
          :to="`/prompts/${category.key}`"
          class="group bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8 text-center hover:shadow-lg hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1"
        >
          <div class="text-3xl lg:text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
            {{ getCategoryIcon(category.key) }}
          </div>
          <h3 class="font-semibold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
            {{ category.name }}
          </h3>
          <p class="text-sm text-gray-500 mb-3">{{ category.count }} 个提示词</p>
          <div class="w-8 h-1 bg-blue-500 mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </NuxtLink>
      </div>
    </section>
    
    <!-- 精选提示词 -->
    <section v-if="prompts && prompts.length > 0" class="py-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          精选提示词
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          最受欢迎和实用的AI提示词推荐
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PromptCard 
          v-for="prompt in prompts.slice(0, 6)" 
          :key="prompt._id" 
          :prompt="prompt" 
        />
      </div>
      
      <!-- 查看更多按钮 -->
      <div class="text-center mt-12 text-white">
        <NuxtLink 
          to="/prompts"
          class="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <span class="text-white">查看更多提示词</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </NuxtLink>
      </div>
    </section>
    
    <!-- 特色功能 -->
    <section class="py-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          为什么选择我们
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          专业的AI提示词收集平台，助力你的AI使用体验
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center hover:shadow-lg transition-shadow duration-300">
          <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-4">精选内容</h3>
          <p class="text-gray-600">经过精心筛选和测试的高质量提示词，确保实用性和有效性</p>
        </div>
        
        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center hover:shadow-lg transition-shadow duration-300">
          <div class="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-4">分类清晰</h3>
          <p class="text-gray-600">按领域和用途分类，快速找到适合你需求的提示词</p>
        </div>
        
        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center hover:shadow-lg transition-shadow duration-300">
          <div class="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-4">持续更新</h3>
          <p class="text-gray-600">定期更新最新最热门的AI提示词，跟上AI技术发展</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { usePrompts, useCategories } from '~/utils/usePrompts'
import { getCategoryIcon } from '~/utils/categories'

// 页面元数据
useHead({
  title: 'AI提示词导航站 - 最全的AI Prompts集合',
  meta: [
    { name: 'description', content: '收集最全面的AI提示词，帮助你更好地使用ChatGPT、Claude、Gemini等AI工具。涵盖写作、编程、营销、学习等各个领域。' }
  ]
})

// 获取提示词和分类数据
const prompts = await usePrompts()
const categories = await useCategories()

// 搜索处理
const handleSearch = (query) => {
  // 实际项目中这里应该导航到搜索结果页面
  console.log('搜索:', query)
}
</script>