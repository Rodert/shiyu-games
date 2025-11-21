import React from 'react'
import { RotateCcw, Play, Pause2 } from 'lucide-react'
import type { Bubble } from '../hooks/useBubblePopLogic'

interface BubblePopUIProps {
  bubbles: Bubble[]
  score: number
  combo: number
  timeLeft: number
  gameOver: boolean
  gameStarted: boolean
  isPaused: boolean
  onBubbleClick: (id: number) => void
  onStart: () => void
  onRestart: () => void
  onTogglePause: () => void
}

export const BubblePopUI: React.FC<BubblePopUIProps> = ({
  bubbles,
  score,
  combo,
  timeLeft,
  gameOver,
  gameStarted,
  isPaused,
  onBubbleClick,
  onStart,
  onRestart,
  onTogglePause,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-4" style={{
          background: 'linear-gradient(135deg, #00ff41, #00ffff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          💨 气泡爆破
        </h1>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gray-800 rounded-lg p-3 border border-neon-lime text-center">
          <div className="text-neon-lime text-xs font-semibold">得分</div>
          <div className="text-2xl font-bold text-neon-lime">{score}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-neon-cyan text-center">
          <div className="text-neon-cyan text-xs font-semibold">连击</div>
          <div className="text-2xl font-bold text-neon-cyan">{combo}x</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-yellow-400 text-center">
          <div className="text-yellow-400 text-xs font-semibold">时间</div>
          <div className="text-2xl font-bold text-yellow-400">{timeLeft}s</div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg border-2 border-neon-cyan p-4 mb-6 relative" style={{ width: '100%', height: '400px' }}>
        {bubbles.map(bubble => (
          <button
            key={bubble.id}
            onClick={() => onBubbleClick(bubble.id)}
            className="absolute rounded-full transition-transform hover:scale-110 cursor-pointer"
            style={{
              left: `${(bubble.x / 400) * 100}%`,
              top: `${(bubble.y / 600) * 100}%`,
              width: `${(bubble.size / 400) * 100}%`,
              aspectRatio: '1',
              backgroundColor: bubble.color,
              boxShadow: `0 0 10px ${bubble.color}`,
            }}
          />
        ))}

        {!gameStarted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <button
              onClick={onStart}
              className="px-8 py-4 bg-neon-lime text-black font-bold rounded-lg hover:bg-neon-cyan transition-colors text-xl"
            >
              <Play size={24} className="inline mr-2" />
              开始游戏
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-lg">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-neon-lime mb-4">游戏结束！</h2>
              <p className="text-xl text-neon-cyan mb-6">最终得分: {score}</p>
              <button
                onClick={onRestart}
                className="px-6 py-3 bg-neon-lime text-black font-bold rounded-lg hover:bg-neon-cyan transition-colors"
              >
                <RotateCcw size={20} className="inline mr-2" />
                再来一次
              </button>
            </div>
          </div>
        )}
      </div>

      {gameStarted && !gameOver && (
        <div className="flex gap-3 mb-6">
          <button
            onClick={onTogglePause}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-neon-cyan text-black font-bold rounded-lg hover:bg-neon-lime transition-colors"
          >
            {isPaused ? <Play size={20} /> : <Pause2 size={20} />}
            {isPaused ? '继续' : '暂停'}
          </button>
        </div>
      )}

      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <h3 className="text-neon-cyan font-bold mb-2">游戏说明</h3>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• 点击气泡爆破它们</li>
          <li>• 连续爆破获得连击奖励</li>
          <li>• 60秒内尽可能多地爆破气泡</li>
          <li>• 气泡会在屏幕内移动</li>
        </ul>
      </div>
    </div>
  )
}
