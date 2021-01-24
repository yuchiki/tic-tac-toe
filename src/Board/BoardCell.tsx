import React from "react";
import {CellState} from "../gameLogic";

const BoardCell: React.FC<{ cellState: CellState, row: number, column: number, updater: (row: number, column: number) => void }> = props =>
  <button
    className="cell"
    onClick={
      _ => {
        if (props.cellState !== CellState.emptyState) { return; }
        props.updater(props.row, props.column)
      }}>
    {props.cellState}
  </button>;

export default BoardCell
