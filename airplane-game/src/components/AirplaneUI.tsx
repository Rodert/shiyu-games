import React from 'react'
import { RotateCcw, Pause, Play } from 'lucide-react'

interface AirplaneUIProps {
  score: number
  health: number
  gameOver: boolean
  isPaused: boolean
  onRestart: () => void
  onTogglePause: () => void
}

export const AirplaneUI: React.FC<AirplaneUIProps> = ({
  score,
  health,
  gameOver,
  isPaused,
  onRestart,
  onTogglePause,
}) => {
  return (
    <div className="w-full">
      {/* 顶部统计信息 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4 border border-neon-cyan">
          <div className="text-neon-cyan text-sm font-semibold mb-1">得分</div>
          <div className="text-3xl font-bold text-neon-lime">{score}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-neon-cyan">
          <div className="text-neon-cyan text-sm font-semibold mb-1">生命</div>
          <div className="text-3xl font-bold text-neon-lime">{'❤️'.repeat(Math.max(0, health))}</div>
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <button
          onClick={onTogglePause}
          className="flex items-center gap-2 px-4 py-2 bg-neon-cyan text-black font-bold rounded-lg hover:bg-neon-lime transition-colors"
        >
          {isPaused ? <Play size={20} /> : <Pause size={20} />}
          {isPaused ? '继续' : '暂停'}
        </button>
        <button
          onClick={onRestart}
          className="flex items-center gap-2 px-4 py-2 bg-neon-lime text-black font-bold rounded-lg hover:bg-neon-cyan transition-colors"
        >
          <RotateCcw size={20} />
          重新开始
        </button>
      </div>

      {/* 游戏结束信息 */}
      {gameOver && (
        <div className="bg-gradient-to-r from-neon-lime to-neon-cyan p-6 rounded-lg text-center">
          <h2 className="text-3xl font-bold text-black mb-2">游戏结束</h2>
          <p className="text-black font-semibold mb-4">
            最终得分: {score}
          </p>
          <button
            onClick={onRestart}
            className="px-6 py-2 bg-black text-neon-lime font-bold rounded-lg hover:bg-gray-900 transition-colors"
          >
            重新开始
          </button>
        </div>
      )}

      {/* 操作说明 */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mt-6">
        <h3 className="text-neon-cyan font-bold mb-2">操作说明</h3>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• 左右方向键或 A/D：左右移动</li>
          <li>• 空格：发射子弹</li>
          <li>• P：暂停/继续</li>
          <li>• R：重新开始</li>
          <li>• 消灭敌机获得分数</li>
          <li>• 被敌机撞击失去生命</li>
        </ul>
      </div>
    </div>
  )
}
