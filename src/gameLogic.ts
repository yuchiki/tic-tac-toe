export enum CellState {
  emptyState = "",
  stateO = "O",
  stateX = "X"
}

type BoardState = CellState[][]

export const getInitialBoard = ():BoardState => [
  [CellState.emptyState, CellState.emptyState, CellState.emptyState],
  [CellState.emptyState, CellState.emptyState, CellState.emptyState],
  [CellState.emptyState, CellState.emptyState, CellState.emptyState]
];

export const copyBoard = (board: BoardState): BoardState =>  [
  [...board[0]],
  [...board[1]],
  [...board[2]]
];

export const winnerOf = (board: CellState[][]): CellState =>
  doesWin(board, CellState.stateO) ? CellState.stateO :
  doesWin(board, CellState.stateX) ? CellState.stateX :
  CellState.emptyState;

const doesWin = (board: CellState[][], player: Player): boolean =>
  [
    board[0],
    board[1],
    board[2],
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]]
  ].some(line => line.every(c => c === player));

export type Player = CellState.stateO | CellState.stateX;

export const flipPlayer = (player: Player): Player =>
  player === CellState.stateO ? CellState.stateX : CellState.stateO
