<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
    <div class="p-6">
      <!-- Title and Category -->
      <div class="flex items-start justify-between mb-3">
        <h3 class="text-lg font-semibold text-gray-900">
          {{ prompt.name }}
        </h3>
        <span class="ml-2 px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
          {{ prompt.category }}
        </span>
      </div>
      
      <!-- Description -->
      <p class="text-gray-600 text-sm mb-4">
        {{ prompt.description }}
      </p>
      
      <!-- Action Buttons -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4 text-sm text-gray-500">
          <span>{{ prompt.views || 0 }} views</span>
          <span>{{ prompt.likes || 0 }} likes</span>
        </div>
        
        <div class="flex items-center space-x-2">
          <button class="px-3 py-1 text-sm text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded transition-colors">
            Copy
          </button>
          <button class="px-3 py-1 text-sm bg-primary-600 text-white hover:bg-primary-700 rounded transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  prompt: {
    type: Object,
    required: true
  }
})
</script>