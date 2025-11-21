import { useState, useEffect, useCallback } from 'react'

export type Difficulty = 'easy' | 'medium' | 'hard'

export interface Question {
  id: number
  num1: number
  num2: number
  operator: '+' | '-' | '*' | '/'
  answer: number
}

export interface GameState {
  questions: Question[]
  currentIndex: number
  score: number
  correct: number
  wrong: number
  timeLeft: number
  gameOver: boolean
  difficulty: Difficulty
  startTime: number
}

let questionId = 0

const generateQuestion = (difficulty: Difficulty): Question => {
  let num1, num2, operator: '+' | '-' | '*' | '/' = '+'

  if (difficulty === 'easy') {
    num1 = Math.floor(Math.random() * 10) + 1
    num2 = Math.floor(Math.random() * 10) + 1
    operator = Math.random() > 0.5 ? '+' : '-'
  } else if (difficulty === 'medium') {
    num1 = Math.floor(Math.random() * 50) + 1
    num2 = Math.floor(Math.random() * 50) + 1
    const ops: ('+' | '-' | '*' | '/')[] = ['+', '-', '*']
    operator = ops[Math.floor(Math.random() * 3)]
  } else {
    num1 = Math.floor(Math.random() * 100) + 1
    num2 = Math.floor(Math.random() * 100) + 1
    const ops: ('+' | '-' | '*' | '/')[] = ['+', '-', '*', '/']
    operator = ops[Math.floor(Math.random() * 4)]
  }

  let answer = 0
  switch (operator) {
    case '+':
      answer = num1 + num2
      break
    case '-':
      answer = num1 - num2
      break
    case '*':
      answer = num1 * num2
      break
    case '/':
      answer = Math.floor(num1 / num2)
      break
  }

  return {
    id: questionId++,
    num1,
    num2,
    operator,
    answer,
  }
}

export const useMathChallengeLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    questions: Array.from({ length: 10 }, () => generateQuestion('medium')),
    currentIndex: 0,
    score: 0,
    correct: 0,
    wrong: 0,
    timeLeft: 60,
    gameOver: false,
    difficulty: 'medium',
    startTime: Date.now(),
  })

  // 计时器
  useEffect(() => {
    if (gameState.gameOver) return

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
  }, [gameState.gameOver])

  // 提交答案
  const submitAnswer = useCallback((userAnswer: number) => {
    setGameState(prev => {
      const currentQuestion = prev.questions[prev.currentIndex]
      const isCorrect = userAnswer === currentQuestion.answer

      const newCorrect = isCorrect ? prev.correct + 1 : prev.correct
      const newWrong = isCorrect ? prev.wrong : prev.wrong + 1
      const newScore = isCorrect ? prev.score + 10 : Math.max(0, prev.score - 5)

      if (prev.currentIndex < prev.questions.length - 1) {
        return {
          ...prev,
          currentIndex: prev.currentIndex + 1,
          score: newScore,
          correct: newCorrect,
          wrong: newWrong,
        }
      } else {
        return {
          ...prev,
          gameOver: true,
          score: newScore,
          correct: newCorrect,
          wrong: newWrong,
        }
      }
    })
  }, [])

  // 改变难度
  const changeDifficulty = useCallback((difficulty: Difficulty) => {
    setGameState({
      questions: Array.from({ length: 10 }, () => generateQuestion(difficulty)),
      currentIndex: 0,
      score: 0,
      correct: 0,
      wrong: 0,
      timeLeft: 60,
      gameOver: false,
      difficulty,
      startTime: Date.now(),
    })
  }, [])

  // 重新开始
  const restart = useCallback(() => {
    setGameState(prev => ({
      questions: Array.from({ length: 10 }, () => generateQuestion(prev.difficulty)),
      currentIndex: 0,
      score: 0,
      correct: 0,
      wrong: 0,
      timeLeft: 60,
      gameOver: false,
      difficulty: prev.difficulty,
      startTime: Date.now(),
    }))
  }, [])

  return {
    ...gameState,
    currentQuestion: gameState.questions[gameState.currentIndex],
    submitAnswer,
    changeDifficulty,
    restart,
  }
}
