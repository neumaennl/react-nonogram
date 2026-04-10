import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { CellMark, GameState, LevelCellDefinition, LevelDefinition } from '../nonogram/types';
import { coordsToKey } from './helper';
import Cell from './Cell'

function createLevel(cell: LevelCellDefinition): LevelDefinition {
  return {
    levelName: 'dummy',
    description: 'dummy description',
    cells: new Map([
      [coordsToKey(cell.coords), cell],
    ]),
    cellsToBeFilled: 1,
    cols: 1,
    rows: 1,
  };
}

test('renders an unmarked cell', async () => {
  const cell: LevelCellDefinition = { id: 0, coords: [0, 0], initialMark: CellMark.none, fill: true };
  const level = createLevel(cell);

  const onMarkEmpty = vi.fn();
  const onMarkFilled = vi.fn();
  const onRemoveMark = vi.fn();
  const user = userEvent.setup();

  render(
    <Cell
      cell={cell}
      gameState={GameState.Playing}
      level={level}
      mark={CellMark.none}
      onMarkEmpty={onMarkEmpty}
      onMarkFilled={onMarkFilled}
      onRemoveMark={onRemoveMark}
      isTouchDevice={false}
      touchMarkMode='fill'
    />,
  );

  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
  expect(button).toHaveClass('cell');
  expect(button).toBeEnabled();
  expect(button.style.backgroundColor).toEqual('white');
  expect(button).toBeEmptyDOMElement();

  await user.pointer({ keys: '[MouseLeft]', target: button });
  expect(onMarkFilled).toHaveBeenCalledWith(cell);
  await user.pointer({ keys: '[MouseRight]', target: button });
  expect(onMarkEmpty).toHaveBeenCalledWith(cell);
  expect(onRemoveMark).not.toHaveBeenCalled();
});

test('renders an empty cell', async () => {
  const cell: LevelCellDefinition = { id: 0, coords: [0, 0], initialMark: CellMark.empty, fill: true };
  const level = createLevel(cell);

  const onMarkEmpty = vi.fn();
  const onMarkFilled = vi.fn();
  const onRemoveMark = vi.fn();
  const user = userEvent.setup();

  render(
    <Cell
      cell={cell}
      gameState={GameState.Playing}
      level={level}
      mark={CellMark.empty}
      onMarkEmpty={onMarkEmpty}
      onMarkFilled={onMarkFilled}
      onRemoveMark={onRemoveMark}
      isTouchDevice={false}
      touchMarkMode='fill'
    />,
  );

  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
  expect(button).toHaveClass('cell');
  expect(button).toBeEnabled();
  expect(button.style.backgroundColor).toEqual('white');
  expect(button).not.toBeEmptyDOMElement();
  expect(button.childElementCount).toEqual(1);

  expect(button.firstChild).toBeInstanceOf(SVGSVGElement);

  await user.pointer({ keys: '[MouseLeft]', target: button });
  expect(onMarkFilled).not.toHaveBeenCalled();
  await user.pointer({ keys: '[MouseRight]', target: button });
  expect(onMarkEmpty).not.toHaveBeenCalled();
  expect(onRemoveMark).toHaveBeenCalledWith(cell);
});

test('renders a filled cell', async () => {
  const cell: LevelCellDefinition = { id: 0, coords: [0, 0], initialMark: CellMark.filled, fill: true };
  const level = createLevel(cell);

  const onMarkEmpty = vi.fn();
  const onMarkFilled = vi.fn();
  const onRemoveMark = vi.fn();
  const user = userEvent.setup();

  render(
    <Cell
      cell={cell}
      gameState={GameState.Playing}
      level={level}
      mark={CellMark.filled}
      onMarkEmpty={onMarkEmpty}
      onMarkFilled={onMarkFilled}
      onRemoveMark={onRemoveMark}
      isTouchDevice={false}
      touchMarkMode='fill'
    />,
  );

  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
  expect(button).toHaveClass('cell');
  expect(button).toBeEnabled();
  expect(button.style.backgroundColor).toEqual('black');
  expect(button).toBeEmptyDOMElement();

  await user.pointer({ keys: '[MouseLeft]', target: button });
  expect(onMarkFilled).not.toHaveBeenCalled();
  await user.pointer({ keys: '[MouseRight]', target: button });
  expect(onMarkEmpty).not.toHaveBeenCalled();
  expect(onRemoveMark).not.toHaveBeenCalled();
});

test('renders a disabled cell', async () => {
  const cell: LevelCellDefinition = { id: 0, coords: [0, 0], initialMark: CellMark.filled, fill: true };
  const level = createLevel(cell);

  const onMarkEmpty = vi.fn();
  const onMarkFilled = vi.fn();
  const onRemoveMark = vi.fn();
  const user = userEvent.setup();

  render(
    <Cell
      cell={cell}
      gameState={GameState.GameOver}
      level={level}
      mark={CellMark.filled}
      onMarkEmpty={onMarkEmpty}
      onMarkFilled={onMarkFilled}
      onRemoveMark={onRemoveMark}
      isTouchDevice={false}
      touchMarkMode='fill'
    />,
  );

  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
  expect(button).toHaveClass('cell');
  expect(button).toBeDisabled();

  await user.pointer({ keys: '[MouseLeft]', target: button });
  expect(onMarkFilled).not.toHaveBeenCalled();
  await user.pointer({ keys: '[MouseRight]', target: button });
  expect(onMarkEmpty).not.toHaveBeenCalled();
  expect(onRemoveMark).not.toHaveBeenCalled();
});

test('touch fill mode marks an unmarked cell as filled', async () => {
  const cell: LevelCellDefinition = { id: 0, coords: [0, 0], initialMark: CellMark.none, fill: true };
  const level = createLevel(cell);

  const onMarkEmpty = vi.fn();
  const onMarkFilled = vi.fn();
  const onRemoveMark = vi.fn();
  const user = userEvent.setup();

  render(
    <Cell
      cell={cell}
      gameState={GameState.Playing}
      level={level}
      mark={CellMark.none}
      onMarkEmpty={onMarkEmpty}
      onMarkFilled={onMarkFilled}
      onRemoveMark={onRemoveMark}
      isTouchDevice={true}
      touchMarkMode='fill'
    />,
  );

  const button = screen.getByRole('button');
  await user.click(button);

  expect(onMarkFilled).toHaveBeenCalledWith(cell);
  expect(onMarkEmpty).not.toHaveBeenCalled();
  expect(onRemoveMark).not.toHaveBeenCalled();
});

test('touch mark mode toggles none to empty and empty to none', async () => {
  const cell: LevelCellDefinition = { id: 0, coords: [0, 0], initialMark: CellMark.none, fill: true };
  const level = createLevel(cell);

  const onMarkEmpty = vi.fn();
  const onMarkFilled = vi.fn();
  const onRemoveMark = vi.fn();
  const user = userEvent.setup();

  const { rerender } = render(
    <Cell
      cell={cell}
      gameState={GameState.Playing}
      level={level}
      mark={CellMark.none}
      onMarkEmpty={onMarkEmpty}
      onMarkFilled={onMarkFilled}
      onRemoveMark={onRemoveMark}
      isTouchDevice={true}
      touchMarkMode='mark'
    />,
  );

  const button = screen.getByRole('button');
  await user.click(button);
  expect(onMarkEmpty).toHaveBeenCalledWith(cell);

  rerender(
    <Cell
      cell={cell}
      gameState={GameState.Playing}
      level={level}
      mark={CellMark.empty}
      onMarkEmpty={onMarkEmpty}
      onMarkFilled={onMarkFilled}
      onRemoveMark={onRemoveMark}
      isTouchDevice={true}
      touchMarkMode='mark'
    />,
  );

  await user.click(screen.getByRole('button'));
  expect(onRemoveMark).toHaveBeenCalledWith(cell);
  expect(onMarkFilled).not.toHaveBeenCalled();
});
