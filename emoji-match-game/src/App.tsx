import { useEmojiMatchLogic } from './hooks/useEmojiMatchLogic'
import { EmojiMatchUI } from './components/EmojiMatchUI'

export default function App() {
  const {
    cards,
    score,
    moves,
    matched,
    elapsedTime,
    gameWon,
    flipCard,
    restart,
  } = useEmojiMatchLogic()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full">
        <EmojiMatchUI
          cards={cards}
          score={score}
          moves={moves}
          matched={matched}
          elapsedTime={elapsedTime}
          gameWon={gameWon}
          onCardClick={flipCard}
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
