import { useState, useEffect, useCallback, useRef } from 'react'

export interface Position {
  x: number
  y: number
}

export interface GameState {
  snake: Position[]
  food: Position
  direction: Position
  nextDirection: Position
  score: number
  gameOver: boolean
  isPaused: boolean
  gridSize: number
  speed: number
}

const GRID_SIZE = 20
const INITIAL_SPEED = 100

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 15 },
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    score: 0,
    gameOver: false,
    isPaused: false,
    gridSize: GRID_SIZE,
    speed: INITIAL_SPEED,
  })

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null)

  // Generate random food position
  const generateFood = useCallback((snake: Position[]): Position => {
    let newFood: Position
    let isOnSnake = true

    while (isOnSnake) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      }
      isOnSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)
    }

    return newFood
  }, [])

  // Update game state
  const updateGame = useCallback(() => {
    setGameState(prevState => {
      if (prevState.gameOver || prevState.isPaused) return prevState

      const head = prevState.snake[0]
      const newHead = {
        x: (head.x + prevState.nextDirection.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + prevState.nextDirection.y + GRID_SIZE) % GRID_SIZE,
      }

      // Check collision with self
      if (prevState.snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        return { ...prevState, gameOver: true }
      }

      let newSnake = [newHead, ...prevState.snake]
      let newScore = prevState.score
      let newFood = prevState.food
      let newSpeed = prevState.speed

      // Check if food is eaten
      if (newHead.x === prevState.food.x && newHead.y === prevState.food.y) {
        newScore += 10
        newFood = generateFood(newSnake)
        // Increase speed slightly
        newSpeed = Math.max(50, prevState.speed - 2)
      } else {
        newSnake = newSnake.slice(0, -1)
      }

      return {
        ...prevState,
        snake: newSnake,
        food: newFood,
        direction: prevState.nextDirection,
        score: newScore,
        speed: newSpeed,
      }
    })
  }, [generateFood])

  // Game loop
  useEffect(() => {
    gameLoopRef.current = setInterval(updateGame, gameState.speed)

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current)
    }
  }, [gameState.speed, updateGame])

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()

      setGameState(prevState => {
        let newDirection = prevState.nextDirection

        switch (key) {
          case 'arrowup':
          case 'w':
            if (prevState.direction.y === 0) newDirection = { x: 0, y: -1 }
            break
          case 'arrowdown':
          case 's':
            if (prevState.direction.y === 0) newDirection = { x: 0, y: 1 }
            break
          case 'arrowleft':
          case 'a':
            if (prevState.direction.x === 0) newDirection = { x: -1, y: 0 }
            break
          case 'arrowright':
          case 'd':
            if (prevState.direction.x === 0) newDirection = { x: 1, y: 0 }
            break
          case ' ':
            e.preventDefault()
            return { ...prevState, isPaused: !prevState.isPaused }
          case 'r':
            return resetGame()
          default:
            return prevState
        }

        return { ...prevState, nextDirection: newDirection }
      })
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const resetGame = useCallback((): GameState => {
    return {
      snake: [{ x: 10, y: 10 }],
      food: { x: 15, y: 15 },
      direction: { x: 1, y: 0 },
      nextDirection: { x: 1, y: 0 },
      score: 0,
      gameOver: false,
      isPaused: false,
      gridSize: GRID_SIZE,
      speed: INITIAL_SPEED,
    }
  }, [])

  const togglePause = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }))
  }, [])

  const restart = useCallback(() => {
    setGameState(resetGame())
  }, [resetGame])

  return {
    gameState,
    togglePause,
    restart,
  }
}
