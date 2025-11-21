import { useGomokuLogic } from './hooks/useGomokuLogic'
import { GomokuUI } from './components/GomokuUI'

export default function App() {
  const {
    board,
    gameOver,
    winner,
    humanScore,
    aiScore,
    makeMove,
    restart,
  } = useGomokuLogic()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full">
        <GomokuUI
          board={board}
          gameOver={gameOver}
          winner={winner}
          humanScore={humanScore}
          aiScore={aiScore}
          onCellClick={makeMove}
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
