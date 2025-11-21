import { useState, useEffect, useCallback } from 'react'

export interface Bubble {
  id: number
  x: number
  y: number
  size: number
  color: string
  vx: number
  vy: number
}

export interface GameState {
  bubbles: Bubble[]
  score: number
  combo: number
  gameOver: boolean
  isPaused: boolean
  gameStarted: boolean
  timeLeft: number
}

let bubbleId = 0

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F']

const createBubble = (): Bubble => {
  const size = Math.random() * 20 + 15
  return {
    id: bubbleId++,
    x: Math.random() * (400 - size),
    y: Math.random() * (600 - size),
    size,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
  }
}

export const useBubblePopLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    bubbles: Array.from({ length: 15 }, () => createBubble()),
    score: 0,
    combo: 0,
    gameOver: false,
    isPaused: false,
    gameStarted: false,
    timeLeft: 60,
  })

  // 计时器
  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver || gameState.isPaused) return

    const timer = setInterval(() => {
      setGameState(prev => {
        const newTimeLeft = prev.timeLeft - 1
        if (newTimeLeft <= 0) {
          return {
            ...prev,
            timeLeft: 0,
            gameOver: true,
          }
        }
        return {
          ...prev,
          timeLeft: newTimeLeft,
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameState.gameStarted, gameState.gameOver, gameState.isPaused])

  // 气泡移动
  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver || gameState.isPaused) return

    const moveInterval = setInterval(() => {
      setGameState(prev => {
        const newBubbles = prev.bubbles.map(bubble => {
          let newX = bubble.x + bubble.vx
          let newY = bubble.y + bubble.vy
          let newVx = bubble.vx
          let newVy = bubble.vy

          if (newX <= 0 || newX + bubble.size >= 400) newVx *= -1
          if (newY <= 0 || newY + bubble.size >= 600) newVy *= -1

          newX = Math.max(0, Math.min(400 - bubble.size, newX))
          newY = Math.max(0, Math.min(600 - bubble.size, newY))

          return {
            ...bubble,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
          }
        })

        return {
          ...prev,
          bubbles: newBubbles,
        }
      })
    }, 50)

    return () => clearInterval(moveInterval)
  }, [gameState.gameStarted, gameState.gameOver, gameState.isPaused])

  // 点击气泡
  const popBubble = useCallback((id: number) => {
    setGameState(prev => {
      const newBubbles = prev.bubbles.filter(b => b.id !== id)
      const newCombo = prev.combo + 1
      const newScore = prev.score + Math.floor(10 * (1 + newCombo * 0.1))

      // 添加新气泡
      if (newBubbles.length < 15) {
        newBubbles.push(createBubble())
      }

      return {
        ...prev,
        bubbles: newBubbles,
        score: newScore,
        combo: newCombo,
        gameStarted: true,
      }
    })
  }, [])

  // 开始游戏
  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gameStarted: true,
    }))
  }, [])

  // 重新开始
  const restart = useCallback(() => {
    setGameState({
      bubbles: Array.from({ length: 15 }, () => createBubble()),
      score: 0,
      combo: 0,
      gameOver: false,
      isPaused: false,
      gameStarted: false,
      timeLeft: 60,
    })
  }, [])

  // 切换暂停
  const togglePause = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPaused: !prev.isPaused,
    }))
  }, [])

  return {
    ...gameState,
    popBubble,
    startGame,
    restart,
    togglePause,
  }
}
