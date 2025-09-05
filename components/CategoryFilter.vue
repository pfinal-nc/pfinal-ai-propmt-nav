<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">Filter Categories</h3>
    
    <!-- All Categories Button -->
    <button
      @click="selectCategory('all')"
      :class="[
        'w-full text-left px-3 py-2 rounded-md mb-2 transition-colors',
        selectedCategory === 'all' 
          ? 'bg-primary-100 text-primary-700 border border-primary-200' 
          : 'hover:bg-gray-50 text-gray-700'
      ]"
    >
      <div class="flex items-center justify-between">
        <span>All Categories</span>
        <span class="text-sm text-gray-500">{{ totalCount }}</span>
      </div>
    </button>
    
    <!-- Category List -->
    <div class="space-y-1">
      <button
        v-for="category in categories"
        :key="category.key"
        @click="selectCategory(category.key)"
        :class="[
          'w-full text-left px-3 py-2 rounded-md transition-colors',
          selectedCategory === category.key 
            ? 'bg-primary-100 text-primary-700 border border-primary-200' 
            : 'hover:bg-gray-50 text-gray-700'
        ]"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <span class="text-lg">{{ category.icon }}</span>
            <span>{{ category.name }}</span>
          </div>
          <span class="text-sm text-gray-500">{{ category.count }}</span>
        </div>
      </button>
    </div>
    
    <!-- Tag Filter -->
    <div class="mt-6 pt-6 border-t border-gray-200">
      <h4 class="text-md font-medium text-gray-900 mb-3">Popular Tags</h4>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="tag in popularTags"
          :key="tag"
          @click="toggleTag(tag)"
          :class="[
            'px-3 py-1 text-sm rounded-full transition-colors',
            selectedTags.includes(tag)
              ? 'bg-primary-100 text-primary-700 border border-primary-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          ]"
        >
          {{ tag }}
        </button>
      </div>
    </div>
    
    <!-- Clear Filter -->
    <button
      v-if="selectedCategory !== 'all' || selectedTags.length > 0"
      @click="clearFilters"
      class="w-full mt-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
    >
      Clear All Filters
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(['filter-change'])

const props = defineProps({
  totalCount: {
    type: Number,
    default: 0
  }
})

const selectedCategory = ref('all')
const selectedTags = ref([])

// Category data
const categories = ref([
  { key: 'writing', name: 'Writing Assistant', icon: '✍️', count: 25 },
  { key: 'coding', name: 'Programming & Development', icon: '💻', count: 32 },
  { key: 'marketing', name: 'Marketing & Copywriting', icon: '📢', count: 18 },
  { key: 'learning', name: 'Learning Assistant', icon: '📚', count: 22 },
  { key: 'translation', name: 'Translation & Editing', icon: '🌐', count: 15 },
  { key: 'design', name: 'Creative Design', icon: '🎨', count: 12 },
  { key: 'analysis', name: 'Data Analysis', icon: '📊', count: 14 },
  { key: 'business', name: 'Business & Office', icon: '💼', count: 19 }
])

// Popular tags
const popularTags = [
  'ChatGPT', 'Claude', 'Gemini', 'Chinese Optimized', 
  'Professional', 'Creative', 'Efficient', 'Practical'
]

const selectCategory = (category) => {
  selectedCategory.value = category
  emitFilterChange()
}

const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
  emitFilterChange()
}

const clearFilters = () => {
  selectedCategory.value = 'all'
  selectedTags.value = []
  emitFilterChange()
}

const emitFilterChange = () => {
  emit('filter-change', {
    category: selectedCategory.value,
    tags: selectedTags.value
  })
}

// Listen for external reset
defineExpose({
  clearFilters
})
</script>