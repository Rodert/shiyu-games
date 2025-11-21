import { useRockPaperScissorsLogic } from './hooks/useRockPaperScissorsLogic'
import { RockPaperScissorsUI } from './components/RockPaperScissorsUI'

export default function App() {
  const {
    playerChoice,
    computerChoice,
    result,
    playerScore,
    computerScore,
    draws,
    totalGames,
    play,
    reset,
    resetScores,
  } = useRockPaperScissorsLogic()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full">
        <RockPaperScissorsUI
          playerChoice={playerChoice}
          computerChoice={computerChoice}
          result={result}
          playerScore={playerScore}
          computerScore={computerScore}
          draws={draws}
          totalGames={totalGames}
          onPlay={play}
          onReset={reset}
          onResetScores={resetScores}
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
