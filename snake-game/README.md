# 🐍 Snake Game - 贪吃蛇

> 一个炫酷的现代化贪吃蛇游戏，采用 React 18 + TypeScript + Canvas + TailwindCSS 构建。
> 
> 🎮 **在线体验** | 📖 **完整文档** | 🚀 **快速部署** | 🔧 **易于扩展**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4.0-purple)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.0-06b6d4)](https://tailwindcss.com)

## 📖 目录

- [✨ 特性](#-特性)
- [🚀 快速开始](#-快速开始)
- [🎮 游戏操作](#-游戏操作)
- [🎨 技术栈](#-技术栈)
- [📁 项目结构](#-项目结构)
- [🎯 游戏规则](#-游戏规则)
- [💡 特色设计](#-特色设计)
- [📚 完整文档](#-完整文档)
- [🌐 一键部署](#-一键部署)
- [❓ 常见问题](#-常见问题)
- [🤝 贡献](#-贡献)
- [📄 许可证](#-许可证)
- [🎓 学习资源](#-学习资源)
- [📞 获取帮助](#-获取帮助)

## ✨ 特性

- 🎮 **经典玩法**：传统贪吃蛇游戏机制
- 🌈 **炫酷视觉**：霓虹灯效果、渐变色、发光特效
- ⚡ **动态难度**：随着分数增加，游戏速度逐渐加快
- 🎯 **流畅操作**：支持方向键和 WASD 控制
- ⏸️ **暂停功能**：随时暂停/继续游戏
- 📊 **实时统计**：显示分数、蛇长度、当前速度
- 🎨 **现代化 UI**：使用 TailwindCSS 和 Lucide 图标
- 📱 **响应式设计**：适配各种屏幕尺寸
- 🔧 **完整文档**：开发、部署、API 文档齐全

## 🚀 快速开始

### 前置要求

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0 或 **yarn** >= 1.22.0

### 3 步快速启动

```bash
# 1️⃣ 克隆或下载项目
git clone https://github.com/Rodert/shiyu-games.git
cd shiyu-games/snake-game

# 2️⃣ 安装依赖
npm install

# 3️⃣ 启动开发服务器
npm run dev
```

浏览器会自动打开 `http://localhost:5173` 🎮

### 其他命令

```bash
# 构建生产版本
npm run build

# 预览生产版本
npm run preview

# 查看所有可用命令
npm run
```

## 🎮 游戏操作

### 移动控制

| 方向 | 按键 |
|------|------|
| 上移 | ⬆️ 或 W |
| 下移 | ⬇️ 或 S |
| 左移 | ⬅️ 或 A |
| 右移 | ➡️ 或 D |

### 游戏控制

| 功能 | 按键 |
|------|------|
| 暂停/继续 | SPACE |
| 重新开始 | R |

## 🎨 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.2.0 | UI 框架 |
| TypeScript | 5.0 | 类型检查 |
| Vite | 4.4.0 | 构建工具 |
| TailwindCSS | 3.3.0 | 样式框架 |
| Lucide React | 0.263.1 | 图标库 |
| Canvas API | - | 游戏渲染 |

## 📁 项目结构

```
snake-game/
├── src/
│   ├── components/
│   │   ├── GameCanvas.tsx      # 游戏画布组件
│   │   └── GameUI.tsx          # 游戏 UI 组件
│   ├── hooks/
│   │   └── useGameLogic.ts     # 游戏逻辑 Hook
│   ├── App.tsx                 # 主应用组件
│   ├── main.tsx                # 入口文件
│   └── index.css               # 全局样式
├── index.html                  # HTML 模板
├── package.json                # 项目配置
├── tsconfig.json               # TypeScript 配置
├── vite.config.ts              # Vite 配置
├── tailwind.config.js          # Tailwind 配置
├── postcss.config.js           # PostCSS 配置
├── README.md                   # 项目说明
├── DEVELOPMENT.md              # 开发指南
├── INSTALLATION.md             # 安装指南
├── GAMEPLAY.md                 # 游戏玩法
├── CONTRIBUTING.md             # 贡献指南
├── API.md                      # API 文档
└── CHANGELOG.md                # 更新日志
```

## 🎯 游戏规则

1. 蛇在网格中移动，吃掉食物（粉红色圆点）来增长
2. 每吃一个食物获得 10 分
3. 蛇不能碰到自己的身体，否则游戏结束
4. 蛇可以穿过边界，从另一侧出现
5. 随着分数增加，游戏速度会逐渐加快

## 💡 特色设计

- **霓虹灯效果**：绿色和青色的发光效果
- **动态渐变**：蛇身体和食物的渐变色
- **眼睛动画**：蛇头根据方向显示眼睛
- **网格背景**：淡绿色的网格线
- **响应式设计**：适配不同屏幕尺寸

## 📚 完整文档

| 文档 | 描述 |
|------|------|
| **[START_HERE.md](./START_HERE.md)** | 👈 新手入门指南 |
| **[README.md](./README.md)** | 项目概览（当前文件） |
| **[INSTALLATION.md](./INSTALLATION.md)** | 安装、配置和部署指南 |
| **[GAMEPLAY.md](./GAMEPLAY.md)** | 游戏玩法、技巧和规则 |
| **[DEVELOPMENT.md](./DEVELOPMENT.md)** | 开发指南和架构说明 |
| **[API.md](./API.md)** | API 文档和接口说明 |
| **[CONTRIBUTING.md](./CONTRIBUTING.md)** | 贡献指南和代码规范 |
| **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** | 快速参考卡片 |
| **[CHANGELOG.md](./CHANGELOG.md)** | 版本历史和更新日志 |

## 🌐 一键部署

支持多个平台的快速部署：

### ☁️ Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

### ▲ Vercel

```bash
npm run build
vercel --prod
```

### 📦 GitHub Pages

```bash
npm run build
gh-pages -d dist
```

### 🖥️ 自定义服务器

```bash
npm run build
# 将 dist/ 目录上传到你的服务器
```

👉 **详细部署指南** → [INSTALLATION.md](./INSTALLATION.md)

## 🎮 游戏截图

```
┌─────────────────────────────────────┐
│         SNAKE GAME                  │
│      贪吃蛇 - 炫酷版本              │
├─────────────────────────────────────┤
│  Score: 100  │  Length: 15  │ Speed: 5 │
├─────────────────────────────────────┤
│                                     │
│    ┌─────────────────────────┐     │
│    │  🐍 🟢 🟢 🟢 🟢 🟢      │     │
│    │  🟢 🟢 🟢 🟢 🟢 🟢      │     │
│    │  🟢 🟢 🟢 🟢 🟢 🟢      │     │
│    │  🟢 🟢 🟢 🟢 🟢 🟢      │     │
│    │  🟢 🟢 🟢 🟢 🟢 🟢      │     │
│    │  🟢 🟢 🟢 🟢 🟢 🟢      │     │
│    │  🟢 🟢 🟢 🟢 🟢 🟢      │     │
│    │  🟢 🟢 🟢 🟢 🟢 🟢      │     │
│    │  🟢 🟢 🟢 🟢 🟢 🟢      │     │
│    │  🟢 🟢 🟢 🟢 🟢 🟢      │     │
│    │  🟢 🟢 🟢 🟢 🟢 🟢      │     │
│    │  🟢 🟢 🟢 🟢 🟢 🟢      │     │
│    │  🟢 🟢 🟢 🟢 🟢 🟢      │     │
│    │  🟢 🟢 🟢 🟢 🟢 🟢      │     │
│    │  🟢 🟢 🟢 🟢 🟢 🟢      │     │
│    │  🟢 🟢 🟢 🟢 🟢 🟢      │     │
│    │  🟢 🟢 🟢 🟢 🟢 🟢      │     │
│    │  🟢 🟢 🟢 🟢 🟢 🟢      │     │
│    │  🟢 🟢 🟢 🟢 🟢 🟢      │     │
│    │  🟢 🟢 🟢 🟢 🟢 🟢      │     │
│    └─────────────────────────┘     │
├─────────────────────────────────────┤
│  ⏸ Pause  │  🔄 Restart             │
└─────────────────────────────────────┘
```

## ❓ 常见问题

### Q: 如何修改游戏速度？
**A:** 编辑 `src/hooks/useGameLogic.ts` 中的 `INITIAL_SPEED` 常量。

### Q: 如何修改网格大小？
**A:** 编辑 `src/hooks/useGameLogic.ts` 中的 `GRID_SIZE` 常量。

### Q: 如何修改颜色？
**A:** 编辑 `tailwind.config.js` 中的 `colors.neon` 配置。

### Q: 支持哪些浏览器？
**A:** Chrome、Firefox、Safari、Edge（最新版本）。IE 11 不支持。

### Q: 如何添加新功能？
**A:** 查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 和 [DEVELOPMENT.md](./DEVELOPMENT.md)。

👉 **更多问题** → [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) 或 [DEVELOPMENT.md](./DEVELOPMENT.md)

## 🤝 贡献

我们欢迎所有形式的贡献！无论是 Bug 修复、新功能还是文档改进。

### 快速贡献步骤

1. **Fork** 项目
2. **创建** 特性分支 (`git checkout -b feature/amazing-feature`)
3. **提交** 更改 (`git commit -m 'feat: add amazing feature'`)
4. **推送** 到分支 (`git push origin feature/amazing-feature`)
5. **创建** Pull Request

👉 **详细贡献指南** → [CONTRIBUTING.md](./CONTRIBUTING.md)

## 📄 许可证

MIT License - 自由使用、修改和分发

详见 [LICENSE](./LICENSE) 文件

## 🎓 学习资源

本项目适合学习以下技术：

- **React 18** - 函数组件、Hooks、状态管理
- **TypeScript** - 类型系统、接口设计
- **Canvas API** - 2D 绘制、游戏开发
- **Vite** - 现代化构建工具
- **TailwindCSS** - 实用优先的 CSS 框架

## 📊 项目统计

- 📝 **代码行数**: ~800 行
- 📚 **文档行数**: ~3500 行
- 📦 **依赖数量**: 3 个
- 🎨 **组件数量**: 2 个
- 🔧 **自定义 Hooks**: 1 个
- 📖 **文档文件**: 14 个

## 🎯 项目路线图

### 已完成 ✅
- [x] 核心游戏逻辑
- [x] 炫酷视觉效果
- [x] 完整文档体系
- [x] 多平台部署支持

### 计划中 �
- [ ] 音效系统
- [ ] 本地存储最高分
- [ ] 难度选择
- [ ] 主题切换
- [ ] 排行榜

## 🌟 致谢

感谢所有为项目做出贡献和反馈的人！

## 📞 获取帮助

- 📖 **文档**: [START_HERE.md](./START_HERE.md)
- 🐛 **报告 Bug**: [GitHub Issues](https://github.com/Rodert/shiyu-games/issues)
- 💡 **功能建议**: [GitHub Discussions](https://github.com/Rodert/shiyu-games/discussions)
- 🤝 **贡献代码**: [CONTRIBUTING.md](./CONTRIBUTING.md)

---

<div align="center">

**[⬆ 回到顶部](#-snake-game---贪吃蛇)**

Made with ❤️ by the community

[![GitHub Stars](https://img.shields.io/github/stars/Rodert/shiyu-games?style=social)](https://github.com/Rodert/shiyu-games)
[![GitHub Forks](https://img.shields.io/github/forks/Rodert/shiyu-games?style=social)](https://github.com/Rodert/shiyu-games)

</div>
