# 🚀 部署指南

本文档说明如何配置和使用 GitHub Actions 自动部署游戏。

## 📋 目录

- [快速开始](#快速开始)
- [GitHub Actions 配置](#github-actions-配置)
- [Netlify 配置](#netlify-配置)
- [环境变量设置](#环境变量设置)
- [部署流程](#部署流程)
- [多游戏支持](#多游戏支持)
- [故障排除](#故障排除)

## 快速开始

### 1. 连接 GitHub 仓库到 Netlify

1. 访问 [Netlify](https://netlify.com)
2. 点击 "New site from Git"
3. 选择 GitHub 并授权
4. 选择 `Rodert/shiyu-games` 仓库
5. 配置构建设置：
   - **Build command**: `npm run build --prefix snake-game`
   - **Publish directory**: `snake-game/dist`
6. 点击 "Deploy site"

### 2. 获取 Netlify 凭证

1. 在 Netlify 中，进入 **Site settings** → **Build & deploy** → **Environment**
2. 记下 **Site ID**
3. 在 **User settings** → **Applications** → **Personal access tokens** 中创建新 token
4. 复制 token

### 3. 配置 GitHub Secrets

1. 进入 GitHub 仓库 → **Settings** → **Secrets and variables** → **Actions**
2. 点击 "New repository secret"
3. 添加以下 secrets：

| Secret 名称 | 值 |
|------------|-----|
| `NETLIFY_AUTH_TOKEN` | 从 Netlify 获取的 token |
| `NETLIFY_SITE_ID` | 你的 Netlify Site ID |

## GitHub Actions 配置

### 工作流文件

位置: `.github/workflows/deploy.yml`

### 工作流说明

```yaml
name: 🚀 Deploy Games
```

这个工作流在以下情况触发：
- 推送到 `main` 或 `master` 分支
- 创建 Pull Request 到 `main` 或 `master` 分支

### 工作流步骤

1. **Checkout code** - 检出代码
2. **Setup Node.js** - 安装 Node.js 18.x
3. **Install dependencies** - 安装依赖
4. **Run linter** - 运行代码检查（可选）
5. **Run tests** - 运行测试（可选）
6. **Build project** - 构建项目
7. **Upload artifacts** - 上传构建产物
8. **Deploy to Netlify** - 部署到 Netlify（仅在 main 分支）
9. **Create deployment summary** - 创建部署总结

## Netlify 配置

### netlify.toml 说明

```toml
[build]
  command = "npm run build --prefix snake-game"
  publish = "snake-game/dist"
```

- **command**: 构建命令
- **publish**: 发布目录

### 重定向规则

```toml
[[redirects]]
  from = "/snake-game/*"
  to = "/snake-game/index.html"
  status = 200
```

这确保 SPA 路由正常工作。

### 缓存设置

```toml
[[headers]]
  for = "/snake-game/dist/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

静态资源使用长期缓存。

## 环境变量设置

### GitHub Secrets

在 GitHub 仓库中设置以下 secrets：

```
NETLIFY_AUTH_TOKEN=your_netlify_token
NETLIFY_SITE_ID=your_site_id
```

### 本地开发

创建 `.env.local` 文件（不要提交到 Git）：

```env
NETLIFY_AUTH_TOKEN=your_netlify_token
NETLIFY_SITE_ID=your_site_id
```

## 部署流程

### 自动部署流程

```
1. 推送代码到 main 分支
   ↓
2. GitHub Actions 触发工作流
   ↓
3. 检出代码
   ↓
4. 安装依赖
   ↓
5. 构建项目
   ↓
6. 上传构建产物
   ↓
7. 部署到 Netlify
   ↓
8. 生成部署总结
   ↓
9. 部署完成！
```

### 查看部署状态

1. 进入 GitHub 仓库
2. 点击 **Actions** 标签
3. 查看最新的工作流运行
4. 点击工作流查看详细日志

### 查看部署结果

1. 进入 Netlify 仪表板
2. 查看最新的部署
3. 点击 "Preview" 预览网站
4. 点击 "Visit site" 访问生产网站

## 多游戏支持

### 添加新游戏

当添加新游戏时，按照以下步骤：

#### 1. 创建游戏目录

```bash
mkdir new-game
cd new-game
npm init -y
```

#### 2. 更新 GitHub Actions

编辑 `.github/workflows/deploy.yml`：

```yaml
strategy:
  matrix:
    game: [snake-game, new-game]  # 添加新游戏
```

#### 3. 更新 netlify.toml

添加新游戏的重定向规则：

```toml
[[redirects]]
  from = "/new-game/*"
  to = "/new-game/index.html"
  status = 200
```

#### 4. 更新主页

编辑 `index.html`，添加新游戏卡片：

```html
<div class="game-card">
    <div class="game-icon">🎮</div>
    <div class="game-name">新游戏</div>
    <p class="game-description">游戏描述</p>
    <a href="/new-game/" class="game-link">🎮 开始游戏</a>
</div>
```

#### 5. 推送代码

```bash
git add .
git commit -m "feat: add new-game"
git push origin main
```

## 故障排除

### 部署失败

#### 问题：构建失败

**解决方案**：
1. 检查 GitHub Actions 日志
2. 查看具体错误信息
3. 在本地运行 `npm run build` 测试
4. 修复问题并重新推送

#### 问题：部署到 Netlify 失败

**解决方案**：
1. 检查 `NETLIFY_AUTH_TOKEN` 是否正确
2. 检查 `NETLIFY_SITE_ID` 是否正确
3. 确保 token 没有过期
4. 在 Netlify 中重新生成 token

#### 问题：网站访问 404

**解决方案**：
1. 检查 `netlify.toml` 中的重定向规则
2. 检查发布目录是否正确
3. 清除浏览器缓存
4. 检查 Netlify 部署日志

### 查看日志

#### GitHub Actions 日志

1. 进入 GitHub 仓库 → **Actions**
2. 选择工作流运行
3. 点击工作流步骤查看日志

#### Netlify 部署日志

1. 进入 Netlify 仪表板
2. 选择部署
3. 点击 "Deploy log" 查看构建日志

## 常见问题

### Q: 部署需要多长时间？
**A**: 通常 2-5 分钟，取决于构建时间和网络速度。

### Q: 可以手动触发部署吗？
**A**: 可以。在 GitHub Actions 中点击 "Run workflow" 按钮。

### Q: 如何回滚部署？
**A**: 在 Netlify 中选择之前的部署并点击 "Restore"。

### Q: 支持多个分支部署吗？
**A**: 支持。可以在 `netlify.toml` 中配置不同分支的构建命令。

### Q: 如何预览 Pull Request 的部署？
**A**: Netlify 会自动为每个 PR 创建预览部署。

## 最佳实践

### 1. 使用有意义的提交信息

```bash
git commit -m "feat: add new feature"
git commit -m "fix: resolve deployment issue"
git commit -m "docs: update README"
```

### 2. 在本地测试

```bash
npm run build --prefix snake-game
npm run preview --prefix snake-game
```

### 3. 定期更新依赖

```bash
npm update --prefix snake-game
```

### 4. 监控部署状态

定期检查 GitHub Actions 和 Netlify 的部署状态。

### 5. 保持 secrets 安全

- 不要在代码中硬编码 secrets
- 定期轮换 tokens
- 限制 token 权限

## 相关链接

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Netlify 文档](https://docs.netlify.com)
- [Netlify CLI](https://docs.netlify.com/cli/get-started/)
- [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

## 获取帮助

- 📖 查看 [README.md](./README.md)
- 🐛 报告问题：[GitHub Issues](https://github.com/Rodert/shiyu-games/issues)
- 💬 讨论：[GitHub Discussions](https://github.com/Rodert/shiyu-games/discussions)

---

**最后更新**: 2024-11-21

**版本**: 1.0.0
