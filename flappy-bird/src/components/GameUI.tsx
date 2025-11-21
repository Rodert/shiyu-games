import { Play, Pause, RotateCcw } from 'lucide-react'

interface GameUIProps {
  score: number
  gameOver: boolean
  isPaused: boolean
  gameStarted: boolean
  onJump: () => void
  onRestart: () => void
}

export const GameUI = ({
  score,
  gameOver,
  isPaused,
  gameStarted,
  onJump,
  onRestart,
}: GameUIProps) => {
  return (
    <div className="flex flex-col gap-6">
      {/* 分数显示 */}
      <div className="bg-gradient-to-br from-neon-cyan to-neon-purple p-6 rounded-lg border-2 border-neon-cyan shadow-lg"
        style={{ boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)' }}>
        <div className="text-neon-cyan text-sm font-bold">分数</div>
        <div className="text-white text-4xl font-bold mt-2">{score}</div>
      </div>

      {/* 控制按钮 */}
      <div className="flex flex-col gap-3">
        <button
          onClick={onJump}
          disabled={gameOver}
          className="w-full bg-gradient-to-r from-neon-lime to-neon-cyan text-black font-bold py-3 px-4 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ boxShadow: '0 0 15px rgba(0, 255, 65, 0.5)' }}
        >
          <Play className="inline mr-2" size={20} />
          {gameStarted ? '跳跃' : '开始游戏'}
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
            <h2 className="text-3xl font-bold text-neon-lime mb-4">游戏结束！</h2>
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
          <li>SPACE / W / ↑: 跳跃</li>
          <li>P: 暂停/继续</li>
          <li>R: 重新开始</li>
          <li>避开绿色管道</li>
          <li>通过管道得分</li>
        </ul>
      </div>

      {/* 游戏状态 */}
      <div className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-lg border-2 border-neon-lime">
        <div className="text-neon-lime text-sm font-bold mb-2">🎮 游戏状态</div>
        <div className="text-gray-300 text-sm space-y-1">
          <div>状态: {gameOver ? '❌ 游戏结束' : gameStarted ? '▶️ 进行中' : '⏸️ 未开始'}</div>
          <div>暂停: {isPaused ? '✓ 是' : '✗ 否'}</div>
        </div>
      </div>
    </div>
  )
}
