import React, { useEffect, useRef } from 'react'

interface MazeCanvasProps {
  maze: number[][]
  playerPos: { x: number; y: number }
  targetPos: { x: number; y: number }
  cellSize: number
  mazeSize: number
}

export const MazeCanvas: React.FC<MazeCanvasProps> = ({
  maze,
  playerPos,
  targetPos,
  cellSize,
  mazeSize,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 清空画布
    ctx.fillStyle = '#1a1a1a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // 绘制迷宫
    for (let y = 0; y < mazeSize; y++) {
      for (let x = 0; x < mazeSize; x++) {
        if (maze[y][x] === 1) {
          // 墙壁
          ctx.fillStyle = '#00ff41'
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
          
          // 添加霓虹灯效果
          ctx.strokeStyle = '#00ffff'
          ctx.lineWidth = 0.5
          ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize)
        }
      }
    }

    // 绘制目标
    ctx.fillStyle = '#ffff00'
    ctx.beginPath()
    ctx.arc(
      (targetPos.x + 0.5) * cellSize,
      (targetPos.y + 0.5) * cellSize,
      cellSize * 0.4,
      0,
      Math.PI * 2
    )
    ctx.fill()

    // 添加目标的光晕效果
    ctx.strokeStyle = '#ffaa00'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(
      (targetPos.x + 0.5) * cellSize,
      (targetPos.y + 0.5) * cellSize,
      cellSize * 0.5,
      0,
      Math.PI * 2
    )
    ctx.stroke()

    // 绘制玩家
    ctx.fillStyle = '#00ffff'
    ctx.beginPath()
    ctx.arc(
      (playerPos.x + 0.5) * cellSize,
      (playerPos.y + 0.5) * cellSize,
      cellSize * 0.35,
      0,
      Math.PI * 2
    )
    ctx.fill()

    // 添加玩家的光晕效果
    ctx.strokeStyle = '#00ff41'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(
      (playerPos.x + 0.5) * cellSize,
      (playerPos.y + 0.5) * cellSize,
      cellSize * 0.45,
      0,
      Math.PI * 2
    )
    ctx.stroke()
  }, [maze, playerPos, targetPos, cellSize, mazeSize])

  const canvasWidth = mazeSize * cellSize
  const canvasHeight = mazeSize * cellSize

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      className="border-2 border-neon-cyan rounded-lg shadow-2xl"
      style={{
        boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
      }}
    />
  )
}
