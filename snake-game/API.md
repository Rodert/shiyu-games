# API 文档

## 目录

- [Hooks](#hooks)
- [Components](#components)
- [Types](#types)
- [Constants](#constants)

## Hooks

### useGameLogic

游戏逻辑管理 Hook，负责处理游戏状态和更新。

#### 导入

```typescript
import { useGameLogic } from './hooks/useGameLogic'
```

#### 用法

```typescript
const { gameState, togglePause, restart } = useGameLogic()
```

#### 返回值

```typescript
interface UseGameLogicReturn {
  gameState: GameState
  togglePause: () => void
  restart: () => void
}
```

#### gameState 属性

```typescript
interface GameState {
  // 蛇的身体段落数组，每个段落包含 x, y 坐标
  snake: Position[]
  
  // 食物位置
  food: Position
  
  // 当前移动方向
  direction: Position
  
  // 下一帧的移动方向（用于处理快速按键）
  nextDirection: Position
  
  // 当前分数
  score: number
  
  // 游戏是否结束
  gameOver: boolean
  
  // 游戏是否暂停
  isPaused: boolean
  
  // 网格大小（20x20）
  gridSize: number
  
  // 游戏速度（毫秒）
  speed: number
}
```

#### Position 类型

```typescript
interface Position {
  x: number  // 水平坐标（0-19）
  y: number  // 竖直坐标（0-19）
}
```

#### 方法

##### togglePause()

暂停或继续游戏。

```typescript
const { togglePause } = useGameLogic()

// 暂停游戏
togglePause()

// 再次调用继续游戏
togglePause()
```

**参数**: 无

**返回值**: `void`

##### restart()

重新开始游戏。

```typescript
const { restart } = useGameLogic()

// 重新开始游戏
restart()
```

**参数**: 无

**返回值**: `void`

#### 事件监听

Hook 自动监听以下键盘事件：

| 按键 | 功能 |
|------|------|
| ⬆️ / W | 向上移动 |
| ⬇️ / S | 向下移动 |
| ⬅️ / A | 向左移动 |
| ➡️ / D | 向右移动 |
| SPACE | 暂停/继续 |
| R | 重新开始 |

#### 示例

```typescript
import { useGameLogic } from './hooks/useGameLogic'

function GameComponent() {
  const { gameState, togglePause, restart } = useGameLogic()
  
  return (
    <div>
      <p>Score: {gameState.score}</p>
      <p>Length: {gameState.snake.length}</p>
      <p>Speed: {gameState.speed}ms</p>
      
      {gameState.gameOver && <p>Game Over!</p>}
      {gameState.isPaused && <p>Paused</p>}
      
      <button onClick={togglePause}>
        {gameState.isPaused ? 'Resume' : 'Pause'}
      </button>
      <button onClick={restart}>Restart</button>
    </div>
  )
}
```

## Components

### GameCanvas

使用 Canvas API 绘制游戏画面的组件。

#### 导入

```typescript
import { GameCanvas } from './components/GameCanvas'
```

#### Props

```typescript
interface GameCanvasProps {
  // 游戏状态
  gameState: GameState
}
```

#### 用法

```typescript
import { GameCanvas } from './components/GameCanvas'
import { useGameLogic } from './hooks/useGameLogic'

function App() {
  const { gameState } = useGameLogic()
  
  return <GameCanvas gameState={gameState} />
}
```

#### 绘制内容

- **背景**：深蓝色背景
- **网格**：淡绿色网格线
- **食物**：粉红色圆形，带发光效果
- **蛇**：绿色方块，蛇头为青色，带眼睛和发光效果

#### 尺寸

- **Canvas 宽度**：600px（20 格 × 30px）
- **Canvas 高度**：600px（20 格 × 30px）
- **每格大小**：30px × 30px

#### 示例

```typescript
<GameCanvas gameState={gameState} />
```

### GameUI

显示游戏信息和控制界面的组件。

#### 导入

```typescript
import { GameUI } from './components/GameUI'
```

#### Props

```typescript
interface GameUIProps {
  // 游戏状态
  gameState: GameState
  
  // 暂停/继续回调函数
  onTogglePause: () => void
  
  // 重新开始回调函数
  onRestart: () => void
}
```

#### 用法

```typescript
import { GameUI } from './components/GameUI'
import { useGameLogic } from './hooks/useGameLogic'

function App() {
  const { gameState, togglePause, restart } = useGameLogic()
  
  return (
    <GameUI
      gameState={gameState}
      onTogglePause={togglePause}
      onRestart={restart}
    />
  )
}
```

#### 显示内容

- **标题**：游戏标题和副标题
- **统计信息**：分数、蛇长度、速度等级
- **控制按钮**：暂停/继续、重新开始
- **游戏结束弹窗**：显示最终分数和蛇长度
- **操作说明**：键盘快捷键说明
- **暂停指示器**：显示游戏是否暂停

#### 示例

```typescript
<GameUI
  gameState={gameState}
  onTogglePause={togglePause}
  onRestart={restart}
/>
```

### App

主应用组件，整合游戏逻辑和 UI。

#### 导入

```typescript
import App from './App'
```

#### 用法

```typescript
import App from './App'

export default App
```

## Types

### Position

表示网格中的一个位置。

```typescript
interface Position {
  x: number  // 水平坐标（0-19）
  y: number  // 竖直坐标（0-19）
}
```

### GameState

表示游戏的完整状态。

```typescript
interface GameState {
  snake: Position[]
  food: Position
  direction: Position
  nextDirection: Position
  score: number
  gameOver: boolean
  isPaused: boolean
  gridSize: number
  speed: number
}
```

## Constants

### 游戏常量

在 `src/hooks/useGameLogic.ts` 中定义：

```typescript
// 网格大小（格子数）
const GRID_SIZE = 20

// 初始游戏速度（毫秒）
const INITIAL_SPEED = 100
```

### Canvas 常量

在 `src/components/GameCanvas.tsx` 中定义：

```typescript
// 每格的像素大小
const CELL_SIZE = 30

// 颜色定义
const GRID_COLOR = 'rgba(0, 255, 65, 0.1)'
const SNAKE_COLOR = '#00ff41'
const SNAKE_HEAD_COLOR = '#00ffff'
const FOOD_COLOR = '#ff006e'
const BACKGROUND_COLOR = '#0a0e27'
```

### Tailwind 颜色

在 `tailwind.config.js` 中定义：

```javascript
colors: {
  neon: {
    green: '#00ff41',    // 主色 - 蛇
    purple: '#b300ff',   // 辅色 - 蛇长度
    cyan: '#00ffff',     // 强调色 - 蛇头
    pink: '#ff006e',     // 强调色 - 食物
  }
}
```

## 修改常量

### 修改游戏速度

```typescript
// src/hooks/useGameLogic.ts
const INITIAL_SPEED = 150  // 改为 150ms
```

### 修改网格大小

```typescript
// src/hooks/useGameLogic.ts
const GRID_SIZE = 25  // 改为 25x25

// src/components/GameCanvas.tsx
const CELL_SIZE = 24  // 调整为 600px / 25 = 24px
```

### 修改颜色

```typescript
// tailwind.config.js
colors: {
  neon: {
    green: '#00ff00',    // 改为纯绿色
    purple: '#ff00ff',   // 改为纯紫色
    cyan: '#00ffff',     // 保持不变
    pink: '#ff0080',     // 改为不同的粉红色
  }
}
```

## 扩展 API

### 添加新的 Hook

```typescript
// src/hooks/useNewFeature.ts
import { useState, useCallback } from 'react'

export const useNewFeature = () => {
  const [state, setState] = useState(false)
  
  const toggle = useCallback(() => {
    setState(prev => !prev)
  }, [])
  
  return { state, toggle }
}
```

### 添加新的组件

```typescript
// src/components/NewComponent.tsx
import React from 'react'

interface NewComponentProps {
  prop1: string
  prop2: number
}

export const NewComponent: React.FC<NewComponentProps> = ({ prop1, prop2 }) => {
  return (
    <div>
      <p>{prop1}</p>
      <p>{prop2}</p>
    </div>
  )
}
```

## 性能考虑

### Canvas 性能

- Canvas 绘制在每个游戏状态更新时执行
- 使用 `useRef` 缓存 Canvas 引用
- 避免在 Canvas 绘制中进行复杂计算

### 状态管理性能

- 使用 `useCallback` 缓存函数
- 使用 `useMemo` 缓存计算结果
- 避免在渲染时创建新对象

### 游戏循环性能

- 使用 `setInterval` 而不是 `requestAnimationFrame`
- 游戏速度可调，最低 50ms
- 避免在游戏循环中进行 I/O 操作

## 许可证

MIT
