import { useState, useEffect, useCallback } from 'react'

// 游戏常量
const GRID_WIDTH = 8
const GRID_HEIGHT = 16
const CELL_SIZE = 25

// 俄罗斯方块形状定义
const TETRIS_SHAPES = {
  I: [[1, 1, 1, 1]],
  O: [[1, 1], [1, 1]],
  T: [[0, 1, 0], [1, 1, 1]],
  S: [[0, 1, 1], [1, 1, 0]],
  Z: [[1, 1, 0], [0, 1, 1]],
  J: [[1, 0, 0], [1, 1, 1]],
  L: [[0, 0, 1], [1, 1, 1]],
}

const TETRIS_COLORS = {
  I: '#00ffff',
  O: '#ffff00',
  T: '#ff00ff',
  S: '#00ff00',
  Z: '#ff0000',
  J: '#0000ff',
  L: '#ff7700',
}

export interface GameState {
  grid: (string | number)[][]
  currentPiece: number[][] | null
  currentColor: string | null
  position: { x: number; y: number }
  score: number
  level: number
  lines: number
  gameOver: boolean
  isPaused: boolean
  combo: number
}

export const useSpeedTetrisLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    grid: Array(GRID_HEIGHT).fill(null).map(() => Array(GRID_WIDTH).fill(0)),
    currentPiece: null,
    currentColor: null,
    position: { x: 0, y: 0 },
    score: 0,
    level: 1,
    lines: 0,
    gameOver: false,
    isPaused: false,
    combo: 0,
  })

  // 获取随机方块
  const getRandomPiece = useCallback(() => {
    const shapes = Object.entries(TETRIS_SHAPES)
    const [shapeKey, shape] = shapes[Math.floor(Math.random() * shapes.length)]
    return {
      piece: shape,
      color: TETRIS_COLORS[shapeKey as keyof typeof TETRIS_COLORS],
    }
  }, [])

  // 生成新方块
  const spawnNewPiece = useCallback(() => {
    const { piece, color } = getRandomPiece()
    setGameState(prev => ({
      ...prev,
      currentPiece: piece,
      currentColor: color,
      position: { x: Math.floor((GRID_WIDTH - piece[0].length) / 2), y: 0 },
    }))
  }, [getRandomPiece])

  // 初始化游戏
  useEffect(() => {
    spawnNewPiece()
  }, [spawnNewPiece])

  // 检查碰撞
  const checkCollision = useCallback((piece: number[][], x: number, y: number, grid: (string | number)[][]) => {
    for (let row = 0; row < piece.length; row++) {
      for (let col = 0; col < piece[row].length; col++) {
        if (piece[row][col]) {
          const newX = x + col
          const newY = y + row

          if (newX < 0 || newX >= GRID_WIDTH || newY >= GRID_HEIGHT) {
            return true
          }

          if (newY >= 0 && grid[newY][newX]) {
            return true
          }
        }
      }
    }
    return false
  }, [])

  // 放置方块
  const placePiece = useCallback(() => {
    setGameState(prev => {
      if (!prev.currentPiece) return prev

      const newGrid = prev.grid.map(row => [...row])
      const { currentPiece, position, currentColor } = prev

      // 将方块放到网格上
      for (let row = 0; row < currentPiece.length; row++) {
        for (let col = 0; col < currentPiece[row].length; col++) {
          if (currentPiece[row][col]) {
            const y = position.y + row
            const x = position.x + col
            if (y >= 0 && y < GRID_HEIGHT && x >= 0 && x < GRID_WIDTH) {
              newGrid[y][x] = currentColor || '#00ff41'
            }
          }
        }
      }

      // 检查完成的行
      let completedLines = 0
      for (let row = GRID_HEIGHT - 1; row >= 0; row--) {
        if (newGrid[row].every(cell => cell)) {
          newGrid.splice(row, 1)
          newGrid.unshift(Array(GRID_WIDTH).fill(0))
          completedLines++
        }
      }

      // 加速版本：更高的分数和连击系统
      const scoreIncrease = [0, 100, 300, 700, 1500][completedLines] || 0
      const newScore = prev.score + scoreIncrease
      const newCombo = completedLines > 0 ? prev.combo + 1 : 0
      const bonusScore = newCombo > 1 ? scoreIncrease * (newCombo - 1) : 0
      const totalScore = newScore + bonusScore
      const newLevel = Math.floor(totalScore / 2000) + 1

      return {
        ...prev,
        grid: newGrid,
        score: totalScore,
        level: newLevel,
        lines: prev.lines + completedLines,
        currentPiece: null,
        currentColor: null,
        combo: newCombo,
      }
    })
  }, [])

  // 移动方块
  const movePiece = useCallback((dx: number, dy: number) => {
    if (gameState.isPaused || gameState.gameOver || !gameState.currentPiece) return

    const newX = gameState.position.x + dx
    const newY = gameState.position.y + dy

    if (!checkCollision(gameState.currentPiece, newX, newY, gameState.grid)) {
      setGameState(prev => ({
        ...prev,
        position: { x: newX, y: newY },
      }))
    } else if (dy > 0) {
      // 如果是向下移动且碰撞，放置方块
      placePiece()
    }
  }, [gameState, checkCollision, placePiece])

  // 旋转方块
  const rotatePiece = useCallback(() => {
    if (gameState.isPaused || gameState.gameOver || !gameState.currentPiece) return

    const piece = gameState.currentPiece
    const rotated = piece[0].map((_, i) => piece.map(row => row[i]).reverse())

    if (!checkCollision(rotated, gameState.position.x, gameState.position.y, gameState.grid)) {
      setGameState(prev => ({
        ...prev,
        currentPiece: rotated,
      }))
    }
  }, [gameState, checkCollision])

  // 键盘控制
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'arrowleft':
        case 'a':
          e.preventDefault()
          movePiece(-1, 0)
          break
        case 'arrowright':
        case 'd':
          e.preventDefault()
          movePiece(1, 0)
          break
        case 'arrowdown':
        case 's':
          e.preventDefault()
          movePiece(0, 1)
          break
        case ' ':
          e.preventDefault()
          setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }))
          break
        case 'r':
          e.preventDefault()
          setGameState({
            grid: Array(GRID_HEIGHT).fill(null).map(() => Array(GRID_WIDTH).fill(0)),
            currentPiece: null,
            currentColor: null,
            position: { x: 0, y: 0 },
            score: 0,
            level: 1,
            lines: 0,
            gameOver: false,
            isPaused: false,
            combo: 0,
          })
          spawnNewPiece()
          break
        case 'w':
          e.preventDefault()
          rotatePiece()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [movePiece, rotatePiece, spawnNewPiece])

  // 游戏循环 - 加速版本
  useEffect(() => {
    if (gameState.gameOver || gameState.isPaused) return

    const speed = Math.max(50, 300 - gameState.level * 30)
    const interval = setInterval(() => {
      movePiece(0, 1)
    }, speed)

    return () => clearInterval(interval)
  }, [gameState.gameOver, gameState.isPaused, gameState.level, movePiece])

  // 生成新方块
  useEffect(() => {
    if (!gameState.currentPiece) {
      spawnNewPiece()
    }
  }, [gameState.currentPiece, spawnNewPiece])

  return {
    ...gameState,
    movePiece,
    rotatePiece,
    GRID_WIDTH,
    GRID_HEIGHT,
    CELL_SIZE,
  }
}
