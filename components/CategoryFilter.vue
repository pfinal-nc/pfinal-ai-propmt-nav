<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">筛选分类</h3>
    
    <!-- 全部分类按钮 -->
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
        <span>全部分类</span>
        <span class="text-sm text-gray-500">{{ totalCount }}</span>
      </div>
    </button>
    
    <!-- 分类列表 -->
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
    
    <!-- 标签筛选 -->
    <div class="mt-6 pt-6 border-t border-gray-200">
      <h4 class="text-md font-medium text-gray-900 mb-3">热门标签</h4>
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
    
    <!-- 清除筛选 -->
    <button
      v-if="selectedCategory !== 'all' || selectedTags.length > 0"
      @click="clearFilters"
      class="w-full mt-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
    >
      清除所有筛选
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

// 分类数据
const categories = ref([
  { key: 'writing', name: '写作助手', icon: '✍️', count: 25 },
  { key: 'coding', name: '编程开发', icon: '💻', count: 32 },
  { key: 'marketing', name: '营销文案', icon: '📢', count: 18 },
  { key: 'learning', name: '学习辅助', icon: '📚', count: 22 },
  { key: 'translation', name: '翻译润色', icon: '🌐', count: 15 },
  { key: 'design', name: '创意设计', icon: '🎨', count: 12 },
  { key: 'analysis', name: '数据分析', icon: '📊', count: 14 },
  { key: 'business', name: '商务办公', icon: '💼', count: 19 }
])

// 热门标签
const popularTags = [
  'ChatGPT', 'Claude', 'Gemini', '中文优化', 
  '专业级', '创意', '高效', '实用'
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

// 监听外部重置
defineExpose({
  clearFilters
})
</script>