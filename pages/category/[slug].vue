<template>
  <div>
    <!-- 分类页面头部 -->
    <div class="mb-8">
      <nav class="flex items-center space-x-2 text-sm text-gray-500 mb-4">
        <NuxtLink to="/" class="hover:text-primary-600">首页</NuxtLink>
        <span>/</span>
        <span class="text-gray-900">{{ categoryInfo.name }}</span>
      </nav>
      
      <div class="flex items-center space-x-4 mb-4">
        <div class="text-4xl">{{ categoryInfo.icon }}</div>
        <div>
          <h1 class="text-3xl font-bold text-gray-900">{{ categoryInfo.name }}</h1>
          <p class="text-gray-600 mt-2">{{ categoryInfo.description }}</p>
        </div>
      </div>
      
      <div class="flex items-center space-x-6 text-sm text-gray-600">
        <span>{{ categoryPrompts.length }} 个提示词</span>
        <span>{{ categoryInfo.totalViews }} 次浏览</span>
        <span>{{ categoryInfo.totalLikes }} 次收藏</span>
      </div>
    </div>
    
    <!-- 搜索和排序 -->
    <div class="mb-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div class="flex-1 max-w-md">
          <SearchBar @search="handleSearch" />
        </div>
        
        <div class="flex items-center space-x-4">
          <select 
            v-model="sortBy" 
            @change="handleSort"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="newest">最新发布</option>
            <option value="popular">最受欢迎</option>
            <option value="views">浏览最多</option>
            <option value="name">按名称排序</option>
          </select>
          
          <div class="flex items-center space-x-2">
            <button
              @click="viewMode = 'grid'"
              :class="[
                'p-2 rounded-md',
                viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'
              ]"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
            </button>
            <button
              @click="viewMode = 'list'"
              :class="[
                'p-2 rounded-md',
                viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'
              ]"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 提示词列表 -->
    <div v-if="filteredPrompts.length > 0">
      <!-- 网格视图 -->
      <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PromptCard 
          v-for="prompt in paginatedPrompts" 
          :key="prompt.id" 
          :prompt="prompt" 
        />
      </div>
      
      <!-- 列表视图 -->
      <div v-else class="space-y-4">
        <div
          v-for="prompt in paginatedPrompts"
          :key="prompt.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-2">
                <h3 class="text-lg font-semibold text-gray-900">{{ prompt.name }}</h3>
                <div class="flex items-center space-x-2 text-sm text-gray-500">
                  <span class="flex items-center space-x-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    <span>{{ prompt.views || 0 }}</span>
                  </span>
                  <span class="flex items-center space-x-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    <span>{{ prompt.likes || 0 }}</span>
                  </span>
                </div>
              </div>
              <p class="text-gray-600 mb-3">{{ prompt.description }}</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="param in prompt.parameters?.slice(0, 3)"
                  :key="param"
                  class="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                >
                  {{ param }}
                </span>
              </div>
            </div>
            <div class="ml-4 flex items-center space-x-2">
              <button class="px-3 py-1 text-sm text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded transition-colors">
                复制
              </button>
              <NuxtLink
                :to="`/prompt/${prompt.id}`"
                class="px-3 py-1 text-sm bg-primary-600 text-white hover:bg-primary-700 rounded transition-colors"
              >
                查看详情
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 空状态 -->
    <div v-else class="text-center py-12">
      <div class="text-6xl mb-4">{{ categoryInfo.icon }}</div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">暂无相关提示词</h3>
      <p class="text-gray-600 mb-4">该分类下还没有提示词，或者没有匹配搜索条件的结果</p>
      <NuxtLink
        to="/"
        class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
      >
        浏览所有提示词
      </NuxtLink>
    </div>
    
    <!-- 分页 -->
    <div v-if="totalPages > 1" class="mt-8 flex justify-center">
      <nav class="flex items-center space-x-2">
        <button
          @click="currentPage = Math.max(1, currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          上一页
        </button>
        
        <span class="px-3 py-2 text-sm text-gray-600">
          第 {{ currentPage }} 页，共 {{ totalPages }} 页
        </span>
        
        <button
          @click="currentPage = Math.min(totalPages, currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          下一页
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const slug = route.params.slug

// 分类信息映射
const categoryMap = {
  writing: {
    name: '写作助手',
    icon: '✍️',
    description: '专业的写作辅助工具，帮助你创作各类文章、文案和内容',
    totalViews: '8.2K',
    totalLikes: '456'
  },
  coding: {
    name: '编程开发',
    icon: '💻',
    description: '编程相关的提示词，包括代码生成、调试、优化等',
    totalViews: '12.5K',
    totalLikes: '789'
  },
  marketing: {
    name: '营销文案',
    icon: '📢',
    description: '营销推广相关的文案创作和策略制定工具',
    totalViews: '6.8K',
    totalLikes: '321'
  },
  learning: {
    name: '学习辅助',
    icon: '📚',
    description: '学习和教育相关的提示词，帮助提高学习效率',
    totalViews: '5.4K',
    totalLikes: '234'
  }
}

const categoryInfo = computed(() => {
  return categoryMap[slug] || {
    name: '未知分类',
    icon: '❓',
    description: '分类信息不存在',
    totalViews: '0',
    totalLikes: '0'
  }
})

// 页面元数据
useHead({
  title: `${categoryInfo.value.name} - AI提示词导航站`,
  meta: [
    { name: 'description', content: categoryInfo.value.description }
  ]
})

// 响应式数据
const searchQuery = ref('')
const sortBy = ref('newest')
const viewMode = ref('grid')
const currentPage = ref(1)
const pageSize = 12

// 模拟该分类的提示词数据
const categoryPrompts = ref([
  // 这里应该根据分类加载相应的提示词
  // 暂时使用模拟数据
])

// 计算属性
const filteredPrompts = computed(() => {
  let result = categoryPrompts.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(prompt => 
      prompt.name.toLowerCase().includes(query) ||
      prompt.description.toLowerCase().includes(query)
    )
  }

  // 排序逻辑
  switch (sortBy.value) {
    case 'popular':
      result.sort((a, b) => (b.likes || 0) - (a.likes || 0))
      break
    case 'views':
      result.sort((a, b) => (b.views || 0) - (a.views || 0))
      break
    case 'name':
      result.sort((a, b) => a.name.localeCompare(b.name))
      break
    default:
      result.sort((a, b) => b.id - a.id)
  }

  return result
})

const totalPages = computed(() => Math.ceil(filteredPrompts.value.length / pageSize))

const paginatedPrompts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredPrompts.value.slice(start, end)
})

// 方法
const handleSearch = (query) => {
  searchQuery.value = query
  currentPage.value = 1
}

const handleSort = () => {
  currentPage.value = 1
}

// 404处理
if (!categoryMap[slug]) {
  throw createError({
    statusCode: 404,
    statusMessage: '分类不存在'
  })
}
</script>