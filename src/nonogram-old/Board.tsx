import { FunctionComponent } from 'react';
import { State } from './types';
import { Cell } from './Cell';

export const Board: FunctionComponent<{ state: State; }> = ({ state }) =>
<div className="board" style={{ gridTemplateColumns: `repeat(${state.cols}, 1fr)` }}>
  {state.table.map((_value, index) => <Cell key={index} state={state} index={index} />
  )}
</div>;
