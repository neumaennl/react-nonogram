/*
 * contains interfaces and type definitions used throughout the code.
 */

/**
 * coordinates of a cell on the board.
 */
export type CellCoords = [number, number];

/**
 * the key used to address a cell in a map.
 */
export type CellKey = string;

/**
 * immutable information about a cell defined by the level data.
 */
export interface LevelCellDefinition {
  id: number;
  coords: CellCoords;
  fill: boolean;
  initialMark: CellMark;
}

/**
 * the map containing all cells defined by a level.
 */
export type LevelCellMap = Map<CellKey, LevelCellDefinition>;

/**
 * the mutable marks currently shown on the board.
 */
export type CellMarkMap = Map<CellKey, CellMark>;

/**
 * immutable information that describes a level.
 */
export interface LevelDefinition {
  levelName: string;
  description: string;
  cells: LevelCellMap;
  cellsToBeFilled: number;
  rows: number;
  cols: number;
}

/**
 * mutable board state for an active game session.
 */
export interface GameBoardState {
  marks: CellMarkMap;
  cellsFilled: number;
}

/**
 * mutable game-session state.
 */
export interface GameSessionState {
  timer: number;
  formattedTimer: string;
  gameState: GameState;
}

/**
 * environment-level state shared across game sessions.
 */
export interface EnvironmentState {
  levelName: string;
  levelNames: string[];
}

/**
 * reusable cell action handlers.
 */
export interface GameCellActions {
  onMarkFilled(cell: LevelCellDefinition): void;
  onMarkEmpty(cell: LevelCellDefinition): void;
  onRemoveMark(cell: LevelCellDefinition): void;
}

/**
 * public result of the game loop hook.
 */
export interface GameLoopResult extends GameCellActions {
  board: GameBoardState;
  session: GameSessionState;
  pause(): void;
  resume(): void;
  restart(): void;
}

/**
 * public result of the environment hook.
 */
export interface GameEnvironmentResult extends GameLoopResult {
  environment: EnvironmentState;
  level: LevelDefinition;
  selectLevel(levelName: string): void;
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
