import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Board } from "./Board";

export function Game() {
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState({
    plays: [
      {
        squares: Array(9).fill(null),
      },
    ],
  });

  function handleClick(i: number) {
    const plays = history.plays.slice(0, stepNumber + 1);
    const currentPlay = plays[plays.length - 1];
    const squares = currentPlay.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";

    setStepNumber(plays.length);
    setXIsNext(!xIsNext);
    setHistory({
      plays: plays.concat([
        {
          squares: squares,
        },
      ]),
    });
  }

  function jumpTo(step: number) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
    setHistory({
      plays: history.plays.slice(0, step + 1),
    });
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

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

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
