import React from "react";

const MoveNavigator: React.FC<{ index: number, setIndex: (index: number) => void }> = (props) =>
  <li>
    {props.index}
    : <button onClick={_ => props.setIndex(props.index)}>
      Go to {props.index === 0 ? "initial state" : `move #${props.index}`}
    </ button>
  </li>;

export default MoveNavigator;
