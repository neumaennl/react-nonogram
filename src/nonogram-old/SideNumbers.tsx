import { FunctionComponent } from 'react';
import { State } from './types';

export const SideNumbers: FunctionComponent<{ state: State; }> = ({ state }) => {

  let blockSize = 0;
  let blockCount = 0;

  let rows = new Array<Array<number>>();

  for (let y = 0; y < state.rows; y++) {
    let numbers = new Array<number>();
    rows.push(numbers);
    for (let x = state.cols - 1; x >= 0; x--) {
      if (state.table[y * state.cols + x].isFilled()) {
        blockSize += 1;
      }
      if ((!state.table[y * state.cols + x].isFilled() || x === 0) && blockSize !== 0) {
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
    <div className="sideNumbers">
      {rows.map((row, y) => <div className="sideNumberRow" key={y}>
        {row.map((number, col) => <div
          key={col}
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
