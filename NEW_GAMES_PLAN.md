# 🎮 5 个新游戏开发计划

## 项目概述

为仕宇游戏合集添加 5 个新游戏，将总游戏数从 4 个扩展到 9 个。

## 新增游戏列表

### 1. 🌀 迷宫生成器 (Maze Game)
- **目录**: `maze-game/`
- **描述**: 随机迷宫生成，闯关冒险
- **特性**:
  - 随机迷宫生成算法
  - 玩家移动和碰撞检测
  - 多难度等级
  - 计时系统
  - 分数统计

### 2. 🎯 跳一跳 Web 版 (Jump Game)
- **目录**: `jump-game/`
- **描述**: 物理弹跳挑战
- **特性**:
  - 物理引擎（重力、速度）
  - 跳跃力度控制
  - 平台生成
  - 高度统计
  - 分数系统

### 3. ✈️ 前端飞机大战 (Airplane Game)
- **目录**: `airplane-game/`
- **描述**: 像素空战
- **特性**:
  - 玩家飞机控制
  - 敌机生成和移动
  - 子弹发射和碰撞
  - 得分系统
  - 生命值管理

### 4. 🔨 打地鼠 (Whack Mole)
- **目录**: `whack-mole/`
- **描述**: 极速反应小游戏
- **特性**:
  - 随机地鼠出现
  - 点击检测
  - 时间限制
  - 反应速度统计
  - 排行榜

### 5. ⚡ 极速俄罗斯方块 (Speed Tetris)
- **目录**: `speed-tetris/`
- **描述**: 下落方块大战
- **特性**:
  - 加速下落
  - 多行同时消除
  - 连击系统
  - 难度递增
  - 高分记录

## 技术栈

所有游戏统一使用:
- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite 5.0
- **样式框架**: TailwindCSS 3.3
- **渲染方式**: Canvas API / DOM
- **图标库**: Lucide React
- **部署**: GitHub Pages

## 项目结构

```
shiyu-games/
├── snake-game/           # ✅ 已完成
├── tetris-game/          # ✅ 已完成
├── flappy-bird/          # ✅ 已完成
├── 2048-game/            # ✅ 已完成
├── maze-game/            # 🚧 开发中
├── jump-game/            # 🚧 开发中
├── airplane-game/        # 🚧 开发中
├── whack-mole/           # 🚧 开发中
├── speed-tetris/         # 🚧 开发中
└── index.html            # 主页（包含 9 个游戏卡片）
```

## 每个游戏的文件结构

```
game-name/
├── src/
│   ├── App.tsx                    # 主应用
│   ├── components/                # React 组件
│   ├── hooks/                     # 自定义 Hooks
│   ├── main.tsx                   # 入口
│   └── index.css                  # 样式
├── package.json                   # 依赖
├── vite.config.ts                 # Vite 配置
├── tsconfig.json                  # TypeScript 配置
├── tailwind.config.js             # TailwindCSS 配置
├── postcss.config.js              # PostCSS 配置
├── index.html                     # HTML 入口
└── .gitignore                     # Git 忽略
```

## 部署配置更新

### GitHub Actions 工作流更新
- 更新 `matrix.game` 支持 9 个游戏
- 添加 artifact 下载步骤
- 更新部署目录复制命令

### 主页更新
- 添加 5 个新游戏卡片
- 更新游戏总数显示
- 保持响应式设计

## 开发进度

- [x] 创建项目目录结构
- [x] 创建 package.json 文件
- [ ] 创建配置文件（vite、tsconfig 等）
- [ ] 创建源代码框架
- [ ] 更新主页
- [ ] 更新 GitHub Actions 工作流
- [ ] 推送到 GitHub
- [ ] 验证部署

## 预期结果

完成后，仕宇游戏合集将包含：
- **9 个游戏** 🎮
- **完整的源代码** 📝
- **自动部署配置** 🚀
- **响应式设计** 📱
- **炫酷的视觉效果** ✨

## 时间估计

- 配置文件创建: 15 分钟
- 源代码框架: 30 分钟
- 主页和工作流更新: 10 分钟
- 测试和部署: 10 分钟
- **总计**: 约 65 分钟

## 下一步

1. 为每个游戏创建配置文件
2. 为每个游戏创建最小化的源代码框架
3. 更新主页添加新游戏卡片
4. 更新 GitHub Actions 工作流
5. 推送所有更改
6. 验证部署成功
