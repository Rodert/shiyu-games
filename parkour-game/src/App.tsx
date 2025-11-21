import { useParkourLogic } from './hooks/useParkourLogic'
import { ParkourUI } from './components/ParkourUI'

export default function App() {
  const {
    player,
    obstacles,
    clouds,
    score,
    gameOver,
    isPaused,
    gameStarted,
    difficulty,
    highScore,
    jump,
    changeDifficulty,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    PLAYER_WIDTH,
    PLAYER_HEIGHT,
    GROUND_Y,
  } = useParkourLogic()

  const handleRestart = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full">
        <ParkourUI
          gameState={{
            player,
            obstacles,
            clouds,
            score,
            gameOver,
            isPaused,
            gameStarted,
            difficulty,
            highScore,
          }}
          onJump={jump}
          onChangeDifficulty={changeDifficulty}
          onRestart={handleRestart}
          canvasWidth={CANVAS_WIDTH}
          canvasHeight={CANVAS_HEIGHT}
          playerWidth={PLAYER_WIDTH}
          playerHeight={PLAYER_HEIGHT}
          groundY={GROUND_Y}
        />

        <div className="text-center mt-8">
          <a href="../" className="text-neon-cyan hover:text-neon-lime transition-colors text-lg">
            ← 返回游戏中心
          </a>
        </div>
      </div>
    </div>
  )
}
