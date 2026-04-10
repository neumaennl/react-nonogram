import { useState } from 'react';
import useGameLoop from './GameLoopHook';
import useLevel from './LevelLoader';
import { getLevelNames } from './levels';
import { ILevel, ICell, GameState } from './types';

/**
 * handles the game environment (e.g. current level).
 */
export default function useGameEnvironment(): { level: ILevel; onMarkFilled: (cell: ICell) => void; onMarkEmpty: (cell: ICell) => void; onRemoveMark: (cell: ICell) => void; formattedTimer: string; gameState: GameState } {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [levelName, setLevelName] = useState(getLevelNames()[0]);
  const level = useLevel(levelName);
  const { onMarkFilled, onMarkEmpty, onRemoveMark, formattedTimer, gameState } = useGameLoop(level);

  return { level, onMarkFilled, onMarkEmpty, onRemoveMark, formattedTimer, gameState };

}
