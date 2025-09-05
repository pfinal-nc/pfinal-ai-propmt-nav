<template>
  <div>
    <!-- Top Title and Description -->
    <div class="mb-10 text-center">
      <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">All Prompts</h1>
      <p class="text-gray-600">Collection of quality prompts from all categories with filtering and search support</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Filter Sidebar -->
      <aside class="lg:col-span-1">
        <CategoryFilter
          :total-count="prompts?.length || 0"
          @filter-change="onFilterChange"
        />
      </aside>

      <!-- List Area -->
      <section class="lg:col-span-3">
        <!-- Top Toolbar: Search and Statistics -->
        <div class="bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-6 mb-8 shadow-soft">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div class="flex-1 max-w-lg w-full">
              <SearchBar @search="onSearch" />
            </div>
            <div class="flex items-center space-x-4 text-sm text-gray-600">
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Total <span class="font-semibold text-blue-600">{{ filteredPrompts.length }}</span> results</span>
              </div>
              <div v-if="state.category !== 'all' || state.tags.length > 0 || state.q" class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"></path>
                </svg>
                <span class="text-orange-600">Filtered</span>
              </div>
            </div>
          </div>
          
          <!-- Current Filter Conditions Display -->
          <div v-if="state.category !== 'all' || state.tags.length > 0 || state.q" class="mt-4 pt-4 border-t border-gray-200/60">
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-sm text-gray-500">Current filters:</span>
              <span v-if="state.category !== 'all'" class="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                {{ getCategoryName(state.category) }}
              </span>
              <span v-for="tag in state.tags" :key="tag" class="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                {{ tag }}
              </span>
              <span v-if="state.q" class="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
                "{{ state.q }}"
              </span>
              <button 
                @click="clearAllFilters"
                class="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>

        <!-- Prompts Grid -->
        <div v-if="filteredPrompts.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <PromptCard
            v-for="item in filteredPrompts"
            :key="item._id"
            :prompt="item"
          />
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16 bg-white border border-gray-200 rounded-xl">
          <svg class="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"/>
          </svg>
          <p class="text-gray-600">No prompts found matching the criteria, try fewer filter conditions</p>
        </div>
      </section>
    </div>
  </div>
  
</template>

<script setup>
import { usePrompts } from '~/utils/usePrompts'
import { getCategoryName } from '~/utils/categories'

// Data
const prompts = await usePrompts()

// Local filter state
const state = reactive({
  category: 'all',
  tags: [],
  q: ''
})

// Handle filter changes
const onFilterChange = ({ category, tags }) => {
  state.category = category
  state.tags = tags || []
}

// Handle search
const onSearch = (q) => {
  state.q = (q || '').trim()
}

// Clear all filters
const clearAllFilters = () => {
  state.category = 'all'
  state.tags = []
  state.q = ''
}

// Filter logic
const filteredPrompts = computed(() => {
  let list = (prompts?.value || [])

  // Category filter
  if (state.category && state.category !== 'all') {
    list = list.filter(item => item.category === state.category)
  }

  // Tag filter (all included)
  if (state.tags && state.tags.length > 0) {
    list = list.filter(item => Array.isArray(item.tags) && state.tags.every(t => item.tags.includes(t)))
  }

  // Keyword search: title/description/content
  if (state.q) {
    const q = state.q.toLowerCase()
    list = list.filter(item => {
      const title = (item.title || '').toLowerCase()
      const desc = (item.description || '').toLowerCase()
      const body = typeof item.body === 'string' ? item.body.toLowerCase() : ''
      return title.includes(q) || desc.includes(q) || body.includes(q)
    })
  }

  return list
})

useHead({
  title: 'All Prompts - AI Prompts Navigation',
  meta: [
    { name: 'description', content: 'Browse all AI prompts with category and tag filtering support to quickly find the prompts you need' }
  ]
})
</script>


