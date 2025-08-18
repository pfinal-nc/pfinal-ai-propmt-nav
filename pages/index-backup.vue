<template>
  <div>
    <!-- 页面头部 -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        AI提示词导航站
      </h1>
      <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
        收集最全面的AI提示词，帮助你更好地使用ChatGPT、Claude、Gemini等AI工具。
        涵盖写作、编程、营销、学习等各个领域。
      </p>
    </div>
    
    <!-- 简单的提示词列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="prompt in simplePrompts"
        :key="prompt.id"
        class="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          {{ prompt.name }}
        </h3>
        <p class="text-gray-600 text-sm mb-4">
          {{ prompt.description }}
        </p>
        <div class="flex items-center justify-between">
          <span class="px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded">
            {{ prompt.category }}
          </span>
          <button class="px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700">
            查看详情
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 页面元数据
useHead({
  title: 'AI提示词导航站 - 最全的AI Prompts集合'
})

// 简单的提示词数据
const simplePrompts = ref([
  {
    id: 1,
    name: 'Python函数生成器',
    category: '编程开发',
    description: '帮助生成完整的Python函数，包含类型注解、文档字符串和错误处理'
  },
  {
    id: 2,
    name: '营销文案创作助手',
    category: '营销文案',
    description: '专业的营销文案创作工具，适用于各种营销场景'
  },
  {
    id: 3,
    name: '学术论文写作指导',
    category: '写作助手',
    description: '帮助撰写高质量的学术论文，包含结构建议和写作技巧'
  }
])
</script>