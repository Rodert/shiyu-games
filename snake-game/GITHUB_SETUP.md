# 🔗 GitHub 仓库设置

## 仓库信息

- **仓库地址**: https://github.com/Rodert/shiyu-games
- **项目名称**: shiyu-games（石榴游戏合集）
- **子项目**: snake-game（贪吃蛇游戏）

## 📦 项目结构

```
shiyu-games/
├── snake-game/          # 贪吃蛇游戏项目
│   ├── src/            # 源代码
│   ├── docs/           # 文档
│   └── ...
└── [其他游戏项目]
```

## 🚀 快速开始

### 1. Clone 仓库

```bash
git clone https://github.com/Rodert/shiyu-games.git
cd shiyu-games/snake-game
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

### 4. 构建生产版本

```bash
npm run build
```

## 📝 提交代码

### 创建分支

```bash
# 创建特性分支
git checkout -b feature/your-feature-name

# 或创建修复分支
git checkout -b bugfix/your-bug-fix
```

### 提交更改

```bash
# 添加文件
git add .

# 提交更改（遵循提交规范）
git commit -m "feat: add your feature description"

# 推送到远程
git push origin feature/your-feature-name
```

### 创建 Pull Request

1. 访问 [GitHub 仓库](https://github.com/Rodert/shiyu-games)
2. 点击 "Pull requests" 标签
3. 点击 "New pull request"
4. 选择你的分支
5. 填写 PR 描述
6. 点击 "Create pull request"

## 📋 提交信息规范

遵循以下格式：

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

- **feat**: 新功能
- **fix**: 修复 Bug
- **docs**: 文档更新
- **style**: 代码风格
- **refactor**: 代码重构
- **perf**: 性能优化
- **test**: 添加测试
- **chore**: 构建过程

### 示例

```
feat(game): add pause functionality

Add ability to pause and resume the game using SPACE key.
Implement pause state in useGameLogic hook.

Closes #123
```

## 🐛 报告 Issue

### 创建 Bug Report

1. 访问 [Issues 页面](https://github.com/Rodert/shiyu-games/issues)
2. 点击 "New issue"
3. 选择 "Bug report"
4. 填写以下信息：

```markdown
## 描述 Bug
清晰简洁地描述 Bug 是什么。

## 复现步骤
1. 进入 '...'
2. 点击 '...'
3. 看到错误

## 预期行为
描述你期望发生的事情。

## 实际行为
描述实际发生的事情。

## 环境
- 操作系统: [例如 Windows 10]
- 浏览器: [例如 Chrome 90]
- 版本: [例如 1.0.0]

## 截图
如果适用，添加截图。
```

### 创建 Feature Request

1. 访问 [Issues 页面](https://github.com/Rodert/shiyu-games/issues)
2. 点击 "New issue"
3. 选择 "Feature request"
4. 填写以下信息：

```markdown
## 功能描述
清晰简洁地描述你想要的功能。

## 解决的问题
这个功能解决什么问题？

## 建议的解决方案
你建议如何实现这个功能？

## 替代方案
是否有其他方式实现这个功能？

## 其他信息
任何其他相关信息。
```

## 🔄 同步仓库

### 更新本地仓库

```bash
# 获取最新更改
git fetch origin

# 更新本地分支
git pull origin main
```

### 处理冲突

```bash
# 查看冲突
git status

# 解决冲突后
git add .
git commit -m "fix: resolve merge conflicts"
git push origin your-branch
```

## 📚 相关文档

- [README.md](./README.md) - 项目概览
- [CONTRIBUTING.md](./CONTRIBUTING.md) - 贡献指南
- [DEVELOPMENT.md](./DEVELOPMENT.md) - 开发指南
- [INSTALLATION.md](./INSTALLATION.md) - 安装指南

## 🔐 安全性

### 不要提交

- ❌ API 密钥或令牌
- ❌ 密码或敏感信息
- ❌ 个人信息
- ❌ 大型二进制文件

### 使用 .gitignore

```
node_modules/
dist/
.env
.env.local
*.log
.DS_Store
```

## 📊 仓库统计

- **主分支**: main
- **开发分支**: develop（如果有）
- **保护规则**: 需要 PR 审查

## 🎯 贡献指南

1. **Fork** 项目
2. **创建** 特性分支
3. **提交** 更改
4. **推送** 到 Fork
5. **创建** Pull Request

详见 [CONTRIBUTING.md](./CONTRIBUTING.md)

## 📞 联系方式

- **Issues**: [GitHub Issues](https://github.com/Rodert/shiyu-games/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Rodert/shiyu-games/discussions)（如果启用）
- **仓库**: [https://github.com/Rodert/shiyu-games](https://github.com/Rodert/shiyu-games)

## 🎓 学习资源

- [GitHub 官方文档](https://docs.github.com)
- [Git 官方文档](https://git-scm.com/doc)
- [GitHub Flow 指南](https://guides.github.com/introduction/flow/)

## ✅ 检查清单

在提交 PR 前，请检查：

- [ ] 代码遵循项目风格
- [ ] 添加了必要的测试
- [ ] 更新了相关文档
- [ ] 没有引入新的 lint 错误
- [ ] 提交信息清晰明确
- [ ] 没有包含敏感信息

## 🎉 感谢贡献！

感谢你为项目做出的贡献！

---

**最后更新**: 2024-11-21

**仓库**: https://github.com/Rodert/shiyu-games
