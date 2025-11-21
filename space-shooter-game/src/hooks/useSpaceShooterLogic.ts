import { useState, useEffect, useCallback } from 'react'

export interface Player {
  x: number
  y: number
  width: number
  height: number
}

export interface Enemy {
  id: number
  x: number
  y: number
  width: number
  height: number
}

export interface Bullet {
  id: number
  x: number
  y: number
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
  wave: number
}

let enemyId = 0
let bulletId = 0

export const useSpaceShooterLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    player: { x: 175, y: 550, width: 50, height: 50 },
    enemies: [],
    bullets: [],
    score: 0,
    health: 3,
    gameOver: false,
    isPaused: false,
    gameStarted: false,
    wave: 1,
  })

  const playerXRef = React.useRef(175)

  // 生成敌人
  const spawnEnemies = useCallback((count: number) => {
    const newEnemies = []
    for (let i = 0; i < count; i++) {
      newEnemies.push({
        id: enemyId++,
        x: Math.random() * 350,
        y: -50,
        width: 40,
        height: 40,
      })
    }
    return newEnemies
  }, [])

  // 初始化游戏
  useEffect(() => {
    if (gameState.gameStarted && gameState.enemies.length === 0) {
      setGameState(prev => ({
        ...prev,
        enemies: spawnEnemies(3 + prev.wave),
      }))
    }
  }, [gameState.gameStarted, gameState.enemies.length, gameState.wave, spawnEnemies])

  // 键盘控制
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'arrowleft':
        case 'a':
          e.preventDefault()
          playerXRef.current = Math.max(0, playerXRef.current - 20)
          break
        case 'arrowright':
        case 'd':
          e.preventDefault()
          playerXRef.current = Math.min(350, playerXRef.current + 20)
          break
        case ' ':
          e.preventDefault()
          shoot()
          break
        case 'p':
          e.preventDefault()
          setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }))
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // 发射子弹
  const shoot = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      bullets: [
        ...prev.bullets,
        {
          id: bulletId++,
          x: prev.player.x + 20,
          y: prev.player.y,
        },
      ],
    }))
  }, [])

  // 游戏循环
  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver || gameState.isPaused) return

    const gameLoop = setInterval(() => {
      setGameState(prev => {
        let newPlayer = { ...prev.player, x: playerXRef.current }
        let newEnemies = prev.enemies.map(e => ({ ...e, y: e.y + 3 }))
        let newBullets = prev.bullets.map(b => ({ ...b, y: b.y - 8 }))
        let newScore = prev.score
        let newHealth = prev.health
        let newWave = prev.wave

        // 移除离开屏幕的敌人
        newEnemies = newEnemies.filter(e => {
          if (e.y > 600) {
            newHealth--
            return false
          }
          return true
        })

        // 移除离开屏幕的子弹
        newBullets = newBullets.filter(b => b.y > 0)

        // 检查碰撞
        for (let i = newBullets.length - 1; i >= 0; i--) {
          const bullet = newBullets[i]
          for (let j = newEnemies.length - 1; j >= 0; j--) {
            const enemy = newEnemies[j]
            if (
              bullet.x < enemy.x + enemy.width &&
              bullet.x + 5 > enemy.x &&
              bullet.y < enemy.y + enemy.height &&
              bullet.y + 10 > enemy.y
            ) {
              newBullets.splice(i, 1)
              newEnemies.splice(j, 1)
              newScore += 10
              break
            }
          }
        }

        // 检查敌人与玩家碰撞
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
          }
        }

        if (newHealth <= 0) {
          return {
            ...prev,
            gameOver: true,
            score: newScore,
          }
        }

        // 波次升级
        if (newEnemies.length === 0) {
          newWave++
        }

        return {
          ...prev,
          player: newPlayer,
          enemies: newEnemies,
          bullets: newBullets,
          score: newScore,
          health: newHealth,
          wave: newWave,
        }
      })
    }, 30)

    return () => clearInterval(gameLoop)
  }, [gameState.gameStarted, gameState.gameOver, gameState.isPaused])

  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gameStarted: true,
    }))
  }, [])

  const restart = useCallback(() => {
    setGameState({
      player: { x: 175, y: 550, width: 50, height: 50 },
      enemies: [],
      bullets: [],
      score: 0,
      health: 3,
      gameOver: false,
      isPaused: false,
      gameStarted: false,
      wave: 1,
    })
    playerXRef.current = 175
  }, [])

  return {
    ...gameState,
    shoot,
    startGame,
    restart,
  }
}

import React from 'react'
