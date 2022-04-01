export enum Result {
  won, lost, undefined
}

export enum Mark {
  none, empty, filled
}

export class CellState {
  public static emptyUnmarked = new CellState(false, Mark.none);
  public static emptyMarkedEmpty = new CellState(false, Mark.empty);
  public static filledUnmarked = new CellState(true, Mark.none);
  public static filledMarkedEmpty = new CellState(true, Mark.empty);
  public static filledMarkedFilled = new CellState(true, Mark.filled);

  private filled: boolean;
  private mark: Mark;

  private constructor(filled: boolean, mark: Mark) {
      this.filled = filled;
      this.mark = mark;
  }

  public isFilled() {
      return this.filled;
  }

  public isMarkedEmpty() {
      return this.mark === Mark.empty;
  }

  public isMarkedFilled() {
      return this.mark === Mark.filled;
  }

  public markFilled() {
      if(this.isFilled()) {
          this.mark = Mark.filled;
      }
  }

  public toggleMarkEmpty() {
      if(!this.isMarkedFilled()) {
          if(this.isMarkedEmpty()) {
              this.mark = Mark.none;
          } else {
              this.mark = Mark.empty;
          }
      }
  }
}

export type State = {
  loading: boolean,
  table: CellState[];
  cols: number;
  rows: number;
  win: Result;
  msg: string;
};
