import Board from './Board';
import SideNumbers from './SideNumbers';
import TopNumbers from './TopNumbers';
import { GameState } from './types';
import { ReactComponent as LeftClick } from "../assets/left.svg";
import { ReactComponent as RightClick } from "../assets/right.svg";
import styles from './Nonogram.module.css';
import useGameEnvironment from './GameEnvironmentHook';

function Nonogram() {

  const level = useGameEnvironment();

  return (
    <div className={styles.game}>
      <div className={styles.container}>
        <div className={styles.previewAndTimer}>
          {/* TODO */}
        </div>
        <TopNumbers level={level} />
        <SideNumbers level={level} />
        <Board
          gameState={GameState.Playing}
          level={level}
          onMarkEmpty={() => null}
          onMarkFilled={() => null}
          onRemoveMark={() => null}
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
    </div>
  );
}

export default Nonogram;
