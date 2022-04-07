export type CellCoords = [number, number];
export type CellMap = Map<string, ICell>;

export interface ICell {
  id: number;
  coords: CellCoords;
  fill: boolean;
  mark: CellMark;
}

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

export enum CellMark {
  none = 'none',
  empty = 'empty',
  filled = 'filled',
}

export enum GameState {
  Idle = 'Idle',
  Playing = 'Playing',
  Pause = 'Pause',
  Won = 'Won',
  GameOver = 'GameOver',
}
