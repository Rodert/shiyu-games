import { ParkourCanvas } from './ParkourCanvas'

interface ParkourUIProps {
  gameState: any
  onJump: () => void
  onChangeDifficulty: (difficulty: 'easy' | 'normal' | 'hard') => void
  onRestart: () => void
  canvasWidth: number
  canvasHeight: number
  playerWidth: number
  playerHeight: number
  groundY: number
}

export const ParkourUI = ({
  gameState,
  onJump,
  onChangeDifficulty,
  onRestart,
  canvasWidth,
  canvasHeight,
  playerWidth,
  playerHeight,
  groundY,
}: ParkourUIProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-2" style={{
          background: 'linear-gradient(135deg, #00ff41, #00ffff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          🏃 前端跑酷
        </h1>
        <p className="text-neon-cyan text-lg">Parkour Game - 躲避障碍物冲向终点</p>
      </div>

      <div className="flex flex-col items-center gap-6">
        {/* 游戏画布 */}
        <div className="flex justify-center">
          <ParkourCanvas
            gameState={gameState}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            playerWidth={playerWidth}
            playerHeight={playerHeight}
            groundY={groundY}
          />
        </div>

        {/* 游戏信息 */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
          <div className="bg-gray-800 rounded-lg p-4 border border-neon-cyan text-center">
            <p className="text-gray-400 text-sm">当前分数</p>
            <p className="text-neon-lime text-3xl font-bold">{gameState.score}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-neon-cyan text-center">
            <p className="text-gray-400 text-sm">最高分</p>
            <p className="text-neon-cyan text-3xl font-bold">{gameState.highScore}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-neon-cyan text-center">
            <p className="text-gray-400 text-sm">难度</p>
            <p className="text-neon-yellow text-xl font-bold capitalize">{gameState.difficulty}</p>
          </div>
        </div>

        {/* 游戏状态 */}
        {gameState.gameOver && (
          <div className="bg-red-900 border-2 border-red-500 rounded-lg p-6 text-center w-full max-w-2xl">
            <p className="text-red-200 text-2xl font-bold mb-4">游戏结束！</p>
            <p className="text-red-100 text-lg mb-4">最终分数: {gameState.score}</p>
            <button
              onClick={onRestart}
              className="bg-neon-lime text-black font-bold py-2 px-6 rounded-lg hover:bg-green-400 transition-colors"
            >
              重新开始 (R)
            </button>
          </div>
        )}

        {gameState.isPaused && !gameState.gameOver && (
          <div className="bg-yellow-900 border-2 border-yellow-500 rounded-lg p-6 text-center w-full max-w-2xl">
            <p className="text-yellow-200 text-2xl font-bold">游戏暂停</p>
            <p className="text-yellow-100 text-sm mt-2">按 P 继续游戏</p>
          </div>
        )}

        {!gameState.gameStarted && !gameState.gameOver && (
          <div className="bg-blue-900 border-2 border-blue-500 rounded-lg p-6 text-center w-full max-w-2xl">
            <p className="text-blue-200 text-2xl font-bold mb-4">准备好了吗？</p>
            <p className="text-blue-100 text-sm mb-4">按空格键或↑开始跳跃</p>
            <button
              onClick={onJump}
              className="bg-neon-cyan text-black font-bold py-2 px-6 rounded-lg hover:bg-cyan-400 transition-colors"
            >
              开始游戏
            </button>
          </div>
        )}

        {/* 难度选择 */}
        {!gameState.gameStarted && !gameState.gameOver && (
          <div className="flex gap-4 w-full max-w-2xl justify-center">
            {(['easy', 'normal', 'hard'] as const).map(diff => (
              <button
                key={diff}
                onClick={() => onChangeDifficulty(diff)}
                className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                  gameState.difficulty === diff
                    ? 'bg-neon-cyan text-black'
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
              >
                {diff === 'easy' ? '简单' : diff === 'normal' ? '普通' : '困难'}
              </button>
            ))}
          </div>
        )}

        {/* 控制说明 */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-600 w-full max-w-2xl">
          <p className="text-gray-300 font-bold mb-2">控制说明:</p>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>• <span className="text-neon-cyan">空格 / ↑ / W</span> - 跳跃</li>
            <li>• <span className="text-neon-cyan">P</span> - 暂停/继续</li>
            <li>• <span className="text-neon-cyan">R</span> - 重新开始</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
