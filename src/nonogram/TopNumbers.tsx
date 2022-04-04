import React from 'react';
import styles from './TopNumbers.module.css';
import { ILevel } from './types';
import { coordsToKey } from './helper'

interface IProps {
  level: ILevel
}

function TopNumbers({level}: IProps) {

  let blockSize = 0;
  let blockCount = 0;

  let columns = new Array<Array<number>>();

  for (let x = 0; x < level.cols; x++) {
    let numbers = new Array<number>();
    columns.push(numbers);
    for (let y = level.rows - 1; y >= 0; y--) {
      if (level.cells.get(coordsToKey([x, y]))?.fill) {
        blockSize += 1;
      }
      if ((!level.cells.get(coordsToKey([x, y]))?.fill || y === 0) && blockSize !== 0) {
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
    <div className={styles.topNumbers}>
      {columns.map((column, x) => <div className={styles.topNumberColumn} key={x}>
        {column.map((number, row) => <div
          key={row}
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

export default React.memo(TopNumbers);
