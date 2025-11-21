import { useMazeLogic } from './hooks/useMazeLogic'
import { MazeCanvas } from './components/MazeCanvas'
import { GameUI } from './components/GameUI'

export default function App() {
  const {
    maze,
    playerPos,
    targetPos,
    score,
    time,
    moveCount,
    isWon,
    isPaused,
    difficulty,
    regenerateMaze,
    changeDifficulty,
    togglePause,
  } = useMazeLogic()

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
            🌀 迷宫生成器
          </h1>
          <p className="text-neon-cyan text-lg">Maze Game - 随机闯关冒险</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 游戏画布 */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="overflow-auto max-h-[600px]">
              <MazeCanvas
                maze={maze}
                playerPos={playerPos}
                targetPos={targetPos}
                cellSize={20}
                mazeSize={21}
              />
            </div>
          </div>

          {/* 游戏UI */}
          <div className="lg:col-span-1">
            <GameUI
              score={score}
              time={time}
              moveCount={moveCount}
              isWon={isWon}
              isPaused={isPaused}
              difficulty={difficulty}
              onRestart={regenerateMaze}
              onTogglePause={togglePause}
              onChangeDifficulty={changeDifficulty}
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
