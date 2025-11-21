import { useEffect, useRef } from 'react'
import { Note } from '../hooks/useRhythmTapLogic'

interface GameCanvasProps {
  notes: Note[]
  currentTime: number
  onTap: (lane: number) => void
}

const LANES = 4
const LANE_WIDTH = 150
const CANVAS_WIDTH = LANES * LANE_WIDTH
const CANVAS_HEIGHT = 600
const NOTE_SIZE = 40
const HIT_ZONE_Y = CANVAS_HEIGHT - 100

export const GameCanvas = ({ notes, currentTime, onTap }: GameCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)'
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // Draw lane lines
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)'
    ctx.lineWidth = 2
    for (let i = 1; i < LANES; i++) {
      const x = i * LANE_WIDTH
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, CANVAS_HEIGHT)
      ctx.stroke()
    }

    // Draw hit zone
    ctx.fillStyle = 'rgba(0, 255, 136, 0.1)'
    ctx.fillRect(0, HIT_ZONE_Y - 50, CANVAS_WIDTH, 100)
    ctx.strokeStyle = 'rgba(0, 255, 136, 0.5)'
    ctx.lineWidth = 2
    ctx.strokeRect(0, HIT_ZONE_Y - 50, CANVAS_WIDTH, 100)

    // Draw notes
    notes.forEach(note => {
      if (note.hit) return

      const noteY = HIT_ZONE_Y - (currentTime - note.time) * 0.3
      if (noteY < -NOTE_SIZE || noteY > CANVAS_HEIGHT) return

      const laneX = note.lane * LANE_WIDTH + LANE_WIDTH / 2

      // Draw note circle
      ctx.fillStyle = note.hit ? 'rgba(0, 255, 136, 0.3)' : 'rgba(255, 100, 200, 0.8)'
      ctx.shadowColor = note.hit ? 'transparent' : 'rgba(255, 100, 200, 0.6)'
      ctx.shadowBlur = 15
      ctx.beginPath()
      ctx.arc(laneX, noteY, NOTE_SIZE / 2, 0, Math.PI * 2)
      ctx.fill()

      // Draw note outline
      ctx.strokeStyle = note.hit ? 'rgba(0, 255, 136, 0.5)' : 'rgba(255, 100, 200, 1)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(laneX, noteY, NOTE_SIZE / 2, 0, Math.PI * 2)
      ctx.stroke()
    })

    ctx.shadowColor = 'transparent'
  }, [notes, currentTime])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const lane = Math.floor(x / LANE_WIDTH)

    if (lane >= 0 && lane < LANES) {
      onTap(lane)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onClick={handleCanvasClick}
        className="border-2 border-neon-cyan rounded-lg cursor-pointer"
        style={{
          boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(20, 30, 50, 0.9))',
        }}
      />
      <div className="text-center text-neon-cyan text-sm">
        <p>点击对应的区域或按 D F J K 键</p>
      </div>
    </div>
  )
}
