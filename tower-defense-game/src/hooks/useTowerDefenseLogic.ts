import { useState, useEffect, useCallback } from 'react'

export interface Enemy {
  id: number
  x: number
  y: number
  health: number
  speed: number
}

export interface Tower {
  id: number
  x: number
  y: number
  range: number
  damage: number
}

export interface GameState {
  towers: Tower[]
  enemies: Enemy[]
  gold: number
  health: number
  wave: number
  gameOver: boolean
  gameStarted: boolean
  score: number
}

let enemyId = 0
let towerId = 0

export const useTowerDefenseLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    towers: [],
    enemies: [],
    gold: 100,
    health: 20,
    wave: 1,
    gameOver: false,
    gameStarted: false,
    score: 0,
  })

  // Spawn enemies
  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver) return

    const spawnInterval = setInterval(() => {
      setGameState(prev => {
        const newEnemy: Enemy = {
          id: enemyId++,
          x: 0,
          y: Math.random() * 500,
          health: 10 + prev.wave * 5,
          speed: 1 + prev.wave * 0.2,
        }
        return {
          ...prev,
          enemies: [...prev.enemies, newEnemy],
        }
      })
    }, 2000 / (1 + gameState.wave * 0.1))

    return () => clearInterval(spawnInterval)
  }, [gameState.gameStarted, gameState.gameOver, gameState.wave])

  // Game loop
  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver) return

    const gameLoop = setInterval(() => {
      setGameState(prev => {
        let newEnemies = prev.enemies.map(e => ({
          ...e,
          x: e.x + e.speed,
        }))

        let newGold = prev.gold
        let newHealth = prev.health
        let newScore = prev.score

        // Remove enemies that reached end
        newEnemies = newEnemies.filter(e => {
          if (e.x > 800) {
            newHealth--
            return false
          }
          return true
        })

        // Tower attacks
        const newTowers = prev.towers.map(tower => {
          let target = newEnemies.find(e => {
            const dist = Math.sqrt((e.x - tower.x) ** 2 + (e.y - tower.y) ** 2)
            return dist < tower.range
          })

          if (target) {
            target.health -= tower.damage
            if (target.health <= 0) {
              newEnemies = newEnemies.filter(e => e.id !== target!.id)
              newGold += 10
              newScore += 10
            }
          }

          return tower
        })

        if (newHealth <= 0) {
          return {
            ...prev,
            gameOver: true,
            score: newScore,
          }
        }

        return {
          ...prev,
          towers: newTowers,
          enemies: newEnemies,
          gold: newGold,
          health: newHealth,
          score: newScore,
        }
      })
    }, 30)

    return () => clearInterval(gameLoop)
  }, [gameState.gameStarted, gameState.gameOver])

  const buildTower = useCallback((x: number, y: number) => {
    setGameState(prev => {
      if (prev.gold < 50) return prev

      const newTower: Tower = {
        id: towerId++,
        x,
        y,
        range: 100,
        damage: 5,
      }

      return {
        ...prev,
        towers: [...prev.towers, newTower],
        gold: prev.gold - 50,
      }
    })
  }, [])

  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gameStarted: true,
    }))
  }, [])

  const restart = useCallback(() => {
    setGameState({
      towers: [],
      enemies: [],
      gold: 100,
      health: 20,
      wave: 1,
      gameOver: false,
      gameStarted: false,
      score: 0,
    })
  }, [])

  return {
    ...gameState,
    buildTower,
    startGame,
    restart,
  }
}
