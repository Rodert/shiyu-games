import { useTicTacToeLogic } from './hooks/useTicTacToeLogic'
import { TicTacToeUI } from './components/TicTacToeUI'

export default function App() {
  const {
    board,
    gameOver,
    winner,
    isDraw,
    playerScore,
    aiScore,
    difficulty,
    playerMove,
    restart,
    changeDifficulty,
    resetScores,
  } = useTicTacToeLogic()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full">
        <TicTacToeUI
          board={board}
          gameOver={gameOver}
          winner={winner}
          isDraw={isDraw}
          playerScore={playerScore}
          aiScore={aiScore}
          difficulty={difficulty}
          onCellClick={playerMove}
          onRestart={restart}
          onChangeDifficulty={changeDifficulty}
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
