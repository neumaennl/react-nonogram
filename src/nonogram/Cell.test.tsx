import { render, screen } from '@testing-library/react';
import { CellMark, GameState, ICell, ILevel, CellMap } from '../nonogram/types';
import Cell from './Cell'

test("renders a cell", () => {

  const cell:ICell = { id: 0, coords: [0, 0], mark: CellMark.none, fill: true };
  const cells:CellMap = new Map([
    ["[0,0]", cell],
  ]);
  const level:ILevel = {
    levelName: "dummy",
    description: "dummy description",
    cells: cells,
    cellsFilled: 0, cellsToBeFilled: 1,
    cols: 1, rows: 1,
    setCells: () => {},
    setCellsFilled: () => {}
  }

  const onMarkEmpty = jest.fn();
  const onMarkFilled = jest.fn();
  const onRemoveMark = jest.fn();

  render(<Cell cell={cell} gameState={GameState.Playing} level={level}
    onMarkEmpty={onMarkEmpty} onMarkFilled={onMarkFilled} onRemoveMark={onRemoveMark} />);

  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
  expect(button).toHaveClass("cell");
});
