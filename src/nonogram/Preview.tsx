import React, { useEffect, useRef } from 'react';
import { CellMark, ILevel } from './types';

interface IProps {
  level: ILevel
}

function Preview({level}: IProps) {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    let animationFrameId: number;

    const render = () => {
      if(canvas) {
        for(var cell of Array.from(level.cells.values())) {
          if(cell.mark === CellMark.filled) {
            context?.fillRect(cell.coords[0] * level.cols, cell.coords[1] * level.rows, canvas.width / level.cols, canvas.height / level.rows);
          }
        }
      }
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [level]);

  return <canvas ref={canvasRef}/>
}

export default React.memo(Preview);
