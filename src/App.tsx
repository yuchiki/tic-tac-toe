import React, { Props, useState } from 'react';
import './App.css';

enum CellState {
  emptyState = "",
  stateO = "O",
  stateX = "X"
}

type Player = CellState.stateO | CellState.stateX;

type BoardState = CellState[][];


const App: React.FC = () => {
  const initialBoardState = [
    [CellState.emptyState, CellState.emptyState, CellState.emptyState],
    [CellState.emptyState, CellState.emptyState, CellState.emptyState],
    [CellState.emptyState, CellState.emptyState, CellState.emptyState]
  ];

  const [history, setHistory] = useState([initialBoardState]);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(CellState.stateO);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);

  const updater = (row: number, column: number) => {
    const currentBoard = history[currentMoveIndex];
    const nextBoardState = [
      [...currentBoard[0]],
      [...currentBoard[1]],
      [...currentBoard[2]]
    ];
    nextBoardState[row][column] = currentPlayer;

    const newHistory = [...history.slice(0, currentMoveIndex + 1), nextBoardState];
    setHistory(newHistory);
    setCurrentPlayer(flipPlayer(currentPlayer));
    setCurrentMoveIndex(currentMoveIndex + 1);
  }

  const winner = winnerOf(history[currentMoveIndex]);

  return <div className="game">
    <Board
      boardState={history[currentMoveIndex]}
      updater={winner !== CellState.emptyState ? () => { } : updater}
    />
    <GameInfo
      currentPlayer={currentPlayer}
      winner={winner}
      historyLength={history.length}
      setIndex={setCurrentMoveIndex}
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

const GameInfo: React.FC<{ currentPlayer: Player, winner: CellState, historyLength: number, setIndex: (index: number) => void }> = props =>
  <div className="game-info">
    <StatusBar
      currentPlayer={props.currentPlayer}
      winner={props.winner}
    />
    <ul>
      {Array.from({ length: props.historyLength }).map((_, i) =>
        <MoveNavigator
          index={i}
          setIndex={props.setIndex}
        />)}
    </ul>
  </div>;

const StatusBar: React.FC<{ currentPlayer: Player, winner: CellState }> = props =>
  props.winner === CellState.emptyState ?
    <div>next: {props.currentPlayer}</div> :
    <div>winner: {props.winner}</div>

const MoveNavigator: React.FC<{ index: number, setIndex: (index: number) => void }> = (props) =>
  <li>
    {props.index} : <button onClick={_ => props.setIndex(props.index)}>
      Go to {props.index === 0 ? "initial state" : `move #${props.index}`}
    </ button>
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
