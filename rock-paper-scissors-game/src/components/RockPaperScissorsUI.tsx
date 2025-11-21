import React from 'react'
import { RotateCcw } from 'lucide-react'
import type { Choice, Result } from '../hooks/useRockPaperScissorsLogic'

interface RockPaperScissorsUIProps {
  playerChoice: Choice
  computerChoice: Choice
  result: Result
  playerScore: number
  computerScore: number
  draws: number
  totalGames: number
  onPlay: (choice: Choice) => void
  onReset: () => void
  onResetScores: () => void
}

export const RockPaperScissorsUI: React.FC<RockPaperScissorsUIProps> = ({
  playerChoice,
  computerChoice,
  result,
  playerScore,
  computerScore,
  draws,
  totalGames,
  onPlay,
  onReset,
  onResetScores,
}) => {
  const getChoiceEmoji = (choice: Choice): string => {
    switch (choice) {
      case 'rock':
        return '✊'
      case 'paper':
        return '✋'
      case 'scissors':
        return '✌️'
      default:
        return '❓'
    }
  }

  const getChoiceName = (choice: Choice): string => {
    switch (choice) {
      case 'rock':
        return '石头'
      case 'paper':
        return '布'
      case 'scissors':
        return '剪刀'
      default:
        return '未选择'
    }
  }

  const getResultText = (): string => {
    if (!result) return '选择你的手势'
    if (result === 'win') return '🎉 你赢了！'
    if (result === 'lose') return '😢 你输了！'
    return '🤝 平局！'
  }

  const getResultColor = (): string => {
    if (!result) return 'text-gray-400'
    if (result === 'win') return 'text-neon-lime'
    if (result === 'lose') return 'text-red-400'
    return 'text-yellow-400'
  }

  const winRate = totalGames > 0 ? ((playerScore / totalGames) * 100).toFixed(1) : '0'

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
          ✋ 石头剪刀布
        </h1>
      </div>

      {/* 分数显示 */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-gray-800 rounded-lg p-3 border border-neon-lime text-center">
          <div className="text-neon-lime text-xs font-semibold">你的得分</div>
          <div className="text-2xl font-bold text-neon-lime">{playerScore}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-neon-cyan text-center">
          <div className="text-neon-cyan text-xs font-semibold">AI 得分</div>
          <div className="text-2xl font-bold text-neon-cyan">{computerScore}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-yellow-400 text-center">
          <div className="text-yellow-400 text-xs font-semibold">平局</div>
          <div className="text-2xl font-bold text-yellow-400">{draws}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-purple-400 text-center">
          <div className="text-purple-400 text-xs font-semibold">胜率</div>
          <div className="text-2xl font-bold text-purple-400">{winRate}%</div>
        </div>
      </div>

      {/* 游戏区域 */}
      <div className="bg-gray-800 rounded-lg p-8 border border-neon-cyan mb-6">
        {/* 选择显示 */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* 玩家选择 */}
          <div className="text-center">
            <div className="text-sm text-neon-lime font-semibold mb-2">你的选择</div>
            <div className="text-6xl mb-2">{getChoiceEmoji(playerChoice)}</div>
            <div className="text-gray-300">{getChoiceName(playerChoice)}</div>
          </div>

          {/* VS */}
          <div className="flex items-center justify-center">
            <div className="text-3xl font-bold text-neon-cyan">VS</div>
          </div>

          {/* AI 选择 */}
          <div className="text-center">
            <div className="text-sm text-neon-cyan font-semibold mb-2">AI 选择</div>
            <div className="text-6xl mb-2">{getChoiceEmoji(computerChoice)}</div>
            <div className="text-gray-300">{getChoiceName(computerChoice)}</div>
          </div>
        </div>

        {/* 结果 */}
        <div className={`text-center text-3xl font-bold mb-6 ${getResultColor()}`}>
          {getResultText()}
        </div>

        {/* 选择按钮 */}
        <div className="grid grid-cols-3 gap-3">
          {(['rock', 'paper', 'scissors'] as const).map(choice => (
            <button
              key={choice}
              onClick={() => onPlay(choice)}
              className="px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors"
            >
              <div className="text-3xl mb-2">{getChoiceEmoji(choice)}</div>
              <div className="text-sm">{getChoiceName(choice)}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={onReset}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-neon-lime text-black font-bold rounded-lg hover:bg-neon-cyan transition-colors"
        >
          <RotateCcw size={20} />
          再来一局
        </button>
        <button
          onClick={onResetScores}
          className="flex-1 px-4 py-2 bg-neon-cyan text-black font-bold rounded-lg hover:bg-neon-lime transition-colors"
        >
          重置分数
        </button>
      </div>

      {/* 说明 */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mt-6">
        <h3 className="text-neon-cyan font-bold mb-2">游戏规则</h3>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• 石头 (✊) 胜剪刀 (✌️)</li>
          <li>• 剪刀 (✌️) 胜布 (✋)</li>
          <li>• 布 (✋) 胜石头 (✊)</li>
          <li>• 选择相同手势为平局</li>
        </ul>
      </div>
    </div>
  )
}
