import React from 'react';
import styles from './Board.module.css';
import Cell from './Cell';
import { ICell, GameState, ILevel } from './types';

interface IProps {
  gameState: GameState;
  level: ILevel;
  onMarkFilled: (cell: ICell) => void;
  onMarkEmpty: (cell: ICell) => void;
  onRemoveMark: (cell: ICell) => void;
}

/**
 * component that renders the board of cells the player can interact with.
 */
function Board({gameState, level, onMarkFilled, onMarkEmpty, onRemoveMark}: IProps) {

  return (
    <div className={styles.board} style={{ gridTemplateColumns: `repeat(${level.cols}, 1fr)` }}>
      {Array.from(level.cells.values()).map((cell) => (
        <Cell
          key={cell.id}
          cell={cell}
          gameState={gameState}
          level={level}
          onMarkFilled={onMarkFilled}
          onMarkEmpty={onMarkEmpty}
          onRemoveMark={onRemoveMark}
        />
      ))}
    </div>
  );
}

export default React.memo(Board);
