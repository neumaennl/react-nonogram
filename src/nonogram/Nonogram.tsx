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

type TouchMarkMode = 'fill' | 'mark';

/**
 * component that renders the whole game: the preview, the numbers that describe which cells to fill on the board,
 * the board itself and the button descriptions.
 */
export default function Nonogram(): React.ReactElement {
  const { board, level, onMarkFilled, onMarkEmpty, onRemoveMark, session } = useGameEnvironment();
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);
  const [touchMarkMode, setTouchMarkMode] = React.useState<TouchMarkMode>('fill');

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const updateInputCapabilities = (): void => {
      const hasTouchPoints = navigator.maxTouchPoints > 0;
      const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
      setIsTouchDevice(hasTouchPoints || coarsePointer);
    };

    updateInputCapabilities();
    window.addEventListener('resize', updateInputCapabilities);

    return (): void => {
      window.removeEventListener('resize', updateInputCapabilities);
    };
  }, []);

  return (
    <div className={styles.nonogram}>
      <div className={styles.titlePanel}>
        <h1>{level.levelName}</h1>
      </div>
      <div className={styles.gameShell}>
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
              isTouchDevice={isTouchDevice}
              touchMarkMode={touchMarkMode}
            />
          </div>
        </div>
      </div>
      <div className={styles.helpPanel}>
        {!isTouchDevice &&
          <div className={styles.helpContent}>
            <p>
              <LeftClick />
              <span>Color tile</span>
            </p>
            <p>
              <RightClick />
              <span>Mark tile as not to be colored</span>
            </p>
          </div>
        }
        {isTouchDevice &&
          <div className={styles.helpContent}>
            <p className={styles.touchHelpText}>Tap to apply selected action</p>
            <div className={styles.touchControls}>
              <button
                className={`${styles.touchModeButton} ${touchMarkMode === 'fill' ? styles.touchModeButtonActive : ''}`}
                onClick={(): void => setTouchMarkMode('fill')}
                type='button'
              >
                Fill mode
              </button>
              <button
                className={`${styles.touchModeButton} ${touchMarkMode === 'mark' ? styles.touchModeButtonActive : ''}`}
                onClick={(): void => setTouchMarkMode('mark')}
                type='button'
              >
                Mark mode
              </button>
            </div>
          </div>
        }
      </div>
      {session.gameState === GameState.Won &&
        <div className={styles.message}>{level.description}</div>
      }
      {session.gameState === GameState.GameOver &&
        <div className={styles.message}>You ran out of time.</div>
      }
    </div>
  );
}
