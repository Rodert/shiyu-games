import { useEffect, useRef } from 'react'
import { Player, Obstacle } from '../hooks/useFlappyParkourLogic'

interface GameCanvasProps {
  player: Player
  obstacles: Obstacle[]
  score: number
}

export const GameCanvas = ({ player, obstacles, score }: GameCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)'
    ctx.fillRect(0, 0, 800, 600)

    // Draw background grid
    ctx.strokeStyle = 'rgba(0, 255, 136, 0.1)'
    ctx.lineWidth = 1
    for (let i = 0; i < 800; i += 50) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, 600)
      ctx.stroke()
    }
    for (let i = 0; i < 600; i += 50) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(800, i)
      ctx.stroke()
    }

    // Draw player (circle with glow)
    ctx.fillStyle = 'rgba(0, 255, 136, 0.8)'
    ctx.shadowColor = 'rgba(0, 255, 136, 0.6)'
    ctx.shadowBlur = 20
    ctx.beginPath()
    ctx.arc(player.x, player.y, 15, 0, Math.PI * 2)
    ctx.fill()

    // Draw player outline
    ctx.strokeStyle = 'rgba(0, 255, 136, 1)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(player.x, player.y, 15, 0, Math.PI * 2)
    ctx.stroke()

    // Draw obstacles
    obstacles.forEach(obs => {
      // Top obstacle
      ctx.fillStyle = 'rgba(255, 100, 100, 0.7)'
      ctx.shadowColor = 'rgba(255, 100, 100, 0.5)'
      ctx.shadowBlur = 15
      ctx.fillRect(obs.x, 0, 50, obs.gapY)

      // Bottom obstacle
      ctx.fillRect(obs.x, obs.gapY + 150, 50, 600 - obs.gapY - 150)

      // Obstacle outline
      ctx.strokeStyle = 'rgba(255, 100, 100, 1)'
      ctx.lineWidth = 2
      ctx.strokeRect(obs.x, 0, 50, obs.gapY)
      ctx.strokeRect(obs.x, obs.gapY + 150, 50, 600 - obs.gapY - 150)
    })

    ctx.shadowColor = 'transparent'
  }, [player, obstacles])

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border-2 border-neon-cyan rounded-lg"
        style={{
          boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(20, 30, 50, 0.9))',
        }}
      />
      <div className="text-center text-neon-cyan text-sm">
        <p>按空格或点击跳跃 | 得分: {score}</p>
      </div>
    </div>
  )
}
