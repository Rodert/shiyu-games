import React, { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import type { Difficulty, Question } from '../hooks/useMathChallengeLogic'

interface MathChallengeUIProps {
  currentQuestion: Question | undefined
  currentIndex: number
  score: number
  correct: number
  wrong: number
  timeLeft: number
  gameOver: boolean
  difficulty: Difficulty
  totalQuestions: number
  onSubmit: (answer: number) => void
  onRestart: () => void
  onChangeDifficulty: (difficulty: Difficulty) => void
}

export const MathChallengeUI: React.FC<MathChallengeUIProps> = ({
  currentQuestion,
  currentIndex,
  score,
  correct,
  wrong,
  timeLeft,
  gameOver,
  difficulty,
  totalQuestions,
  onSubmit,
  onRestart,
  onChangeDifficulty,
}) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = () => {
    if (!inputValue) return
    onSubmit(parseInt(inputValue))
    setInputValue('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4" style={{
          background: 'linear-gradient(135deg, #00ff41, #00ffff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          🧮 算力冲刺
        </h1>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-gray-800 rounded-lg p-3 border border-neon-lime text-center">
          <div className="text-neon-lime text-xs font-semibold">得分</div>
          <div className="text-2xl font-bold text-neon-lime">{score}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-green-400 text-center">
          <div className="text-green-400 text-xs font-semibold">正确</div>
          <div className="text-2xl font-bold text-green-400">{correct}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-red-400 text-center">
          <div className="text-red-400 text-xs font-semibold">错误</div>
          <div className="text-2xl font-bold text-red-400">{wrong}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-neon-cyan text-center">
          <div className="text-neon-cyan text-xs font-semibold">时间</div>
          <div className="text-2xl font-bold text-neon-cyan">{timeLeft}s</div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-8 border border-neon-cyan mb-6">
        {!gameOver && currentQuestion && (
          <>
            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-neon-lime mb-4">
                {currentQuestion.num1} {currentQuestion.operator} {currentQuestion.num2}
              </div>
              <div className="text-gray-400">
                第 {currentIndex + 1} / {totalQuestions} 题
              </div>
            </div>

            <div className="flex gap-3 mb-6">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="输入答案"
                className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-neon-cyan focus:outline-none"
              />
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-neon-lime text-black font-bold rounded-lg hover:bg-neon-cyan transition-colors"
              >
                提交
              </button>
            </div>
          </>
        )}

        {gameOver && (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-neon-lime mb-4">游戏结束！</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <div className="text-gray-400 mb-2">最终得分</div>
                <div className="text-3xl font-bold text-neon-lime">{score}</div>
              </div>
              <div>
                <div className="text-gray-400 mb-2">正确率</div>
                <div className="text-3xl font-bold text-green-400">
                  {totalQuestions > 0 ? ((correct / totalQuestions) * 100).toFixed(0) : 0}%
                </div>
              </div>
              <div>
                <div className="text-gray-400 mb-2">用时</div>
                <div className="text-3xl font-bold text-neon-cyan">60s</div>
              </div>
            </div>
            <button
              onClick={onRestart}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-neon-lime text-black font-bold rounded-lg hover:bg-neon-cyan transition-colors"
            >
              <RotateCcw size={20} />
              再来一次
            </button>
          </div>
        )}
      </div>

      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <h3 className="text-neon-cyan font-bold mb-3">难度选择</h3>
        <div className="flex gap-2">
          {(['easy', 'medium', 'hard'] as const).map(diff => (
            <button
              key={diff}
              onClick={() => onChangeDifficulty(diff)}
              className={`flex-1 px-3 py-2 rounded-lg font-bold transition-colors ${
                difficulty === diff
                  ? 'bg-neon-lime text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {diff === 'easy' ? '简单' : diff === 'medium' ? '中等' : '困难'}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
