import { useMemo } from 'react';
import { coordsToKey } from './helper';
import { getLevelInfo } from './levels';
import { CellMark, LevelCellMap, LevelDefinition } from './types';

function buildFallbackLevel(levelName: string): LevelDefinition {
  const rows = 10;
  const cols = 15;
  const cells: LevelCellMap = new Map();

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      cells.set(coordsToKey([x, y]), {
        id: x + cols * y,
        coords: [x, y],
        fill: false,
        initialMark: CellMark.none,
      });
    }
  }

  return {
    levelName,
    description: `Error loading level ${levelName}`,
    cells,
    cellsToBeFilled: 0,
    rows,
    cols,
  };
}

function deserializeLevel(levelName: string): LevelDefinition {
  const levelInfo = getLevelInfo(levelName);

  if (!levelInfo) {
    return buildFallbackLevel(levelName);
  }

  let description = levelInfo.description;
  let error = false;
  let rows = 0;
  let cols = 0;
  let cellsToBeFilled = 0;
  const cells: LevelCellMap = new Map();
  const rowStrings = levelInfo.data.split('\n');

  for (const [y, row] of rowStrings.entries()) {
    if (!row.match(/^[0-4]+$/)) {
      error = true;
      break;
    }

    rows += 1;
    if (cols === 0) {
      cols = row.length;
    } else if (cols !== row.length) {
      error = true;
      break;
    }

    for (const [x, rawCell] of Array.from(row).entries()) {
      let fill = false;
      let initialMark = CellMark.none;

      switch (rawCell) {
        case '0':
          break;
        case '1':
          initialMark = CellMark.empty;
          break;
        case '2':
          fill = true;
          cellsToBeFilled += 1;
          break;
        case '3':
          fill = true;
          initialMark = CellMark.empty;
          cellsToBeFilled += 1;
          break;
        case '4':
          fill = true;
          initialMark = CellMark.filled;
          cellsToBeFilled += 1;
          break;
        default:
          error = true;
          break;
      }

      if (error) {
        break;
      }

      cells.set(coordsToKey([x, y]), {
        id: x + cols * y,
        coords: [x, y],
        fill,
        initialMark,
      });
    }

    if (error) {
      break;
    }
  }

  if (error) {
    return buildFallbackLevel(levelName);
  }

  return {
    levelName,
    description,
    cells,
    cellsToBeFilled,
    rows,
    cols,
  };
}

/**
 * loads/deserializes the level with the given name.
 * @param levelName the name of the level to load
 * @returns the level with the given name or a generic test level, if the level with the given name could not be loaded
 */
export default function useLevel(levelName: string): LevelDefinition {
  return useMemo(() => deserializeLevel(levelName), [levelName]);
}
