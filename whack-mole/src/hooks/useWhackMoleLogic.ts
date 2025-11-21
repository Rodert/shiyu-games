import { useState, useEffect, useCallback } from 'react'

// 游戏常量
const GRID_SIZE = 3
const GAME_DURATION = 30
const MOLE_SHOW_TIME = 800

export interface Mole {
  id: number
  x: number
  y: number
  isVisible: boolean
}

export interface GameState {
  moles: Mole[]
  score: number
  timeLeft: number
  gameOver: boolean
  isPaused: boolean
  gameStarted: boolean
  highScore: number
}

let moleId = 0

export const useWhackMoleLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    moles: Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => ({
      id: i,
      x: i % GRID_SIZE,
      y: Math.floor(i / GRID_SIZE),
      isVisible: false,
    })),
    score: 0,
    timeLeft: GAME_DURATION,
    gameOver: false,
    isPaused: false,
    gameStarted: false,
    highScore: localStorage.getItem('whack-mole-high-score')
      ? parseInt(localStorage.getItem('whack-mole-high-score')!)
      : 0,
  })

  // 计时器
  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver || gameState.isPaused) return

    const timer = setInterval(() => {
      setGameState(prev => {
        const newTimeLeft = prev.timeLeft - 1
        if (newTimeLeft <= 0) {
          const newHighScore = Math.max(prev.score, prev.highScore)
          localStorage.setItem('whack-mole-high-score', newHighScore.toString())
          return {
            ...prev,
            timeLeft: 0,
            gameOver: true,
            highScore: newHighScore,
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

  // 地鼠出现逻辑
  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver || gameState.isPaused) return

    const moleInterval = setInterval(() => {
      setGameState(prev => {
        const randomMole = Math.floor(Math.random() * prev.moles.length)
        const newMoles = prev.moles.map((mole, index) => ({
          ...mole,
          isVisible: index === randomMole,
        }))

        // 一段时间后隐藏地鼠
        setTimeout(() => {
          setGameState(p => ({
            ...p,
            moles: p.moles.map(m => ({ ...m, isVisible: false })),
          }))
        }, MOLE_SHOW_TIME)

        return {
          ...prev,
          moles: newMoles,
        }
      })
    }, MOLE_SHOW_TIME + 500)

    return () => clearInterval(moleInterval)
  }, [gameState.gameStarted, gameState.gameOver, gameState.isPaused])

  // 点击地鼠
  const whackMole = useCallback((moleId: number) => {
    setGameState(prev => {
      const mole = prev.moles.find(m => m.id === moleId)
      if (!mole || !mole.isVisible) return prev

      return {
        ...prev,
        score: prev.score + 10,
        moles: prev.moles.map(m =>
          m.id === moleId ? { ...m, isVisible: false } : m
        ),
      }
    })
  }, [])

  // 开始游戏
  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gameStarted: true,
      gameOver: false,
      score: 0,
      timeLeft: GAME_DURATION,
    }))
  }, [])

  // 重新开始
  const restart = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gameStarted: false,
      gameOver: false,
      score: 0,
      timeLeft: GAME_DURATION,
      moles: prev.moles.map(m => ({ ...m, isVisible: false })),
    }))
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
    whackMole,
    startGame,
    restart,
    togglePause,
    GRID_SIZE,
  }
}
