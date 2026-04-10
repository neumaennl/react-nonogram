import { useMemo, useState } from 'react';
import useGameLoop from './GameLoopHook';
import useLevel from './LevelLoader';
import { getLevelNames } from './levels';
import { GameEnvironmentResult } from './types';

/**
 * handles the game environment (e.g. current level).
 */
export default function useGameEnvironment(): GameEnvironmentResult {
  const levelNames = useMemo(() => getLevelNames(), []);
  const [levelName, setLevelName] = useState(levelNames[0]);
  const level = useLevel(levelName);
  const gameLoop = useGameLoop(level);

  return {
    environment: {
      levelName,
      levelNames,
    },
    level,
    selectLevel: setLevelName,
    ...gameLoop,
  };
}
