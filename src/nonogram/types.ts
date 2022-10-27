/*
 * contains interfaces and type definitions used throughout the code.
 */

/**
 * coordinates of a cell on the board.
 */
export type CellCoords = [number, number];

/**
 * the map containing all cells in the board.
 */
export type CellMap = Map<string, ICell>;

/**
 * a cell on the board.
 */
export interface ICell {
  id: number;
  coords: CellCoords;
  fill: boolean;
  mark: CellMark;
}

/**
 * represents the level currently being played.
 */
export interface ILevel {
  levelName: string;
  description: string;
  cells: CellMap;
  cellsToBeFilled: number;
  cellsFilled: number;
  rows: number;
  cols: number;
  setCells(cells: CellMap): void;
  setCellsFilled(cellsFilled: number): void;
}

/**
 * enumerates all ways a cell can be marked.
 */
export enum CellMark {
  none = 'none',
  empty = 'empty',
  filled = 'filled',
}

/**
 * enumerates all states of the game.
 */
export enum GameState {
  Idle = 'Idle',
  Playing = 'Playing',
  Pause = 'Pause',
  Won = 'Won',
  GameOver = 'GameOver',
}
