import { useSpeedTetrisLogic } from './hooks/useSpeedTetrisLogic'
import { SpeedTetrisCanvas } from './components/SpeedTetrisCanvas'
import { SpeedTetrisUI } from './components/SpeedTetrisUI'

export default function App() {
  const {
    grid,
    currentPiece,
    currentColor,
    position,
    score,
    level,
    lines,
    combo,
    gameOver,
    isPaused,
    GRID_WIDTH,
    GRID_HEIGHT,
    CELL_SIZE,
  } = useSpeedTetrisLogic()

  const handleRestart = () => {
    window.location.reload()
  }

  const handleTogglePause = () => {
    // 暂停功能通过键盘空格键实现
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2" style={{
            background: 'linear-gradient(135deg, #00ff41, #00ffff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            ⚡ 极速方块
          </h1>
          <p className="text-neon-cyan text-lg">Speed Tetris - 下落方块大战</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 游戏画布 */}
          <div className="lg:col-span-2 flex justify-center">
            <SpeedTetrisCanvas
              grid={grid}
              currentPiece={currentPiece}
              currentColor={currentColor}
              position={position}
              gridWidth={GRID_WIDTH}
              gridHeight={GRID_HEIGHT}
              cellSize={CELL_SIZE}
            />
          </div>

          {/* 游戏UI */}
          <div className="lg:col-span-1">
            <SpeedTetrisUI
              score={score}
              level={level}
              lines={lines}
              combo={combo}
              gameOver={gameOver}
              isPaused={isPaused}
              onRestart={handleRestart}
              onTogglePause={handleTogglePause}
            />
          </div>
        </div>

        <div className="text-center mt-8">
          <a href="../" className="text-neon-cyan hover:text-neon-lime transition-colors text-lg">
            ← 返回游戏中心
          </a>
        </div>
      </div>
    </div>
  )
}
