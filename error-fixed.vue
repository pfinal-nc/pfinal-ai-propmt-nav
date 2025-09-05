<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full text-center">
      <div class="mb-8">
        <h1 class="text-6xl font-bold text-gray-300 mb-4">{{ error.statusCode }}</h1>
        <h2 class="text-2xl font-semibold text-gray-900 mb-2">
          {{ error.statusCode === 404 ? 'Page Not Found' : 'An Error Occurred' }}
        </h2>
        <p class="text-gray-600 mb-8">
          {{ error.statusMessage || 'Sorry, the page you are looking for does not exist or an error occurred.' }}
        </p>
      </div>
      
      <div class="space-y-4">
        <NuxtLink
          to="/"
          class="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Return to Home
        </NuxtLink>
        
        <button
          @click="handleError"
          class="block w-full px-6 py-3 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object
})

const handleError = () => {
  clearError({ redirect: '/' })
}
</script>