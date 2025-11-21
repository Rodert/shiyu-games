import React, { useEffect, useRef } from 'react'

interface JumpCanvasProps {
  player: { x: number; y: number; width: number; height: number }
  platforms: Array<{ x: number; y: number; width: number; height: number }>
  canvasWidth: number
  canvasHeight: number
  height: number
}

export const JumpCanvas: React.FC<JumpCanvasProps> = ({
  player,
  platforms,
  canvasWidth,
  canvasHeight,
  height,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 清空画布
    ctx.fillStyle = '#1a1a1a'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // 绘制背景网格
    ctx.strokeStyle = '#333333'
    ctx.lineWidth = 0.5
    for (let i = 0; i < canvasWidth; i += 40) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvasHeight)
      ctx.stroke()
    }
    for (let i = 0; i < canvasHeight; i += 40) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvasWidth, i)
      ctx.stroke()
    }

    // 绘制平台
    for (const platform of platforms) {
      // 平台主体
      ctx.fillStyle = '#00ff41'
      ctx.fillRect(platform.x, platform.y, platform.width, platform.height)

      // 平台边框
      ctx.strokeStyle = '#00ffff'
      ctx.lineWidth = 2
      ctx.strokeRect(platform.x, platform.y, platform.width, platform.height)

      // 平台光晕
      ctx.strokeStyle = 'rgba(0, 255, 65, 0.3)'
      ctx.lineWidth = 1
      ctx.strokeRect(platform.x - 2, platform.y - 2, platform.width + 4, platform.height + 4)
    }

    // 绘制玩家
    ctx.fillStyle = '#00ffff'
    ctx.beginPath()
    ctx.arc(
      player.x + player.width / 2,
      player.y + player.height / 2,
      player.width / 2,
      0,
      Math.PI * 2
    )
    ctx.fill()

    // 玩家边框
    ctx.strokeStyle = '#ffff00'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(
      player.x + player.width / 2,
      player.y + player.height / 2,
      player.width / 2 + 2,
      0,
      Math.PI * 2
    )
    ctx.stroke()

    // 绘制高度指示
    ctx.fillStyle = '#ffff00'
    ctx.font = 'bold 16px Arial'
    ctx.fillText(`高度: ${Math.floor(height)}`, 10, 30)
  }, [player, platforms, canvasWidth, canvasHeight, height])

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
