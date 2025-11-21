import React from 'react'
import { RotateCcw, Pause2, Play } from 'lucide-react'

interface GameUIProps {
  score: number
  time: number
  moveCount: number
  isWon: boolean
  isPaused: boolean
  difficulty: 'easy' | 'medium' | 'hard'
  onRestart: () => void
  onTogglePause: () => void
  onChangeDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void
}

export const GameUI: React.FC<GameUIProps> = ({
  score,
  time,
  moveCount,
  isWon,
  isPaused,
  difficulty,
  onRestart,
  onTogglePause,
  onChangeDifficulty,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="w-full">
      {/* 顶部统计信息 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4 border border-neon-cyan">
          <div className="text-neon-cyan text-sm font-semibold mb-1">时间</div>
          <div className="text-3xl font-bold text-neon-lime">{formatTime(time)}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-neon-cyan">
          <div className="text-neon-cyan text-sm font-semibold mb-1">步数</div>
          <div className="text-3xl font-bold text-neon-lime">{moveCount}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-neon-cyan">
          <div className="text-neon-cyan text-sm font-semibold mb-1">得分</div>
          <div className="text-3xl font-bold text-neon-lime">{score}</div>
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <button
          onClick={onTogglePause}
          className="flex items-center gap-2 px-4 py-2 bg-neon-cyan text-black font-bold rounded-lg hover:bg-neon-lime transition-colors"
        >
          {isPaused ? <Play size={20} /> : <Pause2 size={20} />}
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

      {/* 难度选择 */}
      <div className="mb-6">
        <div className="text-neon-cyan text-sm font-semibold mb-2">难度</div>
        <div className="flex gap-2">
          {(['easy', 'medium', 'hard'] as const).map(diff => (
            <button
              key={diff}
              onClick={() => onChangeDifficulty(diff)}
              className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                difficulty === diff
                  ? 'bg-neon-lime text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {diff === 'easy' ? '简单' : diff === 'medium' ? '中等' : '困难'}
            </button>
          ))}
        </div>
      </div>

      {/* 游戏结束信息 */}
      {isWon && (
        <div className="bg-gradient-to-r from-neon-lime to-neon-cyan p-6 rounded-lg text-center">
          <h2 className="text-3xl font-bold text-black mb-2">🎉 恭喜通关！</h2>
          <p className="text-black font-semibold mb-4">
            用时 {formatTime(time)} | 步数 {moveCount} | 得分 {score}
          </p>
          <button
            onClick={onRestart}
            className="px-6 py-2 bg-black text-neon-lime font-bold rounded-lg hover:bg-gray-900 transition-colors"
          >
            继续游戏
          </button>
        </div>
      )}

      {/* 操作说明 */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mt-6">
        <h3 className="text-neon-cyan font-bold mb-2">操作说明</h3>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• 方向键或 WASD：移动角色</li>
          <li>• 空格：暂停/继续</li>
          <li>• R：重新开始</li>
          <li>• 到达黄色目标点即可通关</li>
        </ul>
      </div>
    </div>
  )
}
