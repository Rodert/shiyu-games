# ⚙️ GitHub Actions + Netlify 快速设置指南

本指南将帮助你快速设置自动部署。

## 📋 前置条件

- ✅ GitHub 账户
- ✅ Netlify 账户
- ✅ 项目已推送到 GitHub

## 🚀 选择部署方案

### 部署选项对比

| 方案 | 成本 | 难度 | 推荐 |
|------|------|------|------|
| **GitHub Pages** | 免费 | ⭐ 最简单 | ✅ 推荐 |
| **Netlify** | 免费 | ⭐⭐ 简单 | ✅ 推荐 |

### 快速选择

- **想要最简单的方案？** → 使用 [GitHub Pages](./GITHUB_PAGES_SETUP.md)（只需 1 步！）
- **想要更多功能？** → 使用 [Netlify](#netlify-部署)（需要配置 secrets）

---

## 🚀 5 分钟快速设置

### 第 1 步：获取 Netlify 凭证（2 分钟）

#### 1.1 获取 Site ID

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录 Netlify
netlify login

# 列出你的网站
netlify sites:list
```

记下 **Site ID**（格式：`xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`）

#### 1.2 获取 Auth Token

1. 访问 [Netlify](https://app.netlify.com)
2. 点击右上角头像 → **User settings**
3. 点击 **Applications** → **Personal access tokens**
4. 点击 **New access token**
5. 输入名称（如 `GitHub Actions`）
6. 点击 **Generate token**
7. 复制 token（只显示一次！）

### 第 2 步：配置 GitHub Secrets（2 分钟）

1. 进入 GitHub 仓库
2. 点击 **Settings** → **Secrets and variables** → **Actions**
3. 点击 **New repository secret**
4. 添加第一个 secret：
   - **Name**: `NETLIFY_AUTH_TOKEN`
   - **Value**: 粘贴从 Netlify 获取的 token
   - 点击 **Add secret**

5. 再次点击 **New repository secret**
6. 添加第二个 secret：
   - **Name**: `NETLIFY_SITE_ID`
   - **Value**: 粘贴你的 Site ID
   - 点击 **Add secret**

### 第 3 步：验证设置（1 分钟）

1. 进入 GitHub 仓库
2. 点击 **Actions** 标签
3. 查看 **Deploy Games** 工作流
4. 如果显示 ✅，说明工作流已就绪

## 🎯 测试部署

### 方法 1：推送代码（自动触发）

```bash
# 修改一个文件
echo "# Test" >> test.txt

# 提交并推送
git add .
git commit -m "test: trigger deployment"
git push origin main
```

### 方法 2：手动触发

1. 进入 GitHub 仓库 → **Actions**
2. 选择 **Deploy Games** 工作流
3. 点击 **Run workflow**
4. 选择 **main** 分支
5. 点击 **Run workflow**

### 查看部署状态

1. 进入 GitHub 仓库 → **Actions**
2. 点击最新的工作流运行
3. 查看各个步骤的状态
4. 部署完成后，访问 Netlify 网站

## 📊 部署流程图

```
推送代码到 main 分支
        ↓
GitHub Actions 触发
        ↓
检出代码
        ↓
安装依赖
        ↓
构建项目
        ↓
上传构建产物
        ↓
部署到 Netlify
        ↓
生成部署总结
        ↓
✅ 部署完成！
```

## 🔍 故障排除

### ❌ 工作流显示失败

**检查步骤**：

1. 点击工作流运行查看日志
2. 查看哪一步失败
3. 根据错误信息修复问题

**常见问题**：

- **构建失败**: 检查 `npm run build` 是否在本地成功
- **依赖安装失败**: 检查 `package.json` 是否正确
- **部署失败**: 检查 Netlify secrets 是否正确

### ❌ 部署到 Netlify 失败

**检查清单**：

- [ ] `NETLIFY_AUTH_TOKEN` 是否正确
- [ ] `NETLIFY_SITE_ID` 是否正确
- [ ] Token 是否过期（需要重新生成）
- [ ] Site ID 是否来自正确的网站

### ❌ 网站访问 404

**检查步骤**：

1. 检查 `netlify.toml` 中的重定向规则
2. 检查发布目录是否正确
3. 清除浏览器缓存
4. 检查 Netlify 部署日志

## 📝 配置文件说明

### .github/workflows/deploy.yml

GitHub Actions 工作流配置文件。

**主要配置**：

```yaml
on:
  push:
    branches: [main, master]  # 在这些分支上触发
  pull_request:
    branches: [main, master]  # PR 时也触发
```

### netlify.toml

Netlify 部署配置文件。

**主要配置**：

```toml
[build]
  command = "npm run build --prefix snake-game"  # 构建命令
  publish = "snake-game/dist"                    # 发布目录
```

## 🎮 添加新游戏

当添加新游戏时：

### 1. 更新 GitHub Actions

编辑 `.github/workflows/deploy.yml`：

```yaml
strategy:
  matrix:
    game: [snake-game, new-game]  # 添加新游戏
```

### 2. 更新 Netlify 配置

编辑 `netlify.toml`，添加新游戏的重定向：

```toml
[[redirects]]
  from = "/new-game/*"
  to = "/new-game/index.html"
  status = 200
```

### 3. 更新主页

编辑 `index.html`，添加新游戏卡片。

### 4. 推送代码

```bash
git add .
git commit -m "feat: add new-game"
git push origin main
```

## 💡 最佳实践

### 1. 定期测试

在推送前在本地测试：

```bash
npm run build --prefix snake-game
npm run preview --prefix snake-game
```

### 2. 使用有意义的提交信息

```bash
git commit -m "feat: add new feature"
git commit -m "fix: resolve issue"
git commit -m "docs: update README"
```

### 3. 监控部署

定期检查 GitHub Actions 和 Netlify 的部署状态。

### 4. 保持 Secrets 安全

- 不要在代码中硬编码 secrets
- 定期轮换 tokens
- 限制 token 权限

### 5. 更新依赖

定期更新项目依赖：

```bash
npm update --prefix snake-game
```

## 📚 相关文档

- [完整部署指南](./DEPLOYMENT.md)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Netlify 文档](https://docs.netlify.com)
- [Netlify CLI](https://docs.netlify.com/cli/get-started/)

## ✅ 检查清单

部署完成后，检查以下项目：

- [ ] GitHub Secrets 已配置
- [ ] GitHub Actions 工作流已启用
- [ ] Netlify 网站已连接
- [ ] 部署成功（查看 Actions 日志）
- [ ] 网站可访问（访问 Netlify URL）
- [ ] 游戏正常运行

## 🎉 完成！

恭喜！你已经成功设置了自动部署。

现在每次推送代码到 `main` 分支时，GitHub Actions 会自动构建并部署到 Netlify。

## 📞 需要帮助？

- 📖 查看 [完整部署指南](./DEPLOYMENT.md)
- 🐛 [报告问题](https://github.com/Rodert/shiyu-games/issues)
- 💬 [讨论](https://github.com/Rodert/shiyu-games/discussions)

---

**最后更新**: 2024-11-21

**版本**: 1.0.0
