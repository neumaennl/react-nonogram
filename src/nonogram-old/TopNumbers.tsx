import { FunctionComponent } from 'react';
import { State } from './types';

export const TopNumbers: FunctionComponent<{ state: State; }> = ({ state }) => {

  let blockSize = 0;
  let blockCount = 0;

  let columns = new Array<Array<number>>();

  for (let x = 0; x < state.cols; x++) {
    let numbers = new Array<number>();
    columns.push(numbers);
    for (let y = state.rows - 1; y >= 0; y--) {
      if (state.table[y * state.cols + x].isFilled()) {
        blockSize += 1;
      }
      if ((!state.table[y * state.cols + x].isFilled() || y === 0) && blockSize !== 0) {
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

  return <>
    <div className="topNumbers">
      {columns.map((column, x) => <div className="topNumberColumn" key={x}>
        {column.map((number, row) => <div
          key={row}
          className="number"
          style={{
            width: `min(${100 / (state.cols * 1.5)}vw, ${100 / (state.rows * 1.5)}vh)`,
            height: `min(${100 / (state.cols * 1.5)}vw, ${100 / (state.rows * 1.5)}vh)`
          }}
        ><span>{number}</span></div>
        )}
      </div>
      )}
    </div>
  </>;
};
