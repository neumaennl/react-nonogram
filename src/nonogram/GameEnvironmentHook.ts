import { useState } from 'react';
import useGameLoop from './GameLoopHook';
import useLevel from './LevelLoader';
import { getLevelNames } from './levels';

export default function useGameEnvironment() {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [levelName, setLevelName] = useState(getLevelNames()[0]);
  const level = useLevel(levelName);
  const { onMarkFilled, onMarkEmpty, onRemoveMark } = useGameLoop(level);

  return { level, onMarkFilled, onMarkEmpty, onRemoveMark };

}
