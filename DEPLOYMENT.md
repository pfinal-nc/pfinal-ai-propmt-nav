# 部署说明

## 项目信息

- **项目名称**: AI提示词导航站
- **自定义域名**: https://pnav.friday-go.icu
- **部署平台**: GitHub Pages
- **构建工具**: Nuxt 3 + pnpm

## 自动部署

### GitHub Actions 工作流

项目配置了两个自动部署工作流：

1. **完整版**: `.github/workflows/deploy.yml` - 包含代码检查和类型检查
2. **简化版**: `.github/workflows/deploy-simple.yml` - 专注于核心构建和部署功能

如果遇到依赖或检查问题，建议使用简化版工作流。

#### 触发条件

- 推送到 `main` 或 `master` 分支
- 创建 Pull Request 到 `main` 或 `master` 分支
- 手动触发 (workflow_dispatch)

#### 部署流程

1. **代码检出**: 获取完整代码历史
2. **环境设置**: 配置 Node.js 20 和 pnpm
3. **依赖安装**: 使用 `--frozen-lockfile` 确保版本一致
4. **代码检查**: 运行 lint 和 typecheck (可选失败)
5. **构建**: 生产环境构建
6. **静态生成**: 生成静态站点
7. **文件复制**: 复制 CNAME 和 robots.txt
8. **站点地图**: 生成 sitemap.xml
9. **部署**: 上传到 GitHub Pages

## 手动部署

### 本地构建

```bash
# 安装依赖
pnpm install

# 构建项目
pnpm run build

# 生成静态文件
pnpm run generate
```

### 部署到 GitHub Pages

```bash
# 使用 gh-pages 部署
pnpm run deploy:gh
```

## 环境变量

部署时使用的环境变量：

- `NODE_ENV`: production
- `NUXT_PUBLIC_SITE_URL`: https://pnav.friday-go.icu

## 文件结构

```
.output/public/
├── CNAME                    # 自定义域名配置
├── robots.txt              # 搜索引擎爬虫规则
├── sitemap.xml             # 站点地图
└── ...                     # 其他静态文件
```

## 域名配置

### CNAME 文件

项目根目录包含 `CNAME` 文件，内容为：
```
pnav.friday-go.icu
```

### DNS 配置

确保域名 `pnav.friday-go.icu` 的 DNS 记录指向 GitHub Pages：

```
Type: CNAME
Name: pnav
Value: [username].github.io
```

## SEO 优化

### 站点地图

自动生成的 `sitemap.xml` 包含：
- 首页 (优先级: 1.0)
- 提示词列表页 (优先级: 0.8)

### Robots.txt

配置了搜索引擎爬虫规则：
- 允许爬取所有公开页面
- 禁止爬取管理页面
- 设置爬取延迟

## 故障排除

### 常见问题

1. **构建失败**
   - 检查 Node.js 版本 (需要 20+)
   - 确认 pnpm-lock.yaml 文件存在
   - 查看构建日志
   - 尝试使用简化版工作流

2. **依赖安装失败**
   - 错误: `Cannot install with "frozen-lockfile" because pnpm-lock.yaml is absent`
   - 解决: 使用简化版工作流或手动运行 `pnpm install --no-frozen-lockfile`

3. **域名无法访问**
   - 确认 CNAME 文件正确
   - 检查 DNS 配置
   - 等待 DNS 传播 (最多 24 小时)

4. **内容不更新**
   - 确认推送到正确分支
   - 检查 GitHub Actions 状态
   - 清除浏览器缓存

5. **代码检查失败**
   - 如果 eslint 或 typecheck 失败，使用简化版工作流
   - 或者暂时禁用相关检查步骤

### 日志查看

在 GitHub 仓库的 Actions 标签页查看部署日志：
https://github.com/[username]/[repo]/actions

## 性能优化

- 使用 pnpm 缓存加速构建
- 静态站点生成 (SSG)
- 图片和资源优化
- CDN 分发 (GitHub Pages)

## 安全考虑

- 使用 `--frozen-lockfile` 确保依赖版本一致
- 配置适当的 GitHub Actions 权限
- 不暴露敏感信息到客户端
