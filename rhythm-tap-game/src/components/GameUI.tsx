import { useEffect } from 'react'

interface GameUIProps {
  score: number
  combo: number
  maxCombo: number
  perfect: number
  good: number
  miss: number
  gameOver: boolean
  gameStarted: boolean
  onStart: () => void
  onRestart: () => void
}

export const GameUI = ({
  score,
  combo,
  maxCombo,
  perfect,
  good,
  miss,
  gameOver,
  gameStarted,
  onStart,
  onRestart,
}: GameUIProps) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        if (!gameStarted) {
          onStart()
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameStarted, onStart])

  return (
    <div className="flex flex-col gap-4">
      {/* 分数卡片 */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border-2 border-neon-cyan"
        style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)' }}>
        <div className="text-center">
          <p className="text-gray-400 text-xs mb-1">分数</p>
          <p className="text-3xl font-bold text-neon-lime">{score}</p>
        </div>
      </div>

      {/* Combo 卡片 */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border-2 border-neon-cyan"
        style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)' }}>
        <div className="text-center">
          <p className="text-gray-400 text-xs mb-1">连击</p>
          <p className="text-2xl font-bold text-neon-cyan">{combo}</p>
          <p className="text-gray-500 text-xs mt-1">最高: {maxCombo}</p>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border-2 border-neon-cyan"
        style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)' }}>
        <div className="text-center text-sm">
          <p className="text-green-400 mb-1">Perfect: {perfect}</p>
          <p className="text-blue-400 mb-1">Good: {good}</p>
          <p className="text-red-400">Miss: {miss}</p>
        </div>
      </div>

      {/* 游戏状态 */}
      {!gameStarted && !gameOver && (
        <div className="bg-gradient-to-br from-green-900 to-green-800 p-4 rounded-lg border-2 border-neon-lime"
          style={{ boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)' }}>
          <div className="text-center">
            <p className="text-neon-lime text-sm font-bold mb-3">准备好了吗？</p>
            <button
              onClick={onStart}
              className="w-full bg-neon-lime text-black font-bold py-2 rounded-lg hover:bg-opacity-80 transition-all text-sm"
            >
              开始游戏
            </button>
          </div>
        </div>
      )}

      {gameStarted && !gameOver && (
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-4 rounded-lg border-2 border-neon-cyan"
          style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}>
          <div className="text-center">
            <p className="text-neon-cyan text-sm font-bold">游戏中...</p>
          </div>
        </div>
      )}

      {gameOver && (
        <div className="bg-gradient-to-br from-red-900 to-red-800 p-4 rounded-lg border-2 border-red-500"
          style={{ boxShadow: '0 0 20px rgba(255, 100, 100, 0.3)' }}>
          <div className="text-center">
            <p className="text-red-300 text-sm font-bold mb-1">游戏结束!</p>
            <p className="text-red-200 text-xs mb-3">最终得分: {score}</p>
            <button
              onClick={onRestart}
              className="w-full bg-red-500 text-white font-bold py-2 rounded-lg hover:bg-red-600 transition-all text-sm"
            >
              重新开始
            </button>
          </div>
        </div>
      )}

      {/* 游戏说明 */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-lg border border-gray-700">
        <p className="text-gray-400 text-xs font-bold mb-2">📖 说明</p>
        <ul className="text-gray-500 text-xs space-y-1">
          <li>• 点击或按键跟随节奏</li>
          <li>• Perfect: 100分</li>
          <li>• Good: 50分</li>
          <li>• 保持连击获得奖励</li>
        </ul>
      </div>
    </div>
  )
}
