import Board from './Board';
import React from 'react';
import SideNumbers from './SideNumbers';
import TopNumbers from './TopNumbers';
import { GameState } from './types';
import LeftClick from "../assets/left.svg?react";
import RightClick from "../assets/right.svg?react";
import styles from './Nonogram.module.css';
import useGameEnvironment from './GameEnvironmentHook';
import Preview from './Preview';

/**
 * component that renders the whole game: the preview, the numbers that describe which cells to fill on the board,
 * the board itself and the button descriptions.
 */
export default function Nonogram(): React.ReactElement {
  const { board, level, onMarkFilled, onMarkEmpty, onRemoveMark, session } = useGameEnvironment();

  return (
    <div className={styles.nonogram}>
      <h1>{level.levelName}</h1>
      <div className={styles.game}>
        <div className={styles.container}>
          <div className={styles.previewAndTimer}>
            <Preview board={board} level={level} />
            <div className={styles.timer}>
              {session.formattedTimer}
            </div>
          </div>
          <TopNumbers level={level} />
          <SideNumbers level={level} />
          <Board
            board={board}
            gameState={session.gameState}
            level={level}
            onMarkEmpty={onMarkEmpty}
            onMarkFilled={onMarkFilled}
            onRemoveMark={onRemoveMark}
          />
        </div>
        <div className={styles.buttons}>
          <p>
            <LeftClick />
            <span>Color tile</span>
          </p>
          <p>
            <RightClick />
            <span>Mark tile as 'must not be colored'</span>
          </p>
        </div>
        {session.gameState === GameState.Won &&
          <div className={styles.message}>{level.description}</div>
        }
        {session.gameState === GameState.GameOver &&
          <div className={styles.message}>You ran out of time.</div>
        }
      </div>
    </div>
  );
}
