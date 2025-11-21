import { useEffect } from 'react'

interface GameUIProps {
  score: number
  bestScore: number
  gameOver: boolean
  gameStarted: boolean
  onJump: () => void
  onStart: () => void
  onRestart: () => void
}

export const GameUI = ({
  score,
  bestScore,
  gameOver,
  gameStarted,
  onJump,
  onStart,
  onRestart,
}: GameUIProps) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        if (!gameStarted) {
          onStart()
        } else if (!gameOver) {
          onJump()
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameStarted, gameOver, onJump, onStart])

  return (
    <div className="flex flex-col gap-6">
      {/* 分数卡片 */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg border-2 border-neon-cyan"
        style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)' }}>
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">当前分数</p>
          <p className="text-4xl font-bold text-neon-lime">{score}</p>
        </div>
      </div>

      {/* 最高分卡片 */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg border-2 border-neon-cyan"
        style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)' }}>
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">最高分</p>
          <p className="text-3xl font-bold text-neon-cyan">{bestScore}</p>
        </div>
      </div>

      {/* 游戏状态 */}
      {!gameStarted && !gameOver && (
        <div className="bg-gradient-to-br from-green-900 to-green-800 p-6 rounded-lg border-2 border-neon-lime"
          style={{ boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)' }}>
          <div className="text-center">
            <p className="text-neon-lime text-lg font-bold mb-4">准备好了吗？</p>
            <button
              onClick={onStart}
              className="w-full bg-neon-lime text-black font-bold py-3 rounded-lg hover:bg-opacity-80 transition-all transform hover:scale-105"
            >
              开始游戏
            </button>
          </div>
        </div>
      )}

      {gameStarted && !gameOver && (
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-6 rounded-lg border-2 border-neon-cyan"
          style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}>
          <div className="text-center">
            <p className="text-neon-cyan text-lg font-bold mb-4">游戏中...</p>
            <button
              onClick={onJump}
              className="w-full bg-neon-cyan text-black font-bold py-3 rounded-lg hover:bg-opacity-80 transition-all transform hover:scale-105"
            >
              跳跃 (空格)
            </button>
          </div>
        </div>
      )}

      {gameOver && (
        <div className="bg-gradient-to-br from-red-900 to-red-800 p-6 rounded-lg border-2 border-red-500"
          style={{ boxShadow: '0 0 20px rgba(255, 100, 100, 0.3)' }}>
          <div className="text-center">
            <p className="text-red-300 text-lg font-bold mb-2">游戏结束!</p>
            <p className="text-red-200 text-sm mb-4">最终得分: {score}</p>
            <button
              onClick={onRestart}
              className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition-all transform hover:scale-105"
            >
              重新开始
            </button>
          </div>
        </div>
      )}

      {/* 游戏说明 */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700">
        <p className="text-gray-400 text-sm font-bold mb-2">📖 游戏说明</p>
        <ul className="text-gray-500 text-xs space-y-1">
          <li>• 按空格键或点击按钮跳跃</li>
          <li>• 躲避红色障碍物</li>
          <li>• 通过障碍物获得分数</li>
          <li>• 不要碰到屏幕边界</li>
        </ul>
      </div>
    </div>
  )
}
