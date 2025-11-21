import type { Tile } from '../hooks/use2048Logic'

interface GameBoardProps {
  tiles: Tile[]
  GRID_SIZE: number
  getTileColor: (value: number) => string
  getTileTextColor: (value: number) => string
}

export const GameBoard = ({
  tiles,
  GRID_SIZE,
  getTileColor,
  getTileTextColor,
}: GameBoardProps) => {
  const CELL_SIZE = 80
  const GAP = 10
  const BOARD_SIZE = CELL_SIZE * GRID_SIZE + GAP * (GRID_SIZE + 1)

  return (
    <div className="flex justify-center">
      <div
        className="bg-gradient-to-br from-gray-900 to-black p-3 rounded-lg border-2 border-neon-cyan"
        style={{
          width: BOARD_SIZE,
          height: BOARD_SIZE,
          boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)',
          backgroundColor: '#bbada0',
        }}
      >
        {/* 背景网格 */}
        <div className="relative w-full h-full">
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
            const x = index % GRID_SIZE
            const y = Math.floor(index / GRID_SIZE)
            return (
              <div
                key={index}
                className="absolute bg-gray-700 rounded"
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  left: GAP + x * (CELL_SIZE + GAP),
                  top: GAP + y * (CELL_SIZE + GAP),
                  opacity: 0.3,
                }}
              />
            )
          })}

          {/* 方块 */}
          {tiles.map(tile => (
            <div
              key={tile.id}
              className="absolute rounded font-bold flex items-center justify-center transition-all duration-100"
              style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
                left: GAP + tile.x * (CELL_SIZE + GAP),
                top: GAP + tile.y * (CELL_SIZE + GAP),
                backgroundColor: getTileColor(tile.value),
                color: getTileTextColor(tile.value),
                fontSize: tile.value > 512 ? '32px' : tile.value > 128 ? '40px' : '48px',
                boxShadow: tile.isNew ? '0 0 20px rgba(0, 255, 255, 0.5)' : 'none',
                transform: tile.isNew ? 'scale(0.8)' : 'scale(1)',
                opacity: tile.isMerged ? 0.8 : 1,
              }}
            >
              {tile.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
