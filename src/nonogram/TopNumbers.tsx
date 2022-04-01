import React from 'react';
import styles from './TopNumbers.module.css';
import { ISettings, CellMap } from './types';
import { coordsToKey } from './helper'

interface IProps {
  cells: CellMap;
  settings: ISettings;
}

function TopNumbers({cells, settings}: IProps) {

  let blockSize = 0;
  let blockCount = 0;

  let columns = new Array<Array<number>>();

  for (let x = 0; x < settings.cols; x++) {
    let numbers = new Array<number>();
    columns.push(numbers);
    for (let y = settings.rows - 1; y >= 0; y--) {
      if (cells.get(coordsToKey([x, y]))?.fill) {
        blockSize += 1;
      }
      if ((!cells.get(coordsToKey([x, y]))?.fill || y === 0) && blockSize !== 0) {
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
            width: `min(${100 / (settings.cols * 1.5)}vw, ${100 / (settings.rows * 1.5)}vh)`,
            height: `min(${100 / (settings.cols * 1.5)}vw, ${100 / (settings.rows * 1.5)}vh)`
          }}
        ><span>{number}</span></div>
        )}
      </div>
      )}
    </div>
  );
}

export default React.memo(TopNumbers);
