import { useTypingMasterLogic } from './hooks/useTypingMasterLogic'
import { GameUI } from './components/GameUI'

export default function App() {
  const gameState = useTypingMasterLogic()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2" style={{
            background: 'linear-gradient(135deg, #ffaa00, #ff00ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 30px rgba(255, 170, 0, 0.3)',
          }}>
            ⌨️ 打字大师
          </h1>
          <p className="text-neon-cyan text-lg" style={{ textShadow: '0 0 10px rgba(0, 255, 255, 0.3)' }}>
            Typing Master Game
          </p>
        </div>

        {/* 游戏区域 */}
        <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border-2 border-neon-cyan"
          style={{ boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)' }}>
          <GameUI
            currentWord={gameState.currentWord}
            score={gameState.score}
            correct={gameState.correct}
            wrong={gameState.wrong}
            timeLeft={gameState.timeLeft}
            wpm={gameState.wpm}
            gameOver={gameState.gameOver}
            gameStarted={gameState.gameStarted}
            onSubmit={gameState.submitWord}
            onStart={gameState.startGame}
            onRestart={gameState.restart}
          />
        </div>

        {/* 页脚 */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>仕宇游戏合集 - Typing Master v1.0.0</p>
          <p className="mt-2">
            <a href="../" className="text-neon-cyan hover:text-neon-lime transition-colors">← 返回游戏中心</a>
          </p>
        </div>
      </div>
    </div>
  )
}
