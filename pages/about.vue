<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面头部 -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">关于 AI 提示词导航站</h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            我们致力于收集和整理全球最优质的AI提示词，为开发者、设计师、创作者和所有对AI感兴趣的用户提供便捷的提示词发现平台。
          </p>
        </div>
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <!-- 左侧内容 -->
        <div class="space-y-8">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">我们的使命</h2>
            <p class="text-gray-600 leading-relaxed">
              无论是ChatGPT、Claude、Gemini等AI对话工具，还是Midjourney、Stable Diffusion等AI绘画工具，我们都会持续更新最实用的提示词模板，确保您能找到最适合的AI工具使用技巧。
            </p>
          </div>

          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">涵盖领域</h2>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span class="text-gray-600">AI 对话</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                <span class="text-gray-600">AI 绘画</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span class="text-gray-600">AI 编程</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span class="text-gray-600">AI 写作</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                <span class="text-gray-600">AI 营销</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span class="text-gray-600">AI 学习</span>
              </div>
            </div>
          </div>

          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">我们的特色</h2>
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">精选优质提示词</h3>
                  <p class="text-gray-600 text-sm">严格筛选高质量的AI提示词模板，确保实用性和有效性</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">持续更新维护</h3>
                  <p class="text-gray-600 text-sm">定期更新最新的AI工具和提示词，紧跟AI技术发展</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">完全免费使用</h3>
                  <p class="text-gray-600 text-sm">所有提示词模板完全免费，无需注册即可使用</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">便捷搜索功能</h3>
                  <p class="text-gray-600 text-sm">强大的搜索和分类功能，快速找到您需要的提示词</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧统计 -->
        <div class="space-y-8">
          <div class="bg-white rounded-lg shadow-sm p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">网站统计</h2>
            <div class="grid grid-cols-2 gap-6">
              <div class="text-center">
                <div class="text-3xl font-bold text-blue-600 mb-2">100+</div>
                <div class="text-gray-600">提示词数量</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-green-600 mb-2">6</div>
                <div class="text-gray-600">主要分类</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-purple-600 mb-2">10+</div>
                <div class="text-gray-600">AI 工具</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-orange-600 mb-2">100%</div>
                <div class="text-gray-600">免费使用</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">支持的工具</h2>
            <div class="space-y-4">
                             <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                 <div class="flex items-center space-x-3">
                   <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                     <span class="text-green-600 font-semibold text-sm">C</span>
                   </div>
                   <span class="font-medium text-gray-900">ChatGPT</span>
                 </div>
                 <span class="text-sm text-gray-600">OpenAI</span>
               </div>
               <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                 <div class="flex items-center space-x-3">
                   <div class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                     <span class="text-orange-600 font-semibold text-sm">C</span>
                   </div>
                   <span class="font-medium text-gray-900">Claude</span>
                 </div>
                 <span class="text-sm text-gray-600">Anthropic</span>
               </div>
               <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                 <div class="flex items-center space-x-3">
                   <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                     <span class="text-blue-600 font-semibold text-sm">G</span>
                   </div>
                   <span class="font-medium text-gray-900">Gemini</span>
                 </div>
                 <span class="text-sm text-gray-600">Google</span>
               </div>
               <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                 <div class="flex items-center space-x-3">
                   <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                     <span class="text-purple-600 font-semibold text-sm">M</span>
                   </div>
                   <span class="font-medium text-gray-900">Midjourney</span>
                 </div>
                 <span class="text-sm text-gray-600">Midjourney</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部信息 -->
      <div class="mt-16 text-center">
        <div class="bg-white rounded-lg shadow-sm p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">联系我们</h2>
          <p class="text-gray-600 mb-6">
            如果您有任何建议、反馈或合作意向，欢迎联系我们
          </p>
          <div class="flex justify-center space-x-6">
            <a href="https://github.com/pfinalclub" class="text-gray-600 hover:text-gray-900 transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="mailto:contact@friday-go.icu" class="text-gray-600 hover:text-gray-900 transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 页面元数据
useHead({
  title: '关于我们 - AI提示词导航站 | 精选AI工具提示词集合',
  meta: [
    { name: 'description', content: '了解AI提示词导航站的使命和特色，我们致力于收集和整理全球最优质的AI提示词，为开发者、设计师、创作者提供便捷的提示词发现平台。' },
    { name: 'keywords', content: 'AI提示词导航站,关于我们,AI工具,提示词模板,ChatGPT,Claude,Gemini,AI助手' },
    { property: 'og:title', content: '关于我们 - AI提示词导航站' },
    { property: 'og:description', content: '了解AI提示词导航站的使命和特色，我们致力于收集和整理全球最优质的AI提示词。' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '关于我们 - AI提示词导航站' },
    { name: 'twitter:description', content: '了解AI提示词导航站的使命和特色，我们致力于收集和整理全球最优质的AI提示词。' }
  ],
  link: [
    { rel: 'canonical', href: 'https://pnav.friday-go.icu/about' }
  ]
})
</script>
