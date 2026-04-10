import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { coordsToKey, formatSeconds } from './helper';
import useInterval from './IntervalHook';
import {
  CellMark,
  GameBoardState,
  GameLoopResult,
  GameState,
  LevelCellDefinition,
  LevelDefinition,
} from './types';

const INITIAL_TIMER_SECONDS = 30 * 60;
const WRONG_MARK_PENALTY_SECONDS = 120;

interface GameLoopState {
  board: GameBoardState;
  timer: number;
  gameState: GameState;
}

type GameLoopAction =
  | { type: 'level-changed'; level: LevelDefinition }
  | { type: 'restart'; level: LevelDefinition }
  | { type: 'tick'; level: LevelDefinition }
  | { type: 'mark-filled'; level: LevelDefinition; cell: LevelCellDefinition }
  | { type: 'mark-empty'; level: LevelDefinition; cell: LevelCellDefinition }
  | { type: 'remove-mark'; level: LevelDefinition; cell: LevelCellDefinition }
  | { type: 'pause' }
  | { type: 'resume' };

function createInitialBoardState(level: LevelDefinition): GameBoardState {
  const marks = new Map();
  let cellsFilled = 0;

  for (const [cellKey, cell] of level.cells.entries()) {
    marks.set(cellKey, cell.initialMark);
    if (cell.fill && cell.initialMark === CellMark.filled) {
      cellsFilled += 1;
    }
  }

  return { marks, cellsFilled };
}

function createInitialGameLoopState(level: LevelDefinition): GameLoopState {
  return {
    board: createInitialBoardState(level),
    timer: INITIAL_TIMER_SECONDS,
    gameState: GameState.Idle,
  };
}

function isInteractiveGameState(gameState: GameState): boolean {
  return gameState === GameState.Idle || gameState === GameState.Playing;
}

function finalizeState(
  level: LevelDefinition,
  board: GameBoardState,
  timer: number,
  gameState: GameState,
): GameLoopState {
  const nextTimer = Math.max(timer, 0);

  if (nextTimer === 0) {
    return {
      board,
      timer: nextTimer,
      gameState: GameState.GameOver,
    };
  }

  if (gameState === GameState.Playing && board.cellsFilled === level.cellsToBeFilled) {
    return {
      board,
      timer: nextTimer,
      gameState: GameState.Won,
    };
  }

  return {
    board,
    timer: nextTimer,
    gameState,
  };
}

function updateBoardMark(
  level: LevelDefinition,
  state: GameLoopState,
  cell: LevelCellDefinition,
  nextMark: CellMark,
  timerDelta = 0,
): GameLoopState {
  const cellKey = coordsToKey(cell.coords);
  const currentMark = state.board.marks.get(cellKey) ?? cell.initialMark;
  const marks = new Map(state.board.marks);
  let cellsFilled = state.board.cellsFilled;

  if (cell.fill && currentMark === CellMark.filled && nextMark !== CellMark.filled) {
    cellsFilled -= 1;
  }
  if (cell.fill && currentMark !== CellMark.filled && nextMark === CellMark.filled) {
    cellsFilled += 1;
  }

  marks.set(cellKey, nextMark);

  return finalizeState(
    level,
    { marks, cellsFilled },
    state.timer + timerDelta,
    state.gameState === GameState.Idle ? GameState.Playing : state.gameState,
  );
}

function gameLoopReducer(state: GameLoopState, action: GameLoopAction): GameLoopState {
  switch (action.type) {
    case 'level-changed':
    case 'restart':
      return createInitialGameLoopState(action.level);
    case 'tick':
      if (state.gameState !== GameState.Playing) {
        return state;
      }
      return finalizeState(action.level, state.board, state.timer - 1, GameState.Playing);
    case 'mark-filled': {
      if (!isInteractiveGameState(state.gameState)) {
        return state;
      }

      const currentMark = state.board.marks.get(coordsToKey(action.cell.coords)) ?? action.cell.initialMark;
      if (currentMark !== CellMark.none) {
        return state;
      }

      if (action.cell.fill) {
        return updateBoardMark(action.level, state, action.cell, CellMark.filled);
      }

      return updateBoardMark(
        action.level,
        state,
        action.cell,
        CellMark.empty,
        -WRONG_MARK_PENALTY_SECONDS,
      );
    }
    case 'mark-empty': {
      if (!isInteractiveGameState(state.gameState)) {
        return state;
      }

      const currentMark = state.board.marks.get(coordsToKey(action.cell.coords)) ?? action.cell.initialMark;
      if (currentMark === CellMark.filled) {
        return state;
      }

      return updateBoardMark(action.level, state, action.cell, CellMark.empty);
    }
    case 'remove-mark': {
      if (!isInteractiveGameState(state.gameState)) {
        return state;
      }

      const currentMark = state.board.marks.get(coordsToKey(action.cell.coords)) ?? action.cell.initialMark;
      if (currentMark === CellMark.filled) {
        return state;
      }

      return updateBoardMark(action.level, state, action.cell, CellMark.none);
    }
    case 'pause':
      if (state.gameState !== GameState.Playing) {
        return state;
      }
      return { ...state, gameState: GameState.Pause };
    case 'resume':
      if (state.gameState !== GameState.Pause) {
        return state;
      }
      return { ...state, gameState: GameState.Playing };
    default:
      return state;
  }
}

/**
 * handles everything necessary for playing a single level.
 */
export default function useGameLoop(level: LevelDefinition): GameLoopResult {
  const [state, dispatch] = useReducer(gameLoopReducer, level, createInitialGameLoopState);

  useEffect(() => {
    dispatch({ type: 'level-changed', level });
  }, [level]);

  useInterval(
    () => {
      dispatch({ type: 'tick', level });
    },
    state.gameState === GameState.Playing ? 1000 : null,
  );

  const onMarkFilled = useCallback(
    (cell: LevelCellDefinition): void => {
      dispatch({ type: 'mark-filled', level, cell });
    },
    [level],
  );

  const onMarkEmpty = useCallback(
    (cell: LevelCellDefinition): void => {
      dispatch({ type: 'mark-empty', level, cell });
    },
    [level],
  );

  const onRemoveMark = useCallback(
    (cell: LevelCellDefinition): void => {
      dispatch({ type: 'remove-mark', level, cell });
    },
    [level],
  );

  const pause = useCallback((): void => {
    dispatch({ type: 'pause' });
  }, []);

  const resume = useCallback((): void => {
    dispatch({ type: 'resume' });
  }, []);

  const restart = useCallback((): void => {
    dispatch({ type: 'restart', level });
  }, [level]);

  const session = useMemo(
    () => ({
      timer: state.timer,
      formattedTimer: formatSeconds(state.timer),
      gameState: state.gameState,
    }),
    [state.gameState, state.timer],
  );

  return {
    board: state.board,
    session,
    onMarkFilled,
    onMarkEmpty,
    onRemoveMark,
    pause,
    resume,
    restart,
  };
}
