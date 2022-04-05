import {useCallback, useEffect, useState} from 'react';
import useGameLoop from './GameLoopHook';
import useLevel from './LevelLoader';
import { getLevelNames } from './levels';

export default function useGameEnvironment() {

  const [levelName, setLevelName] = useState(getLevelNames()[0]);
  const level = useLevel(levelName);
  const {} = useGameLoop(level);

  return level;

}
