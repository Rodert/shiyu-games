import { useState, useEffect, useCallback } from 'react'

export interface Player {
  x: number
  y: number
  vy: number
}

export interface Obstacle {
  id: number
  x: number
  gapY: number
}

export interface GameState {
  player: Player
  obstacles: Obstacle[]
  score: number
  gameOver: boolean
  gameStarted: boolean
  bestScore: number
}

let obstacleId = 0

export const useFlappyParkourLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    player: { x: 50, y: 300, vy: 0 },
    obstacles: [],
    score: 0,
    gameOver: false,
    gameStarted: false,
    bestScore: localStorage.getItem('flappyParkourBest') ? parseInt(localStorage.getItem('flappyParkourBest')!) : 0,
  })

  // Spawn obstacles
  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver) return

    const spawnInterval = setInterval(() => {
      setGameState(prev => {
        const gapY = Math.random() * 300 + 100
        const newObstacle: Obstacle = {
          id: obstacleId++,
          x: 800,
          gapY,
        }
        return {
          ...prev,
          obstacles: [...prev.obstacles, newObstacle],
        }
      })
    }, 2000)

    return () => clearInterval(spawnInterval)
  }, [gameState.gameStarted, gameState.gameOver])

  // Game loop
  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver) return

    const gameLoop = setInterval(() => {
      setGameState(prev => {
        const newPlayer = {
          ...prev.player,
          y: prev.player.y + prev.player.vy,
          vy: prev.player.vy + 0.6,
        }

        if (newPlayer.y < 0 || newPlayer.y > 600) {
          return {
            ...prev,
            gameOver: true,
            bestScore: Math.max(prev.bestScore, prev.score),
          }
        }

        let newObstacles = prev.obstacles.map(o => ({
          ...o,
          x: o.x - 5,
        }))

        let newScore = prev.score

        newObstacles = newObstacles.filter(o => {
          if (o.x < -50) {
            newScore++
            return false
          }
          return true
        })

        for (const obs of newObstacles) {
          if (obs.x < newPlayer.x + 30 && obs.x > newPlayer.x - 50) {
            if (newPlayer.y < obs.gapY || newPlayer.y > obs.gapY + 150) {
              return {
                ...prev,
                gameOver: true,
                bestScore: Math.max(prev.bestScore, newScore),
              }
            }
          }
        }

        return {
          ...prev,
          player: newPlayer,
          obstacles: newObstacles,
          score: newScore,
        }
      })
    }, 30)

    return () => clearInterval(gameLoop)
  }, [gameState.gameStarted, gameState.gameOver])

  const jump = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      player: {
        ...prev.player,
        vy: -12,
      },
    }))
  }, [])

  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gameStarted: true,
    }))
  }, [])

  const restart = useCallback(() => {
    const best = gameState.bestScore
    localStorage.setItem('flappyParkourBest', best.toString())
    setGameState({
      player: { x: 50, y: 300, vy: 0 },
      obstacles: [],
      score: 0,
      gameOver: false,
      gameStarted: false,
      bestScore: best,
    })
  }, [gameState.bestScore])

  return {
    ...gameState,
    jump,
    startGame,
    restart,
  }
}
