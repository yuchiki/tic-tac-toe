import React from "react";
import {CellState} from "../gameLogic";
import BoardCell from "./BoardCell"

const BoardRow: React.FC<{ rowState: CellState[], row: number, updater: (row: number, column: number) => void }> = props =>
  <div>
    {props.rowState.map((s, i) =>
      <BoardCell
        cellState={s}
        row={props.row}
        column={i}
        updater={props.updater}
      />)}
  </div>;

export default BoardRow;
