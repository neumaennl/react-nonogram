export type CellCoords = [number, number];
export type CellMap = Map<string, ICell>;

export interface ICell {
  id: number;
  coords: CellCoords;
  fill: boolean;
  mark: CellMark;
}

export interface ISettings {
  level: string;
  cellsToBeFilled: number;
  rows: number;
  cols: number;
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
  GameOver = 'GameOver',
}
