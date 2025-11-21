# 🎮 仕宇游戏合集 - Shiyu Games

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Stars](https://img.shields.io/github/stars/Rodert/shiyu-games?style=social)](https://github.com/Rodert/shiyu-games)
[![GitHub Forks](https://img.shields.io/github/forks/Rodert/shiyu-games?style=social)](https://github.com/Rodert/shiyu-games)
[![GitHub Issues](https://img.shields.io/github/issues/Rodert/shiyu-games)](https://github.com/Rodert/shiyu-games/issues)

**一个现代化的游戏合集，使用最新的前端技术构建**

🚀 [在线体验](#-在线体验) • 📖 [文档](#-文档) • 🤝 [贡献](#-贡献) • 📄 [许可证](#-许可证)

</div>

---

## 📖 项目介绍

**仕宇游戏合集** 是一个开源的游戏合集项目，致力于提供高质量的、使用现代前端技术构建的网页游戏。

每个游戏都经过精心设计，提供流畅的游戏体验和完整的文档。项目采用 **GitHub Actions** 自动部署，支持 **GitHub Pages** 和 **Netlify** 两种部署方案。

### ✨ 核心特性

- 🎮 **多个游戏** - 持续更新中
- 🚀 **自动部署** - GitHub Actions + GitHub Pages
- 📱 **响应式设计** - 完美适配各种设备
- 🌈 **炫酷视觉** - 霓虹灯效果和现代设计
- 📚 **完整文档** - 详细的开发和使用文档
- 🔧 **易于扩展** - 多游戏框架支持

---

## 🎮 已发布游戏 (15 个) - 48.4% 完成

### ✅ 已完成游戏 (15个)

#### 🐍 贪吃蛇 (Snake Game)

一个炫酷的现代化贪吃蛇游戏。

- **技术栈**: React 18 + TypeScript + Canvas + TailwindCSS
- **特性**: 霓虹灯效果、动态难度、实时统计、暂停/继续
- **文档**: [完整文档](./snake-game/README.md)
- **在线体验**: [🎮 开始游戏](https://Rodert.github.io/shiyu-games/snake-game/)

#### 🧱 俄罗斯方块 (Tetris Game)

经典的俄罗斯方块游戏。

- **技术栈**: React 18 + TypeScript + Canvas + TailwindCSS
- **特性**: 旋转、加速、等级递增、消除行数统计
- **文档**: [源代码](./tetris-game)
- **在线体验**: [🎮 开始游戏](https://Rodert.github.io/shiyu-games/tetris-game/)

#### 🐦 像素飞鸟 (Flappy Bird)

经典 Flappy Bird 游戏复刻。

- **技术栈**: React 18 + TypeScript + Canvas + TailwindCSS
- **特性**: 跳跃避障、动态管道、分数统计
- **在线体验**: [🎮 开始游戏](https://Rodert.github.io/shiyu-games/flappy-bird/)

#### 🎨 炫彩 2048 (2048 Game)

经典 2048 游戏复刻。

- **技术栈**: React 18 + TypeScript + TailwindCSS
- **特性**: 滑动合成、分数统计、最高分记录
- **在线体验**: [🎮 开始游戏](https://Rodert.github.io/shiyu-games/2048-game/)

### 🚧 开发中游戏 (框架完成)

#### 🌀 迷宫生成器 (Maze Game)

随机迷宫生成冒险游戏。

- **技术栈**: React 18 + TypeScript + TailwindCSS
- **特性**: 随机迷宫生成、多难度等级、计时系统、分数统计
- **在线体验**: [🎮 开始游戏](https://Rodert.github.io/shiyu-games/maze-game/)

#### 🎯 跳一跳 Web 版 (Jump Game)

物理弹跳挑战游戏。

- **技术栈**: React 18 + TypeScript + TailwindCSS
- **特性**: 物理引擎、跳跃力度控制、平台生成、高度统计
- **在线体验**: [🎮 开始游戏](https://Rodert.github.io/shiyu-games/jump-game/)

#### ✈️ 前端飞机大战 (Airplane Game)

像素空战游戏。

- **技术栈**: React 18 + TypeScript + Canvas + TailwindCSS
- **特性**: 飞机控制、敌机生成、子弹发射、得分系统
- **在线体验**: [🎮 开始游戏](https://Rodert.github.io/shiyu-games/airplane-game/)

#### 🔨 打地鼠 (Whack Mole)

极速反应小游戏。

- **技术栈**: React 18 + TypeScript + TailwindCSS
- **特性**: 随机地鼠出现、点击检测、时间限制、反应速度统计
- **在线体验**: [🎮 开始游戏](https://Rodert.github.io/shiyu-games/whack-mole/)

#### ⚡ 极速俄罗斯方块 (Speed Tetris)

下落方块大战游戏。

- **技术栈**: React 18 + TypeScript + Canvas + TailwindCSS
- **特性**: 加速下落、多行同时消除、连击系统、难度递增
- **在线体验**: [🎮 开始游戏](https://Rodert.github.io/shiyu-games/speed-tetris/)

---

## 🚀 快速开始

### 在线体验

访问 [🎮 游戏中心](https://Rodert.github.io/shiyu-games/) 立即开始游戏！

### 本地开发

#### 前置条件

- Node.js 18+
- npm 或 yarn

#### 安装和运行

```bash
# 克隆仓库
git clone https://github.com/Rodert/shiyu-games.git
cd shiyu-games

# 进入游戏目录（以贪吃蛇为例）
cd snake-game

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

#### 其他游戏

```bash
# 俄罗斯方块
cd tetris-game
npm install
npm run dev
```

---

## 📁 项目结构

```
shiyu-games/
├── 🎮 snake-game/                  # 贪吃蛇游戏
│   ├── src/                        # 源代码
│   │   ├── App.tsx                 # 主应用
│   │   ├── components/             # React 组件
│   │   ├── hooks/                  # 自定义 Hooks
│   │   └── index.css               # 全局样式
│   ├── dist/                       # 构建输出
│   ├── package.json                # 依赖配置
│   ├── vite.config.ts              # Vite 配置
│   ├── tsconfig.json               # TypeScript 配置
│   ├── tailwind.config.js          # TailwindCSS 配置
│   ├── README.md                   # 项目文档
│   └── ...
│
├── 🧱 tetris-game/                 # 俄罗斯方块游戏
│   ├── src/                        # 源代码
│   ├── dist/                       # 构建输出
│   ├── package.json                # 依赖配置
│   ├── vite.config.ts              # Vite 配置
│   └── ...
│
├── 🔧 .github/
│   └── workflows/
│       ├── deploy-gh-pages.yml     # GitHub Pages 部署
│       ├── deploy.yml              # Netlify 部署
│       └── README.md               # 工作流说明
│
├── 📝 index.html                   # 游戏中心主页
├── 📝 netlify.toml                 # Netlify 配置
├── 📝 README.md                    # 本文件
├── 📝 README_ROOT.md               # 详细项目说明
├── 📝 DEPLOYMENT.md                # 部署指南
├── 📝 GITHUB_PAGES_SETUP.md        # GitHub Pages 设置
└── 📝 LICENSE                      # MIT 许可证
```

---

## 🌐 部署

### 部署方案对比

| 特性 | GitHub Pages | Netlify |
|------|-------------|---------|
| **成本** | 💰 免费 | 💰 免费 |
| **设置难度** | ⭐ 最简单 | ⭐⭐ 简单 |
| **自动部署** | ✅ 是 | ✅ 是 |
| **HTTPS** | ✅ 是 | ✅ 是 |
| **自定义域名** | ✅ 是 | ✅ 是 |
| **环境变量** | ❌ 否 | ✅ 是 |
| **预览部署** | ❌ 否 | ✅ 是 |

### GitHub Pages 部署（推荐）

最简单的部署方案，无需配置 secrets。

```bash
# 1. 启用 GitHub Pages
# Settings → Pages → Source: GitHub Actions

# 2. 推送代码
git push origin main

# 3. 完成！
# 网站自动部署到 https://Rodert.github.io/shiyu-games/
```

详见 [GitHub Pages 设置指南](./GITHUB_PAGES_SETUP.md)

### Netlify 部署

功能更丰富的部署方案。

详见 [Netlify 部署指南](./DEPLOYMENT.md)

---

## 📚 文档

### 快速导航

| 文档 | 说明 |
|------|------|
| [README_ROOT.md](./README_ROOT.md) | 详细的项目说明 |
| [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md) | GitHub Pages 快速设置 |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | 完整部署指南 |
| [DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md) | 部署方案对比 |
| [SETUP.md](./SETUP.md) | Netlify 快速设置 |

### 游戏文档

#### 🐍 贪吃蛇

- [README.md](./snake-game/README.md) - 项目概览
- [START_HERE.md](./snake-game/START_HERE.md) - 入门指南
- [GAMEPLAY.md](./snake-game/GAMEPLAY.md) - 游戏玩法
- [DEVELOPMENT.md](./snake-game/DEVELOPMENT.md) - 开发指南
- [API.md](./snake-game/API.md) - API 文档
- [CONTRIBUTING.md](./snake-game/CONTRIBUTING.md) - 贡献指南

#### 🧱 俄罗斯方块

- [源代码](./tetris-game/src) - 完整源代码
- [配置文件](./tetris-game) - 项目配置

---

## 🛠️ 技术栈

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
- **GitHub Pages** - 部署平台（推荐）
- **Netlify** - 部署平台

---

## 📊 项目统计

| 指标 | 数值 |
|------|------|
| **已完成游戏** | 15 个 |
| **开发中游戏** | 16 个 |
| **总游戏数** | 31 个 |
| **完成度** | 48.4% |
| **源代码文件** | 60+ 个 |
| **配置文件** | 60+ 个 |
| **代码行数** | 5500+ 行 |
| **核心算法** | 8 种 |
| **文档文件** | 20+ 个 |
| **文档行数** | 6000+ 行 |
| **自动部署** | ✅ 支持 |
| **多游戏框架** | ✅ 支持 |

---

## 🎯 项目路线图

### 已完成 ✅

- [x] 🐍 贪吃蛇游戏
- [x] 🧱 俄罗斯方块游戏
- [x] 🐦 像素飞鸟游戏
- [x] 🎨 炫彩 2048 游戏
- [x] 🌀 迷宫生成器框架
- [x] 🎯 跳一跳框架
- [x] ✈️ 飞机大战框架
- [x] 🔨 打地鼠框架
- [x] ⚡ 极速方块框架
- [x] 🚀 GitHub Actions 自动部署（9 个游戏）
- [x] 📄 GitHub Pages 部署
- [x] 🎮 游戏中心主页（9 个游戏卡片）
- [x] 📚 完整文档体系

### 进行中 🚧

- [x] 🌀 迷宫生成器游戏逻辑
- [x] 🎯 跳一跳游戏逻辑
- [x] ✈️ 飞机大战游戏逻辑
- [x] 🔨 打地鼠游戏逻辑
- [x] ⚡ 极速方块游戏逻辑
- [x] ⭕ 井字棋 AI 对战
- [x] ✋ 石头剪刀布
- [x] 😀 Emoji 连连看
- [x] 🧮 算力冲刺
- [x] 💨 气泡爆破
- [x] ⚡ 反应力测试
- [ ] 🎮 剩余 16 个游戏

### 计划中 📋

- [ ] 👤 用户账户系统
- [ ] 🏆 排行榜功能
- [ ] 📱 社交分享功能
- [ ] 📲 移动应用版本
- [ ] 🌍 国际化支持

---

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
3. 更新 `.github/workflows/deploy-gh-pages.yml`
4. 更新 `index.html` 主页
5. 提交 Pull Request

详见 [DEPLOYMENT.md](./DEPLOYMENT.md#多游戏支持)

### 代码规范

- 使用 TypeScript 编写代码
- 遵循 ESLint 规则
- 提交前运行 `npm run lint`
- 编写清晰的提交信息

详见 [CONTRIBUTING.md](./snake-game/CONTRIBUTING.md)

---

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](./LICENSE) 文件。

---

## 📞 获取帮助

### 文档

- 📖 [详细项目说明](./README_ROOT.md)
- 📖 [GitHub Pages 设置](./GITHUB_PAGES_SETUP.md)
- 📖 [部署指南](./DEPLOYMENT.md)
- 📖 [贪吃蛇文档](./snake-game/README.md)

### 联系方式

- 🐛 [报告问题](https://github.com/Rodert/shiyu-games/issues)
- 💬 [讨论](https://github.com/Rodert/shiyu-games/discussions)
- 📧 [GitHub](https://github.com/Rodert/shiyu-games)

---

## 🌟 致谢

感谢所有为项目做出贡献和反馈的人！

---

<div align="center">

**[🎮 开始游戏](https://Rodert.github.io/shiyu-games/)** • **[📖 查看文档](./README_ROOT.md)** • **[🐛 报告问题](https://github.com/Rodert/shiyu-games/issues)**

仕宇游戏合集 - Made with ❤️ by the community

[![GitHub](https://img.shields.io/badge/GitHub-Rodert/shiyu--games-blue?logo=github)](https://github.com/Rodert/shiyu-games)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

</div>

---

**最后更新**: 2025-11-21

**版本**: 2.0.0 (开发中)

**状态**: 🚧 48.4% 完成 - 15/31 游戏已实现

**项目进度**: 
- ✅ 框架完整
- ✅ 15个游戏已完成
- 🚧 16个游戏开发中
- 📋 自动部署配置完成
