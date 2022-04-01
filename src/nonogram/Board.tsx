import React from 'react';
import styles from './Board.module.css';
import Cell from './Cell';
import { ICell, GameState, ISettings, CellMap } from './types';

interface IProps {
  cells: CellMap;
  gameState: GameState;
  settings: ISettings;
  onMarkFilled: (cell: ICell) => void;
  onMarkEmpty: (cell: ICell) => void;
  onRemoveMark: (cell: ICell) => void;
}

function Board({cells, gameState, settings, onMarkFilled, onMarkEmpty, onRemoveMark}: IProps) {

  return (
    <div className={styles.board} style={{ gridTemplateColumns: `repeat(${settings.cols}, 1fr)` }}>
      {Array.from(cells.values()).map((cell) => (
        <Cell
          key={cell.id}
          cell={cell}
          gameState={gameState}
          settings={settings}
          onMarkFilled={onMarkFilled}
          onMarkEmpty={onMarkEmpty}
          onRemoveMark={onRemoveMark}
        />
      ))}
    </div>
  );
}

export default React.memo(Board);
