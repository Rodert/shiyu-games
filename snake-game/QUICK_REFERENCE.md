# ⚡ 快速参考卡片

快速查找常用命令、快捷键和配置。

## 🚀 常用命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 🎮 游戏快捷键

| 功能 | 按键 |
|------|------|
| 上移 | ⬆️ 或 W |
| 下移 | ⬇️ 或 S |
| 左移 | ⬅️ 或 A |
| 右移 | ➡️ 或 D |
| 暂停/继续 | SPACE |
| 重新开始 | R |

## 📁 项目文件位置

| 文件/目录 | 用途 |
|---------|------|
| `src/App.tsx` | 主应用组件 |
| `src/components/GameCanvas.tsx` | 游戏画布 |
| `src/components/GameUI.tsx` | 游戏 UI |
| `src/hooks/useGameLogic.ts` | 游戏逻辑 |
| `src/index.css` | 全局样式 |
| `tailwind.config.js` | Tailwind 配置 |
| `vite.config.ts` | Vite 配置 |
| `package.json` | 项目配置 |

## 🎨 颜色配置

### Tailwind 颜色

```javascript
// tailwind.config.js
colors: {
  neon: {
    green: '#00ff41',    // 蛇身体
    purple: '#b300ff',   // 蛇长度显示
    cyan: '#00ffff',     // 蛇头
    pink: '#ff006e',     // 食物
  }
}
```

### Canvas 颜色

```typescript
// src/components/GameCanvas.tsx
const GRID_COLOR = 'rgba(0, 255, 65, 0.1)'
const SNAKE_COLOR = '#00ff41'
const SNAKE_HEAD_COLOR = '#00ffff'
const FOOD_COLOR = '#ff006e'
const BACKGROUND_COLOR = '#0a0e27'
```

## ⚙️ 游戏常量

### 修改游戏速度

```typescript
// src/hooks/useGameLogic.ts
const INITIAL_SPEED = 100  // 毫秒，改为更大的值会更慢
```

### 修改网格大小

```typescript
// src/hooks/useGameLogic.ts
const GRID_SIZE = 20  // 改为其他数字

// src/components/GameCanvas.tsx
const CELL_SIZE = 30  // 调整为 600 / GRID_SIZE
```

## 📊 游戏状态接口

```typescript
interface GameState {
  snake: Position[]           // 蛇的身体
  food: Position              // 食物位置
  direction: Position         // 当前方向
  nextDirection: Position     // 下一个方向
  score: number               // 分数
  gameOver: boolean           // 游戏是否结束
  isPaused: boolean           // 游戏是否暂停
  gridSize: number            // 网格大小
  speed: number               // 游戏速度
}

interface Position {
  x: number
  y: number
}
```

## 🔧 常见修改

### 修改初始蛇位置

```typescript
// src/hooks/useGameLogic.ts
const resetGame = useCallback((): GameState => {
  return {
    snake: [{ x: 10, y: 10 }],  // 改这里
    // ...
  }
}, [])
```

### 修改初始食物位置

```typescript
// src/hooks/useGameLogic.ts
const resetGame = useCallback((): GameState => {
  return {
    // ...
    food: { x: 15, y: 15 },  // 改这里
    // ...
  }
}, [])
```

### 修改分数增量

```typescript
// src/hooks/useGameLogic.ts
if (newHead.x === prevState.food.x && newHead.y === prevState.food.y) {
  newScore += 10  // 改这个数字
  // ...
}
```

### 修改速度递增

```typescript
// src/hooks/useGameLogic.ts
if (newHead.x === prevState.food.x && newHead.y === prevState.food.y) {
  // ...
  newSpeed = Math.max(50, prevState.speed - 2)  // 改 -2 为其他值
}
```

## 🎯 性能优化技巧

### 减少 Canvas 重绘

```typescript
// 使用 useRef 缓存 Canvas
const canvasRef = useRef<HTMLCanvasElement>(null)
```

### 缓存函数

```typescript
// 使用 useCallback
const updateGame = useCallback(() => {
  // ...
}, [generateFood])
```

### 缓存计算结果

```typescript
// 使用 useMemo
const canvasWidth = useMemo(() => gameState.gridSize * CELL_SIZE, [gameState.gridSize])
```

## 📱 响应式设计

### 调整 Canvas 大小

```typescript
// src/components/GameCanvas.tsx
const CELL_SIZE = 30  // 改为更小的值以适应小屏幕
```

### 调整 UI 布局

```typescript
// src/components/GameUI.tsx
// 使用 Tailwind 的响应式类
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {/* 内容 */}
</div>
```

## 🐛 调试技巧

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
console.log('Drawing:', gameState.snake, gameState.food)
```

### 查看键盘事件

```javascript
// 在 useGameLogic.ts 中添加
console.log('Key pressed:', key)
```

## 📦 依赖版本

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "lucide-react": "^0.263.1",
  "vite": "^4.4.0",
  "tailwindcss": "^3.3.0",
  "typescript": "^5.0"
}
```

## 🌐 部署快速命令

### Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

### Vercel

```bash
npm run build
vercel --prod
```

### GitHub Pages

```bash
npm run build
gh-pages -d dist
```

## 📚 文档快速链接

| 文档 | 用途 |
|------|------|
| [README.md](./README.md) | 项目概览 |
| [INSTALLATION.md](./INSTALLATION.md) | 安装指南 |
| [GAMEPLAY.md](./GAMEPLAY.md) | 游戏玩法 |
| [DEVELOPMENT.md](./DEVELOPMENT.md) | 开发指南 |
| [API.md](./API.md) | API 文档 |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | 贡献指南 |
| [CHANGELOG.md](./CHANGELOG.md) | 更新日志 |
| [DOCS_INDEX.md](./DOCS_INDEX.md) | 文档索引 |

## 💡 常见问题快速答案

### Q: 游戏太快/太慢？
A: 修改 `src/hooks/useGameLogic.ts` 中的 `INITIAL_SPEED`

### Q: 网格太大/太小？
A: 修改 `src/hooks/useGameLogic.ts` 中的 `GRID_SIZE`

### Q: 颜色不喜欢？
A: 修改 `tailwind.config.js` 或 `src/components/GameCanvas.tsx` 中的颜色

### Q: 如何添加音效？
A: 在 `src/hooks/useGameLogic.ts` 中添加 `new Audio()` 调用

### Q: 如何保存最高分？
A: 使用 `localStorage` 在 `useGameLogic.ts` 中保存分数

### Q: 如何添加排行榜？
A: 创建新的 `useLeaderboard` Hook 和 `Leaderboard` 组件

## 🔗 快速链接

- [GitHub 仓库](https://github.com/Rodert/shiyu-games)
- [问题报告](https://github.com/Rodert/shiyu-games/issues)
- [功能请求](https://github.com/Rodert/shiyu-games/issues/new)

## 📞 获取帮助

- 查看 [DOCS_INDEX.md](./DOCS_INDEX.md) 找到相关文档
- 查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 报告问题
- 在 GitHub Issues 中提问

---

**最后更新**: 2024-11-21

**提示**: 将此页面加入书签以便快速访问！
