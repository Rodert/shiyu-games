import { useEffect, useRef } from 'react'

interface GameCanvasProps {
  grid: number[][]
  currentPiece: number[][] | null
  currentColor: string | null
  position: { x: number; y: number }
  GRID_WIDTH: number
  GRID_HEIGHT: number
  CELL_SIZE: number
}

export const GameCanvas = ({
  grid,
  currentPiece,
  currentColor,
  position,
  GRID_WIDTH,
  GRID_HEIGHT,
  CELL_SIZE,
}: GameCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 清空画布
    ctx.fillStyle = '#0a0e27'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // 绘制网格背景
    ctx.strokeStyle = 'rgba(0, 255, 65, 0.1)'
    ctx.lineWidth = 1
    for (let i = 0; i <= GRID_WIDTH; i++) {
      ctx.beginPath()
      ctx.moveTo(i * CELL_SIZE, 0)
      ctx.lineTo(i * CELL_SIZE, GRID_HEIGHT * CELL_SIZE)
      ctx.stroke()
    }
    for (let i = 0; i <= GRID_HEIGHT; i++) {
      ctx.beginPath()
      ctx.moveTo(0, i * CELL_SIZE)
      ctx.lineTo(GRID_WIDTH * CELL_SIZE, i * CELL_SIZE)
      ctx.stroke()
    }

    // 绘制已放置的方块
    for (let row = 0; row < GRID_HEIGHT; row++) {
      for (let col = 0; col < GRID_WIDTH; col++) {
        const cell = grid[row][col]
        if (cell) {
          const x = col * CELL_SIZE
          const y = row * CELL_SIZE
          const color = typeof cell === 'string' ? cell : '#00ff41'

          // 绘制方块
          ctx.fillStyle = color
          ctx.fillRect(x + 2, y + 2, CELL_SIZE - 4, CELL_SIZE - 4)

          // 绘制霓虹灯效果
          ctx.strokeStyle = '#00ffff'
          ctx.lineWidth = 2
          ctx.strokeRect(x + 2, y + 2, CELL_SIZE - 4, CELL_SIZE - 4)

          // 阴影效果
          ctx.fillStyle = `${color}4d`
          ctx.fillRect(x + 2, y + 2, CELL_SIZE - 4, CELL_SIZE - 4)
        }
      }
    }

    // 绘制当前方块
    if (currentPiece && currentColor) {
      for (let row = 0; row < currentPiece.length; row++) {
        for (let col = 0; col < currentPiece[row].length; col++) {
          if (currentPiece[row][col]) {
            const x = (position.x + col) * CELL_SIZE
            const y = (position.y + row) * CELL_SIZE

            if (y >= 0) {
              // 绘制方块
              ctx.fillStyle = currentColor
              ctx.fillRect(x + 2, y + 2, CELL_SIZE - 4, CELL_SIZE - 4)

              // 绘制霓虹灯效果
              ctx.shadowColor = currentColor
              ctx.shadowBlur = 10
              ctx.strokeStyle = '#ffffff'
              ctx.lineWidth = 2
              ctx.strokeRect(x + 2, y + 2, CELL_SIZE - 4, CELL_SIZE - 4)
              ctx.shadowBlur = 0

              // 渐变效果
              const gradient = ctx.createLinearGradient(x, y, x + CELL_SIZE, y + CELL_SIZE)
              gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)')
              gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
              ctx.fillStyle = gradient
              ctx.fillRect(x + 2, y + 2, CELL_SIZE - 4, CELL_SIZE - 4)
            }
          }
        }
      }
    }
  }, [grid, currentPiece, currentColor, position, GRID_WIDTH, GRID_HEIGHT, CELL_SIZE])

  return (
    <canvas
      ref={canvasRef}
      width={GRID_WIDTH * 30}
      height={GRID_HEIGHT * 30}
      className="border-2 border-neon-cyan shadow-lg"
      style={{
        boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
        backgroundColor: '#0a0e27',
      }}
    />
  )
}
