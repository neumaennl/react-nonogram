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
  const previewCols = Math.ceil(level.cols / 2);
  const previewRows = Math.ceil(level.rows / 2);
  const previewAspectRatio = level.cols / level.rows;
  const safetyFactor = 0.95;

  const getPreviewCellSizePx = (): number => {
    const byWidth = window.innerWidth / (level.cols * 1.5);
    const byHeight = window.innerHeight / (level.rows * 1.5);
    return Math.max(1, Math.min(byWidth, byHeight));
  };

  useEffect((): void | (() => void) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) {
      return;
    }

    const draw = (): void => {
      const parent = canvas.parentElement;
      if (!parent) {
        return;
      }

      const timerElement = canvas.nextElementSibling as HTMLElement | null;
      const timerHeight = timerElement ? timerElement.getBoundingClientRect().height : 0;
      const parentRect = parent.getBoundingClientRect();

      const availableWidth = Math.max(1, parentRect.width);
      const availableHeight = Math.max(1, parentRect.height - timerHeight);

      const previewCellSizePx = getPreviewCellSizePx();
      const targetWidth = previewCols * previewCellSizePx;
      const targetHeight = previewRows * previewCellSizePx;

      const scale = Math.min(availableWidth / targetWidth, availableHeight / targetHeight, 1);
      const renderWidth = Math.max(1, Math.floor(targetWidth * scale * safetyFactor));
      const renderHeight = Math.max(1, Math.floor(targetHeight * scale * safetyFactor));

      canvas.style.width = `${renderWidth}px`;
      canvas.style.height = `${renderHeight}px`;

      if (canvas.width !== renderWidth || canvas.height !== renderHeight) {
        canvas.width = renderWidth;
        canvas.height = renderHeight;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);

      for (const cell of Array.from(level.cells.values())) {
        if ((board.marks.get(coordsToKey(cell.coords)) ?? cell.initialMark) === CellMark.filled) {
          context.fillRect(
            cell.coords[0] * (canvas.width / level.cols),
            cell.coords[1] * (canvas.height / level.rows),
            canvas.width / level.cols,
            canvas.height / level.rows,
          );
        }
      }
    };

    draw();
    window.addEventListener('resize', draw);

    return (): void => {
      window.removeEventListener('resize', draw);
    };
  }, [board, level]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        aspectRatio: `${previewAspectRatio}`,
        display: 'block',
      }}
    />
  )
}

export default React.memo(Preview);
