import { useState, useEffect, useCallback } from 'react'

const WORDS = ['react', 'typescript', 'javascript', 'frontend', 'backend', 'fullstack', 'database', 'algorithm', 'framework', 'component', 'state', 'props', 'hook', 'context', 'reducer']

export interface GameState {
  words: string[]
  currentWordIndex: number
  score: number
  correct: number
  wrong: number
  timeLeft: number
  gameOver: boolean
  gameStarted: boolean
  wpm: number
}

export const useTypingMasterLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    words: WORDS.sort(() => Math.random() - 0.5),
    currentWordIndex: 0,
    score: 0,
    correct: 0,
    wrong: 0,
    timeLeft: 60,
    gameOver: false,
    gameStarted: false,
    wpm: 0,
  })

  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver) return

    const timer = setInterval(() => {
      setGameState(prev => {
        const newTimeLeft = prev.timeLeft - 1
        if (newTimeLeft <= 0) {
          const totalChars = prev.correct * 5
          const wpm = Math.round((totalChars / 5) / (60 / 60))
          return {
            ...prev,
            timeLeft: 0,
            gameOver: true,
            wpm,
          }
        }
        return {
          ...prev,
          timeLeft: newTimeLeft,
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameState.gameStarted, gameState.gameOver])

  const submitWord = useCallback((input: string) => {
    setGameState(prev => {
      const currentWord = prev.words[prev.currentWordIndex]
      const isCorrect = input.toLowerCase() === currentWord.toLowerCase()

      const newCorrect = isCorrect ? prev.correct + 1 : prev.correct
      const newWrong = isCorrect ? prev.wrong : prev.wrong + 1
      const newScore = isCorrect ? prev.score + 10 : Math.max(0, prev.score - 5)
      const newIndex = prev.currentWordIndex + 1

      if (newIndex >= prev.words.length) {
        return {
          ...prev,
          gameOver: true,
          score: newScore,
          correct: newCorrect,
          wrong: newWrong,
          wpm: Math.round((newCorrect * 5 / 5) / (60 / 60)),
        }
      }

      return {
        ...prev,
        currentWordIndex: newIndex,
        score: newScore,
        correct: newCorrect,
        wrong: newWrong,
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
      words: WORDS.sort(() => Math.random() - 0.5),
      currentWordIndex: 0,
      score: 0,
      correct: 0,
      wrong: 0,
      timeLeft: 60,
      gameOver: false,
      gameStarted: false,
      wpm: 0,
    })
  }, [])

  return {
    ...gameState,
    currentWord: gameState.words[gameState.currentWordIndex],
    submitWord,
    startGame,
    restart,
  }
}
