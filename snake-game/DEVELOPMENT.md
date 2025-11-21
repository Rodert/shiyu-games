# 开发指南

## 项目架构

### 目录结构详解

```
snake-game/
├── src/
│   ├── components/          # React 组件
│   │   ├── GameCanvas.tsx   # 游戏画布 - 使用 Canvas API 绘制游戏画面
│   │   └── GameUI.tsx       # 游戏 UI - 显示分数、控制按钮等
│   ├── hooks/               # 自定义 React Hooks
│   │   └── useGameLogic.ts  # 游戏逻辑 Hook - 管理游戏状态和更新
│   ├── App.tsx              # 主应用组件 - 整合游戏逻辑和 UI
│   ├── main.tsx             # 应用入口
│   └── index.css            # 全局样式 + Tailwind
├── index.html               # HTML 模板
├── package.json             # 项目依赖配置
├── tsconfig.json            # TypeScript 配置
├── vite.config.ts           # Vite 构建配置
├── tailwind.config.js       # Tailwind CSS 配置
├── postcss.config.js        # PostCSS 配置
└── README.md                # 项目说明
```

## 核心模块说明

### 1. useGameLogic Hook (`src/hooks/useGameLogic.ts`)

**职责**：管理游戏的所有逻辑和状态

**主要状态**：
- `snake`: 蛇的身体段落数组
- `food`: 食物位置
- `direction`: 当前移动方向
- `nextDirection`: 下一帧的移动方向（用于处理快速按键）
- `score`: 当前分数
- `gameOver`: 游戏是否结束
- `isPaused`: 游戏是否暂停
- `speed`: 游戏速度（毫秒）

**主要函数**：
- `updateGame()`: 每帧更新游戏状态
- `generateFood()`: 生成随机食物位置
- `togglePause()`: 暂停/继续游戏
- `restart()`: 重新开始游戏

**游戏循环**：
```
1. 监听键盘输入 -> 更新 nextDirection
2. 每 speed 毫秒执行一次 updateGame
3. updateGame 更新蛇的位置、检测碰撞、生成食物
4. 组件重新渲染，显示新的游戏状态
```

### 2. GameCanvas 组件 (`src/components/GameCanvas.tsx`)

**职责**：使用 Canvas API 绘制游戏画面

**绘制内容**：
- 背景色
- 网格线
- 食物（带发光效果）
- 蛇身体（带渐变色）
- 蛇头（带眼睛和发光效果）

**视觉特效**：
- 食物周围的径向渐变发光
- 蛇头周围的发光效果
- 蛇身体的线性渐变
- 蛇头根据方向显示眼睛

### 3. GameUI 组件 (`src/components/GameUI.tsx`)

**职责**：显示游戏信息和控制界面

**显示内容**：
- 游戏标题和副标题
- 实时分数、蛇长度、当前速度
- 暂停/继续按钮
- 重新开始按钮
- 游戏结束弹窗
- 操作说明
- 暂停指示器

### 4. App 组件 (`src/App.tsx`)

**职责**：整合游戏逻辑和 UI 组件

## 游戏机制详解

### 碰撞检测

```typescript
// 自身碰撞检测
if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
  gameOver = true
}
```

### 食物生成

- 随机生成食物位置
- 确保食物不在蛇身体上
- 蛇吃到食物时，蛇长度增加，分数 +10

### 难度递增

- 初始速度：100ms
- 每吃一个食物，速度 -2ms（最低 50ms）
- 速度越快，难度越高

### 边界处理

- 蛇可以穿过边界
- 从一侧出现时，从另一侧进入
- 使用模运算实现：`(position + GRID_SIZE) % GRID_SIZE`

## 样式系统

### 颜色方案

```javascript
// tailwind.config.js 中定义
colors: {
  neon: {
    green: '#00ff41',    // 主色 - 蛇
    purple: '#b300ff',   // 辅色 - 蛇长度
    cyan: '#00ffff',     // 强调色 - 蛇头
    pink: '#ff006e',     // 强调色 - 食物
  }
}
```

### 发光效果

```css
/* 文本发光 */
.neon-glow {
  text-shadow: 0 0 10px rgba(0, 255, 65, 0.5), 0 0 20px rgba(0, 255, 65, 0.3);
}

/* Canvas 发光 */
canvas {
  filter: drop-shadow(0 0 20px rgba(0, 255, 65, 0.3));
}
```

## 键盘输入处理

| 按键 | 功能 |
|------|------|
| ⬆️ / W | 向上移动 |
| ⬇️ / S | 向下移动 |
| ⬅️ / A | 向左移动 |
| ➡️ / D | 向右移动 |
| SPACE | 暂停/继续 |
| R | 重新开始 |

**防止反向移动**：
```typescript
// 只有当新方向与当前方向不垂直时才允许转向
if (prevState.direction.y === 0) newDirection = { x: 0, y: -1 }
```

## 性能优化

1. **Canvas 优化**：
   - 只在游戏状态改变时重绘
   - 使用 useRef 缓存 Canvas 引用

2. **状态管理**：
   - 使用 useCallback 缓存函数
   - 避免不必要的组件重新渲染

3. **游戏循环**：
   - 使用 setInterval 而不是 requestAnimationFrame
   - 便于精确控制游戏速度

## 扩展功能建议

### 短期（容易实现）
- [ ] 音效系统（吃食物、游戏结束音效）
- [ ] 本地存储最高分
- [ ] 难度选择（简单/中等/困难）
- [ ] 主题切换（深色/浅色）

### 中期（中等难度）
- [ ] 排行榜系统
- [ ] 多种蛇皮肤
- [ ] 特殊道具（加速、减速、穿墙等）
- [ ] 关卡系统

### 长期（高难度）
- [ ] 多人联机
- [ ] AI 对手
- [ ] 自定义地图
- [ ] 成就系统

## 常见问题

### Q: 蛇为什么有时候会反向移动？
A: 这是正常的。游戏使用 `nextDirection` 来缓冲用户输入，防止在一帧内多次转向。

### Q: 如何修改游戏速度？
A: 修改 `useGameLogic.ts` 中的 `INITIAL_SPEED` 常量。

### Q: 如何修改网格大小？
A: 修改 `useGameLogic.ts` 中的 `GRID_SIZE` 常量，同时修改 `GameCanvas.tsx` 中的 `CELL_SIZE`。

### Q: 如何添加新的颜色？
A: 在 `tailwind.config.js` 中的 `colors.neon` 对象中添加新颜色。

## 调试技巧

### 在浏览器控制台查看游戏状态
```javascript
// 在 App.tsx 中添加
useEffect(() => {
  console.log('Game State:', gameState)
}, [gameState])
```

### 查看 Canvas 绘制
```javascript
// 在 GameCanvas.tsx 中添加
console.log('Drawing frame:', gameState.snake, gameState.food)
```

## 构建和部署

### 开发构建
```bash
npm run dev
```

### 生产构建
```bash
npm run build
# 输出到 dist/ 目录
```

### 部署到 Netlify
```bash
npm run build
# 将 dist/ 目录部署到 Netlify
```

### 部署到 Vercel
```bash
npm run build
# 将 dist/ 目录部署到 Vercel
```

## 浏览器兼容性

- Chrome/Edge: ✅ 完全支持
- Firefox: ✅ 完全支持
- Safari: ✅ 完全支持
- IE 11: ❌ 不支持（使用了 ES2020 特性）

## 许可证

MIT
