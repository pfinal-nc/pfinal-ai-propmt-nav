<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 transform hover:-translate-y-1 group">
    <div class="p-5 lg:p-6">
      <!-- Title and Category -->
      <div class="flex items-start justify-between mb-4">
        <h3 class="text-lg lg:text-xl font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {{ prompt.title }}
        </h3>
        <span class="ml-3 px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full whitespace-nowrap flex-shrink-0">
          {{ getCategoryName(prompt.category) }}
        </span>
      </div>
      
      <!-- Description -->
      <p class="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
        {{ prompt.description }}
      </p>
      
      <!-- Prompt Preview -->
      <div class="bg-gray-50 rounded-xl p-3 mb-4 border border-gray-100">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview</span>
          <div class="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
        <p class="text-sm text-gray-700 line-clamp-2 font-mono leading-relaxed">
          {{ getPromptPreview(prompt.body) }}
        </p>
      </div>
      
      <!-- Parameter Tags -->
      <div v-if="prompt.tags && prompt.tags.length > 0" class="mb-4">
        <div class="flex flex-wrap gap-2">
                      <span
              v-for="tag in prompt.tags.slice(0, 3)"
              :key="tag"
              class="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full font-medium"
            >
              {{ tag }}
            </span>
            <span
              v-if="prompt.tags.length > 3"
              class="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full font-medium"
            >
              +{{ prompt.tags.length - 3 }}
            </span>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4 text-xs text-gray-500">
          <!-- Usage Count -->
          <div class="flex items-center space-x-1">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            <span>{{ prompt.views || 0 }}</span>
          </div>
          
          <!-- Likes Count -->
          <div class="flex items-center space-x-1">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
            <span>{{ prompt.likes || 0 }}</span>
          </div>
        </div>
        
        <div class="flex items-center space-x-2">
          <!-- Copy Button -->
          <button
            @click="copyPrompt"
            class="px-3 py-1.5 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-md transition-all duration-200 font-medium min-w-[50px]"
          >
            Copy
          </button>
          
          <!-- View Details Button -->
          <NuxtLink
            :to="`/prompts/${prompt.category}-${prompt.slug}`"
            class="px-3 py-1.5 text-xs bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white !text-white hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 rounded-md transition-all duration-200 font-medium shadow-sm hover:shadow-md min-w-[70px] text-center"
          >
            Details
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCategoryName } from '~/utils/categories'

const props = defineProps({
  prompt: {
    type: Object,
    required: true
  }
})

const getPromptPreview = (promptBody) => {
  // Ensure promptBody is a string
  if (!promptBody || typeof promptBody !== 'string') {
    return 'No preview content available...'
  }
  
  // Remove parameter placeholders, show plain text preview
  const text = promptBody.replace(/\{[^}]+\}/g, '[Parameter]').substring(0, 100) + '...'
  return text
}

const copyPrompt = async (event) => {
  try {
    // Ensure body is a string
    const bodyText = typeof props.prompt.body === 'string' 
      ? props.prompt.body 
      : JSON.stringify(props.prompt.body)
    
    await navigator.clipboard.writeText(bodyText)
    
    // Show success message
    const button = event.target
    const originalText = button.textContent
    button.textContent = 'Copied!'
    button.classList.add('bg-green-100', 'text-green-700')
    
    setTimeout(() => {
      button.textContent = originalText
      button.classList.remove('bg-green-100', 'text-green-700')
    }, 2000)
    
  } catch (err) {
    console.error('Copy failed:', err)
    // Show error message
    const button = event.target
    const originalText = button.textContent
    button.textContent = 'Copy Failed'
    button.classList.add('bg-red-100', 'text-red-700')
    
    setTimeout(() => {
      button.textContent = originalText
      button.classList.remove('bg-red-100', 'text-red-700')
    }, 2000)
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>