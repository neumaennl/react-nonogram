import React, { useEffect, useRef } from 'react';
import { coordsToKey } from './helper';
import { CellMark, GameBoardState, LevelDefinition } from './types';

interface IProps {
  board: GameBoardState;
  level: LevelDefinition
}

/**
 * component that renders a preview of the board. All cells marked filled on the board are drawn as black rectangles on a white background.
 */
function Preview({ board, level }: IProps): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect((): void => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) {
      return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (const cell of Array.from(level.cells.values())) {
      if ((board.marks.get(coordsToKey(cell.coords)) ?? cell.initialMark) === CellMark.filled) {
        context.fillRect(
          cell.coords[0] * level.cols,
          cell.coords[1] * level.rows,
          canvas.width / level.cols,
          canvas.height / level.rows,
        );
      }
    }
  }, [board, level]);

  return <canvas ref={canvasRef} />
}

export default React.memo(Preview);
