<template>
  <div class="relative max-w-2xl mx-auto">
    <div class="relative">
      <input
        v-model="searchQuery"
        @input="handleSearch"
        type="text"
        placeholder="Search prompts..."
        class="w-full px-4 py-3 pl-12 pr-4 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      >
      <div class="absolute inset-y-0 left-0 flex items-center pl-4">
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['search'])
const searchQuery = ref('')

const handleSearch = () => {
  const query = searchQuery.value.trim()
  emit('search', query)
}
</script>