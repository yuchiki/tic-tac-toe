import React from "react";
import { CellState, Player } from "../gameLogic";

const StatusBar: React.FC<{ currentPlayer: Player, winner: CellState }> = props =>
  props.winner === CellState.emptyState ?
    <div>next: {props.currentPlayer}</div> :
    <div>winner: {props.winner}</div>;

export default StatusBar;
