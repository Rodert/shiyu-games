# GitHub Actions 工作流

本目录包含自动化部署和测试的 GitHub Actions 工作流。

## 📁 文件说明

### deploy.yml

主要的部署工作流，包含以下功能：

- ✅ 自动构建项目
- ✅ 运行测试和代码检查
- ✅ 上传构建产物
- ✅ 自动部署到 Netlify
- ✅ 生成部署总结

**触发条件**：
- 推送到 `main` 或 `master` 分支
- 创建 Pull Request 到 `main` 或 `master` 分支

**支持多游戏**：
- 使用 `strategy.matrix.game` 支持多个游戏
- 每个游戏独立构建和部署

## 🚀 快速开始

### 1. 设置 Netlify

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录 Netlify
netlify login

# 获取 Site ID 和 Auth Token
netlify sites:list
```

### 2. 配置 GitHub Secrets

在 GitHub 仓库中添加以下 secrets：

```
NETLIFY_AUTH_TOKEN = 你的 Netlify Auth Token
NETLIFY_SITE_ID = 你的 Netlify Site ID
```

### 3. 推送代码

```bash
git push origin main
```

工作流会自动触发并部署你的项目！

## 📊 工作流状态

在 GitHub 仓库中查看工作流状态：

1. 点击 **Actions** 标签
2. 查看最新的工作流运行
3. 点击工作流查看详细日志

## 🔧 自定义工作流

### 添加新游戏

编辑 `deploy.yml`：

```yaml
strategy:
  matrix:
    game: [snake-game, new-game]  # 添加新游戏
```

### 修改构建命令

编辑 `deploy.yml`：

```yaml
- name: 🏗️ Build project
  working-directory: ${{ matrix.game }}
  run: npm run build  # 修改构建命令
```

### 添加环境变量

编辑 `deploy.yml`：

```yaml
env:
  NODE_ENV: production
  CUSTOM_VAR: value
```

## 📚 相关文档

- [部署指南](../DEPLOYMENT.md)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Netlify 文档](https://docs.netlify.com)

## 🐛 故障排除

### 工作流失败

1. 检查 GitHub Actions 日志
2. 查看具体错误信息
3. 在本地测试构建
4. 修复问题并重新推送

### 部署失败

1. 检查 Netlify secrets 是否正确
2. 检查 Netlify 部署日志
3. 确保 Site ID 正确
4. 重新生成 Auth Token

## 💡 最佳实践

1. **定期测试** - 在本地测试构建
2. **清晰的提交信息** - 使用有意义的提交信息
3. **监控部署** - 定期检查部署状态
4. **保持 secrets 安全** - 不要在代码中硬编码 secrets
5. **更新依赖** - 定期更新项目依赖

---

**最后更新**: 2024-11-21
