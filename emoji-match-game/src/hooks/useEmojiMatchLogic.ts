import { useState, useEffect, useCallback } from 'react'

const EMOJIS = ['🍎', '🍌', '🍊', '🍇', '🍓', '🍒', '🍑', '🥝', '🍉', '🍍', '🥭', '🍈']

export interface Card {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

export interface GameState {
  cards: Card[]
  flipped: number[]
  matched: number
  score: number
  moves: number
  gameOver: boolean
  gameWon: boolean
  startTime: number
  elapsedTime: number
}

export const useEmojiMatchLogic = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const shuffledEmojis = [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5)
    const cards: Card[] = shuffledEmojis.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }))

    return {
      cards,
      flipped: [],
      matched: 0,
      score: 0,
      moves: 0,
      gameOver: false,
      gameWon: false,
      startTime: Date.now(),
      elapsedTime: 0,
    }
  })

  // 计时器
  useEffect(() => {
    if (gameState.gameWon || gameState.gameOver) return

    const timer = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        elapsedTime: Math.floor((Date.now() - prev.startTime) / 1000),
      }))
    }, 1000)

    return () => clearInterval(timer)
  }, [gameState.gameWon, gameState.gameOver])

  // 检查匹配
  useEffect(() => {
    if (gameState.flipped.length !== 2) return

    const [first, second] = gameState.flipped
    const firstCard = gameState.cards[first]
    const secondCard = gameState.cards[second]

    if (firstCard.emoji === secondCard.emoji) {
      // 匹配成功
      setGameState(prev => {
        const newCards = prev.cards.map(card =>
          card.id === first || card.id === second
            ? { ...card, isMatched: true }
            : card
        )

        const newMatched = prev.matched + 1
        const isWon = newMatched === EMOJIS.length

        return {
          ...prev,
          cards: newCards,
          flipped: [],
          matched: newMatched,
          score: prev.score + 10,
          gameWon: isWon,
        }
      })
    } else {
      // 匹配失败
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          cards: prev.cards.map(card =>
            card.id === first || card.id === second
              ? { ...card, isFlipped: false }
              : card
          ),
          flipped: [],
        }))
      }, 1000)
    }
  }, [gameState.flipped])

  // 点击卡片
  const flipCard = useCallback((id: number) => {
    setGameState(prev => {
      const card = prev.cards[id]

      // 已匹配或已翻转或已有两张翻转卡片
      if (card.isMatched || card.isFlipped || prev.flipped.length === 2) {
        return prev
      }

      const newFlipped = [...prev.flipped, id]
      const newCards = prev.cards.map(c =>
        c.id === id ? { ...c, isFlipped: true } : c
      )

      return {
        ...prev,
        cards: newCards,
        flipped: newFlipped,
        moves: newFlipped.length === 2 ? prev.moves + 1 : prev.moves,
      }
    })
  }, [])

  // 重新开始
  const restart = useCallback(() => {
    const shuffledEmojis = [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5)
    const cards: Card[] = shuffledEmojis.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }))

    setGameState({
      cards,
      flipped: [],
      matched: 0,
      score: 0,
      moves: 0,
      gameOver: false,
      gameWon: false,
      startTime: Date.now(),
      elapsedTime: 0,
    })
  }, [])

  return {
    ...gameState,
    flipCard,
    restart,
  }
}
