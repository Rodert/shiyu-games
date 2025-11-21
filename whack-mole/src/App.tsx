import { useWhackMoleLogic } from './hooks/useWhackMoleLogic'
import { WhackMoleUI } from './components/WhackMoleUI'

export default function App() {
  const {
    moles,
    score,
    timeLeft,
    highScore,
    gameOver,
    isPaused,
    gameStarted,
    GRID_SIZE,
    whackMole,
    startGame,
    restart,
    togglePause,
  } = useWhackMoleLogic()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2" style={{
            background: 'linear-gradient(135deg, #00ff41, #00ffff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            🔨 打地鼠
          </h1>
          <p className="text-neon-cyan text-lg">Whack Mole - 极速反应小游戏</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-neon-cyan">
          <WhackMoleUI
            moles={moles}
            score={score}
            timeLeft={timeLeft}
            highScore={highScore}
            gameOver={gameOver}
            isPaused={isPaused}
            gameStarted={gameStarted}
            gridSize={GRID_SIZE}
            onWhackMole={whackMole}
            onStartGame={startGame}
            onRestart={restart}
            onTogglePause={togglePause}
          />
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
