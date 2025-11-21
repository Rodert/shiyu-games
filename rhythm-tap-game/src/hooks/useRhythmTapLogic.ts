import { useState, useEffect, useCallback } from 'react'

export interface Note {
  id: number
  lane: number
  time: number
  hit: boolean
}

export interface GameState {
  notes: Note[]
  score: number
  combo: number
  maxCombo: number
  perfect: number
  good: number
  miss: number
  gameOver: boolean
  gameStarted: boolean
  currentTime: number
}

let noteId = 0

const generateNotes = () => {
  const notes: Note[] = []
  for (let i = 0; i < 20; i++) {
    notes.push({
      id: noteId++,
      lane: Math.floor(Math.random() * 4),
      time: i * 500,
      hit: false,
    })
  }
  return notes
}

export const useRhythmTapLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    notes: generateNotes(),
    score: 0,
    combo: 0,
    maxCombo: 0,
    perfect: 0,
    good: 0,
    miss: 0,
    gameOver: false,
    gameStarted: false,
    currentTime: 0,
  })

  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver) return

    const timer = setInterval(() => {
      setGameState(prev => {
        const newTime = prev.currentTime + 50
        const maxTime = Math.max(...prev.notes.map(n => n.time)) + 1000

        if (newTime > maxTime) {
          return {
            ...prev,
            gameOver: true,
          }
        }

        return {
          ...prev,
          currentTime: newTime,
        }
      })
    }, 50)

    return () => clearInterval(timer)
  }, [gameState.gameStarted, gameState.gameOver])

  const tapNote = useCallback((lane: number) => {
    setGameState(prev => {
      const hitNote = prev.notes.find(
        n => !n.hit && n.lane === lane && Math.abs(n.time - prev.currentTime) < 200
      )

      if (!hitNote) {
        return {
          ...prev,
          combo: 0,
          miss: prev.miss + 1,
        }
      }

      const timeDiff = Math.abs(hitNote.time - prev.currentTime)
      const isPerfect = timeDiff < 50
      const isGood = timeDiff < 150

      const newCombo = prev.combo + 1
      const points = isPerfect ? 100 : isGood ? 50 : 25

      return {
        ...prev,
        notes: prev.notes.map(n =>
          n.id === hitNote.id ? { ...n, hit: true } : n
        ),
        score: prev.score + points,
        combo: newCombo,
        maxCombo: Math.max(prev.maxCombo, newCombo),
        perfect: prev.perfect + (isPerfect ? 1 : 0),
        good: prev.good + (isGood && !isPerfect ? 1 : 0),
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
      notes: generateNotes(),
      score: 0,
      combo: 0,
      maxCombo: 0,
      perfect: 0,
      good: 0,
      miss: 0,
      gameOver: false,
      gameStarted: false,
      currentTime: 0,
    })
  }, [])

  return {
    ...gameState,
    tapNote,
    startGame,
    restart,
  }
}
