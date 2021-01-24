import React from "react";
import { CellState, Player } from "../gameLogic";
import StatusBar from "./StatusBar";
import MoveNavigator from "./MoveNavigator";

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

export default GameInfo;
