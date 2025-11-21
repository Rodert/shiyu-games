import { useState, useEffect, useCallback } from 'react'

export interface Player {
  x: number
  y: number
  size: number
}

export interface Ball {
  id: number
  x: number
  y: number
  size: number
  vx: number
  vy: number
}

export interface GameState {
  player: Player
  balls: Ball[]
  score: number
  health: number
  gameOver: boolean
  gameStarted: boolean
  level: number
}

let ballId = 0

export const useBallDodgerLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    player: { x: 175, y: 550, size: 30 },
    balls: [],
    score: 0,
    health: 3,
    gameOver: false,
    gameStarted: false,
    level: 1,
  })

  const playerXRef = { current: 175 }

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'arrowleft':
        case 'a':
          playerXRef.current = Math.max(0, playerXRef.current - 15)
          break
        case 'arrowright':
        case 'd':
          playerXRef.current = Math.min(350, playerXRef.current + 15)
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Spawn balls
  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver) return

    const spawnInterval = setInterval(() => {
      setGameState(prev => {
        const newBall: Ball = {
          id: ballId++,
          x: Math.random() * 350,
          y: -20,
          size: 15,
          vx: (Math.random() - 0.5) * 2,
          vy: 2 + prev.level * 0.5,
        }
        return {
          ...prev,
          balls: [...prev.balls, newBall],
        }
      })
    }, 1000 / (1 + gameState.level * 0.2))

    return () => clearInterval(spawnInterval)
  }, [gameState.gameStarted, gameState.gameOver, gameState.level])

  // Game loop
  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver) return

    const gameLoop = setInterval(() => {
      setGameState(prev => {
        const newPlayer = { ...prev.player, x: playerXRef.current }
        let newBalls = prev.balls.map(b => ({
          ...b,
          x: b.x + b.vx,
          y: b.y + b.vy,
        }))

        let newHealth = prev.health
        let newScore = prev.score

        // Remove balls that left screen
        newBalls = newBalls.filter(b => {
          if (b.y > 600) {
            newScore++
            return false
          }
          return true
        })

        // Check collisions
        newBalls = newBalls.filter(b => {
          if (
            newPlayer.x < b.x + b.size &&
            newPlayer.x + newPlayer.size > b.x &&
            newPlayer.y < b.y + b.size &&
            newPlayer.y + newPlayer.size > b.y
          ) {
            newHealth--
            return false
          }
          return true
        })

        if (newHealth <= 0) {
          return {
            ...prev,
            gameOver: true,
            score: newScore,
          }
        }

        const newLevel = Math.floor(newScore / 10) + 1

        return {
          ...prev,
          player: newPlayer,
          balls: newBalls,
          score: newScore,
          health: newHealth,
          level: newLevel,
        }
      })
    }, 30)

    return () => clearInterval(gameLoop)
  }, [gameState.gameStarted, gameState.gameOver])

  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gameStarted: true,
    }))
  }, [])

  const restart = useCallback(() => {
    setGameState({
      player: { x: 175, y: 550, size: 30 },
      balls: [],
      score: 0,
      health: 3,
      gameOver: false,
      gameStarted: false,
      level: 1,
    })
    playerXRef.current = 175
  }, [])

  return {
    ...gameState,
    startGame,
    restart,
  }
}
