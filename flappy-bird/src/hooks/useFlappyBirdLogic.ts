import { useState, useEffect, useCallback } from 'react'

// 游戏常量
const CANVAS_WIDTH = 400
const CANVAS_HEIGHT = 600
const BIRD_SIZE = 20
const PIPE_WIDTH = 60
const PIPE_GAP = 120
const GRAVITY = 0.5
const JUMP_STRENGTH = -12
const PIPE_SPEED = 4
const PIPE_SPAWN_RATE = 90

export interface Bird {
  x: number
  y: number
  velocity: number
}

export interface Pipe {
  x: number
  topHeight: number
  bottomY: number
}

export interface GameState {
  bird: Bird
  pipes: Pipe[]
  score: number
  gameOver: boolean
  isPaused: boolean
  gameStarted: boolean
}

export const useFlappyBirdLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    bird: {
      x: 60,
      y: CANVAS_HEIGHT / 2,
      velocity: 0,
    },
    pipes: [],
    score: 0,
    gameOver: false,
    isPaused: false,
    gameStarted: false,
  })

  const [frameCount, setFrameCount] = useState(0)

  // 生成管道
  const generatePipe = useCallback(() => {
    const minHeight = 50
    const maxHeight = CANVAS_HEIGHT - PIPE_GAP - 50
    const topHeight = Math.random() * (maxHeight - minHeight) + minHeight
    const bottomY = topHeight + PIPE_GAP

    return {
      x: CANVAS_WIDTH,
      topHeight,
      bottomY,
    }
  }, [])

  // 检查碰撞
  const checkCollision = useCallback((bird: Bird, pipes: Pipe[]) => {
    // 检查与上下边界的碰撞
    if (bird.y - BIRD_SIZE / 2 <= 0 || bird.y + BIRD_SIZE / 2 >= CANVAS_HEIGHT) {
      return true
    }

    // 检查与管道的碰撞
    for (const pipe of pipes) {
      if (
        bird.x + BIRD_SIZE / 2 > pipe.x &&
        bird.x - BIRD_SIZE / 2 < pipe.x + PIPE_WIDTH
      ) {
        if (bird.y - BIRD_SIZE / 2 < pipe.topHeight || bird.y + BIRD_SIZE / 2 > pipe.bottomY) {
          return true
        }
      }
    }

    return false
  }, [])

  // 跳跃
  const jump = useCallback(() => {
    if (gameState.gameOver || gameState.isPaused) return

    if (!gameState.gameStarted) {
      setGameState(prev => ({
        ...prev,
        gameStarted: true,
      }))
    }

    setGameState(prev => ({
      ...prev,
      bird: {
        ...prev.bird,
        velocity: JUMP_STRENGTH,
      },
    }))
  }, [gameState.gameOver, gameState.isPaused, gameState.gameStarted])

  // 键盘控制
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case ' ':
        case 'w':
        case 'arrowup':
          e.preventDefault()
          jump()
          break
        case 'p':
          e.preventDefault()
          setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }))
          break
        case 'r':
          e.preventDefault()
          setGameState({
            bird: {
              x: 60,
              y: CANVAS_HEIGHT / 2,
              velocity: 0,
            },
            pipes: [],
            score: 0,
            gameOver: false,
            isPaused: false,
            gameStarted: false,
          })
          setFrameCount(0)
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [jump])

  // 游戏循环
  useEffect(() => {
    if (gameState.gameOver || gameState.isPaused || !gameState.gameStarted) return

    const gameLoop = setInterval(() => {
      setGameState(prev => {
        let newBird = { ...prev.bird }
        let newPipes = prev.pipes.map(pipe => ({ ...pipe, x: pipe.x - PIPE_SPEED }))
        let newScore = prev.score

        // 更新鸟的物理
        newBird.velocity += GRAVITY
        newBird.y += newBird.velocity

        // 移除离开屏幕的管道
        newPipes = newPipes.filter(pipe => pipe.x + PIPE_WIDTH > 0)

        // 生成新管道
        setFrameCount(prev => {
          const newCount = prev + 1
          if (newCount % PIPE_SPAWN_RATE === 0) {
            newPipes.push(generatePipe())
          }
          return newCount
        })

        // 检查通过管道
        for (const pipe of prev.pipes) {
          if (pipe.x + PIPE_WIDTH === 60) {
            newScore += 1
          }
        }

        // 检查碰撞
        if (checkCollision(newBird, newPipes)) {
          return {
            ...prev,
            gameOver: true,
            bird: newBird,
            pipes: newPipes,
          }
        }

        return {
          ...prev,
          bird: newBird,
          pipes: newPipes,
          score: newScore,
        }
      })
    }, 30)

    return () => clearInterval(gameLoop)
  }, [gameState.gameOver, gameState.isPaused, gameState.gameStarted, checkCollision, generatePipe])

  return {
    ...gameState,
    jump,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    BIRD_SIZE,
    PIPE_WIDTH,
    PIPE_GAP,
  }
}
