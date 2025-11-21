import { useEffect, useRef } from 'react'

interface ParkourCanvasProps {
  gameState: any
  canvasWidth: number
  canvasHeight: number
  playerWidth: number
  playerHeight: number
  groundY: number
}

export const ParkourCanvas = ({
  gameState,
  canvasWidth,
  canvasHeight,
  playerWidth,
  playerHeight,
  groundY,
}: ParkourCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 清空画布
    ctx.fillStyle = '#0a0e27'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // 绘制背景渐变
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight)
    gradient.addColorStop(0, '#1a1f3a')
    gradient.addColorStop(1, '#0a0e27')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // 绘制云朵
    gameState.clouds.forEach((cloud: any) => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
      ctx.beginPath()
      ctx.arc(cloud.x, cloud.y, 15, 0, Math.PI * 2)
      ctx.arc(cloud.x + 20, cloud.y - 5, 20, 0, Math.PI * 2)
      ctx.arc(cloud.x + 40, cloud.y, 15, 0, Math.PI * 2)
      ctx.fill()
    })

    // 绘制地面
    ctx.fillStyle = '#00ff41'
    ctx.fillRect(0, groundY + playerHeight, canvasWidth, canvasHeight - groundY - playerHeight)

    // 绘制地面装饰
    ctx.strokeStyle = '#00cc33'
    ctx.lineWidth = 2
    for (let i = 0; i < canvasWidth; i += 40) {
      ctx.beginPath()
      ctx.moveTo(i, groundY + playerHeight)
      ctx.lineTo(i + 20, groundY + playerHeight - 5)
      ctx.stroke()
    }

    // 绘制玩家
    const player = gameState.player
    ctx.fillStyle = '#ff00ff'
    ctx.fillRect(player.x, player.y, playerWidth, playerHeight)
    
    // 玩家眼睛
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(player.x + 8, player.y + 8, 5, 5)
    ctx.fillRect(player.x + 17, player.y + 8, 5, 5)

    // 绘制障碍物
    gameState.obstacles.forEach((obstacle: any) => {
      if (obstacle.type === 'spike') {
        ctx.fillStyle = '#ff0000'
        ctx.beginPath()
        ctx.moveTo(obstacle.x + obstacle.width / 2, obstacle.y)
        ctx.lineTo(obstacle.x, obstacle.y + obstacle.height)
        ctx.lineTo(obstacle.x + obstacle.width, obstacle.y + obstacle.height)
        ctx.fill()
      } else if (obstacle.type === 'box') {
        ctx.fillStyle = '#ff6600'
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
        ctx.strokeStyle = '#ffaa00'
        ctx.lineWidth = 2
        ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
      } else if (obstacle.type === 'gap') {
        ctx.fillStyle = '#000000'
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
      }
    })

    // 绘制得分信息
    ctx.fillStyle = '#00ff41'
    ctx.font = 'bold 20px Arial'
    ctx.fillText(`Score: ${gameState.score}`, 20, 30)
  }, [gameState, canvasWidth, canvasHeight, playerWidth, playerHeight, groundY])

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      className="border-2 border-neon-cyan rounded-lg shadow-lg shadow-neon-cyan"
    />
  )
}
