<template>
  <div class="relative">
    <!-- Search Box Container -->
    <div class="relative group">
      <!-- Search Input Box -->
      <input
        v-model="searchQuery"
        @keyup.enter="performSearch"
        @focus="showSuggestions = true"
        @blur="handleBlur"
        type="text"
        placeholder="Search prompts... e.g.: writing, coding, marketing"
        class="w-full px-4 py-2.5 pl-12 pr-10 text-gray-900 bg-white/80 backdrop-blur-sm border-2 border-gray-200/60 rounded-xl shadow-soft focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all duration-300 text-sm placeholder-gray-400"
      >
      
      <!-- Search Icon -->
      <div class="absolute inset-y-0 left-0 flex items-center pl-4">
        <svg class="w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      
      <!-- Clear Button -->
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
      
      <!-- Search Suggestions Dropdown -->
      <div 
        v-if="showSuggestions && searchQuery && filteredSuggestions.length > 0"
        class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto"
      >
        <div class="py-1">
          <div
            v-for="suggestion in filteredSuggestions.slice(0, 5)"
            :key="suggestion"
            @mousedown="selectSuggestion(suggestion)"
            class="px-3 py-2 hover:bg-indigo-50 cursor-pointer transition-colors duration-150"
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
    
    <!-- Popular Search Tags -->
    <div class="mt-4 flex flex-wrap gap-2 justify-center">
      <span class="text-sm text-gray-500 font-medium flex items-center">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
        Popular searches:
      </span>
      <button
        v-for="tag in popularTags"
        :key="tag"
        @click="selectTag(tag)"
        class="px-3 py-1.5 text-xs bg-white/60 backdrop-blur-sm border border-gray-200/60 text-gray-700 rounded-full hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md hover:scale-105"
      >
        {{ tag }}
      </button>
    </div>
    
    <!-- Search Statistics -->
    <div v-if="searchQuery && searchStats" class="mt-3 text-center">
      <p class="text-sm text-gray-500">
        Found <span class="font-semibold text-indigo-600">{{ searchStats.count }}</span> related prompts
        <span v-if="searchStats.time" class="text-gray-400">· took {{ searchStats.time }}ms</span>
      </p>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const route = useRoute()

const searchQuery = ref(route.query.q || '')
const showSuggestions = ref(false)

// Popular search tags
const popularTags = [
  'Writing Assistant', 'Code Generation', 'Marketing Copy', 'Study Plan', 
  'Translation', 'SEO Optimization', 'Creative Design', 'Data Analysis'
]

// Search suggestions (based on popular tags and common search terms)
const searchSuggestions = [
  'Writing Assistant', 'Code Generation', 'Marketing Copy', 'Study Plan', 
  'Translation', 'SEO Optimization', 'Creative Design', 'Data Analysis',
  'Python', 'JavaScript', 'Vue', 'React', 'ChatGPT', 'Claude'
]

// Filter search suggestions
const filteredSuggestions = computed(() => {
  if (!searchQuery.value) return []
  const query = searchQuery.value.toLowerCase()
  return searchSuggestions.filter(suggestion => 
    suggestion.toLowerCase().includes(query)
  )
})

// Search statistics
const searchStats = ref(null)

const performSearch = () => {
  if (searchQuery.value.trim()) {
    const startTime = Date.now()
    
    // Simulate search delay
    setTimeout(() => {
      searchStats.value = {
        count: Math.floor(Math.random() * 50) + 10, // Simulate result count
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
  // Delay hiding suggestions to avoid immediate hiding when clicking suggestions
  setTimeout(() => {
    showSuggestions.value = false
  }, 150)
}

// Listen for search query changes and trigger events
watch(searchQuery, (newQuery) => {
  emit('search', newQuery)
  
  // Reset search statistics
  if (!newQuery) {
    searchStats.value = null
  }
})

const emit = defineEmits(['search'])
</script>

<style scoped>
/* Custom scrollbar */
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