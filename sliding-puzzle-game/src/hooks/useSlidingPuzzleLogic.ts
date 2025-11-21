import { useState, useCallback } from 'react'

export interface GameState {
  tiles: (number | null)[]
  moves: number
  gameOver: boolean
  gameStarted: boolean
  bestMoves: number
}

const GRID_SIZE = 4
const TOTAL_TILES = GRID_SIZE * GRID_SIZE

const generatePuzzle = () => {
  const tiles = Array.from({ length: TOTAL_TILES - 1 }, (_, i) => i + 1)
  tiles.push(null)
  
  for (let i = 0; i < 100; i++) {
    const emptyIdx = tiles.indexOf(null)
    const neighbors = []
    
    if (emptyIdx % GRID_SIZE !== 0) neighbors.push(emptyIdx - 1)
    if (emptyIdx % GRID_SIZE !== GRID_SIZE - 1) neighbors.push(emptyIdx + 1)
    if (emptyIdx >= GRID_SIZE) neighbors.push(emptyIdx - GRID_SIZE)
    if (emptyIdx < TOTAL_TILES - GRID_SIZE) neighbors.push(emptyIdx + GRID_SIZE)
    
    const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)]
    ;[tiles[emptyIdx], tiles[randomNeighbor]] = [tiles[randomNeighbor], tiles[emptyIdx]]
  }
  
  return tiles
}

const isSolved = (tiles: (number | null)[]) => {
  for (let i = 0; i < TOTAL_TILES - 1; i++) {
    if (tiles[i] !== i + 1) return false
  }
  return tiles[TOTAL_TILES - 1] === null
}

export const useSlidingPuzzleLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    tiles: generatePuzzle(),
    moves: 0,
    gameOver: false,
    gameStarted: false,
    bestMoves: localStorage.getItem('slidingPuzzleBest') ? parseInt(localStorage.getItem('slidingPuzzleBest')!) : Infinity,
  })

  const moveTile = useCallback((index: number) => {
    setGameState(prev => {
      if (prev.gameOver || !prev.gameStarted) return prev
      
      const emptyIdx = prev.tiles.indexOf(null)
      const neighbors = []
      
      if (emptyIdx % GRID_SIZE !== 0) neighbors.push(emptyIdx - 1)
      if (emptyIdx % GRID_SIZE !== GRID_SIZE - 1) neighbors.push(emptyIdx + 1)
      if (emptyIdx >= GRID_SIZE) neighbors.push(emptyIdx - GRID_SIZE)
      if (emptyIdx < TOTAL_TILES - GRID_SIZE) neighbors.push(emptyIdx + GRID_SIZE)
      
      if (!neighbors.includes(index)) return prev
      
      const newTiles = [...prev.tiles]
      ;[newTiles[emptyIdx], newTiles[index]] = [newTiles[index], newTiles[emptyIdx]]
      
      const newMoves = prev.moves + 1
      const solved = isSolved(newTiles)
      
      if (solved) {
        const newBest = Math.min(prev.bestMoves, newMoves)
        localStorage.setItem('slidingPuzzleBest', newBest.toString())
      }
      
      return {
        ...prev,
        tiles: newTiles,
        moves: newMoves,
        gameOver: solved,
        bestMoves: solved ? Math.min(prev.bestMoves, newMoves) : prev.bestMoves,
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
      tiles: generatePuzzle(),
      moves: 0,
      gameOver: false,
      gameStarted: false,
      bestMoves: localStorage.getItem('slidingPuzzleBest') ? parseInt(localStorage.getItem('slidingPuzzleBest')!) : Infinity,
    })
  }, [])

  return {
    ...gameState,
    GRID_SIZE,
    moveTile,
    startGame,
    restart,
  }
}
