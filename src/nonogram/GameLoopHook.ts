import { useCallback } from 'react';
import { CellMark, ICell, ILevel } from './types';

export default function useGameLoop(level: ILevel) {

  const onMarkFilled = useCallback(
    (clickedCell: ICell): void => {
      if (clickedCell.fill) {
        clickedCell.mark = CellMark.filled;
        level.setCells(new Map(level.cells));
        level.setCellsFilled(level.cellsFilled + 1)
      } else {
        //TODO: penalty
      }
    }, [level]
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

  return { onMarkFilled, onMarkEmpty, onRemoveMark };
}
