import Board from './Board';
import SideNumbers from './SideNumbers';
import TopNumbers from './TopNumbers';
import { GameState } from './types';
import { ReactComponent as LeftClick } from "../assets/left.svg";
import { ReactComponent as RightClick } from "../assets/right.svg";
import styles from './Nonogram.module.css';
import useGameEnvironment from './GameEnvironmentHook';
import Preview from './Preview';

/**
 * component that renders the whole game: the preview, the numbers that describe which cells to fill on the board,
 * the board itself and the button descriptions.
 */
export default function Nonogram() {

  const { level, onMarkFilled, onMarkEmpty, onRemoveMark, formattedTimer, gameState } = useGameEnvironment();

  return (
    <div className={styles.nonogram}>
      <h1>{level.levelName}</h1>
      <div className={styles.game}>
        <div className={styles.container}>
          <div className={styles.previewAndTimer}>
            <Preview level={level} />
            <div className={styles.timer}>
              {formattedTimer}
            </div>
          </div>
          <TopNumbers level={level} />
          <SideNumbers level={level} />
          <Board
            gameState={gameState}
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
        {gameState === GameState.Won &&
          <div className={styles.message}>{level.description}</div>
        }
        {gameState === GameState.GameOver &&
          <div className={styles.message}>You ran out of time.</div>
        }
      </div>
    </div>
  );
}
