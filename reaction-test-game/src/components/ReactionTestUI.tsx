import React from 'react'
import { RotateCcw } from 'lucide-react'

interface ReactionTestUIProps {
  isWaiting: boolean
  isActive: boolean
  reactionTime: number | null
  currentRound: number
  totalRounds: number
  results: number[]
  gameOver: boolean
  bestTime: number
  averageTime: number
  onStart: () => void
  onClick: () => void
  onRestart: () => void
}

export const ReactionTestUI: React.FC<ReactionTestUIProps> = ({
  isWaiting,
  isActive,
  reactionTime,
  currentRound,
  totalRounds,
  results,
  gameOver,
  bestTime,
  averageTime,
  onStart,
  onClick,
  onRestart,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4" style={{
          background: 'linear-gradient(135deg, #00ff41, #00ffff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          ⚡ 反应力测试
        </h1>
      </div>

      {!gameOver && (
        <div className="text-center mb-6">
          <div className="text-gray-400 mb-2">第 {currentRound} / {totalRounds} 轮</div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-neon-lime h-2 rounded-full transition-all"
              style={{ width: `${(currentRound / totalRounds) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="bg-gray-800 rounded-lg border-2 border-neon-cyan p-12 mb-6 text-center min-h-96 flex flex-col items-center justify-center">
        {!gameOver && !isActive && (
          <>
            {isWaiting ? (
              <div>
                <p className="text-gray-400 text-lg mb-4">准备好了吗？</p>
                <p className="text-gray-500 text-sm">等待屏幕变绿...</p>
              </div>
            ) : (
              <button
                onClick={onStart}
                className="px-8 py-4 bg-neon-lime text-black font-bold rounded-lg hover:bg-neon-cyan transition-colors text-xl"
              >
                开始测试
              </button>
            )}
          </>
        )}

        {isActive && (
          <button
            onClick={onClick}
            className="w-full h-full bg-gradient-to-br from-neon-lime to-neon-cyan text-black font-bold text-4xl rounded-lg hover:shadow-2xl transition-all"
          >
            点击！
          </button>
        )}

        {reactionTime && !gameOver && (
          <div className="text-center">
            <p className="text-gray-400 text-lg mb-2">你的反应时间</p>
            <p className="text-5xl font-bold text-neon-lime">{reactionTime}ms</p>
            <p className="text-gray-400 mt-4">准备下一轮...</p>
          </div>
        )}

        {gameOver && (
          <div className="text-center w-full">
            <h2 className="text-3xl font-bold text-neon-lime mb-6">测试完成！</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-700 rounded-lg p-4">
                <p className="text-gray-400 mb-2">最快反应</p>
                <p className="text-3xl font-bold text-neon-lime">{bestTime}ms</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <p className="text-gray-400 mb-2">平均反应</p>
                <p className="text-3xl font-bold text-neon-cyan">{averageTime}ms</p>
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 mb-6">
              <p className="text-gray-400 mb-3">所有反应时间</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {results.map((time, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gray-600 rounded text-neon-lime text-sm">
                    {time}ms
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={onRestart}
              className="w-full px-6 py-3 bg-neon-lime text-black font-bold rounded-lg hover:bg-neon-cyan transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw size={20} />
              再测一次
            </button>
          </div>
        )}
      </div>

      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <h3 className="text-neon-cyan font-bold mb-2">说明</h3>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• 等待屏幕变绿</li>
          <li>• 尽快点击绿色区域</li>
          <li>• 完成5轮测试</li>
          <li>• 测试你的反应速度</li>
        </ul>
      </div>
    </div>
  )
}
