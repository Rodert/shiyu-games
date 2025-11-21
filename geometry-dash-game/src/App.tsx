export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
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
        <div className="text-center text-gray-400">
          <p className="text-xl mb-4">🚧 游戏开发中...</p>
          <p className="mb-4">敬请期待！</p>
          <a href="../" className="text-neon-cyan hover:text-neon-lime transition-colors">← 返回游戏中心</a>
        </div>
      </div>
    </div>
  )
}
