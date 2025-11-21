import React from 'react'
import { RotateCcw } from 'lucide-react'
import type { Player } from '../hooks/useGomokuLogic'

interface GomokuUIProps {
  board: (Player | null)[][]
  gameOver: boolean
  winner: Player | null
  humanScore: number
  aiScore: number
  onCellClick: (row: number, col: number) => void
  onRestart: () => void
}

export const GomokuUI: React.FC<GomokuUIProps> = ({
  board,
  gameOver,
  winner,
  humanScore,
  aiScore,
  onCellClick,
  onRestart,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-4" style={{
          background: 'linear-gradient(135deg, #00ff41, #00ffff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          ⭕ 五子棋
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-3 border border-neon-lime text-center">
          <div className="text-neon-lime text-sm font-semibold">你的得分</div>
          <div className="text-2xl font-bold text-neon-lime">{humanScore}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-neon-cyan text-center">
          <div className="text-neon-cyan text-sm font-semibold">AI 得分</div>
          <div className="text-2xl font-bold text-neon-cyan">{aiScore}</div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-4 border-2 border-neon-cyan mb-6">
        <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(15, 1fr)' }}>
          {board.map((row, r) =>
            row.map((cell, c) => (
              <button
                key={`${r}-${c}`}
                onClick={() => onCellClick(r, c)}
                disabled={cell !== null || gameOver}
                className="w-8 h-8 bg-gray-700 border border-gray-600 rounded hover:bg-gray-600 disabled:cursor-not-allowed"
              >
                {cell === 'human' && <span className="text-neon-lime font-bold">●</span>}
                {cell === 'ai' && <span className="text-neon-cyan font-bold">●</span>}
              </button>
            ))
          )}
        </div>
      </div>

      {gameOver && (
        <div className="bg-gray-800 rounded-lg p-4 border-2 border-neon-lime mb-6 text-center">
          <p className="text-2xl font-bold text-neon-lime mb-4">
            {winner === 'human' ? '🎉 你赢了！' : '😢 AI 赢了！'}
          </p>
          <button
            onClick={onRestart}
            className="px-6 py-2 bg-neon-lime text-black font-bold rounded-lg hover:bg-neon-cyan transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            <RotateCcw size={20} />
            再来一局
          </button>
        </div>
      )}
    </div>
  )
}
