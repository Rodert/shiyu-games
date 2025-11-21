import React from 'react'
import { RotateCcw } from 'lucide-react'

interface SpaceShooterUIProps {
  score: number
  health: number
  wave: number
  gameOver: boolean
  gameStarted: boolean
  onStart: () => void
  onRestart: () => void
}

export const SpaceShooterUI: React.FC<SpaceShooterUIProps> = ({
  score,
  health,
  wave,
  gameOver,
  gameStarted,
  onStart,
  onRestart,
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
          🚀 太空射击
        </h1>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-3 border border-neon-lime text-center">
          <div className="text-neon-lime text-sm font-semibold">得分</div>
          <div className="text-2xl font-bold text-neon-lime">{score}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-neon-cyan text-center">
          <div className="text-neon-cyan text-sm font-semibold">生命</div>
          <div className="text-2xl font-bold text-neon-cyan">{health}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-yellow-400 text-center">
          <div className="text-yellow-400 text-sm font-semibold">波次</div>
          <div className="text-2xl font-bold text-yellow-400">{wave}</div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg border-2 border-neon-cyan p-4 mb-6" style={{ height: '400px' }}>
        {!gameStarted && (
          <div className="h-full flex items-center justify-center">
            <button
              onClick={onStart}
              className="px-8 py-4 bg-neon-lime text-black font-bold rounded-lg hover:bg-neon-cyan transition-colors text-xl"
            >
              开始游戏
            </button>
          </div>
        )}

        {gameOver && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-neon-lime mb-4">游戏结束！</h2>
              <p className="text-xl text-neon-cyan mb-6">最终得分: {score}</p>
              <button
                onClick={onRestart}
                className="px-6 py-3 bg-neon-lime text-black font-bold rounded-lg hover:bg-neon-cyan transition-colors flex items-center justify-center gap-2 mx-auto"
              >
                <RotateCcw size={20} />
                再来一次
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <h3 className="text-neon-cyan font-bold mb-2">控制说明</h3>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• 方向键移动飞船</li>
          <li>• 空格键发射子弹</li>
          <li>• 消灭所有敌人进入下一波</li>
          <li>• 生命值为0游戏结束</li>
        </ul>
      </div>
    </div>
  )
}
