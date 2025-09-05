<template>

  
  <div class="space-y-16 lg:space-y-24">
    <!-- Hero Section -->
    <section class="text-center py-12 lg:py-20">
      <div class="max-w-4xl mx-auto">
        <div class="mb-8">
          <h1 class="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            AI Prompts
            <span class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Navigation
            </span>
          </h1>
          <p class="text-lg lg:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover the most comprehensive collection of AI prompts to help you better utilize ChatGPT, Claude, Gemini and other AI tools.
            Covering writing, programming, marketing, learning and various other fields.
          </p>
        </div>
        
        <!-- Search Box -->
        <div class="max-w-3xl mx-auto mb-8">
          <div class="bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-8 shadow-soft">
            <SearchBar @search="handleSearch" />
          </div>
        </div>
        
        <!-- Statistics -->
        <div class="flex justify-center items-center space-x-8 text-sm text-gray-500">
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>1000+ Curated Prompts</span>
          </div>
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>5+ Main Categories</span>
          </div>
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Regular Updates</span>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Category Navigation -->
    <section class="py-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Explore Categories
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Browse by field categories to quickly find the AI prompts you need
        </p>
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
        <NuxtLink 
          v-for="category in categories" 
          :key="category.key"
          :to="`/prompts/${category.key}`"
          class="group bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8 text-center hover:shadow-lg hover:border-indigo-200 transition-all duration-300 transform hover:-translate-y-1"
        >
          <div class="text-3xl lg:text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
            {{ getCategoryIcon(category.key) }}
          </div>
          <h3 class="font-semibold text-gray-900 text-lg mb-2 group-hover:text-indigo-600 transition-colors">
            {{ category.name }}
          </h3>
          <p class="text-sm text-gray-500 mb-3">{{ category.count }} prompts</p>
          <div class="w-8 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </NuxtLink>
      </div>
    </section>
    
    <!-- Featured Prompts -->
    <section v-if="prompts && prompts.length > 0" class="py-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Featured Prompts
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Most popular and practical AI prompt recommendations
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PromptCard 
          v-for="prompt in prompts.slice(0, 6)" 
          :key="prompt.slug" 
          :prompt="prompt" 
        />
      </div>
      
      <!-- View More Button -->
      <div class="text-center mt-12 text-white">
        <NuxtLink 
          to="/prompts"
          class="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <span class="text-white">View More Prompts</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </NuxtLink>
      </div>
    </section>
    
    <!-- Features -->
    <section class="py-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Why Choose Us
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Professional AI prompt collection platform to enhance your AI experience
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center hover:shadow-lg transition-shadow duration-300">
          <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Curated Content</h3>
          <p class="text-gray-600">Carefully selected and tested high-quality prompts to ensure practicality and effectiveness</p>
        </div>
        
        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center hover:shadow-lg transition-shadow duration-300">
          <div class="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Clear Categories</h3>
          <p class="text-gray-600">Organized by field and purpose to quickly find prompts that suit your needs</p>
        </div>
        
        <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center hover:shadow-lg transition-shadow duration-300">
          <div class="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Regular Updates</h3>
          <p class="text-gray-600">Regularly updated with the latest and most popular AI prompts to keep up with AI technology development</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { usePrompts, useCategories } from '~/utils/usePrompts'
import { getCategoryIcon } from '~/utils/categories'

// Page metadata
useHead({
  title: 'AI Prompts Navigation - Complete AI Prompts Collection | ChatGPT, Claude, Gemini Prompts',
  meta: [
    { name: 'description', content: 'Discover the most comprehensive collection of AI prompts to help you better utilize ChatGPT, Claude, Gemini and other AI tools. Covering writing, programming, marketing, learning and various fields to improve work efficiency.' },
    { name: 'keywords', content: 'AI prompts,ChatGPT prompts,Claude prompts,Gemini prompts,AI tools,prompt templates,writing assistant,programming assistant,marketing tools,learning assistant,prompts,pfinalclub' },
    { property: 'og:title', content: 'AI Prompts Navigation - Complete AI Prompts Collection' },
    { property: 'og:description', content: 'Discover the most comprehensive collection of AI prompts to help you better utilize ChatGPT, Claude, Gemini and other AI tools. Covering writing, programming, marketing, learning and various fields.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'AI Prompts Navigation - Complete AI Prompts Collection' },
    { name: 'twitter:description', content: 'Discover the most comprehensive collection of AI prompts to help you better utilize ChatGPT, Claude, Gemini and other AI tools.' },
    { name: 'twitter:image', content: 'https://pnav.friday-go.icu/logo.png' }
  ],
  link: [
    { rel: 'canonical', href: 'https://pnav.friday-go.icu' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'AI Prompts Navigation',
        description: 'Discover the most comprehensive collection of AI prompts, including writing, programming, marketing, and learning prompts for ChatGPT, Claude, Gemini and other AI tools',
        url: 'https://pnav.friday-go.icu',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://pnav.friday-go.icu/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      })
    }
  ]
})

// Get prompts and category data
const prompts = await usePrompts()
const categories = await useCategories()

// Search handling
const handleSearch = (query) => {
  // In actual projects, this should navigate to search results page
  console.log('Search:', query)
}
</script>