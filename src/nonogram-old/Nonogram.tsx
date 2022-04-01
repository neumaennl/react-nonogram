import { FunctionComponent, useEffect } from 'react';

import { useLevelLoader } from './levelHandler'

import './Nonogram.css';

import { ReactComponent as LeftClick } from "../assets/left.svg";
import { ReactComponent as RightClick } from "../assets/right.svg";
import { Timer } from './Timer';
import { Preview } from './Preview';
import { TopNumbers } from './TopNumbers';
import { SideNumbers } from './SideNumbers';
import { Board } from './Board';


const Nonogram: FunctionComponent = () => {

  const level = useLevelLoader();

  useEffect(() => {
    const rightclick = (e: MouseEvent) => e.preventDefault();
    window.addEventListener("contextmenu", rightclick);

    return () => {
      window.removeEventListener("contextmenu", rightclick);
    };
  });

  return <>
    <div className="game">
      <div className="container">
        <div className="previewAndTimer">
          <Preview />
          <Timer state={level} />
        </div>
        <TopNumbers state={level} />
        <SideNumbers state={level} />
        <Board state={level} />
      </div>
      <div className="buttons">
        <p>
          <LeftClick />
          <span>Color tile</span>
        </p>
        <p>
          <RightClick />
          <span>Mark tile as 'must not be colored'</span>
        </p>
      </div>
    </div>
  </>
}

export default Nonogram;
