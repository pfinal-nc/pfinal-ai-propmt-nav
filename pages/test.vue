<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Prompt 对象结构测试</h1>
    
    <div v-if="prompts && prompts.length > 0" class="space-y-6">
      <div v-for="prompt in prompts.slice(0, 3)" :key="prompt._id" class="bg-white p-6 rounded-lg shadow border">
        <h2 class="text-lg font-semibold mb-4">{{ prompt.title }}</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 class="font-medium text-gray-700 mb-2">基本信息</h3>
            <ul class="space-y-1 text-gray-600">
              <li><strong>_id:</strong> {{ prompt._id }}</li>
              <li><strong>_path:</strong> {{ prompt._path }}</li>
              <li><strong>_file:</strong> {{ prompt._file }}</li>
              <li><strong>category:</strong> {{ prompt.category }}</li>
              <li><strong>title:</strong> {{ prompt.title }}</li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-medium text-gray-700 mb-2">路由测试</h3>
            <ul class="space-y-1 text-gray-600">
              <li><strong>当前路径:</strong> {{ prompt._path }}</li>
              <li><strong>文件名:</strong> {{ prompt._file }}</li>
              <li><strong>slug (从_path):</strong> {{ prompt._path.split('/').pop() }}</li>
              <li><strong>slug (从_file):</strong> {{ prompt._file.split('/').pop().replace('.md', '') }}</li>
            </ul>
          </div>
        </div>
        
        <div class="mt-4 pt-4 border-t">
          <h3 class="font-medium text-gray-700 mb-2">测试链接</h3>
          <div class="space-y-2">
            <NuxtLink 
              :to="`/prompts/${prompt.category}/${prompt._path.split('/').pop()}`"
              class="block px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            >
              路径1: /prompts/{{ prompt.category }}/{{ prompt._path.split('/').pop() }}
            </NuxtLink>
            
            <NuxtLink 
              :to="`/prompts/${prompt.category}/${prompt._file.split('/').pop().replace('.md', '')}`"
              class="block px-3 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200"
            >
              路径2: /prompts/{{ prompt.category }}/{{ prompt._file.split('/').pop().replace('.md', '') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="text-gray-500">
      加载中...
    </div>
  </div>
</template>

<script setup>
import { usePrompts } from '~/utils/usePrompts'

const prompts = await usePrompts()
</script>