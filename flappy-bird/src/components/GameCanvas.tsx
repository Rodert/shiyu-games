import { useEffect, useRef } from 'react'
import type { Bird, Pipe } from '../hooks/useFlappyBirdLogic'

interface GameCanvasProps {
  bird: Bird
  pipes: Pipe[]
  CANVAS_WIDTH: number
  CANVAS_HEIGHT: number
  BIRD_SIZE: number
  PIPE_WIDTH: number
  PIPE_GAP: number
}

export const GameCanvas = ({
  bird,
  pipes,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  BIRD_SIZE,
  PIPE_WIDTH,
  PIPE_GAP,
}: GameCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 清空画布
    ctx.fillStyle = '#0a0e27'
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // 绘制背景网格
    ctx.strokeStyle = 'rgba(0, 255, 65, 0.05)'
    ctx.lineWidth = 1
    for (let i = 0; i < CANVAS_WIDTH; i += 40) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, CANVAS_HEIGHT)
      ctx.stroke()
    }
    for (let i = 0; i < CANVAS_HEIGHT; i += 40) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(CANVAS_WIDTH, i)
      ctx.stroke()
    }

    // 绘制管道
    for (const pipe of pipes) {
      // 上管道
      ctx.fillStyle = '#00ff41'
      ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight)

      // 上管道边框
      ctx.strokeStyle = '#00ffff'
      ctx.lineWidth = 2
      ctx.strokeRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight)

      // 下管道
      ctx.fillStyle = '#00ff41'
      ctx.fillRect(pipe.x, pipe.bottomY, PIPE_WIDTH, CANVAS_HEIGHT - pipe.bottomY)

      // 下管道边框
      ctx.strokeStyle = '#00ffff'
      ctx.lineWidth = 2
      ctx.strokeRect(pipe.x, pipe.bottomY, PIPE_WIDTH, CANVAS_HEIGHT - pipe.bottomY)

      // 管道发光效果
      ctx.shadowColor = '#00ff41'
      ctx.shadowBlur = 10
      ctx.fillStyle = 'rgba(0, 255, 65, 0.2)'
      ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight)
      ctx.fillRect(pipe.x, pipe.bottomY, PIPE_WIDTH, CANVAS_HEIGHT - pipe.bottomY)
      ctx.shadowBlur = 0
    }

    // 绘制鸟
    ctx.save()
    ctx.translate(bird.x, bird.y)

    // 鸟的身体
    ctx.fillStyle = '#ffff00'
    ctx.beginPath()
    ctx.arc(0, 0, BIRD_SIZE / 2, 0, Math.PI * 2)
    ctx.fill()

    // 鸟的眼睛
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(5, -5, 3, 0, Math.PI * 2)
    ctx.fill()

    // 鸟的嘴
    ctx.strokeStyle = '#ff7700'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(8, 0)
    ctx.lineTo(12, 0)
    ctx.stroke()

    // 鸟的翅膀（旋转效果）
    const wingRotation = Math.sin(Date.now() / 100) * 0.3
    ctx.rotate(wingRotation)
    ctx.fillStyle = 'rgba(255, 255, 0, 0.6)'
    ctx.fillRect(-BIRD_SIZE / 2 - 5, -3, 5, 6)
    ctx.fillRect(BIRD_SIZE / 2, -3, 5, 6)

    // 鸟的发光效果
    ctx.shadowColor = '#ffff00'
    ctx.shadowBlur = 10
    ctx.beginPath()
    ctx.arc(0, 0, BIRD_SIZE / 2 + 2, 0, Math.PI * 2)
    ctx.strokeStyle = '#ffff00'
    ctx.lineWidth = 1
    ctx.stroke()

    ctx.restore()
  }, [bird, pipes, CANVAS_WIDTH, CANVAS_HEIGHT, BIRD_SIZE, PIPE_WIDTH, PIPE_GAP])

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      className="border-2 border-neon-cyan shadow-lg"
      style={{
        boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
        backgroundColor: '#0a0e27',
      }}
    />
  )
}
