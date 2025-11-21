import React from 'react'
import { RotateCcw } from 'lucide-react'
import type { Player, Difficulty } from '../hooks/useTicTacToeLogic'

interface TicTacToeUIProps {
  board: Player[]
  gameOver: boolean
  winner: Player
  isDraw: boolean
  playerScore: number
  aiScore: number
  difficulty: Difficulty
  onCellClick: (index: number) => void
  onRestart: () => void
  onChangeDifficulty: (difficulty: Difficulty) => void
  onResetScores: () => void
}

export const TicTacToeUI: React.FC<TicTacToeUIProps> = ({
  board,
  gameOver,
  winner,
  isDraw,
  playerScore,
  aiScore,
  difficulty,
  onCellClick,
  onRestart,
  onChangeDifficulty,
  onResetScores,
}) => {
  const getCellColor = (cell: Player): string => {
    if (cell === 'X') return 'text-neon-lime'
    if (cell === 'O') return 'text-neon-cyan'
    return 'text-gray-500'
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* 标题和分数 */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4" style={{
          background: 'linear-gradient(135deg, #00ff41, #00ffff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          ⭕ 井字棋 AI 对战
        </h1>

        {/* 分数显示 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-3 border border-neon-lime">
            <div className="text-neon-lime text-sm font-semibold">你的得分</div>
            <div className="text-2xl font-bold text-neon-lime">{playerScore}</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 border border-neon-cyan">
            <div className="text-neon-cyan text-sm font-semibold">难度</div>
            <div className="text-lg font-bold text-neon-cyan">
              {difficulty === 'easy' ? '简单' : difficulty === 'medium' ? '中等' : '困难'}
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 border border-neon-cyan">
            <div className="text-neon-cyan text-sm font-semibold">AI 得分</div>
            <div className="text-2xl font-bold text-neon-cyan">{aiScore}</div>
          </div>
        </div>
      </div>

      {/* 游戏棋盘 */}
      <div className="bg-gray-800 rounded-lg p-6 border border-neon-cyan mb-6">
        <div className="grid grid-cols-3 gap-2 mb-6">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => onCellClick(index)}
              disabled={cell !== null || gameOver}
              className={`aspect-square rounded-lg font-bold text-4xl transition-all transform ${
                cell === null && !gameOver
                  ? 'bg-gray-700 hover:bg-gray-600 cursor-pointer hover:scale-105'
                  : 'bg-gray-900 cursor-not-allowed'
              } border-2 border-gray-600`}
            >
              <span className={getCellColor(cell)}>
                {cell === 'X' ? '✕' : cell === 'O' ? '◯' : ''}
              </span>
            </button>
          ))}
        </div>

        {/* 游戏状态 */}
        {gameOver && (
          <div className="text-center mb-6 p-4 bg-gradient-to-r from-neon-lime to-neon-cyan rounded-lg">
            {winner === 'X' && (
              <p className="text-black font-bold text-lg">🎉 你赢了！</p>
            )}
            {winner === 'O' && (
              <p className="text-black font-bold text-lg">🤖 AI 赢了！</p>
            )}
            {isDraw && (
              <p className="text-black font-bold text-lg">🤝 平局！</p>
            )}
          </div>
        )}

        {/* 控制按钮 */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={onRestart}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-neon-lime text-black font-bold rounded-lg hover:bg-neon-cyan transition-colors"
          >
            <RotateCcw size={20} />
            继续游戏
          </button>
          <button
            onClick={onResetScores}
            className="flex-1 px-4 py-2 bg-neon-cyan text-black font-bold rounded-lg hover:bg-neon-lime transition-colors"
          >
            重置分数
          </button>
        </div>
      </div>

      {/* 难度选择 */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <h3 className="text-neon-cyan font-bold mb-3">选择难度</h3>
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

      {/* 说明 */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mt-4">
        <h3 className="text-neon-cyan font-bold mb-2">游戏说明</h3>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• 你是 ✕，AI 是 ◯</li>
          <li>• 点击空位下棋</li>
          <li>• 先连成三个相同符号的一方获胜</li>
          <li>• 简单：AI 随机移动</li>
          <li>• 中等：AI 70% 最优移动</li>
          <li>• 困难：AI 总是最优移动（几乎无法赢）</li>
        </ul>
      </div>
    </div>
  )
}
