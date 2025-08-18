<template>
  <footer class="bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <!-- 网站信息 -->
        <div class="lg:col-span-2">
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span class="text-white font-bold text-lg">AI</span>
            </div>
            <div>
              <h3 class="text-2xl font-bold">AI提示词导航</h3>
              <p class="text-blue-300 text-sm">AI Prompts Collection</p>
            </div>
          </div>
          <p class="text-gray-300 mb-8 leading-relaxed max-w-md">
            收集最全面的AI提示词，帮助你更好地使用ChatGPT、Claude、Gemini等AI工具。
            涵盖写作、编程、营销、学习等各个领域。
          </p>
          <div class="flex space-x-4">
            <a href="#" class="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200 group">
              <span class="sr-only">GitHub</span>
              <svg class="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="#" class="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200 group">
              <span class="sr-only">Twitter</span>
              <svg class="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <!-- 快速链接 -->
        <div>
          <h4 class="text-lg font-semibold mb-6 text-white">快速导航</h4>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/" class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 group">
                <span class="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                <span>首页</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/prompts/writing" class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 group">
                <span class="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                <span>写作提示词</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/prompts/coding" class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 group">
                <span class="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                <span>编程提示词</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/prompts/marketing" class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 group">
                <span class="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                <span>营销提示词</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/prompts/learning" class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 group">
                <span class="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                <span>学习提示词</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
        
        <!-- AI工具 -->
        <div>
          <h4 class="text-lg font-semibold mb-6 text-white">支持的AI工具</h4>
          <ul class="space-y-3">
            <li class="flex items-center space-x-2 text-gray-300">
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>ChatGPT</span>
            </li>
            <li class="flex items-center space-x-2 text-gray-300">
              <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Claude</span>
            </li>
            <li class="flex items-center space-x-2 text-gray-300">
              <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Gemini</span>
            </li>
            <li class="flex items-center space-x-2 text-gray-300">
              <div class="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>文心一言</span>
            </li>
            <li class="flex items-center space-x-2 text-gray-300">
              <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>通义千问</span>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- 版权信息 -->
      <div class="border-t border-gray-700 mt-12 pt-8 text-center">
        <p class="text-gray-400">&copy; 2024 AI提示词导航. PFinalClub 保留所有权利.</p>
        <p class="text-gray-500 text-sm mt-2">Made with ❤️ for AI enthusiasts</p>
      </div>
    </div>
  </footer>
</template>