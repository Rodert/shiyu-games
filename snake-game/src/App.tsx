import React from 'react'
import { useGameLogic } from './hooks/useGameLogic'
import { GameCanvas } from './components/GameCanvas'
import { GameUI } from './components/GameUI'

function App() {
  const { gameState, togglePause, restart } = useGameLogic()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <GameUI
        gameState={gameState}
        onTogglePause={togglePause}
        onRestart={restart}
      />
      <div className="mt-8">
        <GameCanvas gameState={gameState} />
      </div>
    </div>
  )
}

export default App
