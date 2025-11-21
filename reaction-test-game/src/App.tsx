import { useReactionTestLogic } from './hooks/useReactionTestLogic'
import { ReactionTestUI } from './components/ReactionTestUI'

export default function App() {
  const {
    isWaiting,
    isActive,
    reactionTime,
    currentRound,
    totalRounds,
    results,
    gameOver,
    bestTime,
    averageTime,
    startTest,
    handleClick,
    restart,
  } = useReactionTestLogic()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full">
        <ReactionTestUI
          isWaiting={isWaiting}
          isActive={isActive}
          reactionTime={reactionTime}
          currentRound={currentRound}
          totalRounds={totalRounds}
          results={results}
          gameOver={gameOver}
          bestTime={bestTime}
          averageTime={averageTime}
          onStart={startTest}
          onClick={handleClick}
          onRestart={restart}
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
