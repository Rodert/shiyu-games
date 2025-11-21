import { Pause, Play, RotateCcw } from 'lucide-react'

interface GameUIProps {
  score: number
  level: number
  lines: number
  gameOver: boolean
  isPaused: boolean
  onPause: () => void
  onRestart: () => void
}

export const GameUI = ({
  score,
  level,
  lines,
  gameOver,
  isPaused,
  onPause,
  onRestart,
}: GameUIProps) => {
  return (
    <div className="flex flex-col gap-6">
      {/* 统计信息 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-neon-cyan to-neon-purple p-4 rounded-lg border-2 border-neon-cyan shadow-lg"
          style={{ boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)' }}>
          <div className="text-neon-cyan text-sm font-bold">分数</div>
          <div className="text-white text-2xl font-bold mt-2">{score}</div>
        </div>

        <div className="bg-gradient-to-br from-neon-lime to-neon-cyan p-4 rounded-lg border-2 border-neon-lime shadow-lg"
          style={{ boxShadow: '0 0 10px rgba(0, 255, 65, 0.5)' }}>
          <div className="text-neon-lime text-sm font-bold">等级</div>
          <div className="text-white text-2xl font-bold mt-2">{level}</div>
        </div>

        <div className="bg-gradient-to-br from-neon-pink to-neon-purple p-4 rounded-lg border-2 border-neon-pink shadow-lg"
          style={{ boxShadow: '0 0 10px rgba(255, 0, 255, 0.5)' }}>
          <div className="text-neon-pink text-sm font-bold">消除行数</div>
          <div className="text-white text-2xl font-bold mt-2">{lines}</div>
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex gap-3">
        <button
          onClick={onPause}
          className="flex-1 bg-gradient-to-r from-neon-cyan to-neon-lime text-black font-bold py-3 px-4 rounded-lg hover:shadow-lg transition-all"
          style={{ boxShadow: '0 0 15px rgba(0, 255, 65, 0.5)' }}
        >
          {isPaused ? <Play className="inline mr-2" size={20} /> : <Pause className="inline mr-2" size={20} />}
          {isPaused ? '继续' : '暂停'}
        </button>

        <button
          onClick={onRestart}
          className="flex-1 bg-gradient-to-r from-neon-pink to-neon-purple text-white font-bold py-3 px-4 rounded-lg hover:shadow-lg transition-all"
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
            <p className="text-white text-lg mb-2">最终分数: <span className="text-neon-cyan font-bold">{score}</span></p>
            <p className="text-white text-lg mb-2">达到等级: <span className="text-neon-lime font-bold">{level}</span></p>
            <p className="text-white text-lg mb-6">消除行数: <span className="text-neon-pink font-bold">{lines}</span></p>
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
          <li>← / A: 左移</li>
          <li>→ / D: 右移</li>
          <li>↓ / S: 加速下落</li>
          <li>↑ / W: 旋转方块</li>
          <li>SPACE: 暂停/继续</li>
          <li>R: 重新开始</li>
        </ul>
      </div>
    </div>
  )
}
