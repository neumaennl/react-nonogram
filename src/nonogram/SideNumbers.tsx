import React from 'react';
import styles from './SideNumbers.module.css';
import { ILevel } from './types';
import { coordsToKey } from './helper'

interface IProps {
  level: ILevel
}

/**
 * component that renders the numbers on the side of the board that describe which cells on the board to fill.
 */
function SideNumbers({level}: IProps) {

  let blockSize = 0;
  let blockCount = 0;

  let rows = new Array<Array<number>>();

  for (let y = 0; y < level.rows; y++) {
    let numbers = new Array<number>();
    rows.push(numbers);
    for (let x = level.cols - 1; x >= 0; x--) {
      if (level.cells.get(coordsToKey([x, y]))?.fill) {
        blockSize += 1;
      }
      if ((!level.cells.get(coordsToKey([x, y]))?.fill || x === 0) && blockSize !== 0) {
        numbers.push(blockSize);
        blockSize = 0;
        blockCount++;
      }
    }
    if (blockCount === 0) {
      numbers.push(0);
    }
    blockCount = 0;
  }

  return (
    <div className={styles.sideNumbers}>
      {rows.map((row, y) => <div className={styles.sideNumberRow} key={y}>
        {row.map((number, col) => <div
          key={col}
          className={styles.number}
          style={{
            width: `min(${100 / (level.cols * 1.5)}vw, ${100 / (level.rows * 1.5)}vh)`,
            height: `min(${100 / (level.cols * 1.5)}vw, ${100 / (level.rows * 1.5)}vh)`
          }}
        ><span>{number}</span></div>
        )}
      </div>
      )}
    </div>
  );
}

export default React.memo(SideNumbers);
