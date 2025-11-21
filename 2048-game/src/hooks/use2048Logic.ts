import { useState, useEffect, useCallback } from 'react'

const GRID_SIZE = 4
const INITIAL_TILES = 2

export interface Tile {
  id: number
  value: number
  x: number
  y: number
  isNew: boolean
  isMerged: boolean
}

export interface GameState {
  tiles: Tile[]
  score: number
  bestScore: number
  gameOver: boolean
  isWon: boolean
  isPaused: boolean
  moveCount: number
}

let tileId = 0

const getTileColor = (value: number): string => {
  const colors: { [key: number]: string } = {
    2: '#eee4da',
    4: '#ede0c8',
    8: '#f2b179',
    16: '#f59563',
    32: '#f67c5f',
    64: '#f65e3b',
    128: '#edcf72',
    256: '#edcc61',
    512: '#edc850',
    1024: '#edc53f',
    2048: '#edc22e',
  }
  return colors[value] || '#3c3c2f'
}

const getTileTextColor = (value: number): string => {
  return value <= 4 ? '#776e65' : '#f9f6f2'
}

export const use2048Logic = () => {
  const [gameState, setGameState] = useState<GameState>({
    tiles: [],
    score: 0,
    bestScore: localStorage.getItem('2048-best-score') ? parseInt(localStorage.getItem('2048-best-score')!) : 0,
    gameOver: false,
    isWon: false,
    isPaused: false,
    moveCount: 0,
  })

  // 初始化游戏
  const initGame = useCallback(() => {
    const newTiles: Tile[] = []
    for (let i = 0; i < INITIAL_TILES; i++) {
      const x = Math.floor(Math.random() * GRID_SIZE)
      const y = Math.floor(Math.random() * GRID_SIZE)
      newTiles.push({
        id: tileId++,
        value: Math.random() < 0.9 ? 2 : 4,
        x,
        y,
        isNew: true,
        isMerged: false,
      })
    }
    setGameState(prev => ({
      ...prev,
      tiles: newTiles,
      score: 0,
      gameOver: false,
      isWon: false,
      moveCount: 0,
    }))
  }, [])

  // 初始化
  useEffect(() => {
    initGame()
  }, [initGame])

  // 检查是否有空位
  const hasEmptyCell = useCallback((tiles: Tile[]) => {
    const occupied = new Set(tiles.map(t => `${t.x},${t.y}`))
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        if (!occupied.has(`${x},${y}`)) return true
      }
    }
    return false
  }, [])

  // 添加新方块
  const addNewTile = useCallback((tiles: Tile[]) => {
    if (!hasEmptyCell(tiles)) return tiles

    let x, y
    do {
      x = Math.floor(Math.random() * GRID_SIZE)
      y = Math.floor(Math.random() * GRID_SIZE)
    } while (tiles.some(t => t.x === x && t.y === y))

    return [
      ...tiles,
      {
        id: tileId++,
        value: Math.random() < 0.9 ? 2 : 4,
        x,
        y,
        isNew: true,
        isMerged: false,
      },
    ]
  }, [hasEmptyCell])

  // 移动方块
  const move = useCallback((direction: 'left' | 'right' | 'up' | 'down') => {
    if (gameState.gameOver || gameState.isPaused || gameState.isWon) return

    setGameState(prev => {
      let newTiles = prev.tiles.map(t => ({ ...t, isNew: false, isMerged: false }))
      let moved = false
      let newScore = prev.score

      // 按方向排序
      if (direction === 'left' || direction === 'right') {
        newTiles.sort((a, b) => direction === 'left' ? a.x - b.x : b.x - a.x)
      } else {
        newTiles.sort((a, b) => direction === 'up' ? a.y - b.y : b.y - a.y)
      }

      // 移动和合并
      for (let i = 0; i < newTiles.length; i++) {
        const tile = newTiles[i]
        let newX = tile.x
        let newY = tile.y

        // 移动
        if (direction === 'left') {
          while (newX > 0 && !newTiles.some(t => t !== tile && t.x === newX - 1 && t.y === newY)) {
            newX--
          }
        } else if (direction === 'right') {
          while (newX < GRID_SIZE - 1 && !newTiles.some(t => t !== tile && t.x === newX + 1 && t.y === newY)) {
            newX++
          }
        } else if (direction === 'up') {
          while (newY > 0 && !newTiles.some(t => t !== tile && t.x === newX && t.y === newY - 1)) {
            newY--
          }
        } else if (direction === 'down') {
          while (newY < GRID_SIZE - 1 && !newTiles.some(t => t !== tile && t.x === newX && t.y === newY + 1)) {
            newY++
          }
        }

        if (newX !== tile.x || newY !== tile.y) {
          tile.x = newX
          tile.y = newY
          moved = true
        }

        // 合并
        const adjacentTile = newTiles.find(
          t => t !== tile && t.x === newX && t.y === newY && t.value === tile.value && !t.isMerged
        )
        if (adjacentTile) {
          tile.value *= 2
          tile.isMerged = true
          newScore += tile.value
          newTiles = newTiles.filter(t => t !== adjacentTile)
          moved = true
        }
      }

      if (!moved) return prev

      // 添加新方块
      newTiles = addNewTile(newTiles)

      // 检查游戏结束
      let gameOver = false
      let isWon = false

      if (!hasEmptyCell(newTiles)) {
        gameOver = true
        for (const tile of newTiles) {
          if (tile.value === 2048) {
            isWon = true
            break
          }
        }
      }

      const bestScore = Math.max(newScore, prev.bestScore)
      if (bestScore > prev.bestScore) {
        localStorage.setItem('2048-best-score', bestScore.toString())
      }

      return {
        ...prev,
        tiles: newTiles,
        score: newScore,
        bestScore,
        gameOver,
        isWon,
        moveCount: prev.moveCount + 1,
      }
    })
  }, [gameState.gameOver, gameState.isPaused, gameState.isWon, addNewTile, hasEmptyCell])

  // 键盘控制
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'arrowleft':
        case 'a':
          e.preventDefault()
          move('left')
          break
        case 'arrowright':
        case 'd':
          e.preventDefault()
          move('right')
          break
        case 'arrowup':
        case 'w':
          e.preventDefault()
          move('up')
          break
        case 'arrowdown':
        case 's':
          e.preventDefault()
          move('down')
          break
        case 'p':
          e.preventDefault()
          setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }))
          break
        case 'r':
          e.preventDefault()
          initGame()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [move, initGame])

  return {
    ...gameState,
    move,
    initGame,
    getTileColor,
    getTileTextColor,
    GRID_SIZE,
  }
}
