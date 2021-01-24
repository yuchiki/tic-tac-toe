import React, { useState } from 'react';
import './App.css';
import {CellState, Player, flipPlayer, winnerOf, getInitialBoard, copyBoard} from './gameLogic';
import Board from "./Board/Board";
import GameInfo from "./GameInfo/GameInfo";

const App: React.FC = () => {
  const [history, setHistory] = useState([getInitialBoard()]);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(CellState.stateO);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);

  const updater = (row: number, column: number) => {
    const currentBoard = history[currentMoveIndex];
    const nextBoardState = copyBoard(currentBoard);
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

export default App;
