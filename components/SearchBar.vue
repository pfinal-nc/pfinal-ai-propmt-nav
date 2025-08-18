<template>
  <div class="relative">
    <!-- 搜索框容器 -->
    <div class="relative group">
      <!-- 搜索输入框 -->
      <input
        v-model="searchQuery"
        @keyup.enter="performSearch"
        @focus="showSuggestions = true"
        @blur="handleBlur"
        type="text"
        placeholder="搜索提示词... 例如：写作、编程、营销"
        class="w-full px-4 py-2.5 pl-12 pr-10 text-gray-900 bg-white/80 backdrop-blur-sm border-2 border-gray-200/60 rounded-xl shadow-soft focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-300 text-sm placeholder-gray-400"
      >
      
      <!-- 搜索图标 -->
      <div class="absolute inset-y-0 left-0 flex items-center pl-4">
        <svg class="w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      
      <!-- 清除按钮 -->
      <button
        v-if="searchQuery"
        @click="clearSearch"
        class="absolute inset-y-0 right-0 flex items-center pr-4 hover:bg-gray-100/80 rounded-r-xl transition-colors duration-200"
        type="button"
      >
        <svg class="w-4 h-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      
      <!-- 搜索建议下拉框 -->
      <div 
        v-if="showSuggestions && searchQuery && filteredSuggestions.length > 0"
        class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto"
      >
        <div class="py-1">
          <div
            v-for="suggestion in filteredSuggestions.slice(0, 5)"
            :key="suggestion"
            @mousedown="selectSuggestion(suggestion)"
            class="px-3 py-2 hover:bg-blue-50 cursor-pointer transition-colors duration-150"
          >
            <div class="flex items-center space-x-2">
              <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <span class="text-sm text-gray-700">{{ suggestion }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 热门搜索标签 -->
    <div class="mt-4 flex flex-wrap gap-2 justify-center">
      <span class="text-sm text-gray-500 font-medium flex items-center">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
        热门搜索:
      </span>
      <button
        v-for="tag in popularTags"
        :key="tag"
        @click="selectTag(tag)"
        class="px-3 py-1.5 text-xs bg-white/60 backdrop-blur-sm border border-gray-200/60 text-gray-700 rounded-full hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md hover:scale-105"
      >
        {{ tag }}
      </button>
    </div>
    
    <!-- 搜索统计信息 -->
    <div v-if="searchQuery && searchStats" class="mt-3 text-center">
      <p class="text-sm text-gray-500">
        找到 <span class="font-semibold text-blue-600">{{ searchStats.count }}</span> 个相关提示词
        <span v-if="searchStats.time" class="text-gray-400">· 用时 {{ searchStats.time }}ms</span>
      </p>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const route = useRoute()

const searchQuery = ref(route.query.q || '')
const showSuggestions = ref(false)

// 热门搜索标签
const popularTags = [
  '写作助手', '代码生成', '营销文案', '学习计划', 
  '翻译润色', 'SEO优化', '创意设计', '数据分析'
]

// 搜索建议（基于热门标签和常见搜索词）
const searchSuggestions = [
  '写作助手', '代码生成', '营销文案', '学习计划', 
  '翻译润色', 'SEO优化', '创意设计', '数据分析',
  'Python', 'JavaScript', 'Vue', 'React', 'ChatGPT', 'Claude'
]

// 过滤搜索建议
const filteredSuggestions = computed(() => {
  if (!searchQuery.value) return []
  const query = searchQuery.value.toLowerCase()
  return searchSuggestions.filter(suggestion => 
    suggestion.toLowerCase().includes(query)
  )
})

// 搜索统计
const searchStats = ref(null)

const performSearch = () => {
  if (searchQuery.value.trim()) {
    const startTime = Date.now()
    
    // 模拟搜索延迟
    setTimeout(() => {
      searchStats.value = {
        count: Math.floor(Math.random() * 50) + 10, // 模拟结果数
        time: Date.now() - startTime
      }
    }, 100)
    
    router.push({
      path: '/search',
      query: { q: searchQuery.value.trim() }
    })
  }
}

const clearSearch = () => {
  searchQuery.value = ''
  searchStats.value = null
  showSuggestions.value = false
}

const selectTag = (tag) => {
  searchQuery.value = tag
  showSuggestions.value = false
  performSearch()
}

const selectSuggestion = (suggestion) => {
  searchQuery.value = suggestion
  showSuggestions.value = false
  performSearch()
}

const handleBlur = () => {
  // 延迟隐藏建议，避免点击建议时立即隐藏
  setTimeout(() => {
    showSuggestions.value = false
  }, 150)
}

// 监听搜索查询变化，触发事件
watch(searchQuery, (newQuery) => {
  emit('search', newQuery)
  
  // 重置搜索统计
  if (!newQuery) {
    searchStats.value = null
  }
})

const emit = defineEmits(['search'])
</script>

<style scoped>
/* 自定义滚动条 */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>