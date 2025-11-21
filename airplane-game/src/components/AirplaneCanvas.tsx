import React, { useEffect, useRef } from 'react'

interface AirplaneCanvasProps {
  player: { x: number; y: number; width: number; height: number }
  enemies: Array<{ x: number; y: number; width: number; height: number }>
  bullets: Array<{ x: number; y: number }>
  canvasWidth: number
  canvasHeight: number
  playerSize: number
  enemySize: number
  bulletSize: number
}

export const AirplaneCanvas: React.FC<AirplaneCanvasProps> = ({
  player,
  enemies,
  bullets,
  canvasWidth,
  canvasHeight,
  playerSize,
  enemySize,
  bulletSize,
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

    // 绘制背景星星
    ctx.fillStyle = '#ffffff'
    for (let i = 0; i < 50; i++) {
      const x = (i * 73) % canvasWidth
      const y = (i * 97) % canvasHeight
      ctx.fillRect(x, y, 1, 1)
    }

    // 绘制敌机
    for (const enemy of enemies) {
      // 敌机主体
      ctx.fillStyle = '#ff4444'
      ctx.beginPath()
      ctx.moveTo(enemy.x + enemy.width / 2, enemy.y)
      ctx.lineTo(enemy.x + enemy.width, enemy.y + enemy.height)
      ctx.lineTo(enemy.x, enemy.y + enemy.height)
      ctx.closePath()
      ctx.fill()

      // 敌机边框
      ctx.strokeStyle = '#ff0000'
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // 绘制子弹
    for (const bullet of bullets) {
      ctx.fillStyle = '#ffff00'
      ctx.beginPath()
      ctx.arc(bullet.x + bulletSize / 2, bullet.y, bulletSize, 0, Math.PI * 2)
      ctx.fill()

      // 子弹光晕
      ctx.strokeStyle = '#ffaa00'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(bullet.x + bulletSize / 2, bullet.y, bulletSize + 2, 0, Math.PI * 2)
      ctx.stroke()
    }

    // 绘制玩家飞机
    ctx.fillStyle = '#00ffff'
    ctx.beginPath()
    ctx.moveTo(player.x + player.width / 2, player.y)
    ctx.lineTo(player.x + player.width, player.y + player.height)
    ctx.lineTo(player.x, player.y + player.height)
    ctx.closePath()
    ctx.fill()

    // 玩家飞机边框
    ctx.strokeStyle = '#00ff41'
    ctx.lineWidth = 2
    ctx.stroke()

    // 玩家飞机光晕
    ctx.strokeStyle = 'rgba(0, 255, 65, 0.5)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(player.x + player.width / 2, player.y - 2)
    ctx.lineTo(player.x + player.width + 2, player.y + player.height + 2)
    ctx.lineTo(player.x - 2, player.y + player.height + 2)
    ctx.closePath()
    ctx.stroke()
  }, [player, enemies, bullets, canvasWidth, canvasHeight, playerSize, enemySize, bulletSize])

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
