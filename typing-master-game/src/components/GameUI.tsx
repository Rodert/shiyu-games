import { useState, useEffect } from 'react'

interface GameUIProps {
  currentWord: string
  score: number
  correct: number
  wrong: number
  timeLeft: number
  wpm: number
  gameOver: boolean
  gameStarted: boolean
  onSubmit: (input: string) => void
  onStart: () => void
  onRestart: () => void
}

export const GameUI = ({
  currentWord,
  score,
  correct,
  wrong,
  timeLeft,
  wpm,
  gameOver,
  gameStarted,
  onSubmit,
  onStart,
  onRestart,
}: GameUIProps) => {
  const [input, setInput] = useState('')

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        if (!gameStarted) {
          onStart()
        }
      } else if (e.code === 'Enter' && gameStarted && !gameOver) {
        e.preventDefault()
        if (input.trim()) {
          onSubmit(input)
          setInput('')
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameStarted, gameOver, input, onSubmit, onStart])

  return (
    <div className="flex flex-col gap-6">
      {/* 游戏状态 */}
      {!gameStarted && !gameOver && (
        <div className="text-center">
          <p className="text-neon-lime text-2xl font-bold mb-4">准备好了吗？</p>
          <button
            onClick={onStart}
            className="bg-neon-lime text-black font-bold py-3 px-8 rounded-lg hover:bg-opacity-80 transition-all text-lg"
          >
            开始游戏 (空格)
          </button>
        </div>
      )}

      {gameStarted && !gameOver && (
        <div className="space-y-6">
          {/* 计时器 */}
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">剩余时间</p>
            <p className={`text-5xl font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-neon-cyan'}`}>
              {timeLeft}s
            </p>
          </div>

          {/* 当前单词 */}
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">输入这个单词</p>
            <p className="text-4xl font-bold text-neon-lime" style={{ letterSpacing: '0.1em' }}>
              {currentWord}
            </p>
          </div>

          {/* 输入框 */}
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入单词..."
              className="flex-1 bg-gray-800 border-2 border-neon-cyan text-white px-4 py-3 rounded-lg focus:outline-none focus:border-neon-lime"
              autoFocus
            />
            <button
              onClick={() => {
                if (input.trim()) {
                  onSubmit(input)
                  setInput('')
                }
              }}
              className="bg-neon-cyan text-black font-bold px-6 py-3 rounded-lg hover:bg-opacity-80 transition-all"
            >
              提交
            </button>
          </div>

          {/* 统计信息 */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700">
              <p className="text-gray-400 text-xs mb-1">正确</p>
              <p className="text-2xl font-bold text-green-400">{correct}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700">
              <p className="text-gray-400 text-xs mb-1">错误</p>
              <p className="text-2xl font-bold text-red-400">{wrong}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700">
              <p className="text-gray-400 text-xs mb-1">分数</p>
              <p className="text-2xl font-bold text-neon-lime">{score}</p>
            </div>
          </div>
        </div>
      )}

      {gameOver && (
        <div className="text-center space-y-6">
          <div>
            <p className="text-red-400 text-2xl font-bold mb-2">游戏结束!</p>
            <p className="text-gray-400">最终统计</p>
          </div>

          {/* 最终统计 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <p className="text-gray-400 text-xs mb-1">总分</p>
              <p className="text-3xl font-bold text-neon-lime">{score}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <p className="text-gray-400 text-xs mb-1">WPM</p>
              <p className="text-3xl font-bold text-neon-cyan">{wpm}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <p className="text-gray-400 text-xs mb-1">正确</p>
              <p className="text-2xl font-bold text-green-400">{correct}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <p className="text-gray-400 text-xs mb-1">错误</p>
              <p className="text-2xl font-bold text-red-400">{wrong}</p>
            </div>
          </div>

          {/* 准确率 */}
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-sm mb-2">准确率</p>
            <p className="text-2xl font-bold text-neon-cyan">
              {correct + wrong > 0 ? Math.round((correct / (correct + wrong)) * 100) : 0}%
            </p>
          </div>

          {/* 重新开始按钮 */}
          <button
            onClick={onRestart}
            className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition-all text-lg"
          >
            重新开始
          </button>
        </div>
      )}

      {/* 游戏说明 */}
      {!gameStarted && !gameOver && (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-sm text-gray-400">
          <p className="font-bold mb-2">📖 游戏说明</p>
          <ul className="space-y-1">
            <li>• 在60秒内尽快输入显示的单词</li>
            <li>• 正确: +10分，错误: -5分</li>
            <li>• 按Enter提交答案</li>
            <li>• WPM = 每分钟字数</li>
          </ul>
        </div>
      )}
    </div>
  )
}
