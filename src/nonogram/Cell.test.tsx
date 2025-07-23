import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CellMark, GameState, ICell, ILevel, CellMap } from '../nonogram/types';
import Cell from './Cell'

test("renders an unmarked cell", async () => {

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
  const user = userEvent.setup();

  render(<Cell cell={cell} gameState={GameState.Playing} level={level}
    onMarkEmpty={onMarkEmpty} onMarkFilled={onMarkFilled} onRemoveMark={onRemoveMark} />);

  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
  expect(button).toHaveClass("cell");
  expect(button).toBeEnabled();
  expect(button.style.backgroundColor).toEqual("white");
  expect(button).toBeEmptyDOMElement();

  await user.pointer({keys: '[MouseLeft]', target: button});
  expect(onMarkFilled).toHaveBeenCalledWith(cell);
  await user.pointer({keys: '[MouseRight]', target: button});
  expect(onMarkEmpty).toHaveBeenCalledWith(cell);
  expect(onRemoveMark).not.toHaveBeenCalled();
});

test("renders an empty cell", async () => {

  const cell:ICell = { id: 0, coords: [0, 0], mark: CellMark.empty, fill: true };
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
  const user = userEvent.setup();

  render(<Cell cell={cell} gameState={GameState.Playing} level={level}
    onMarkEmpty={onMarkEmpty} onMarkFilled={onMarkFilled} onRemoveMark={onRemoveMark} />);

  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
  expect(button).toHaveClass("cell");
  expect(button).toBeEnabled();
  expect(button.style.backgroundColor).toEqual("white");
  expect(button).not.toBeEmptyDOMElement();
  expect(button.childElementCount).toEqual(1);
  // eslint-disable-next-line testing-library/no-node-access
  expect(button.firstChild).toBeInstanceOf(SVGSVGElement);

  await user.pointer({keys: '[MouseLeft]', target: button});
  expect(onMarkFilled).not.toHaveBeenCalled();
  await user.pointer({keys: '[MouseRight]', target: button});
  expect(onMarkEmpty).not.toHaveBeenCalled();
  expect(onRemoveMark).toHaveBeenCalledWith(cell);
});

test("renders a filled cell", async () => {

  const cell:ICell = { id: 0, coords: [0, 0], mark: CellMark.filled, fill: true };
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
  const user = userEvent.setup();

  render(<Cell cell={cell} gameState={GameState.Playing} level={level}
    onMarkEmpty={onMarkEmpty} onMarkFilled={onMarkFilled} onRemoveMark={onRemoveMark} />);

  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
  expect(button).toHaveClass("cell");
  expect(button).toBeEnabled();
  expect(button.style.backgroundColor).toEqual("black");
  expect(button).toBeEmptyDOMElement();

  await user.pointer({keys: '[MouseLeft]', target: button});
  expect(onMarkFilled).not.toHaveBeenCalled();
  await user.pointer({keys: '[MouseRight]', target: button});
  expect(onMarkEmpty).not.toHaveBeenCalled();
  expect(onRemoveMark).not.toHaveBeenCalled();
});

test("renders a disabled cell", async () => {

  const cell:ICell = { id: 0, coords: [0, 0], mark: CellMark.filled, fill: true };
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
  const user = userEvent.setup();

  render(<Cell cell={cell} gameState={GameState.GameOver} level={level}
    onMarkEmpty={onMarkEmpty} onMarkFilled={onMarkFilled} onRemoveMark={onRemoveMark} />);

  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
  expect(button).toHaveClass("cell");
  expect(button).toBeDisabled();

  await user.pointer({keys: '[MouseLeft]', target: button});
  expect(onMarkFilled).not.toHaveBeenCalled();
  await user.pointer({keys: '[MouseRight]', target: button});
  expect(onMarkEmpty).not.toHaveBeenCalled();
  expect(onRemoveMark).not.toHaveBeenCalled();
});
