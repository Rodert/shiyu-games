# 🎮 仕宇游戏合集 - Shiyu Games

> 一个现代化的游戏合集项目，使用最新的前端技术构建。
> 
> 🚀 **自动部署** | 📦 **多游戏支持** | 🎨 **炫酷设计** | 📚 **完整文档**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Stars](https://img.shields.io/github/stars/Rodert/shiyu-games?style=social)](https://github.com/Rodert/shiyu-games)
[![GitHub Forks](https://img.shields.io/github/forks/Rodert/shiyu-games?style=social)](https://github.com/Rodert/shiyu-games)

## 📖 项目介绍

**仕宇游戏合集** 是一个开源的游戏合集项目，致力于提供高质量的、使用现代前端技术构建的网页游戏。

每个游戏都经过精心设计，提供流畅的游戏体验和完整的文档。

## 🎮 已发布游戏

### 🐍 [贪吃蛇](./snake-game)

一个炫酷的现代化贪吃蛇游戏。

- **技术栈**: React 18 + TypeScript + Canvas + TailwindCSS
- **特性**: 霓虹灯效果、动态难度、实时统计
- **文档**: [完整文档](./snake-game/README.md)
- **在线体验**: [Play Now](https://shiyu-games.netlify.app/snake-game)

## 📁 项目结构

```
仕宇游戏合集/
├── 🎮 snake-game/              # 贪吃蛇游戏
│   ├── src/                    # 源代码
│   ├── dist/                   # 构建输出
│   ├── README.md               # 项目文档
│   ├── package.json            # 依赖配置
│   └── ...
├── 🔧 .github/
│   └── workflows/
│       ├── deploy.yml          # 自动部署工作流
│       └── README.md           # 工作流说明
├── 📝 index.html               # 游戏中心主页
├── 📝 netlify.toml             # Netlify 配置
├── 📝 DEPLOYMENT.md            # 部署指南
├── 📝 README_ROOT.md           # 本文件
└── 📝 LICENSE                  # MIT 许可证
```

## 🚀 快速开始

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/Rodert/shiyu-games.git
cd shiyu-games

# 进入游戏目录
cd snake-game

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 在线体验

访问 [https://shiyu-games.netlify.app](https://shiyu-games.netlify.app) 体验所有游戏。

## 🌐 部署

### 自动部署方案

项目支持两种自动部署方案：

#### 🚀 GitHub Pages（推荐 - 最简单）

完全免费，无需配置 secrets。

```bash
# 1. 启用 GitHub Pages
# Settings → Pages → Source: GitHub Actions

# 2. 推送代码
git push origin main

# 3. 完成！
# 网站自动部署到 https://Rodert.github.io/shiyu-games/
```

详见 [GitHub Pages 设置指南](./GITHUB_PAGES_SETUP.md)

#### ☁️ Netlify（功能更多）

免费托管，支持更多功能（环境变量、预览部署等）。

详见 [Netlify 部署指南](./DEPLOYMENT.md)

### 手动部署

```bash
# 构建所有游戏
npm run build --prefix snake-game

# 部署到 Netlify
netlify deploy --prod --dir=snake-game/dist
```

## 📚 文档

### 项目文档

- **[GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md)** - GitHub Pages 快速设置（推荐）
- **[SETUP.md](./SETUP.md)** - 快速设置指南
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - 完整部署指南和配置说明
- **[.github/workflows/README.md](./.github/workflows/README.md)** - GitHub Actions 工作流说明

### 游戏文档

#### 🐍 贪吃蛇

- **[README.md](./snake-game/README.md)** - 项目概览
- **[START_HERE.md](./snake-game/START_HERE.md)** - 入门指南
- **[INSTALLATION.md](./snake-game/INSTALLATION.md)** - 安装指南
- **[GAMEPLAY.md](./snake-game/GAMEPLAY.md)** - 游戏玩法
- **[DEVELOPMENT.md](./snake-game/DEVELOPMENT.md)** - 开发指南
- **[API.md](./snake-game/API.md)** - API 文档
- **[CONTRIBUTING.md](./snake-game/CONTRIBUTING.md)** - 贡献指南

## 🎯 项目路线图

### 已完成 ✅

- [x] 🐍 贪吃蛇游戏
- [x] 🚀 GitHub Actions 自动部署
- [x] 📄 GitHub Pages 部署
- [x] ☁️ Netlify 部署配置
- [x] 🎮 游戏中心主页
- [x] 📚 完整文档体系

### 计划中 📋

- [ ] 🎮 更多游戏（持续开发中）
- [ ] 👤 用户账户系统
- [ ] 🏆 排行榜功能
- [ ] 📱 社交分享功能
- [ ] 📲 移动应用版本

## 🤝 贡献

欢迎所有形式的贡献！

### 贡献方式

1. **Fork** 项目
2. **创建** 特性分支 (`git checkout -b feature/amazing-feature`)
3. **提交** 更改 (`git commit -m 'feat: add amazing feature'`)
4. **推送** 到分支 (`git push origin feature/amazing-feature`)
5. **创建** Pull Request

### 添加新游戏

1. 在项目根目录创建新游戏目录
2. 按照 [snake-game](./snake-game) 的结构组织代码
3. 更新 `.github/workflows/deploy.yml`
4. 更新 `index.html` 主页
5. 提交 Pull Request

详见 [DEPLOYMENT.md](./DEPLOYMENT.md#多游戏支持)

## 📊 项目统计

| 指标 | 数值 |
|------|------|
| **已发布游戏** | 1 |
| **计划游戏** | 多个 |
| **代码行数** | 800+ |
| **文档行数** | 3500+ |
| **开源许可** | MIT |
| **自动部署** | ✅ 支持 |

## 🎨 技术栈

### 前端框架

- **React 18** - UI 框架
- **TypeScript** - 类型检查
- **Canvas API** - 游戏渲染

### 开发工具

- **Vite** - 构建工具
- **TailwindCSS** - 样式框架
- **Lucide React** - 图标库

### 部署和 CI/CD

- **GitHub Actions** - 自动化工作流
- **Netlify** - 部署平台
- **netlify.toml** - 部署配置

## 📞 获取帮助

### 文档

- 📖 [部署指南](./DEPLOYMENT.md)
- 📖 [贪吃蛇文档](./snake-game/README.md)
- 📖 [GitHub Actions 说明](./.github/workflows/README.md)

### 联系方式

- 🐛 [报告问题](https://github.com/Rodert/shiyu-games/issues)
- 💬 [讨论](https://github.com/Rodert/shiyu-games/discussions)
- 📧 [GitHub](https://github.com/Rodert/shiyu-games)

## 📄 许可证

MIT License - 自由使用、修改和分发

详见 [LICENSE](./LICENSE) 文件

## 🌟 致谢

感谢所有为项目做出贡献和反馈的人！

---

<div align="center">

**[🎮 开始游戏](https://Rodert.github.io/shiyu-games/)** | **[📖 查看文档](./snake-game/README.md)** | **[🐛 报告问题](https://github.com/Rodert/shiyu-games/issues)**

仕宇游戏合集 - Made with ❤️ by the community

</div>

---

**最后更新**: 2024-11-21

**版本**: 1.0.0

**项目名称**: 仕宇游戏合集 (Shiyu Games)

**状态**: ✅ 完成并可用于生产环境
