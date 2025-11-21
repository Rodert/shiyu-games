import React from 'react'
import { RotateCcw } from 'lucide-react'
import type { Card } from '../hooks/useEmojiMatchLogic'

interface EmojiMatchUIProps {
  cards: Card[]
  score: number
  moves: number
  matched: number
  elapsedTime: number
  gameWon: boolean
  onCardClick: (id: number) => void
  onRestart: () => void
}

export const EmojiMatchUI: React.FC<EmojiMatchUIProps> = ({
  cards,
  score,
  moves,
  matched,
  elapsedTime,
  gameWon,
  onCardClick,
  onRestart,
}) => {
  const totalPairs = 12
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* 标题 */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4" style={{
          background: 'linear-gradient(135deg, #00ff41, #00ffff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          😀 Emoji 连连看
        </h1>
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-gray-800 rounded-lg p-3 border border-neon-lime text-center">
          <div className="text-neon-lime text-xs font-semibold">得分</div>
          <div className="text-2xl font-bold text-neon-lime">{score}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-neon-cyan text-center">
          <div className="text-neon-cyan text-xs font-semibold">步数</div>
          <div className="text-2xl font-bold text-neon-cyan">{moves}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-yellow-400 text-center">
          <div className="text-yellow-400 text-xs font-semibold">配对</div>
          <div className="text-2xl font-bold text-yellow-400">{matched}/{totalPairs}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-purple-400 text-center">
          <div className="text-purple-400 text-xs font-semibold">时间</div>
          <div className="text-2xl font-bold text-purple-400">{formatTime(elapsedTime)}</div>
        </div>
      </div>

      {/* 游戏卡片网格 */}
      <div className="bg-gray-800 rounded-lg p-6 border border-neon-cyan mb-6">
        <div className="grid grid-cols-6 gap-2 mb-6">
          {cards.map(card => (
            <button
              key={card.id}
              onClick={() => onCardClick(card.id)}
              disabled={card.isMatched || card.isFlipped}
              className={`aspect-square rounded-lg font-bold text-3xl transition-all transform ${
                card.isMatched
                  ? 'bg-green-600 cursor-default'
                  : card.isFlipped
                  ? 'bg-neon-cyan text-black'
                  : 'bg-gray-700 hover:bg-gray-600 cursor-pointer hover:scale-105'
              } border-2 border-gray-600`}
            >
              {card.isFlipped || card.isMatched ? card.emoji : '?'}
            </button>
          ))}
        </div>

        {/* 游戏结束信息 */}
        {gameWon && (
          <div className="text-center p-4 bg-gradient-to-r from-neon-lime to-neon-cyan rounded-lg mb-6">
            <p className="text-black font-bold text-lg">🎉 恭喜通关！</p>
            <p className="text-black text-sm">
              得分: {score} | 步数: {moves} | 时间: {formatTime(elapsedTime)}
            </p>
          </div>
        )}

        {/* 重新开始按钮 */}
        <button
          onClick={onRestart}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-neon-lime text-black font-bold rounded-lg hover:bg-neon-cyan transition-colors"
        >
          <RotateCcw size={20} />
          {gameWon ? '再来一局' : '重新开始'}
        </button>
      </div>

      {/* 说明 */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <h3 className="text-neon-cyan font-bold mb-2">游戏说明</h3>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• 点击卡片翻开 Emoji</li>
          <li>• 找到相同的 Emoji 配对</li>
          <li>• 配对成功后卡片保持打开</li>
          <li>• 配对所有卡片即可通关</li>
          <li>• 步数越少、时间越短分数越高</li>
        </ul>
      </div>
    </div>
  )
}
