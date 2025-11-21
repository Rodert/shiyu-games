import { useState, useCallback } from 'react'

export type Choice = 'rock' | 'paper' | 'scissors' | null
export type Result = 'win' | 'lose' | 'draw' | null

export interface GameState {
  playerChoice: Choice
  computerChoice: Choice
  result: Result
  playerScore: number
  computerScore: number
  draws: number
  totalGames: number
  gameHistory: Array<{ player: Choice; computer: Choice; result: Result }>
}

export const useRockPaperScissorsLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    playerChoice: null,
    computerChoice: null,
    result: null,
    playerScore: 0,
    computerScore: 0,
    draws: 0,
    totalGames: 0,
    gameHistory: [],
  })

  // 获取计算机选择
  const getComputerChoice = useCallback((): Choice => {
    const choices: Choice[] = ['rock', 'paper', 'scissors']
    return choices[Math.floor(Math.random() * 3)]
  }, [])

  // 判断胜负
  const determineResult = useCallback((player: Choice, computer: Choice): Result => {
    if (player === computer) return 'draw'

    if (player === 'rock' && computer === 'scissors') return 'win'
    if (player === 'paper' && computer === 'rock') return 'win'
    if (player === 'scissors' && computer === 'paper') return 'win'

    return 'lose'
  }, [])

  // 玩家选择
  const play = useCallback((choice: Choice) => {
    if (!choice) return

    const computerChoice = getComputerChoice()
    const result = determineResult(choice, computerChoice)

    setGameState(prev => {
      let newPlayerScore = prev.playerScore
      let newComputerScore = prev.computerScore
      let newDraws = prev.draws

      if (result === 'win') {
        newPlayerScore++
      } else if (result === 'lose') {
        newComputerScore++
      } else {
        newDraws++
      }

      return {
        ...prev,
        playerChoice: choice,
        computerChoice,
        result,
        playerScore: newPlayerScore,
        computerScore: newComputerScore,
        draws: newDraws,
        totalGames: prev.totalGames + 1,
        gameHistory: [
          ...prev.gameHistory,
          { player: choice, computer: computerChoice, result },
        ].slice(-10), // 只保留最后10条记录
      }
    })
  }, [getComputerChoice, determineResult])

  // 重置游戏
  const reset = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      playerChoice: null,
      computerChoice: null,
      result: null,
    }))
  }, [])

  // 重置分数
  const resetScores = useCallback(() => {
    setGameState({
      playerChoice: null,
      computerChoice: null,
      result: null,
      playerScore: 0,
      computerScore: 0,
      draws: 0,
      totalGames: 0,
      gameHistory: [],
    })
  }, [])

  return {
    ...gameState,
    play,
    reset,
    resetScores,
  }
}
