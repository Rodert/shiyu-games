import { RotateCcw, Pause, Play } from 'lucide-react'

interface GameUIProps {
  score: number
  bestScore: number
  gameOver: boolean
  isWon: boolean
  isPaused: boolean
  moveCount: number
  onRestart: () => void
  onPause: () => void
}

export const GameUI = ({
  score,
  bestScore,
  gameOver,
  isWon,
  isPaused,
  moveCount,
  onRestart,
  onPause,
}: GameUIProps) => {
  return (
    <div className="flex flex-col gap-6">
      {/* 分数显示 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-neon-cyan to-neon-purple p-4 rounded-lg border-2 border-neon-cyan"
          style={{ boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)' }}>
          <div className="text-neon-cyan text-xs font-bold">当前分数</div>
          <div className="text-white text-3xl font-bold mt-1">{score}</div>
        </div>
        <div className="bg-gradient-to-br from-neon-pink to-neon-purple p-4 rounded-lg border-2 border-neon-pink"
          style={{ boxShadow: '0 0 10px rgba(255, 0, 255, 0.5)' }}>
          <div className="text-neon-pink text-xs font-bold">最高分</div>
          <div className="text-white text-3xl font-bold mt-1">{bestScore}</div>
        </div>
      </div>

      {/* 游戏统计 */}
      <div className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-lg border-2 border-neon-lime">
        <div className="text-neon-lime text-sm font-bold mb-2">📊 游戏统计</div>
        <div className="text-gray-300 text-sm space-y-1">
          <div>移动次数: {moveCount}</div>
          <div>状态: {gameOver ? '❌ 游戏结束' : isPaused ? '⏸️ 暂停中' : '▶️ 进行中'}</div>
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex flex-col gap-3">
        <button
          onClick={onPause}
          disabled={gameOver}
          className="w-full bg-gradient-to-r from-neon-cyan to-neon-lime text-black font-bold py-3 px-4 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ boxShadow: '0 0 15px rgba(0, 255, 65, 0.5)' }}
        >
          {isPaused ? <Play className="inline mr-2" size={20} /> : <Pause className="inline mr-2" size={20} />}
          {isPaused ? '继续游戏' : '暂停游戏'}
        </button>

        <button
          onClick={onRestart}
          className="w-full bg-gradient-to-r from-neon-pink to-neon-purple text-white font-bold py-3 px-4 rounded-lg hover:shadow-lg transition-all"
          style={{ boxShadow: '0 0 15px rgba(255, 0, 255, 0.5)' }}
        >
          <RotateCcw className="inline mr-2" size={20} />
          重新开始
        </button>
      </div>

      {/* 游戏结束弹窗 */}
      {gameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-neon-cyan to-neon-purple p-8 rounded-lg border-2 border-neon-cyan text-center"
            style={{ boxShadow: '0 0 30px rgba(0, 255, 255, 0.8)' }}>
            <h2 className="text-3xl font-bold text-neon-lime mb-4">
              {isWon ? '🎉 恭喜！' : '游戏结束'}
            </h2>
            <p className="text-white text-lg mb-2">
              {isWon ? '你达到了 2048！' : '无法继续移动'}
            </p>
            <p className="text-white text-lg mb-6">最终分数: <span className="text-neon-cyan font-bold text-2xl">{score}</span></p>
            <button
              onClick={onRestart}
              className="bg-gradient-to-r from-neon-lime to-neon-cyan text-black font-bold py-3 px-8 rounded-lg hover:shadow-lg transition-all"
              style={{ boxShadow: '0 0 15px rgba(0, 255, 65, 0.5)' }}
            >
              重新开始
            </button>
          </div>
        </div>
      )}

      {/* 操作说明 */}
      <div className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-lg border-2 border-neon-cyan">
        <h3 className="text-neon-lime font-bold mb-2">⌨️ 操作说明</h3>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>← → ↑ ↓ 或 WASD: 移动方块</li>
          <li>P: 暂停/继续</li>
          <li>R: 重新开始</li>
          <li>合并相同数字的方块</li>
          <li>达到 2048 即可获胜</li>
        </ul>
      </div>
    </div>
  )
}
