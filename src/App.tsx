import './App.css'
import Board from './nonogram/Board';
import { CellMark, GameState, ICell } from './nonogram/types';
//import ProjectsPage from './projects/ProjectsPage';
//import Nonogram from './nonogram-old/Nonogram';
//import Minesweeper from './Minesweeper/App'
//import TicTacToe from './TicTacToe/TicTacToe';

function App() {
  return (
    <div>
      <Board
        cells={new Map<string, ICell>([
          ["key1", { id: 0, coords: [0, 0], fill: false, mark: CellMark.empty }],
          ["key2", { id: 0, coords: [0, 1], fill: true, mark: CellMark.filled }],
          ["key3", { id: 0, coords: [1, 0], fill: false, mark: CellMark.none }],
          ["key4", { id: 0, coords: [1, 1], fill: true, mark: CellMark.empty }],
        ])}
        gameState={GameState.Playing}
        settings={{level: 0, cellsToBeFilled: 2, cols: 2, rows: 2}}
        onMarkEmpty={() => null}
        onMarkFilled={() => null}
        onRemoveMark={() => null}
      />
      {/*<ProjectsPage />*/}
      {/*<Nonogram />*/}
      {/*<Minesweeper />*/}
      {/*<TicTacToe />*/}
   </div>
  );
}

export default App;
