import React, { useEffect, useRef } from 'react'

interface SpeedTetrisCanvasProps {
  grid: (string | number)[][]
  currentPiece: number[][] | null
  currentColor: string | null
  position: { x: number; y: number }
  gridWidth: number
  gridHeight: number
  cellSize: number
}

export const SpeedTetrisCanvas: React.FC<SpeedTetrisCanvasProps> = ({
  grid,
  currentPiece,
  currentColor,
  position,
  gridWidth,
  gridHeight,
  cellSize,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = gridWidth * cellSize
    const height = gridHeight * cellSize

    // 清空画布
    ctx.fillStyle = '#1a1a1a'
    ctx.fillRect(0, 0, width, height)

    // 绘制网格背景
    ctx.strokeStyle = '#333333'
    ctx.lineWidth = 0.5
    for (let x = 0; x <= gridWidth; x++) {
      ctx.beginPath()
      ctx.moveTo(x * cellSize, 0)
      ctx.lineTo(x * cellSize, height)
      ctx.stroke()
    }
    for (let y = 0; y <= gridHeight; y++) {
      ctx.beginPath()
      ctx.moveTo(0, y * cellSize)
      ctx.lineTo(width, y * cellSize)
      ctx.stroke()
    }

    // 绘制已放置的方块
    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        if (grid[y][x]) {
          ctx.fillStyle = grid[y][x] as string
          ctx.fillRect(x * cellSize + 1, y * cellSize + 1, cellSize - 2, cellSize - 2)

          // 方块边框
          ctx.strokeStyle = '#ffffff'
          ctx.lineWidth = 1
          ctx.strokeRect(x * cellSize + 1, y * cellSize + 1, cellSize - 2, cellSize - 2)
        }
      }
    }

    // 绘制当前方块
    if (currentPiece && currentColor) {
      ctx.fillStyle = currentColor
      for (let row = 0; row < currentPiece.length; row++) {
        for (let col = 0; col < currentPiece[row].length; col++) {
          if (currentPiece[row][col]) {
            const x = position.x + col
            const y = position.y + row
            if (y >= 0) {
              ctx.fillRect(x * cellSize + 1, y * cellSize + 1, cellSize - 2, cellSize - 2)
              ctx.strokeStyle = '#ffffff'
              ctx.lineWidth = 1
              ctx.strokeRect(x * cellSize + 1, y * cellSize + 1, cellSize - 2, cellSize - 2)
            }
          }
        }
      }
    }
  }, [grid, currentPiece, currentColor, position, gridWidth, gridHeight, cellSize])

  const width = gridWidth * cellSize
  const height = gridHeight * cellSize

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="border-2 border-neon-cyan rounded-lg shadow-2xl"
      style={{
        boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
      }}
    />
  )
}
