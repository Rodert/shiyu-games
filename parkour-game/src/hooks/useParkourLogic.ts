import { useState, useEffect, useCallback, useRef } from 'react'

// 游戏常量
const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 400
const PLAYER_WIDTH = 30
const PLAYER_HEIGHT = 40
const GRAVITY = 0.6
const JUMP_STRENGTH = -12
const GROUND_Y = CANVAS_HEIGHT - PLAYER_HEIGHT - 20

export interface Player {
  x: number
  y: number
  velocityY: number
  isJumping: boolean
  width: number
  height: number
}

export interface Obstacle {
  x: number
  y: number
  width: number
  height: number
  id: number
  type: 'spike' | 'box' | 'gap'
}

export interface Cloud {
  x: number
  y: number
  id: number
}

export interface GameState {
  player: Player
  obstacles: Obstacle[]
  clouds: Cloud[]
  score: number
  gameOver: boolean
  isPaused: boolean
  gameStarted: boolean
  difficulty: 'easy' | 'normal' | 'hard'
  highScore: number
}

let obstacleId = 0
let cloudId = 0

export const useParkourLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    player: {
      x: 50,
      y: GROUND_Y,
      velocityY: 0,
      isJumping: false,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
    },
    obstacles: [],
    clouds: [],
    score: 0,
    gameOver: false,
    isPaused: false,
    gameStarted: false,
    difficulty: 'normal',
    highScore: parseInt(localStorage.getItem('parkour-highscore') || '0'),
  })

  const frameCountRef = useRef(0)
  const spawnCountRef = useRef(0)

  // 获取难度参数
  const getDifficultyParams = useCallback((difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return { spawnRate: 100, speed: 3, obstacleTypes: ['box'] }
      case 'hard':
        return { spawnRate: 50, speed: 6, obstacleTypes: ['spike', 'box', 'gap'] }
      default:
        return { spawnRate: 70, speed: 4, obstacleTypes: ['spike', 'box'] }
    }
  }, [])

  // 生成障碍物
  const spawnObstacle = useCallback((difficulty: string) => {
    const params = getDifficultyParams(difficulty)
    const type = params.obstacleTypes[Math.floor(Math.random() * params.obstacleTypes.length)]
    
    let width = 30
    let height = 40
    
    if (type === 'spike') {
      width = 20
      height = 30
    } else if (type === 'box') {
      width = 40
      height = 40
    } else if (type === 'gap') {
      width = 60
      height = 5
    }

    return {
      x: CANVAS_WIDTH,
      y: type === 'gap' ? GROUND_Y + PLAYER_HEIGHT : GROUND_Y,
      width,
      height,
      id: obstacleId++,
      type: type as 'spike' | 'box' | 'gap',
    }
  }, [getDifficultyParams])

  // 生成云朵
  const spawnCloud = useCallback(() => {
    return {
      x: CANVAS_WIDTH,
      y: Math.random() * (CANVAS_HEIGHT / 2),
      id: cloudId++,
    }
  }, [])

  // 跳跃
  const jump = useCallback(() => {
    setGameState(prev => {
      if (!prev.player.isJumping && !prev.gameOver && prev.gameStarted) {
        return {
          ...prev,
          player: {
            ...prev.player,
            velocityY: JUMP_STRENGTH,
            isJumping: true,
          },
        }
      }
      return prev
    })
  }, [])

  // 改变难度
  const changeDifficulty = useCallback((difficulty: 'easy' | 'normal' | 'hard') => {
    setGameState(prev => ({
      ...prev,
      difficulty,
    }))
  }, [])

  // 键盘控制
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case ' ':
        case 'arrowup':
        case 'w':
          e.preventDefault()
          jump()
          break
        case 'p':
          e.preventDefault()
          setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }))
          break
        case 'r':
          e.preventDefault()
          setGameState(prev => ({
            ...prev,
            player: {
              x: 50,
              y: GROUND_Y,
              velocityY: 0,
              isJumping: false,
              width: PLAYER_WIDTH,
              height: PLAYER_HEIGHT,
            },
            obstacles: [],
            clouds: [],
            score: 0,
            gameOver: false,
            isPaused: false,
            gameStarted: false,
          }))
          frameCountRef.current = 0
          spawnCountRef.current = 0
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
    if (gameState.gameOver || gameState.isPaused) return

    const gameLoop = setInterval(() => {
      setGameState(prev => {
        if (!prev.gameStarted) {
          return { ...prev, gameStarted: true }
        }

        const params = getDifficultyParams(prev.difficulty)
        let newPlayer = { ...prev.player }
        let newObstacles = prev.obstacles.map(o => ({ ...o, x: o.x - params.speed }))
        let newClouds = prev.clouds.map(c => ({ ...c, x: c.x - params.speed / 2 }))
        let newScore = prev.score

        // 应用重力
        newPlayer.velocityY += GRAVITY
        newPlayer.y += newPlayer.velocityY

        // 地面碰撞
        if (newPlayer.y >= GROUND_Y) {
          newPlayer.y = GROUND_Y
          newPlayer.velocityY = 0
          newPlayer.isJumping = false
        }

        // 生成新障碍物
        frameCountRef.current++
        spawnCountRef.current++
        if (spawnCountRef.current % params.spawnRate === 0) {
          newObstacles.push(spawnObstacle(prev.difficulty))
        }

        // 生成云朵
        if (frameCountRef.current % 200 === 0) {
          newClouds.push(spawnCloud())
        }

        // 移除离开屏幕的障碍物和云朵
        newObstacles = newObstacles.filter(o => o.x + o.width > 0)
        newClouds = newClouds.filter(c => c.x + 50 > 0)

        // 计分
        for (let i = newObstacles.length - 1; i >= 0; i--) {
          const obstacle = newObstacles[i]
          if (obstacle.x + obstacle.width < 50 && obstacle.x + obstacle.width > 45) {
            newScore += 10
          }
        }

        // 检查碰撞
        for (let i = newObstacles.length - 1; i >= 0; i--) {
          const obstacle = newObstacles[i]
          
          // 检查与障碍物碰撞
          if (
            newPlayer.x < obstacle.x + obstacle.width &&
            newPlayer.x + newPlayer.width > obstacle.x &&
            newPlayer.y < obstacle.y + obstacle.height &&
            newPlayer.y + newPlayer.height > obstacle.y
          ) {
            return {
              ...prev,
              gameOver: true,
              score: newScore,
              highScore: Math.max(prev.highScore, newScore),
            }
          }
        }

        return {
          ...prev,
          player: newPlayer,
          obstacles: newObstacles,
          clouds: newClouds,
          score: newScore,
        }
      })
    }, 30)

    return () => clearInterval(gameLoop)
  }, [gameState.gameOver, gameState.isPaused, getDifficultyParams, spawnObstacle, spawnCloud])

  // 保存高分
  useEffect(() => {
    localStorage.setItem('parkour-highscore', gameState.highScore.toString())
  }, [gameState.highScore])

  return {
    ...gameState,
    jump,
    changeDifficulty,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    PLAYER_WIDTH,
    PLAYER_HEIGHT,
    GROUND_Y,
  }
}
