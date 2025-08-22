<template>
  <div>
    <!-- 分类页面头部 -->
    <div class="mb-8">
      <nav class="flex items-center space-x-2 text-sm text-gray-500 mb-4">
        <NuxtLink to="/" class="hover:text-blue-600">首页</NuxtLink>
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
        <span>{{ filteredPrompts.length }} 个提示词</span>
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
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
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
                viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
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
          :key="prompt.slug" 
          :prompt="prompt" 
        />
      </div>
      
      <!-- 列表视图 -->
      <div v-else class="space-y-4">
        <div
          v-for="prompt in paginatedPrompts"
          :key="prompt.slug"
          class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-2">
                <h3 class="text-lg font-semibold text-gray-900">{{ prompt.title }}</h3>
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
                  v-for="tag in prompt.tags?.slice(0, 3)"
                  :key="tag"
                  class="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <div class="ml-4 flex items-center space-x-2">
              <button class="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors">
                复制
              </button>
              <NuxtLink
                :to="`/prompts/${prompt.category}-${prompt.slug}`"
                class="px-3 py-1 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded transition-colors"
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
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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
import { usePromptsByCategory } from '~/utils/usePrompts'
import { getCategoryName } from '~/utils/categories'

const route = useRoute()
const category = route.params.category

// 分类信息映射
const categoryMap = {
  writing: {
    name: '写作助手',
    icon: '✍️',
    description: '专业的写作辅助工具，帮助你创作各类文章、文案和内容'
  },
  coding: {
    name: '编程开发',
    icon: '💻',
    description: '编程相关的提示词，包括代码生成、调试、优化等'
  },
  marketing: {
    name: '营销文案',
    icon: '📢',
    description: '营销推广相关的文案创作和策略制定工具'
  },
  learning: {
    name: '学习辅助',
    icon: '📚',
    description: '学习和教育相关的提示词，帮助提高学习效率'
  },
  life: {
    name: '生活助手',
    icon: '🌟',
    description: '日常生活相关的提示词，包括健康、心理、娱乐等'
  },
  design: {
    name: '设计辅助',
    icon: '🎨',
    description: '设计相关的提示词，包括UI设计、平面设计、3D设计等'
  },
  translation: {
    name: '翻译润色',
    icon: '🌐',
    description: '翻译相关的提示词，包括翻译、润色、校对等'
  },
  business: {
    name: '商务办公',
    icon: '💼',
    description: '商务办公相关的提示词，包括会议纪要、报告撰写、数据分析等'
  },
  data: {
    name: '数据分析',
    icon: '📊',
    description: '数据分析相关的提示词，包括数据分析、数据可视化、数据挖掘等'
  },
  academic: {
    name: '学术研究',
    icon: '📚',
    description: '学术研究相关的提示词，包括论文写作、文献综述、数据分析等'
  },
  other: {
    name: '其他',
    icon: '📁',
    description: '其他相关的提示词，包括其他领域'
  }
}

const categoryInfo = computed(() => {
  return categoryMap[category] || {
    name: '未知分类',
    icon: '❓',
    description: '分类信息不存在'
  }
})

// 页面元数据
useHead(() => ({
  title: `${categoryInfo.value.name}提示词 - AI提示词导航站 | ${categoryInfo.value.description}`,
  meta: [
    { name: 'description', content: `${categoryInfo.value.description}。浏览${categoryInfo.value.name}分类下的AI提示词，包括ChatGPT、Claude、Gemini等AI工具的实用提示词模板。` },
    { name: 'keywords', content: `${categoryInfo.value.name},AI提示词,ChatGPT提示词,Claude提示词,Gemini提示词,AI工具,提示词模板` },
    { property: 'og:title', content: `${categoryInfo.value.name}提示词 - AI提示词导航站` },
    { property: 'og:description', content: `${categoryInfo.value.description}。浏览${categoryInfo.value.name}分类下的AI提示词。` },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `${categoryInfo.value.name}提示词 - AI提示词导航站` },
    { name: 'twitter:description', content: `${categoryInfo.value.description}。浏览${categoryInfo.value.name}分类下的AI提示词。` }
  ],
  link: [
    { rel: 'canonical', href: `https://your-domain.com/prompts/${category}` }
  ]
}))

// 响应式数据
const searchQuery = ref('')
const sortBy = ref('newest')
const viewMode = ref('grid')
const currentPage = ref(1)
const pageSize = 12

// 获取该分类的提示词数据
const categoryPrompts = await usePromptsByCategory(category)

// 计算属性
const filteredPrompts = computed(() => {
  let result = categoryPrompts.value || []

  if (searchQuery.value) {
    // 简单的文本搜索
    const query = searchQuery.value.toLowerCase()
    result = result.filter(prompt => 
      prompt.title?.toLowerCase().includes(query) ||
      prompt.description?.toLowerCase().includes(query) ||
      prompt.tags?.some(tag => tag.toLowerCase().includes(query))
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
      result.sort((a, b) => (a.title || '').localeCompare(b.title || ''))
      break
    default:
      // 使用slug作为默认排序
      result.sort((a, b) => (a.slug || '').localeCompare(b.slug || ''))
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

// 404处理 - 只在客户端执行
if (process.client && !categoryMap[category]) {
  throw createError({
    statusCode: 404,
    statusMessage: '分类不存在'
  })
}
</script>