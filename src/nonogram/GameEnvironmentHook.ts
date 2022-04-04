import {useCallback, useEffect, useState} from 'react';
import useGameLoop from './GameLoopHook';
import useLevel from './LevelLoader';

export default function useGameEnvironment() {

  const [levelName, setLevelName] = useState("test");
  const level = useLevel(levelName);
  const {} = useGameLoop(level);

  return level;

}
