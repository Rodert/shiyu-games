import { useState, useEffect, useCallback, useRef } from 'react'

// 游戏常量
const CANVAS_WIDTH = 400
const CANVAS_HEIGHT = 600
const PLAYER_SIZE = 30
const ENEMY_SIZE = 25
const BULLET_SIZE = 5
const ENEMY_SPAWN_RATE = 60

export interface Player {
  x: number
  y: number
  width: number
  height: number
}

export interface Enemy {
  x: number
  y: number
  width: number
  height: number
  id: number
}

export interface Bullet {
  x: number
  y: number
  id: number
}

export interface GameState {
  player: Player
  enemies: Enemy[]
  bullets: Bullet[]
  score: number
  health: number
  gameOver: boolean
  isPaused: boolean
  gameStarted: boolean
}

let enemyId = 0
let bulletId = 0

export const useAirplaneLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    player: {
      x: CANVAS_WIDTH / 2 - PLAYER_SIZE / 2,
      y: CANVAS_HEIGHT - 60,
      width: PLAYER_SIZE,
      height: PLAYER_SIZE,
    },
    enemies: [],
    bullets: [],
    score: 0,
    health: 3,
    gameOver: false,
    isPaused: false,
    gameStarted: false,
  })

  const playerXRef = useRef(CANVAS_WIDTH / 2 - PLAYER_SIZE / 2)
  const frameCountRef = useRef(0)

  // 生成敌机
  const spawnEnemy = useCallback(() => {
    return {
      x: Math.random() * (CANVAS_WIDTH - ENEMY_SIZE),
      y: -ENEMY_SIZE,
      width: ENEMY_SIZE,
      height: ENEMY_SIZE,
      id: enemyId++,
    }
  }, [])

  // 发射子弹
  const shoot = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      bullets: [
        ...prev.bullets,
        {
          x: prev.player.x + prev.player.width / 2 - BULLET_SIZE / 2,
          y: prev.player.y,
          id: bulletId++,
        },
      ],
    }))
  }, [])

  // 键盘控制
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'arrowleft':
        case 'a':
          e.preventDefault()
          playerXRef.current = Math.max(0, playerXRef.current - 15)
          break
        case 'arrowright':
        case 'd':
          e.preventDefault()
          playerXRef.current = Math.min(CANVAS_WIDTH - PLAYER_SIZE, playerXRef.current + 15)
          break
        case ' ':
          e.preventDefault()
          shoot()
          break
        case 'p':
          e.preventDefault()
          setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }))
          break
        case 'r':
          e.preventDefault()
          setGameState({
            player: {
              x: CANVAS_WIDTH / 2 - PLAYER_SIZE / 2,
              y: CANVAS_HEIGHT - 60,
              width: PLAYER_SIZE,
              height: PLAYER_SIZE,
            },
            enemies: [],
            bullets: [],
            score: 0,
            health: 3,
            gameOver: false,
            isPaused: false,
            gameStarted: false,
          })
          playerXRef.current = CANVAS_WIDTH / 2 - PLAYER_SIZE / 2
          frameCountRef.current = 0
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shoot])

  // 游戏循环
  useEffect(() => {
    if (gameState.gameOver || gameState.isPaused) return

    const gameLoop = setInterval(() => {
      setGameState(prev => {
        let newPlayer = { ...prev.player }
        let newEnemies = prev.enemies.map(e => ({ ...e, y: e.y + 4 }))
        let newBullets = prev.bullets.map(b => ({ ...b, y: b.y - 8 }))
        let newScore = prev.score
        let newHealth = prev.health

        // 更新玩家位置
        newPlayer.x = playerXRef.current

        // 生成新敌机
        frameCountRef.current++
        if (frameCountRef.current % ENEMY_SPAWN_RATE === 0) {
          newEnemies.push(spawnEnemy())
        }

        // 移除离开屏幕的敌机
        newEnemies = newEnemies.filter(e => e.y < CANVAS_HEIGHT)

        // 移除离开屏幕的子弹
        newBullets = newBullets.filter(b => b.y > 0)

        // 检查子弹与敌机碰撞
        for (let i = newBullets.length - 1; i >= 0; i--) {
          const bullet = newBullets[i]
          for (let j = newEnemies.length - 1; j >= 0; j--) {
            const enemy = newEnemies[j]
            if (
              bullet.x < enemy.x + enemy.width &&
              bullet.x + BULLET_SIZE > enemy.x &&
              bullet.y < enemy.y + enemy.height &&
              bullet.y + BULLET_SIZE > enemy.y
            ) {
              newBullets.splice(i, 1)
              newEnemies.splice(j, 1)
              newScore += 10
              break
            }
          }
        }

        // 检查敌机与玩家碰撞
        for (let i = newEnemies.length - 1; i >= 0; i--) {
          const enemy = newEnemies[i]
          if (
            newPlayer.x < enemy.x + enemy.width &&
            newPlayer.x + newPlayer.width > enemy.x &&
            newPlayer.y < enemy.y + enemy.height &&
            newPlayer.y + newPlayer.height > enemy.y
          ) {
            newEnemies.splice(i, 1)
            newHealth--
            if (newHealth <= 0) {
              return {
                ...prev,
                gameOver: true,
                score: newScore,
              }
            }
          }
        }

        return {
          ...prev,
          player: newPlayer,
          enemies: newEnemies,
          bullets: newBullets,
          score: newScore,
          health: newHealth,
          gameStarted: true,
        }
      })
    }, 30)

    return () => clearInterval(gameLoop)
  }, [gameState.gameOver, gameState.isPaused, spawnEnemy])

  return {
    ...gameState,
    shoot,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    PLAYER_SIZE,
    ENEMY_SIZE,
    BULLET_SIZE,
  }
}
