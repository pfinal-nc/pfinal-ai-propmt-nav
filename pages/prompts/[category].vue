<template>
  <div>
    <!-- Category Page Header -->
    <div class="mb-8">
      <nav class="flex items-center space-x-2 text-sm text-gray-500 mb-4">
        <NuxtLink to="/" class="hover:text-blue-600">Home</NuxtLink>
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
        <span>{{ filteredPrompts.length }} prompts</span>
      </div>
    </div>
    
    <!-- Search and Sort -->
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
            <option value="newest">Latest</option>
            <option value="popular">Most Popular</option>
            <option value="views">Most Viewed</option>
            <option value="name">Sort by Name</option>
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
    
    <!-- Prompts List -->
    <div v-if="filteredPrompts.length > 0">
      <!-- Grid View -->
      <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PromptCard 
          v-for="prompt in paginatedPrompts" 
          :key="prompt.slug" 
          :prompt="prompt" 
        />
      </div>
      
      <!-- List View -->
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
                Copy
              </button>
              <NuxtLink
                :to="`/prompts/${prompt.category}-${prompt.slug}`"
                class="px-3 py-1 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded transition-colors"
              >
                View Details
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <div class="text-6xl mb-4">{{ categoryInfo.icon }}</div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No Related Prompts</h3>
      <p class="text-gray-600 mb-4">There are no prompts in this category, or no results matching the search criteria</p>
      <NuxtLink
        to="/"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Browse All Prompts
      </NuxtLink>
    </div>
    
    <!-- Pagination -->
    <div v-if="totalPages > 1" class="mt-8 flex justify-center">
      <nav class="flex items-center space-x-2">
        <button
          @click="currentPage = Math.max(1, currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <span class="px-3 py-2 text-sm text-gray-600">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        
        <button
          @click="currentPage = Math.min(totalPages, currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
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

// Category information mapping
const categoryMap = {
  writing: {
    name: 'Writing Assistant',
    icon: '✍️',
    description: 'Professional writing assistance tools to help you create articles, copy, and content'
  },
  coding: {
    name: 'Programming & Development',
    icon: '💻',
    description: 'Programming-related prompts including code generation, debugging, and optimization'
  },
  marketing: {
    name: 'Marketing & Copywriting',
    icon: '📢',
    description: 'Marketing and promotion-related copywriting and strategy development tools'
  },
  learning: {
    name: 'Learning Assistant',
    icon: '📚',
    description: 'Learning and education-related prompts to help improve learning efficiency'
  },
  life: {
    name: 'Life Assistant',
    icon: '🌟',
    description: 'Daily life-related prompts including health, psychology, entertainment, etc.'
  },
  design: {
    name: 'Design Assistant',
    icon: '🎨',
    description: 'Design-related prompts including UI design, graphic design, 3D design, etc.'
  },
  translation: {
    name: 'Translation & Editing',
    icon: '🌐',
    description: 'Translation-related prompts including translation, editing, and proofreading'
  },
  business: {
    name: 'Business & Office',
    icon: '💼',
    description: 'Business and office-related prompts including meeting minutes, report writing, data analysis, etc.'
  },
  data: {
    name: 'Data Analysis',
    icon: '📊',
    description: 'Data analysis-related prompts including data analysis, visualization, and mining'
  },
  academic: {
    name: 'Academic Research',
    icon: '📚',
    description: 'Academic research-related prompts including paper writing, literature review, data analysis, etc.'
  },
  other: {
    name: 'Other',
    icon: '📁',
    description: 'Other related prompts covering various fields'
  }
}

const categoryInfo = computed(() => {
  return categoryMap[category] || {
    name: 'Unknown Category',
    icon: '❓',
    description: 'Category information does not exist'
  }
})

// Page metadata
useHead(() => ({
  title: `${categoryInfo.value.name} Prompts - AI Prompts Navigation | ${categoryInfo.value.description}`,
  meta: [
    { name: 'description', content: `${categoryInfo.value.description}. Browse AI prompts in the ${categoryInfo.value.name} category, including practical prompt templates for ChatGPT, Claude, Gemini and other AI tools.` },
    { name: 'keywords', content: `${categoryInfo.value.name},AI prompts,ChatGPT prompts,Claude prompts,Gemini prompts,AI tools,prompt templates` },
    { property: 'og:title', content: `${categoryInfo.value.name} Prompts - AI Prompts Navigation` },
    { property: 'og:description', content: `${categoryInfo.value.description}. Browse AI prompts in the ${categoryInfo.value.name} category.` },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `${categoryInfo.value.name} Prompts - AI Prompts Navigation` },
    { name: 'twitter:description', content: `${categoryInfo.value.description}. Browse AI prompts in the ${categoryInfo.value.name} category.` }
  ],
  link: [
    { rel: 'canonical', href: `https://your-domain.com/prompts/${category}` }
  ]
}))

// Reactive data
const searchQuery = ref('')
const sortBy = ref('newest')
const viewMode = ref('grid')
const currentPage = ref(1)
const pageSize = 12

// Get prompts data for this category
const categoryPrompts = await usePromptsByCategory(category)

// Computed properties
const filteredPrompts = computed(() => {
  let result = categoryPrompts.value || []

  if (searchQuery.value) {
    // Simple text search
    const query = searchQuery.value.toLowerCase()
    result = result.filter(prompt => 
      prompt.title?.toLowerCase().includes(query) ||
      prompt.description?.toLowerCase().includes(query) ||
      prompt.tags?.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // Sorting logic
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
      // Use slug as default sorting
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

// Methods
const handleSearch = (query) => {
  searchQuery.value = query
  currentPage.value = 1
}

const handleSort = () => {
  currentPage.value = 1
}

// 404 handling - only execute on client side
if (process.client && !categoryMap[category]) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Category does not exist'
  })
}
</script>