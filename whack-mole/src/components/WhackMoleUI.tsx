import React from 'react'
import { RotateCcw, Pause, Play } from 'lucide-react'

interface Mole {
  id: number
  x: number
  y: number
  isVisible: boolean
}

interface WhackMoleUIProps {
  moles: Mole[]
  score: number
  timeLeft: number
  highScore: number
  gameOver: boolean
  isPaused: boolean
  gameStarted: boolean
  gridSize: number
  onWhackMole: (id: number) => void
  onStartGame: () => void
  onRestart: () => void
  onTogglePause: () => void
}

export const WhackMoleUI: React.FC<WhackMoleUIProps> = ({
  moles,
  score,
  timeLeft,
  highScore,
  gameOver,
  isPaused,
  gameStarted,
  gridSize,
  onWhackMole,
  onStartGame,
  onRestart,
  onTogglePause,
}) => {
  return (
    <div className="w-full">
      {/* 顶部统计信息 */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gray-800 rounded-lg p-3 border border-neon-cyan text-center">
          <div className="text-neon-cyan text-xs font-semibold mb-1">得分</div>
          <div className="text-2xl font-bold text-neon-lime">{score}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-neon-cyan text-center">
          <div className="text-neon-cyan text-xs font-semibold mb-1">时间</div>
          <div className="text-2xl font-bold text-neon-lime">{timeLeft}s</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-neon-cyan text-center">
          <div className="text-neon-cyan text-xs font-semibold mb-1">最高分</div>
          <div className="text-2xl font-bold text-neon-lime">{highScore}</div>
        </div>
      </div>

      {/* 地鼠网格 */}
      <div className="mb-6">
        <div className={`grid gap-3`} style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
          {moles.map(mole => (
            <button
              key={mole.id}
              onClick={() => onWhackMole(mole.id)}
              disabled={!mole.isVisible}
              className={`aspect-square rounded-lg font-bold text-2xl transition-all transform ${
                mole.isVisible
                  ? 'bg-gradient-to-br from-neon-lime to-neon-cyan text-black scale-100 shadow-lg cursor-pointer hover:scale-110'
                  : 'bg-gray-700 text-gray-500 scale-95 cursor-not-allowed'
              }`}
            >
              {mole.isVisible ? '🔨' : '🕳️'}
            </button>
          ))}
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {!gameStarted && !gameOver && (
          <button
            onClick={onStartGame}
            className="flex-1 px-4 py-2 bg-neon-lime text-black font-bold rounded-lg hover:bg-neon-cyan transition-colors"
          >
            开始游戏
          </button>
        )}
        {gameStarted && !gameOver && (
          <>
            <button
              onClick={onTogglePause}
              className="flex items-center gap-2 px-4 py-2 bg-neon-cyan text-black font-bold rounded-lg hover:bg-neon-lime transition-colors"
            >
              {isPaused ? <Play size={20} /> : <Pause size={20} />}
              {isPaused ? '继续' : '暂停'}
            </button>
          </>
        )}
        {gameOver && (
          <button
            onClick={onRestart}
            className="flex items-center gap-2 px-4 py-2 bg-neon-lime text-black font-bold rounded-lg hover:bg-neon-cyan transition-colors flex-1"
          >
            <RotateCcw size={20} />
            重新开始
          </button>
        )}
      </div>

      {/* 游戏结束信息 */}
      {gameOver && (
        <div className="bg-gradient-to-r from-neon-lime to-neon-cyan p-6 rounded-lg text-center">
          <h2 className="text-3xl font-bold text-black mb-2">游戏结束！</h2>
          <p className="text-black font-semibold mb-2">得分: {score}</p>
          {score === highScore && score > 0 && (
            <p className="text-black font-bold mb-4">🎉 新的最高分！</p>
          )}
          <button
            onClick={onRestart}
            className="px-6 py-2 bg-black text-neon-lime font-bold rounded-lg hover:bg-gray-900 transition-colors"
          >
            再来一次
          </button>
        </div>
      )}

      {/* 操作说明 */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mt-6">
        <h3 className="text-neon-cyan font-bold mb-2">游戏说明</h3>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• 点击出现的地鼠获得分数</li>
          <li>• 每只地鼠 +10 分</li>
          <li>• 30 秒内尽可能多地敲击地鼠</li>
          <li>• 反应越快得分越高</li>
        </ul>
      </div>
    </div>
  )
}
