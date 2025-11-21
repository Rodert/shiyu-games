import { useState, useEffect, useCallback, useRef } from 'react'

// 游戏常量
const CANVAS_WIDTH = 400
const CANVAS_HEIGHT = 600
const PLAYER_SIZE = 20
const PLATFORM_WIDTH = 60
const PLATFORM_HEIGHT = 12
const GRAVITY = 0.6
const JUMP_STRENGTH = 15

export interface Player {
  x: number
  y: number
  velocityY: number
  width: number
  height: number
}

export interface Platform {
  x: number
  y: number
  width: number
  height: number
  id: number
}

export interface GameState {
  player: Player
  platforms: Platform[]
  score: number
  height: number
  gameOver: boolean
  isPaused: boolean
  gameStarted: boolean
}

let platformId = 0

// 生成平台
const generatePlatform = (y: number): Platform => {
  return {
    x: Math.random() * (CANVAS_WIDTH - PLATFORM_WIDTH),
    y,
    width: PLATFORM_WIDTH,
    height: PLATFORM_HEIGHT,
    id: platformId++,
  }
}

export const useJumpLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    player: {
      x: CANVAS_WIDTH / 2 - PLAYER_SIZE / 2,
      y: CANVAS_HEIGHT - 100,
      velocityY: 0,
      width: PLAYER_SIZE,
      height: PLAYER_SIZE,
    },
    platforms: [
      generatePlatform(CANVAS_HEIGHT - 50),
      generatePlatform(CANVAS_HEIGHT - 150),
      generatePlatform(CANVAS_HEIGHT - 250),
      generatePlatform(CANVAS_HEIGHT - 350),
      generatePlatform(CANVAS_HEIGHT - 450),
    ],
    score: 0,
    height: 0,
    gameOver: false,
    isPaused: false,
    gameStarted: false,
  })

  const playerXRef = useRef(CANVAS_WIDTH / 2 - PLAYER_SIZE / 2)

  // 检查碰撞
  const checkCollision = useCallback((player: Player, platforms: Platform[]) => {
    for (const platform of platforms) {
      if (
        player.velocityY > 0 &&
        player.y + player.height >= platform.y &&
        player.y + player.height <= platform.y + platform.height + 5 &&
        player.x + player.width > platform.x &&
        player.x < platform.x + platform.width
      ) {
        return platform
      }
    }
    return null
  }, [])

  // 键盘控制移动
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'arrowleft':
        case 'a':
          e.preventDefault()
          playerXRef.current = Math.max(0, playerXRef.current - 10)
          break
        case 'arrowright':
        case 'd':
          e.preventDefault()
          playerXRef.current = Math.min(CANVAS_WIDTH - PLAYER_SIZE, playerXRef.current + 10)
          break
        case ' ':
          e.preventDefault()
          setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }))
          break
        case 'r':
          e.preventDefault()
          setGameState({
            player: {
              x: CANVAS_WIDTH / 2 - PLAYER_SIZE / 2,
              y: CANVAS_HEIGHT - 100,
              velocityY: 0,
              width: PLAYER_SIZE,
              height: PLAYER_SIZE,
            },
            platforms: [
              generatePlatform(CANVAS_HEIGHT - 50),
              generatePlatform(CANVAS_HEIGHT - 150),
              generatePlatform(CANVAS_HEIGHT - 250),
              generatePlatform(CANVAS_HEIGHT - 350),
              generatePlatform(CANVAS_HEIGHT - 450),
            ],
            score: 0,
            height: 0,
            gameOver: false,
            isPaused: false,
            gameStarted: false,
          })
          playerXRef.current = CANVAS_WIDTH / 2 - PLAYER_SIZE / 2
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // 游戏循环
  useEffect(() => {
    if (gameState.gameOver || gameState.isPaused) return

    const gameLoop = setInterval(() => {
      setGameState(prev => {
        let newPlayer = { ...prev.player }
        let newPlatforms = [...prev.platforms]
        let newScore = prev.score
        let newHeight = prev.height

        // 更新玩家位置
        newPlayer.x = playerXRef.current
        newPlayer.velocityY += GRAVITY
        newPlayer.y += newPlayer.velocityY

        // 检查平台碰撞
        const collidedPlatform = checkCollision(newPlayer, newPlatforms)
        if (collidedPlatform) {
          newPlayer.velocityY = -JUMP_STRENGTH
          newScore += 10
          newHeight = Math.max(newHeight, CANVAS_HEIGHT - newPlayer.y)
        }

        // 环绕屏幕边界
        if (newPlayer.x < 0) newPlayer.x = CANVAS_WIDTH
        if (newPlayer.x + newPlayer.width > CANVAS_WIDTH) newPlayer.x = -newPlayer.width

        // 生成新平台
        const lowestPlatform = newPlatforms.reduce((lowest, p) =>
          p.y > lowest.y ? p : lowest
        )

        if (lowestPlatform.y > newPlayer.y - 200) {
          newPlatforms.push(generatePlatform(lowestPlatform.y - 100))
        }

        // 移除离开屏幕的平台
        newPlatforms = newPlatforms.filter(p => p.y < CANVAS_HEIGHT + 50)

        // 游戏结束检查
        if (newPlayer.y > CANVAS_HEIGHT) {
          return {
            ...prev,
            gameOver: true,
            score: newScore,
            height: newHeight,
          }
        }

        return {
          ...prev,
          player: newPlayer,
          platforms: newPlatforms,
          score: newScore,
          height: newHeight,
          gameStarted: true,
        }
      })
    }, 30)

    return () => clearInterval(gameLoop)
  }, [gameState.gameOver, gameState.isPaused, checkCollision])

  return {
    ...gameState,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    PLAYER_SIZE,
    PLATFORM_WIDTH,
    PLATFORM_HEIGHT,
  }
}
