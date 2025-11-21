import React, { useEffect, useRef } from 'react'
import { GameState } from '../hooks/useGameLogic'

interface GameCanvasProps {
  gameState: GameState
}

const CELL_SIZE = 30
const GRID_COLOR = 'rgba(0, 255, 65, 0.1)'
const SNAKE_COLOR = '#00ff41'
const SNAKE_HEAD_COLOR = '#00ffff'
const FOOD_COLOR = '#ff006e'
const BACKGROUND_COLOR = '#0a0e27'

export const GameCanvas: React.FC<GameCanvasProps> = ({ gameState }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = BACKGROUND_COLOR
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = GRID_COLOR
    ctx.lineWidth = 0.5
    for (let i = 0; i <= gameState.gridSize; i++) {
      const pos = i * CELL_SIZE
      ctx.beginPath()
      ctx.moveTo(pos, 0)
      ctx.lineTo(pos, canvas.height)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, pos)
      ctx.lineTo(canvas.width, pos)
      ctx.stroke()
    }

    // Draw food with glow effect
    const foodX = gameState.food.x * CELL_SIZE
    const foodY = gameState.food.y * CELL_SIZE

    // Glow effect
    const gradient = ctx.createRadialGradient(
      foodX + CELL_SIZE / 2,
      foodY + CELL_SIZE / 2,
      0,
      foodX + CELL_SIZE / 2,
      foodY + CELL_SIZE / 2,
      CELL_SIZE
    )
    gradient.addColorStop(0, 'rgba(255, 0, 110, 0.6)')
    gradient.addColorStop(1, 'rgba(255, 0, 110, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(foodX - CELL_SIZE / 2, foodY - CELL_SIZE / 2, CELL_SIZE * 2, CELL_SIZE * 2)

    // Draw food
    ctx.fillStyle = FOOD_COLOR
    ctx.beginPath()
    ctx.arc(foodX + CELL_SIZE / 2, foodY + CELL_SIZE / 2, CELL_SIZE / 2 - 2, 0, Math.PI * 2)
    ctx.fill()

    // Draw snake
    gameState.snake.forEach((segment, index) => {
      const x = segment.x * CELL_SIZE
      const y = segment.y * CELL_SIZE
      const isHead = index === 0

      if (isHead) {
        // Head with glow
        const headGradient = ctx.createRadialGradient(
          x + CELL_SIZE / 2,
          y + CELL_SIZE / 2,
          0,
          x + CELL_SIZE / 2,
          y + CELL_SIZE / 2,
          CELL_SIZE
        )
        headGradient.addColorStop(0, 'rgba(0, 255, 255, 0.4)')
        headGradient.addColorStop(1, 'rgba(0, 255, 255, 0)')
        ctx.fillStyle = headGradient
        ctx.fillRect(x - CELL_SIZE / 2, y - CELL_SIZE / 2, CELL_SIZE * 2, CELL_SIZE * 2)

        ctx.fillStyle = SNAKE_HEAD_COLOR
        ctx.fillRect(x + 2, y + 2, CELL_SIZE - 4, CELL_SIZE - 4)

        // Eyes
        ctx.fillStyle = '#000'
        const eyeSize = 3
        if (gameState.direction.x === 1) {
          // Right
          ctx.fillRect(x + CELL_SIZE - 8, y + 6, eyeSize, eyeSize)
          ctx.fillRect(x + CELL_SIZE - 8, y + CELL_SIZE - 9, eyeSize, eyeSize)
        } else if (gameState.direction.x === -1) {
          // Left
          ctx.fillRect(x + 5, y + 6, eyeSize, eyeSize)
          ctx.fillRect(x + 5, y + CELL_SIZE - 9, eyeSize, eyeSize)
        } else if (gameState.direction.y === -1) {
          // Up
          ctx.fillRect(x + 6, y + 5, eyeSize, eyeSize)
          ctx.fillRect(x + CELL_SIZE - 9, y + 5, eyeSize, eyeSize)
        } else {
          // Down
          ctx.fillRect(x + 6, y + CELL_SIZE - 8, eyeSize, eyeSize)
          ctx.fillRect(x + CELL_SIZE - 9, y + CELL_SIZE - 8, eyeSize, eyeSize)
        }
      } else {
        // Body with gradient
        const bodyGradient = ctx.createLinearGradient(x, y, x + CELL_SIZE, y + CELL_SIZE)
        bodyGradient.addColorStop(0, SNAKE_COLOR)
        bodyGradient.addColorStop(1, 'rgba(0, 255, 65, 0.6)')
        ctx.fillStyle = bodyGradient
        ctx.fillRect(x + 2, y + 2, CELL_SIZE - 4, CELL_SIZE - 4)
      }
    })
  }, [gameState])

  const canvasWidth = gameState.gridSize * CELL_SIZE
  const canvasHeight = gameState.gridSize * CELL_SIZE

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      className="border-2 border-neon-green rounded-lg shadow-2xl"
      style={{
        borderColor: '#00ff41',
        boxShadow: '0 0 20px rgba(0, 255, 65, 0.5), inset 0 0 20px rgba(0, 255, 65, 0.1)',
      }}
    />
  )
}
