import React from "react";
import { CellState } from "../gameLogic";
import BoardRow from "./BoardRow";

const Board: React.FC<{ boardState: CellState[][], updater: (row: number, column: number) => void }> = props =>
  <div>{props.boardState.map((row, i) =>
    <BoardRow
      rowState={row}
      row={i}
      updater={props.updater}
    />)}
  </div>;


export default Board;
