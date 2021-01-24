import React from "react";
import { render, screen } from "@testing-library/react";

import { CellState } from "../gameLogic";
import StatusBar from "./StatusBar";

describe("StatusBar", () => {
  it("should show the winner when the winner O is given", () => {
    render(<StatusBar currentPlayer={CellState.stateO} winner={CellState.stateO} />,);
    expect(screen.getByText("winner: O")).toBeInTheDocument();
  });

   it("should show the winner when the winner X is given", () => {
    render(<StatusBar currentPlayer={CellState.stateO} winner={CellState.stateX} />);
    expect(screen.getByText("winner: X")).toBeInTheDocument();
  });

  it("should show the current player O when the winner is not given" ,() => {
    render(<StatusBar currentPlayer={CellState.stateO} winner={CellState.emptyState} />);
    expect(screen.getByText("next: O")).toBeInTheDocument();
  });

  it("should show the current player X when the winner is not given" ,() => {
    render(<StatusBar currentPlayer={CellState.stateX} winner={CellState.emptyState} />);
        expect(screen.getByText("next: X")).toBeInTheDocument();
  });
});
