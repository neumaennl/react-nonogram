import { CellCoords } from './types'

// Changes field coords into convenient Map key
export function coordsToKey([x, y]: CellCoords): string {
  return `[${x},${y}]`;
}
