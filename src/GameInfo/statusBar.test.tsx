import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import { CellState } from "../gameLogic";
import StatusBar from "./StatusBar";

let container: Element;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
})

afterEach(() => {
  if (container) {
    unmountComponentAtNode(container);
    container.remove();
  }
})

describe("StatusBar", () => {
  it("should show the winner when the winner O is given", () => {
    render(<StatusBar currentPlayer={CellState.stateO} winner={CellState.stateO} />, container);
    expect(container.textContent).toBe("winner: O");
  });

   it("should show the winner when the winner X is given", () => {
    render(<StatusBar currentPlayer={CellState.stateO} winner={CellState.stateX} />, container);
    expect(container.textContent).toBe("winner: X");
  });

  it("should show the current player O when the winner is not given" ,() => {
    render(<StatusBar currentPlayer={CellState.stateO} winner={CellState.emptyState} />, container);
    expect(container?.textContent).toBe("next: O");
  });
  it("should show the current player X when the winner is not given" ,() => {
    render(<StatusBar currentPlayer={CellState.stateX} winner={CellState.emptyState} />, container);
    expect(container?.textContent).toBe("next: X");
  })
});
