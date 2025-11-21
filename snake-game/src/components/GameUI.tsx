import React from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { GameState } from '../hooks/useGameLogic'

interface GameUIProps {
  gameState: GameState
  onTogglePause: () => void
  onRestart: () => void
}

export const GameUI: React.FC<GameUIProps> = ({ gameState, onTogglePause, onRestart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-bold text-neon-green mb-2 neon-glow-strong">
          SNAKE GAME
        </h1>
        <p className="text-neon-cyan text-sm tracking-widest">贪吃蛇 - 炫酷版本</p>
      </div>

      {/* Score and Info */}
      <div className="grid grid-cols-3 gap-8 mb-8 w-full max-w-md">
        <div className="text-center">
          <p className="text-neon-cyan text-xs uppercase tracking-widest mb-2">Score</p>
          <p className="text-3xl font-bold text-neon-green neon-glow">{gameState.score}</p>
        </div>
        <div className="text-center">
          <p className="text-neon-cyan text-xs uppercase tracking-widest mb-2">Length</p>
          <p className="text-3xl font-bold text-neon-purple neon-glow">{gameState.snake.length}</p>
        </div>
        <div className="text-center">
          <p className="text-neon-cyan text-xs uppercase tracking-widest mb-2">Speed</p>
          <p className="text-3xl font-bold text-neon-pink neon-glow">
            {Math.round((150 - gameState.speed) / 10)}
          </p>
        </div>
      </div>

      {/* Game Over Screen */}
      {gameState.gameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gradient-to-b from-slate-800 to-slate-900 p-8 rounded-lg border-2 border-neon-green text-center">
            <h2 className="text-4xl font-bold text-neon-pink mb-4 neon-glow-strong">GAME OVER</h2>
            <p className="text-neon-cyan text-lg mb-2">Final Score: <span className="text-neon-green font-bold">{gameState.score}</span></p>
            <p className="text-neon-cyan text-lg mb-6">Snake Length: <span className="text-neon-purple font-bold">{gameState.snake.length}</span></p>
            <button
              onClick={onRestart}
              className="bg-neon-green text-black px-8 py-3 rounded-lg font-bold hover:bg-cyan-400 transition-all transform hover:scale-105 flex items-center justify-center gap-2 mx-auto"
            >
              <RotateCcw size={20} />
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={onTogglePause}
          className="bg-neon-purple text-white px-6 py-3 rounded-lg font-bold hover:bg-pink-500 transition-all transform hover:scale-105 flex items-center gap-2"
        >
          {gameState.isPaused ? <Play size={20} /> : <Pause size={20} />}
          {gameState.isPaused ? 'Resume' : 'Pause'}
        </button>
        <button
          onClick={onRestart}
          className="bg-neon-pink text-white px-6 py-3 rounded-lg font-bold hover:bg-red-500 transition-all transform hover:scale-105 flex items-center gap-2"
        >
          <RotateCcw size={20} />
          Restart
        </button>
      </div>

      {/* Instructions */}
      <div className="text-center text-neon-cyan text-sm max-w-md mb-4">
        <p className="mb-2">⬆️ ⬇️ ⬅️ ➡️ or WASD to move</p>
        <p className="mb-2">SPACE to pause/resume</p>
        <p>R to restart</p>
      </div>

      {/* Pause Indicator */}
      {gameState.isPaused && (
        <div className="mt-4 text-2xl font-bold text-neon-yellow animate-pulse">
          ⏸ PAUSED
        </div>
      )}
    </div>
  )
}
