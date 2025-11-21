import { useTetrisLogic } from './hooks/useTetrisLogic'
import { GameCanvas } from './components/GameCanvas'
import { GameUI } from './components/GameUI'

export default function App() {
  const gameState = useTetrisLogic()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2" style={{
            background: 'linear-gradient(135deg, #00ff41, #00ffff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 30px rgba(0, 255, 65, 0.3)',
          }}>
            🧱 俄罗斯方块
          </h1>
          <p className="text-neon-cyan text-lg" style={{ textShadow: '0 0 10px rgba(0, 255, 255, 0.3)' }}>
            Tetris Game
          </p>
        </div>

        {/* 游戏区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 游戏画布 */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border-2 border-neon-cyan"
              style={{ boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)' }}>
              <GameCanvas
                grid={gameState.grid}
                currentPiece={gameState.currentPiece}
                currentColor={gameState.currentColor}
                position={gameState.position}
                GRID_WIDTH={gameState.GRID_WIDTH}
                GRID_HEIGHT={gameState.GRID_HEIGHT}
                CELL_SIZE={gameState.CELL_SIZE}
              />
            </div>
          </div>

          {/* 游戏 UI */}
          <div className="lg:col-span-1">
            <GameUI
              score={gameState.score}
              level={gameState.level}
              lines={gameState.lines}
              gameOver={gameState.gameOver}
              isPaused={gameState.isPaused}
              onPause={() => {
                // 暂停逻辑由键盘事件处理
              }}
              onRestart={() => {
                // 重启逻辑由键盘事件处理
              }}
            />
          </div>
        </div>

        {/* 页脚 */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>仕宇游戏合集 - Tetris Game v1.0.0</p>
          <p className="mt-2">
            <a href="../" className="text-neon-cyan hover:text-neon-lime transition-colors">← 返回游戏中心</a>
          </p>
        </div>
      </div>
    </div>
  )
}
