import React, { FunctionComponent, Component } from 'react';
import './TicTacToe.css';

/**
 * The property type for the {@link Square} component
 */
type SquareProps = {
  value: Player,
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

/**
 * enum for the players
 */
enum Player {
  X = "X",
  O = "O"
}

/**
 * Component that represents a square in the TicTacToe game board.
 */
const Square: FunctionComponent<SquareProps> = ({value, onClick}) =>
    <button className="square" onClick={onClick}>
      {value}
    </button>

type BoardState = {
  squares: Array<Player>,
  xIsNext: boolean
}

class Board extends Component<{}, BoardState> {

  componentWillMount(): void {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
    })
  }

  handleClick(i: number): void {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? Player.X : Player.O;
    this.setState({
      squares: squares, 
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i: number): JSX.Element {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
  }

  render(): JSX.Element {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? Player.X : Player.O}`;
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

const TicTacToe: FunctionComponent = ()  =>
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>

function calculateWinner(squares: Array<Player>): Player | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default TicTacToe;
