<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="mb-10 text-center">
      <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">搜索结果</h1>
      <p class="text-lg text-gray-600 mb-8">搜索关键词: "{{ route.query.q }}"</p>
      
      <!-- 搜索框 -->
      <div class="max-w-2xl mx-auto mb-8">
        <div class="bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-6 shadow-soft">
          <SearchBar @search="handleSearch" />
        </div>
      </div>
    </div>
    
    <!-- 搜索结果统计 -->
    <div class="bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-6 mb-8 shadow-soft">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4 text-sm text-gray-600">
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <span>找到 <span class="font-semibold text-blue-600">{{ searchResults.length }}</span> 个相关提示词</span>
          </div>
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            <span>搜索用时 <span class="font-semibold text-green-600">{{ searchTime }}ms</span></span>
          </div>
        </div>
        
        <!-- 排序选项 -->
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-500">排序:</span>
          <select 
            v-model="sortBy" 
            class="px-3 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="relevance">相关度</option>
            <option value="title">标题</option>
            <option value="category">分类</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- 搜索结果 -->
    <div v-if="searchResults.length > 0">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PromptCard 
          v-for="prompt in sortedResults" 
          :key="prompt._id" 
          :prompt="prompt" 
        />
      </div>
      
      <!-- 相关搜索建议 -->
      <div class="mt-12 bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-6 shadow-soft">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">相关搜索</h3>
        <div class="flex flex-wrap gap-3">
          <NuxtLink
            v-for="suggestion in searchSuggestions"
            :key="suggestion"
            :to="`/search?q=${encodeURIComponent(suggestion)}`"
            class="px-4 py-2 text-sm bg-white border border-gray-200 text-gray-700 rounded-full hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
          >
            {{ suggestion }}
          </NuxtLink>
        </div>
      </div>
    </div>
    
    <!-- 空状态 -->
    <div v-else class="text-center py-16 bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-2xl shadow-soft">
      <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.816-6.207-2.175.193-.39.398-.778.618-1.158A8.962 8.962 0 0112 13.5c2.34 0 4.5-.816 6.207-2.175-.193-.39-.398-.778-.618-1.158A7.962 7.962 0 0112 12z"></path>
      </svg>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">未找到相关提示词</h3>
      <p class="text-gray-600 mb-6 max-w-md mx-auto">没有找到与"{{ route.query.q }}"相关的提示词，试试其他关键词或浏览所有提示词</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink
          to="/prompts"
          class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          浏览所有提示词
        </NuxtLink>
        <button
          @click="clearSearch"
          class="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300"
        >
          重新搜索
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePrompts } from '~/utils/usePrompts'
import Fuse from 'fuse.js'

const route = useRoute()
const router = useRouter()

// 响应式数据
const sortBy = ref('relevance')
const searchTime = ref(0)

// 页面元数据
useHead({
  title: `搜索结果: ${route.query.q} - AI提示词导航站`
})

// 获取所有提示词
const allPrompts = await usePrompts()

// 搜索结果
const searchResults = computed(() => {
  if (!route.query.q || !allPrompts.value) return []
  
  const startTime = Date.now()
  
  // 创建Fuse.js实例
  const fuse = new Fuse(allPrompts.value, {
    keys: ['title', 'description', 'tags', 'body'],
    threshold: 0.4,
    includeScore: true,
    minMatchCharLength: 2
  })
  
  const results = fuse.search(route.query.q).map(result => result.item)
  
  // 计算搜索时间
  searchTime.value = Date.now() - startTime
  
  return results
})

// 排序结果
const sortedResults = computed(() => {
  const results = [...searchResults.value]
  
  switch (sortBy.value) {
    case 'title':
      return results.sort((a, b) => a.title.localeCompare(b.title))
    case 'category':
      return results.sort((a, b) => a.category.localeCompare(b.category))
    default:
      return results // 相关度排序（Fuse.js已排序）
  }
})

// 搜索建议
const searchSuggestions = computed(() => {
  if (!route.query.q) return []
  
  const query = route.query.q.toLowerCase()
  const suggestions = [
    '写作助手', '代码生成', '营销文案', '学习计划',
    'Python', 'JavaScript', 'Vue', 'React', 'ChatGPT', 'Claude'
  ]
  
  return suggestions
    .filter(s => s.toLowerCase().includes(query) || query.includes(s.toLowerCase()))
    .slice(0, 6)
})

// 处理搜索
const handleSearch = (query) => {
  if (query.trim()) {
    router.push({
      path: '/search',
      query: { q: query.trim() }
    })
  }
}

// 清除搜索
const clearSearch = () => {
  router.push('/prompts')
}
</script>