import React from "react";
import { Board } from "./Board";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import {
  incrementSteps,
  resetStepsTo,
  selectStepValue,
} from "./store/slices/step_number_slice";
import { selectXIsNext, setTurnIsNext } from "./store/slices/x_isnext_slice";
import { addPlay, resetHistoryTo } from "./store/slices/history_slice";
import { RootState } from "./store/config_store";

export function Game() {
  const dispatch = useAppDispatch();
  const stepNumber = useAppSelector(selectStepValue);
  const xIsNext = useAppSelector(selectXIsNext);
  const history = useAppSelector((state: RootState) => state.history);

  function handleClick(i: number) {
    const plays = history.plays.slice(0, stepNumber + 1);
    const currentPlay = plays[plays.length - 1];
    const squares = currentPlay.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? "X" : "O";

    dispatch(incrementSteps());
    dispatch(setTurnIsNext(!xIsNext));
    dispatch(addPlay(squares));
  }

  function jumpTo(step: number) {
    dispatch(resetStepsTo(step));
    dispatch(setTurnIsNext(step % 2 === 0));
    dispatch(resetHistoryTo(step));
  }

  const plays = history.plays;
  const current = plays[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = plays.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
