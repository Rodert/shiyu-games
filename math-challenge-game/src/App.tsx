import { useMathChallengeLogic } from './hooks/useMathChallengeLogic'
import { MathChallengeUI } from './components/MathChallengeUI'

export default function App() {
  const {
    currentQuestion,
    currentIndex,
    score,
    correct,
    wrong,
    timeLeft,
    gameOver,
    difficulty,
    questions,
    submitAnswer,
    changeDifficulty,
    restart,
  } = useMathChallengeLogic()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full">
        <MathChallengeUI
          currentQuestion={currentQuestion}
          currentIndex={currentIndex}
          score={score}
          correct={correct}
          wrong={wrong}
          timeLeft={timeLeft}
          gameOver={gameOver}
          difficulty={difficulty}
          totalQuestions={questions.length}
          onSubmit={submitAnswer}
          onRestart={restart}
          onChangeDifficulty={changeDifficulty}
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
