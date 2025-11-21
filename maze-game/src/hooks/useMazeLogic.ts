import { useState, useEffect, useCallback } from 'react'

// 游戏常量
const MAZE_SIZE = 21 // 奇数，便于迷宫生成
const CELL_SIZE = 20

export interface Position {
  x: number
  y: number
}

export interface GameState {
  maze: number[][]
  playerPos: Position
  targetPos: Position
  score: number
  time: number
  gameOver: boolean
  isWon: boolean
  isPaused: boolean
  difficulty: 'easy' | 'medium' | 'hard'
  moveCount: number
}

// 迷宫生成算法（递归回溯法）
const generateMaze = (size: number): number[][] => {
  const maze = Array(size).fill(null).map(() => Array(size).fill(1))
  
  const carve = (x: number, y: number) => {
    maze[y][x] = 0
    
    // 随机方向
    const directions = [[0, -2], [2, 0], [0, 2], [-2, 0]].sort(() => Math.random() - 0.5)
    
    for (const [dx, dy] of directions) {
      const nx = x + dx
      const ny = y + dy
      
      if (nx > 0 && nx < size - 1 && ny > 0 && ny < size - 1 && maze[ny][nx] === 1) {
        maze[y + dy / 2][x + dx / 2] = 0
        carve(nx, ny)
      }
    }
  }
  
  carve(1, 1)
  return maze
}

// 获取随机空位
const getRandomEmptyPosition = (maze: number[][]): Position => {
  let x, y
  do {
    x = Math.floor(Math.random() * (MAZE_SIZE - 2)) + 1
    y = Math.floor(Math.random() * (MAZE_SIZE - 2)) + 1
  } while (maze[y][x] === 1)
  return { x, y }
}

export const useMazeLogic = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const maze = generateMaze(MAZE_SIZE)
    const playerPos = { x: 1, y: 1 }
    const targetPos = getRandomEmptyPosition(maze)
    
    return {
      maze,
      playerPos,
      targetPos,
      score: 0,
      time: 0,
      gameOver: false,
      isWon: false,
      isPaused: false,
      difficulty: 'medium',
      moveCount: 0,
    }
  })

  // 计时器
  useEffect(() => {
    if (gameState.gameOver || gameState.isWon || gameState.isPaused) return
    
    const timer = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        time: prev.time + 1,
      }))
    }, 1000)
    
    return () => clearInterval(timer)
  }, [gameState.gameOver, gameState.isWon, gameState.isPaused])

  // 检查是否到达目标
  const checkWin = useCallback((pos: Position, target: Position) => {
    return pos.x === target.x && pos.y === target.y
  }, [])

  // 移动玩家
  const movePlayer = useCallback((dx: number, dy: number) => {
    if (gameState.gameOver || gameState.isWon || gameState.isPaused) return

    setGameState(prev => {
      const newX = prev.playerPos.x + dx
      const newY = prev.playerPos.y + dy

      // 检查边界和墙壁
      if (newX < 0 || newX >= MAZE_SIZE || newY < 0 || newY >= MAZE_SIZE) return prev
      if (prev.maze[newY][newX] === 1) return prev

      const newPos = { x: newX, y: newY }
      const isWon = checkWin(newPos, prev.targetPos)

      if (isWon) {
        const baseScore = 1000
        const timeBonus = Math.max(0, 300 - prev.time) * 2
        const moveBonus = Math.max(0, 100 - prev.moveCount) * 5
        const totalScore = baseScore + timeBonus + moveBonus

        return {
          ...prev,
          playerPos: newPos,
          isWon: true,
          score: totalScore,
        }
      }

      return {
        ...prev,
        playerPos: newPos,
        moveCount: prev.moveCount + 1,
      }
    })
  }, [gameState.gameOver, gameState.isWon, gameState.isPaused, checkWin])

  // 键盘控制
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
          e.preventDefault()
          movePlayer(0, -1)
          break
        case 'arrowdown':
        case 's':
          e.preventDefault()
          movePlayer(0, 1)
          break
        case 'arrowleft':
        case 'a':
          e.preventDefault()
          movePlayer(-1, 0)
          break
        case 'arrowright':
        case 'd':
          e.preventDefault()
          movePlayer(1, 0)
          break
        case ' ':
          e.preventDefault()
          setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }))
          break
        case 'r':
          e.preventDefault()
          const maze = generateMaze(MAZE_SIZE)
          const playerPos = { x: 1, y: 1 }
          const targetPos = getRandomEmptyPosition(maze)
          setGameState({
            maze,
            playerPos,
            targetPos,
            score: 0,
            time: 0,
            gameOver: false,
            isWon: false,
            isPaused: false,
            difficulty: 'medium',
            moveCount: 0,
          })
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [movePlayer])

  // 重新生成迷宫
  const regenerateMaze = useCallback(() => {
    const maze = generateMaze(MAZE_SIZE)
    const playerPos = { x: 1, y: 1 }
    const targetPos = getRandomEmptyPosition(maze)
    
    setGameState(prev => ({
      ...prev,
      maze,
      playerPos,
      targetPos,
      score: 0,
      time: 0,
      gameOver: false,
      isWon: false,
      moveCount: 0,
    }))
  }, [])

  // 改变难度
  const changeDifficulty = useCallback((difficulty: 'easy' | 'medium' | 'hard') => {
    setGameState(prev => ({
      ...prev,
      difficulty,
    }))
    regenerateMaze()
  }, [regenerateMaze])

  // 切换暂停
  const togglePause = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPaused: !prev.isPaused,
    }))
  }, [])

  return {
    ...gameState,
    movePlayer,
    regenerateMaze,
    changeDifficulty,
    togglePause,
    MAZE_SIZE,
    CELL_SIZE,
  }
}
