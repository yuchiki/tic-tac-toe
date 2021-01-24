import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import MoveNavigator from "./MoveNavigator";

describe("MoveNavigator", ()=> {
  const sampleIndex = 13;
  const mockSetIndex = jest.fn();

  it("should show the button to initial state", () => {
    render(<MoveNavigator index={0} setIndex={mockSetIndex} />);
    expect(screen.getByText(`0:`)).toBeInTheDocument();
    expect(screen.getByText("Go to initial state")).toBeInTheDocument();
  });

  it("should show the button to nth state", () => {
    render(<MoveNavigator index={sampleIndex} setIndex={mockSetIndex} />);
    expect(screen.getByText(`${sampleIndex}:`)).toBeInTheDocument();
    expect(screen.getByText(`Go to move #${sampleIndex}`)).toBeInTheDocument();
  });

  it("should call setIndex when clicked", () => {
    render(<MoveNavigator index={sampleIndex} setIndex={mockSetIndex} />);
    expect(screen.getByText(`${sampleIndex}:`)).toBeInTheDocument();
    fireEvent.click(screen.getByText(`Go to move #${sampleIndex}`));
    expect(mockSetIndex).toBeCalledWith(sampleIndex);
  });
});
