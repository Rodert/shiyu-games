import { useState, useCallback } from 'react'

export type Player = 'X' | 'O' | null
export type Difficulty = 'easy' | 'medium' | 'hard'

export interface GameState {
  board: Player[]
  currentPlayer: Player
  gameOver: boolean
  winner: Player
  isDraw: boolean
  playerScore: number
  aiScore: number
  difficulty: Difficulty
  gameHistory: string[]
}

export const useTicTacToeLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    gameOver: false,
    winner: null,
    isDraw: false,
    playerScore: 0,
    aiScore: 0,
    difficulty: 'medium',
    gameHistory: [],
  })

  // 检查胜利
  const checkWinner = useCallback((board: Player[]): Player => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }
    return null
  }, [])

  // AI 移动 - Minimax 算法
  const getAIMove = useCallback(
    (board: Player[], difficulty: Difficulty): number => {
      const availableMoves = board
        .map((cell, index) => (cell === null ? index : null))
        .filter(index => index !== null) as number[]

      if (availableMoves.length === 0) return -1

      // 简单难度：随机移动
      if (difficulty === 'easy') {
        return availableMoves[Math.floor(Math.random() * availableMoves.length)]
      }

      // 中等难度：70% 最优移动，30% 随机
      if (difficulty === 'medium') {
        if (Math.random() < 0.7) {
          return getBestMove(board)
        } else {
          return availableMoves[Math.floor(Math.random() * availableMoves.length)]
        }
      }

      // 困难难度：总是最优移动
      return getBestMove(board)
    },
    []
  )

  // 获取最优移动
  const getBestMove = useCallback((board: Player[]): number => {
    let bestScore = -Infinity
    let bestMove = 0

    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const newBoard = [...board]
        newBoard[i] = 'O'
        const score = minimax(newBoard, 0, false)
        if (score > bestScore) {
          bestScore = score
          bestMove = i
        }
      }
    }
    return bestMove
  }, [])

  // Minimax 算法
  const minimax = (board: Player[], depth: number, isMaximizing: boolean): number => {
    const winner = checkWinner(board)

    if (winner === 'O') return 10 - depth
    if (winner === 'X') return depth - 10
    if (!board.includes(null)) return 0

    if (isMaximizing) {
      let bestScore = -Infinity
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          const newBoard = [...board]
          newBoard[i] = 'O'
          const score = minimax(newBoard, depth + 1, false)
          bestScore = Math.max(score, bestScore)
        }
      }
      return bestScore
    } else {
      let bestScore = Infinity
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          const newBoard = [...board]
          newBoard[i] = 'X'
          const score = minimax(newBoard, depth + 1, true)
          bestScore = Math.min(score, bestScore)
        }
      }
      return bestScore
    }
  }

  // 玩家移动
  const playerMove = useCallback(
    (index: number) => {
      if (gameState.gameOver || gameState.board[index] !== null) return

      setGameState(prev => {
        const newBoard = [...prev.board]
        newBoard[index] = 'X'

        const winner = checkWinner(newBoard)
        if (winner === 'X') {
          return {
            ...prev,
            board: newBoard,
            gameOver: true,
            winner: 'X',
            playerScore: prev.playerScore + 1,
          }
        }

        if (!newBoard.includes(null)) {
          return {
            ...prev,
            board: newBoard,
            gameOver: true,
            isDraw: true,
          }
        }

        // AI 移动
        const aiMoveIndex = getAIMove(newBoard, prev.difficulty)
        if (aiMoveIndex !== -1) {
          newBoard[aiMoveIndex] = 'O'

          const aiWinner = checkWinner(newBoard)
          if (aiWinner === 'O') {
            return {
              ...prev,
              board: newBoard,
              gameOver: true,
              winner: 'O',
              aiScore: prev.aiScore + 1,
            }
          }

          if (!newBoard.includes(null)) {
            return {
              ...prev,
              board: newBoard,
              gameOver: true,
              isDraw: true,
            }
          }
        }

        return {
          ...prev,
          board: newBoard,
        }
      })
    },
    [gameState.gameOver, gameState.board, gameState.difficulty, checkWinner, getAIMove]
  )

  // 重新开始
  const restart = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      gameOver: false,
      winner: null,
      isDraw: false,
    }))
  }, [])

  // 改变难度
  const changeDifficulty = useCallback((difficulty: Difficulty) => {
    setGameState(prev => ({
      ...prev,
      difficulty,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      gameOver: false,
      winner: null,
      isDraw: false,
    }))
  }, [])

  // 重置分数
  const resetScores = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      playerScore: 0,
      aiScore: 0,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      gameOver: false,
      winner: null,
      isDraw: false,
    }))
  }, [])

  return {
    ...gameState,
    playerMove,
    restart,
    changeDifficulty,
    resetScores,
  }
}
