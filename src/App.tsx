import React, { Props, useState } from 'react';
import './App.css';

enum CellState {
  emptyState = "",
  stateO = "O",
  stateX = "X"
}

type Player = CellState.stateO | CellState.stateX;


const App: React.FC = () => {
  const initialBoardState = [
    [CellState.emptyState, CellState.emptyState, CellState.emptyState],
    [CellState.emptyState, CellState.emptyState, CellState.emptyState],
    [CellState.emptyState, CellState.emptyState, CellState.emptyState]
  ];

  const [boardState, setBoardState] = useState(initialBoardState);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(CellState.stateO);

  const updater = (row: number, column: number) => {
    const copiedBoardState = [
      [...boardState[0]],
      [...boardState[1]],
      [...boardState[2]]
    ];
    copiedBoardState[row][column] = currentPlayer;
    setBoardState(copiedBoardState);
    setCurrentPlayer(flipPlayer(currentPlayer))
  }

  const winner = winnerOf(boardState);

  return <div className="game">
    <Board
      boardState={boardState}
      updater={winner !== CellState.emptyState ? () => { } : updater}
    />
    <GameInfo
      currentPlayer={currentPlayer}
      winner={winner}
    />
  </div>;
}

const Board: React.FC<{ boardState: CellState[][], updater: (row: number, column: number) => void }> = props =>
  <div>
    <BoardRow rowState={props.boardState[0]} row={0} updater={props.updater} />
    <BoardRow rowState={props.boardState[1]} row={1} updater={props.updater} />
    <BoardRow rowState={props.boardState[2]} row={2} updater={props.updater} />
  </div>;

const BoardRow: React.FC<{ rowState: CellState[], row: number, updater: (row: number, column: number) => void }> = props =>
  <div>
    {props.rowState.map((s, i) =>
      <Cell
        cellState={s}
        row={props.row}
        column={i}
        updater={props.updater}
      />)}
  </div>;

const Cell: React.FC<{ cellState: CellState, row: number, column: number, updater: (row: number, column: number) => void }> = props =>
  <button
    className="cell"
    onClick={
      _ => {
        if (props.cellState !== CellState.emptyState) { return; }
        props.updater(props.row, props.column)
      }
    }
  >
    {props.cellState}
  </button>;

export default App;

const GameInfo: React.FC<{ currentPlayer: Player, winner: CellState }> = props =>
  <div className="game-info">
    <StatusBar
      currentPlayer={props.currentPlayer}
      winner={props.winner}
    />
    <ul>
      <MoveNavigator />
      <MoveNavigator />
      <MoveNavigator />
      <MoveNavigator />
      <MoveNavigator />
    </ul>
  </div>;

const StatusBar: React.FC<{ currentPlayer: Player, winner: CellState }> = props =>
  props.winner === CellState.emptyState ?
    <div>next: {props.currentPlayer}</div> :
    <div>winner: {props.winner}</div>

const MoveNavigator: React.FC = () =>
  <li>
    3: <button>Go to move #3 </ button>
  </li>

const flipPlayer = (player: Player): Player =>
  player === CellState.stateO ? CellState.stateX : CellState.stateO

const winnerOf = (board: CellState[][]): CellState =>
  doesWin(board, CellState.stateO) ? CellState.stateO :
    doesWin(board, CellState.stateX) ? CellState.stateX :
      CellState.emptyState;

const doesWin = (board: CellState[][], player: Player): boolean =>
  [
    board[0],
    board[1],
    board[2],
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]]
  ].some(line => line.every(c => c === player));
