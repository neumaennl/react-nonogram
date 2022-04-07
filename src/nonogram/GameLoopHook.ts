import { useCallback, useEffect, useState } from 'react';
import { formatSeconds } from './helper';
import useInterval from './IntervalHook';
import { CellMark, GameState, ICell, ILevel } from './types';

export default function useGameLoop(level: ILevel) {

  // Time in seconds remaining for the level
  const [timer, setTimer] = useState(1800);
  // Formatted (HH:)MM:SS `timer`
  const [formattedTimer, setFormattedTimer] = useState('30:00');
  // Current state of the game
  const [gameState, setGameState] = useState(GameState.Idle);

  // Run `setInterval` every time when `gameState` is GameState.Playing
  useInterval(
    () => {
      setTimer(timer - 1);
    },
    gameState === GameState.Playing ? 1000 : null,
  );

  // Format seconds on each `timer` change and check if timer ran out
  useEffect(() => {
    setFormattedTimer(formatSeconds(timer));
    if (timer <= 0) {
      setTimer(0);
      setGameState(GameState.GameOver);
    }
  }, [timer]);

  // Check game win state
  useEffect(() => {
    if (gameState === GameState.Playing && level.cellsFilled === level.cellsToBeFilled) {
      setGameState(GameState.Won);
    }
  }, [gameState, level.cellsFilled, level.cellsToBeFilled]);

  const onMarkFilled = useCallback(
    (clickedCell: ICell): void => {
      if (gameState === GameState.Playing || gameState === GameState.Idle) {
        if (gameState === GameState.Idle) {
          setGameState(GameState.Playing)
        }
        if (clickedCell.fill) {
          clickedCell.mark = CellMark.filled;
          level.setCells(new Map(level.cells));
          level.setCellsFilled(level.cellsFilled + 1)
        } else {
          //TODO: dynamic penalty?
          setTimer(timer - 120);
          clickedCell.mark = CellMark.empty;
          level.setCells(new Map(level.cells));
        }
      }
    }, [level, timer, gameState]
  );

  const onRemoveMark = useCallback(
    (clickedCell: ICell): void => {
      clickedCell.mark = CellMark.none;
      level.setCells(new Map(level.cells));
    }, [level]
  );

  const onMarkEmpty = useCallback(
    (clickedCell: ICell): void => {
      clickedCell.mark = CellMark.empty;
      level.setCells(new Map(level.cells));
    }, [level]
  );

  return { onMarkFilled, onMarkEmpty, onRemoveMark, formattedTimer, gameState };
}
