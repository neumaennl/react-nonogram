import './App.css'
import Board from './nonogram/Board';
import SideNumbers from './nonogram/SideNumbers';
import TopNumbers from './nonogram/TopNumbers';
import { CellMark, GameState, ICell } from './nonogram/types';
//import ProjectsPage from './projects/ProjectsPage';
//import Nonogram from './nonogram-old/Nonogram';
//import Minesweeper from './Minesweeper/App'
//import TicTacToe from './TicTacToe/TicTacToe';

function App() {

  const cellMap = new Map<string, ICell>([
    ["[0,0]", { id: 0, coords: [0, 0], fill: false, mark: CellMark.empty }],
    ["[0,1]", { id: 0, coords: [0, 1], fill: true, mark: CellMark.filled }],
    ["[1,0]", { id: 0, coords: [1, 0], fill: false, mark: CellMark.none }],
    ["[1,1]", { id: 0, coords: [1, 1], fill: true, mark: CellMark.empty }],
  ]);

  const settings = { level: "test", cellsToBeFilled: 2, cols: 2, rows: 2 };

  return (
    <div>
    <TopNumbers
      cells={cellMap}
      settings={settings}
    />
    <SideNumbers
      cells={cellMap}
      settings={settings}
    />
      <Board
        cells={cellMap}
        gameState={GameState.Playing}
        settings={settings}
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
