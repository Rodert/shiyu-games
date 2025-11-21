import { useAirplaneLogic } from './hooks/useAirplaneLogic'
import { AirplaneCanvas } from './components/AirplaneCanvas'
import { AirplaneUI } from './components/AirplaneUI'

export default function App() {
  const {
    player,
    enemies,
    bullets,
    score,
    health,
    gameOver,
    isPaused,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    PLAYER_SIZE,
    ENEMY_SIZE,
    BULLET_SIZE,
  } = useAirplaneLogic()

  const handleRestart = () => {
    window.location.reload()
  }

  const handleTogglePause = () => {
    // 暂停功能通过键盘P键实现
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2" style={{
            background: 'linear-gradient(135deg, #00ff41, #00ffff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            ✈️ 飞机大战
          </h1>
          <p className="text-neon-cyan text-lg">Airplane Game - 像素空战</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 游戏画布 */}
          <div className="lg:col-span-2 flex justify-center">
            <AirplaneCanvas
              player={player}
              enemies={enemies}
              bullets={bullets}
              canvasWidth={CANVAS_WIDTH}
              canvasHeight={CANVAS_HEIGHT}
              playerSize={PLAYER_SIZE}
              enemySize={ENEMY_SIZE}
              bulletSize={BULLET_SIZE}
            />
          </div>

          {/* 游戏UI */}
          <div className="lg:col-span-1">
            <AirplaneUI
              score={score}
              health={health}
              gameOver={gameOver}
              isPaused={isPaused}
              onRestart={handleRestart}
              onTogglePause={handleTogglePause}
            />
          </div>
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
