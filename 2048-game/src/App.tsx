import { use2048Logic } from './hooks/use2048Logic'
import { GameBoard } from './components/GameBoard'
import { GameUI } from './components/GameUI'

export default function App() {
  const gameState = use2048Logic()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2" style={{
            background: 'linear-gradient(135deg, #ff00ff, #00ffff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 30px rgba(255, 0, 255, 0.3)',
          }}>
            🎨 炫彩 2048
          </h1>
          <p className="text-neon-cyan text-lg" style={{ textShadow: '0 0 10px rgba(0, 255, 255, 0.3)' }}>
            2048 Game - 滑动合成挑战
          </p>
        </div>

        {/* 游戏区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 游戏画布 */}
          <div className="lg:col-span-2">
            <GameBoard
              tiles={gameState.tiles}
              GRID_SIZE={gameState.GRID_SIZE}
              getTileColor={gameState.getTileColor}
              getTileTextColor={gameState.getTileTextColor}
            />
          </div>

          {/* 游戏 UI */}
          <div className="lg:col-span-1">
            <GameUI
              score={gameState.score}
              bestScore={gameState.bestScore}
              gameOver={gameState.gameOver}
              isWon={gameState.isWon}
              isPaused={gameState.isPaused}
              moveCount={gameState.moveCount}
              onRestart={gameState.initGame}
              onPause={() => {
                // 暂停逻辑由键盘事件处理
              }}
            />
          </div>
        </div>

        {/* 页脚 */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>仕宇游戏合集 - 2048 Game v1.0.0</p>
          <p className="mt-2">
            <a href="../" className="text-neon-cyan hover:text-neon-lime transition-colors">← 返回游戏中心</a>
          </p>
        </div>
      </div>
    </div>
  )
}
