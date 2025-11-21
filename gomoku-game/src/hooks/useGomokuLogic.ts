import { useState, useCallback } from 'react'

export type Player = 'human' | 'ai' | null

export interface GameState {
  board: (Player | null)[][]
  currentPlayer: Player
  gameOver: boolean
  winner: Player | null
  humanScore: number
  aiScore: number
  boardSize: number
}

export const useGomokuLogic = () => {
  const boardSize = 15
  const [gameState, setGameState] = useState<GameState>({
    board: Array(boardSize).fill(null).map(() => Array(boardSize).fill(null)),
    currentPlayer: 'human',
    gameOver: false,
    winner: null,
    humanScore: 0,
    aiScore: 0,
    boardSize,
  })

  const checkWin = useCallback((board: (Player | null)[][], row: number, col: number, player: Player) => {
    if (!player) return false
    
    const directions = [[0,1], [1,0], [1,1], [1,-1]]
    
    for (const [dr, dc] of directions) {
      let count = 1
      
      for (let i = 1; i < 5; i++) {
        const r = row + dr * i
        const c = col + dc * i
        if (r >= 0 && r < boardSize && c >= 0 && c < boardSize && board[r][c] === player) {
          count++
        } else break
      }
      
      for (let i = 1; i < 5; i++) {
        const r = row - dr * i
        const c = col - dc * i
        if (r >= 0 && r < boardSize && c >= 0 && c < boardSize && board[r][c] === player) {
          count++
        } else break
      }
      
      if (count >= 5) return true
    }
    
    return false
  }, [boardSize])

  const getAIMove = useCallback((board: (Player | null)[][]) => {
    for (let r = 0; r < boardSize; r++) {
      for (let c = 0; c < boardSize; c++) {
        if (!board[r][c]) {
          if (checkWin(board, r, c, 'ai')) return [r, c]
        }
      }
    }
    
    for (let r = 0; r < boardSize; r++) {
      for (let c = 0; c < boardSize; c++) {
        if (!board[r][c]) {
          if (checkWin(board, r, c, 'human')) return [r, c]
        }
      }
    }
    
    const empty = []
    for (let r = 0; r < boardSize; r++) {
      for (let c = 0; c < boardSize; c++) {
        if (!board[r][c]) empty.push([r, c])
      }
    }
    
    return empty[Math.floor(Math.random() * empty.length)] || [7, 7]
  }, [boardSize, checkWin])

  const makeMove = useCallback((row: number, col: number) => {
    setGameState(prev => {
      if (prev.gameOver || prev.board[row][col]) return prev
      
      const newBoard = prev.board.map(r => [...r])
      newBoard[row][col] = 'human'
      
      if (checkWin(newBoard, row, col, 'human')) {
        return {
          ...prev,
          board: newBoard,
          gameOver: true,
          winner: 'human',
          humanScore: prev.humanScore + 1,
        }
      }
      
      const [aiRow, aiCol] = getAIMove(newBoard)
      newBoard[aiRow][aiCol] = 'ai'
      
      if (checkWin(newBoard, aiRow, aiCol, 'ai')) {
        return {
          ...prev,
          board: newBoard,
          gameOver: true,
          winner: 'ai',
          aiScore: prev.aiScore + 1,
        }
      }
      
      return {
        ...prev,
        board: newBoard,
      }
    })
  }, [checkWin, getAIMove])

  const restart = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      board: Array(boardSize).fill(null).map(() => Array(boardSize).fill(null)),
      gameOver: false,
      winner: null,
      currentPlayer: 'human',
    }))
  }, [boardSize])

  return {
    ...gameState,
    makeMove,
    restart,
  }
}
