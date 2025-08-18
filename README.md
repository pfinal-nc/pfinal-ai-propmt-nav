# AI 提示词导航站

收集最全面的AI提示词，帮助你更好地使用ChatGPT、Claude、Gemini等AI工具。
涵盖写作、编程、营销、学习等各个领域。

## 功能特性

- ✅ 纯静态站点（SEO友好 + 免费托管）
- ✅ 分类清晰（导航风格）
- ✅ 可复制按钮（前端JS实现）
- ✅ 支持搜索（客户端搜索，Fuse.js）
- ✅ 响应式设计（移动端友好）

## 技术栈

- **框架**: Nuxt.js 4 (SSR/SSG)
- **UI**: TailwindCSS
- **搜索**: Fuse.js
- **内容管理**: Markdown + YAML FrontMatter
- **部署**: GitHub Pages / Netlify / Vercel

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建静态站点
npm run generate

# 预览构建结果
npm run preview
```

## 项目结构

```
ai-prompts-nav/
├── assets/                  # 静态资源文件
│   ├── css/                 # 样式文件
│   └── icons/               # 图标文件
├── components/              # Vue组件
├── content/                 # Markdown格式的提示词内容
│   ├── writing/
│   ├── coding/
│   ├── marketing/
│   ├── learning/
│   └── life/
├── layouts/                 # 页面布局
├── pages/                   # 页面路由
├── utils/                   # 工具函数和可复用逻辑
├── server/                  # 服务端代码
└── ...
```

## 内容格式

提示词使用Markdown + YAML FrontMatter格式：

```markdown
---
title: "写一封求职信"
category: "writing"
tags: ["job", "resume", "email"]
description: "适合申请科技公司岗位"
---

请帮我写一封专业的求职信，职位是前端开发工程师，强调团队合作与快速学习能力。
```

## 部署

### GitHub Pages

```bash
npm run deploy
```

### Netlify / Vercel

直接连接Git仓库，设置构建命令为`npm run generate`，输出目录为`dist`。

## 贡献

欢迎提交PR来添加更多提示词或改进功能！