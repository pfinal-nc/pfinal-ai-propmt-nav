<template>
  <header class="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo和标题 -->
        <div class="flex items-center space-x-4">
          <NuxtLink to="/" class="flex items-center space-x-3 group">
            <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span class="text-white font-bold text-lg">AI</span>
            </div>
            <div>
              <h1 class="text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">提示词导航</h1>
              <p class="text-xs text-gray-500 hidden sm:block">AI Prompts Collection</p>
            </div>
          </NuxtLink>
        </div>
        
        <!-- 导航菜单 -->
        <nav class="hidden lg:flex items-center space-x-8">
          <NuxtLink 
            to="/" 
            class="relative text-gray-600 hover:text-indigo-600 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-indigo-50"
            active-class="text-indigo-600 bg-indigo-50"
          >
            首页
          </NuxtLink>
          <NuxtLink 
            to="/prompts/writing" 
            class="relative text-gray-600 hover:text-indigo-600 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-indigo-50"
            :class="{ 'text-indigo-600 bg-indigo-50': $route.path.startsWith('/prompts/writing') }"
          >
            写作
          </NuxtLink>
          <NuxtLink 
            to="/prompts/coding" 
            class="relative text-gray-600 hover:text-indigo-600 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-indigo-50"
            :class="{ 'text-indigo-600 bg-indigo-50': $route.path.startsWith('/prompts/coding') }"
          >
            编程
          </NuxtLink>
          <NuxtLink 
            to="/prompts/marketing" 
            class="relative text-gray-600 hover:text-indigo-600 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-indigo-50"
            :class="{ 'text-indigo-600 bg-indigo-50': $route.path.startsWith('/prompts/marketing') }"
          >
            营销
          </NuxtLink>
          <NuxtLink 
            to="/prompts/learning" 
            class="relative text-gray-600 hover:text-indigo-600 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-indigo-50"
            :class="{ 'text-indigo-600 bg-indigo-50': $route.path.startsWith('/prompts/learning') }"
          >
            学习
          </NuxtLink>
          <NuxtLink 
            to="/prompts/life" 
            class="relative text-gray-600 hover:text-indigo-600 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-indigo-50"
            :class="{ 'text-indigo-600 bg-indigo-50': $route.path.startsWith('/prompts/life') }"
          >
            生活
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="relative text-gray-600 hover:text-indigo-600 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-indigo-50"
            :class="{ 'text-indigo-600 bg-indigo-50': $route.path.startsWith('/about') }"
          >
            关于
          </NuxtLink>
        </nav>

        <!-- 搜索按钮 (桌面端) -->
        <!-- <div class="hidden lg:flex items-center space-x-4">
          <button class="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </div> -->
        
        <!-- 移动端菜单按钮 -->
        <button 
          @click="toggleMobileMenu"
          class="lg:hidden p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
          :aria-expanded="showMobileMenu"
          aria-label="切换菜单"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <!-- 移动端菜单 -->
      <div 
        v-show="showMobileMenu" 
        class="lg:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-sm"
        :class="{ 'animate-slideDown': showMobileMenu }"
      >
        <nav class="flex flex-col space-y-1">
          <NuxtLink 
            to="/" 
            class="px-4 py-3 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors font-medium"
            active-class="text-indigo-600 bg-indigo-50"
            @click="showMobileMenu = false"
          >
            首页
          </NuxtLink>
          <NuxtLink 
            to="/prompts/writing" 
            class="px-4 py-3 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors font-medium"
            :class="{ 'text-indigo-600 bg-indigo-50': $route.path.startsWith('/prompts/writing') }"
            @click="showMobileMenu = false"
          >
            写作
          </NuxtLink>
          <NuxtLink 
            to="/prompts/coding" 
            class="px-4 py-3 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors font-medium"
            :class="{ 'text-indigo-600 bg-indigo-50': $route.path.startsWith('/prompts/coding') }"
            @click="showMobileMenu = false"
          >
            编程
          </NuxtLink>
          <NuxtLink 
            to="/prompts/marketing" 
            class="px-4 py-3 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors font-medium"
            :class="{ 'text-indigo-600 bg-indigo-50': $route.path.startsWith('/prompts/marketing') }"
            @click="showMobileMenu = false"
          >
            营销
          </NuxtLink>
          <NuxtLink 
            to="/prompts/learning" 
            class="px-4 py-3 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors font-medium"
            :class="{ 'text-indigo-600 bg-indigo-50': $route.path.startsWith('/prompts/learning') }"
            @click="showMobileMenu = false"
          >
            学习
          </NuxtLink>
          <NuxtLink 
            to="/prompts/life" 
            class="px-4 py-3 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors font-medium"
            :class="{ 'text-indigo-600 bg-indigo-50': $route.path.startsWith('/prompts/life') }"
            @click="showMobileMenu = false"
          >
            生活
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="px-4 py-3 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors font-medium"
            :class="{ 'text-indigo-600 bg-indigo-50': $route.path.startsWith('/about') }"
            @click="showMobileMenu = false"
          >
            关于
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
const showMobileMenu = ref(false)

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

// 点击外部关闭移动端菜单
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('header')) {
      showMobileMenu.value = false
    }
  })
})
</script>

<style scoped>
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slideDown {
  animation: slideDown 0.2s ease-out;
}
</style>