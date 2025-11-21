import { useBubblePopLogic } from './hooks/useBubblePopLogic'
import { BubblePopUI } from './components/BubblePopUI'

export default function App() {
  const {
    bubbles,
    score,
    combo,
    timeLeft,
    gameOver,
    gameStarted,
    isPaused,
    popBubble,
    startGame,
    restart,
    togglePause,
  } = useBubblePopLogic()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full">
        <BubblePopUI
          bubbles={bubbles}
          score={score}
          combo={combo}
          timeLeft={timeLeft}
          gameOver={gameOver}
          gameStarted={gameStarted}
          isPaused={isPaused}
          onBubbleClick={popBubble}
          onStart={startGame}
          onRestart={restart}
          onTogglePause={togglePause}
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
