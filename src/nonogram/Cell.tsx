import React, { useCallback } from 'react';
import { CellMark, GameState, LevelCellDefinition, LevelDefinition } from './types';
import styles from './Cell.module.css'

interface IProps {
  cell: LevelCellDefinition;
  gameState: GameState;
  level: LevelDefinition;
  mark: CellMark;
  onMarkFilled: (cell: LevelCellDefinition) => void;
  onMarkEmpty: (cell: LevelCellDefinition) => void;
  onRemoveMark: (cell: LevelCellDefinition) => void;
  isTouchDevice: boolean;
  touchMarkMode: 'fill' | 'mark';
}

/**
 * component that renders a single cell of the playing field that the player can interact with.
 */
function Cell({
  cell,
  gameState,
  level,
  mark,
  onMarkFilled,
  onMarkEmpty,
  onRemoveMark,
  isTouchDevice,
  touchMarkMode,
}: IProps): React.ReactElement {
  const isDisabled = gameState === GameState.Pause || gameState === GameState.GameOver || gameState === GameState.Won;

  const handleClick = useCallback((): void => {
    if (isTouchDevice) {
      if (touchMarkMode === 'fill' && mark === CellMark.none) {
        onMarkFilled(cell);
      }
      if (touchMarkMode === 'mark' && mark !== CellMark.filled) {
        if (mark === CellMark.empty) {
          onRemoveMark(cell);
        } else {
          onMarkEmpty(cell);
        }
      }
      return;
    }

    if (mark === CellMark.none) {
      onMarkFilled(cell);
    }
  }, [cell, isTouchDevice, mark, onMarkEmpty, onMarkFilled, onRemoveMark, touchMarkMode]);

  const handleContextMenuClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      event.preventDefault();

      if (mark !== CellMark.filled) {
        if (mark === CellMark.empty) {
          onRemoveMark(cell);
        } else {
          onMarkEmpty(cell);
        }
      }
    },
    [cell, mark, onMarkEmpty, onRemoveMark],
  );

  return (
    <button
      className={styles.cell}
      disabled={isDisabled}
      onClick={handleClick}
      onContextMenu={handleContextMenuClick}
      style={{
        width: `min(${100 / (level.cols * 1.5)}vw, ${100 / (level.rows * 1.5)}vh)`,
        height: `min(${100 / (level.cols * 1.5)}vw, ${100 / (level.rows * 1.5)}vh)`,
        backgroundColor: mark === CellMark.filled ? 'black' : 'white'
      }}
    >
      {mark === CellMark.empty &&
        <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="0" x2="10" y2="10" stroke='black' />
          <line x1="10" y1="0" x2="0" y2="10" stroke='black' />
        </svg>
      }
    </button>
  );
}

export default React.memo(Cell);
