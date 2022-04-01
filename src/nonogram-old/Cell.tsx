import React, { FunctionComponent } from 'react';
import { State } from './types';

export const Cell: FunctionComponent<{ state: State; index: number; }> = ({ state, index }) => {

  const onClick = (e: React.MouseEvent) => {
    if (state.table[index].isMarkedEmpty() || state.table[index].isMarkedFilled()) {
      e.preventDefault();
    } else if (state.table[index].isFilled()) {
      state.table[index].markFilled();
    } else {
      //TODO: penalty
    }
  };

  const onContextMenu = (e: React.MouseEvent) => {

    e.preventDefault();

    state.table[index].toggleMarkEmpty();
  };

  return <>
    <button
      id={`cell${index}`}
      className="cell"
      style={{
        width: `min(${100 / (state.cols * 1.5)}vw, ${100 / (state.rows * 1.5)}vh)`,
        height: `min(${100 / (state.cols * 1.5)}vw, ${100 / (state.rows * 1.5)}vh)`,
        backgroundColor: state.table[index].isMarkedFilled() ? "black" : "white"
      }}
      onClick={e => onClick(e)}
      onContextMenu={e => onContextMenu(e)}
    >
    {state.table[index].isMarkedEmpty() && 
      <svg viewBox="0 0 10 10" xmlns="<http://www.w3.org/2000/svg>">
        <line x1="0" y1="0" x2="10" y2="10" stroke='black' />
        <line x1="10" y1="0" x2="0" y2="10" stroke='black' />
      </svg>
    }
  </button>
  </>;
};
