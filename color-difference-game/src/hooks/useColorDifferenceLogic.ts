import { useState, useEffect, useCallback } from 'react'

export interface GameState {
  targetColor: string
  options: string[]
  score: number
  correct: number
  wrong: number
  timeLeft: number
  gameOver: boolean
  gameStarted: boolean
  difficulty: 'easy' | 'medium' | 'hard'
}

const generateColor = () => {
  const hue = Math.floor(Math.random() * 360)
  const saturation = Math.floor(Math.random() * 100)
  const lightness = Math.floor(Math.random() * 100)
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

const generateSimilarColor = (baseColor: string, difficulty: 'easy' | 'medium' | 'hard') => {
  const match = baseColor.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/)
  if (!match) return generateColor()
  
  const [, hue, sat, light] = match.map(Number)
  const diffMap = { easy: 30, medium: 15, hard: 5 }
  const diff = diffMap[difficulty]
  
  const newHue = (hue + Math.random() * diff - diff / 2 + 360) % 360
  const newSat = Math.max(0, Math.min(100, sat + Math.random() * diff - diff / 2))
  const newLight = Math.max(0, Math.min(100, light + Math.random() * diff - diff / 2))
  
  return `hsl(${Math.round(newHue)}, ${Math.round(newSat)}%, ${Math.round(newLight)}%)`
}

export const useColorDifferenceLogic = () => {
  const generateQuestion = useCallback((difficulty: 'easy' | 'medium' | 'hard') => {
    const target = generateColor()
    const correct = generateSimilarColor(target, difficulty)
    const wrong1 = generateColor()
    const wrong2 = generateColor()
    
    const options = [correct, wrong1, wrong2].sort(() => Math.random() - 0.5)
    
    return { target, options, correct }
  }, [])

  const [gameState, setGameState] = useState<GameState>(() => {
    const { target, options } = generateQuestion('medium')
    return {
      targetColor: target,
      options,
      score: 0,
      correct: 0,
      wrong: 0,
      timeLeft: 60,
      gameOver: false,
      gameStarted: false,
      difficulty: 'medium',
    }
  })

  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver) return

    const timer = setInterval(() => {
      setGameState(prev => {
        const newTimeLeft = prev.timeLeft - 1
        if (newTimeLeft <= 0) {
          return { ...prev, timeLeft: 0, gameOver: true }
        }
        return { ...prev, timeLeft: newTimeLeft }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameState.gameStarted, gameState.gameOver])

  const selectColor = useCallback((color: string) => {
    setGameState(prev => {
      const { target, options, correct } = generateQuestion(prev.difficulty)
      const isCorrect = color === prev.options[prev.options.findIndex(c => c === color)]
      
      // Find which option was clicked
      const clickedIndex = prev.options.indexOf(color)
      const correctIndex = prev.options.indexOf(prev.options.find(opt => {
        const match = prev.targetColor.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/)
        if (!match) return false
        const [, h, s, l] = match.map(Number)
        const diff = { easy: 30, medium: 15, hard: 5 }[prev.difficulty]
        const optMatch = opt.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/)
        if (!optMatch) return false
        const [, oh, os, ol] = optMatch.map(Number)
        return Math.abs(h - oh) <= diff && Math.abs(s - os) <= diff && Math.abs(l - ol) <= diff
      }) || '')

      const isCorrectAnswer = clickedIndex === correctIndex

      return {
        ...prev,
        targetColor: target,
        options,
        score: isCorrectAnswer ? prev.score + 10 : Math.max(0, prev.score - 5),
        correct: isCorrectAnswer ? prev.correct + 1 : prev.correct,
        wrong: isCorrectAnswer ? prev.wrong : prev.wrong + 1,
      }
    })
  }, [generateQuestion])

  const startGame = useCallback(() => {
    setGameState(prev => ({ ...prev, gameStarted: true }))
  }, [])

  const restart = useCallback(() => {
    const { target, options } = generateQuestion('medium')
    setGameState({
      targetColor: target,
      options,
      score: 0,
      correct: 0,
      wrong: 0,
      timeLeft: 60,
      gameOver: false,
      gameStarted: false,
      difficulty: 'medium',
    })
  }, [generateQuestion])

  return {
    ...gameState,
    selectColor,
    startGame,
    restart,
  }
}
