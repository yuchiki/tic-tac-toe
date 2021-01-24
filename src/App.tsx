import React from 'react';
import './App.css';

enum CellState {
  emptyState = "",
  oState = "O",
  xState = "X"
}


const App: React.FC = () =>
  <div className="game">
    <Board />
    <GameInfo />
  </div>;

const Board: React.FC = () =>
  <div>
    <BoardRow rowState={[CellState.xState, CellState.oState, CellState.emptyState]} />
    <BoardRow rowState={[CellState.xState, CellState.oState, CellState.emptyState]} />
    <BoardRow rowState={[CellState.xState, CellState.oState, CellState.emptyState]} />
  </div>;

const BoardRow: React.FC<{ rowState: CellState[] }> = (props) =>
  <div>
    {props.rowState.map(s => <Cell cellState={s} />)}
  </div>;

const Cell: React.FC<{ cellState: CellState }> = (props) =>
  <button className="cell" >
    {props.cellState}
  </button>;

export default App;

const GameInfo: React.FC = () =>
  <div className="game-info">
    <StatusBar />
    <ul>
      <MoveNavigator />
      <MoveNavigator />
      <MoveNavigator />
      <MoveNavigator />
      <MoveNavigator />
    </ul>
  </div>

const StatusBar: React.FC = () =>
  <div>
    next: O
</div>

const MoveNavigator: React.FC = () =>
  <li>
    3: <button>Go to move #3 </ button>
  </li>
