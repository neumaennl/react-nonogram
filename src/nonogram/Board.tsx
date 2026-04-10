import React from 'react';
import styles from './Board.module.css';
import Cell from './Cell';
import { coordsToKey } from './helper';
import { GameBoardState, GameState, LevelCellDefinition, LevelDefinition } from './types';

interface IProps {
  board: GameBoardState;
  gameState: GameState;
  level: LevelDefinition;
  onMarkFilled: (cell: LevelCellDefinition) => void;
  onMarkEmpty: (cell: LevelCellDefinition) => void;
  onRemoveMark: (cell: LevelCellDefinition) => void;
}

/**
 * component that renders the board of cells the player can interact with.
 */
function Board({ board, gameState, level, onMarkFilled, onMarkEmpty, onRemoveMark }: IProps): React.ReactElement {
  return (
    <div className={styles.board} style={{ gridTemplateColumns: `repeat(${level.cols}, 1fr)` }}>
      {Array.from(level.cells.values()).map((cell) => (
        <Cell
          key={cell.id}
          cell={cell}
          gameState={gameState}
          level={level}
          mark={board.marks.get(coordsToKey(cell.coords)) ?? cell.initialMark}
          onMarkFilled={onMarkFilled}
          onMarkEmpty={onMarkEmpty}
          onRemoveMark={onRemoveMark}
        />
      ))}
    </div>
  );
}

export default React.memo(Board);
