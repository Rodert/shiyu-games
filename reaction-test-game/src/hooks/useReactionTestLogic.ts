import { useState, useEffect, useCallback, useRef } from 'react'

export interface GameState {
  isWaiting: boolean
  isActive: boolean
  startTime: number | null
  reactionTime: number | null
  results: number[]
  currentRound: number
  totalRounds: number
  gameOver: boolean
  bestTime: number
  averageTime: number
}

export const useReactionTestLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    isWaiting: true,
    isActive: false,
    startTime: null,
    reactionTime: null,
    results: [],
    currentRound: 0,
    totalRounds: 5,
    gameOver: false,
    bestTime: 0,
    averageTime: 0,
  })

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number | null>(null)

  // 开始测试
  const startTest = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isWaiting: true,
      isActive: false,
      startTime: null,
      reactionTime: null,
      currentRound: 1,
      results: [],
      gameOver: false,
      bestTime: 0,
      averageTime: 0,
    }))

    // 随机延迟 1-3 秒
    const delay = Math.random() * 2000 + 1000
    timeoutRef.current = setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        isWaiting: false,
        isActive: true,
        startTime: Date.now(),
      }))
      startTimeRef.current = Date.now()
    }, delay)
  }, [])

  // 点击反应
  const handleClick = useCallback(() => {
    setGameState(prev => {
      if (!prev.isActive || !prev.startTime) return prev

      const reactionTime = Date.now() - prev.startTime
      const newResults = [...prev.results, reactionTime]
      const newRound = prev.currentRound + 1

      if (newRound > prev.totalRounds) {
        const bestTime = Math.min(...newResults)
        const averageTime = Math.floor(newResults.reduce((a, b) => a + b, 0) / newResults.length)

        return {
          ...prev,
          isActive: false,
          reactionTime,
          results: newResults,
          currentRound: newRound,
          gameOver: true,
          bestTime,
          averageTime,
        }
      }

      return {
        ...prev,
        isActive: false,
        reactionTime,
        results: newResults,
        currentRound: newRound,
        isWaiting: true,
        startTime: null,
      }
    })

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // 下一轮延迟
    if (gameState.currentRound < gameState.totalRounds) {
      const delay = Math.random() * 2000 + 1000
      timeoutRef.current = setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          isWaiting: false,
          isActive: true,
          startTime: Date.now(),
        }))
        startTimeRef.current = Date.now()
      }, delay)
    }
  }, [gameState.currentRound, gameState.totalRounds, gameState.startTime])

  // 重新开始
  const restart = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    startTest()
  }, [startTest])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    ...gameState,
    startTest,
    handleClick,
    restart,
  }
}
