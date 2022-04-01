import React, {useCallback} from 'react';
import {CellMark, GameState, ICell, ISettings} from './types';
import styles from './Cell.module.css'

interface IProps {
  cell: ICell;
  gameState: GameState;
  settings: ISettings;
  onMarkFilled: (cell: ICell) => void;
  onMarkEmpty: (cell: ICell) => void;
  onRemoveMark: (cell: ICell) => void;
}

function Cell({cell, gameState, settings, onMarkFilled, onMarkEmpty, onRemoveMark}: IProps) {
  const isDisabled = gameState === GameState.Pause || gameState === GameState.GameOver;

  // Handlers
  const handleClick = useCallback(() => {
    if (cell.mark === CellMark.empty) {
      onMarkFilled(cell);
    }
  }, [cell, onMarkFilled]);

  const handleContextMenuClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      // Disable context menu
      event.preventDefault();

      if (gameState === GameState.Playing && cell.mark !== CellMark.filled) {
        if (cell.mark === CellMark.empty) {
          onRemoveMark(cell);
        } else {
          onMarkEmpty(cell);
        }
      }
    },
    [cell, onMarkEmpty, onRemoveMark, gameState],
  );

  return (
    <button
      className={styles.cell}
      disabled={isDisabled}
      onClick={handleClick}
      onContextMenu={handleContextMenuClick}
      style={{
        width: `min(${100 / (settings.cols * 1.5)}vw, ${100 / (settings.rows * 1.5)}vh)`,
        height: `min(${100 / (settings.cols * 1.5)}vw, ${100 / (settings.rows * 1.5)}vh)`,
        backgroundColor: cell.mark === CellMark.filled ? "black" : "white"
      }}
    >
      {cell.mark === CellMark.empty &&
        <svg viewBox="0 0 10 10" xmlns="<http://www.w3.org/2000/svg>">
          <line x1="0" y1="0" x2="10" y2="10" stroke='black' />
          <line x1="10" y1="0" x2="0" y2="10" stroke='black' />
        </svg>
      }
    </button>
  );
}

export default React.memo(Cell);
