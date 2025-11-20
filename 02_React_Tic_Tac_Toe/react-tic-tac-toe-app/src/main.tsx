/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': '#333'
}

const boardStyle: React.CSSProperties = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle: React.CSSProperties = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle: React.CSSProperties = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

function Square({ value, onSquareClick }: { value: number | string | null, onSquareClick: () => void }) {
  return (
    <div
      className="square"
      style={squareStyle}
      onClick={onSquareClick}
    >
      {value}
    </div>
  );
}

function Board() {
  const [squares, setSquares] = useState<number[] | string[] | null[]>(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  const calculateWinner = (squares: number[] | string[] | null[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
        return squares[a]
      }
    }

    return null
  }

  const winner = calculateWinner(squares)

  const handleClick = (i: number) => {
    if (squares[i] || winner) return

    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? 'X' : 'O'
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  const nextPlayer = xIsNext ? 'X' : 'O'

  const handleReset = () => {
    setXIsNext(true)
    setSquares(Array(9).fill(null))
  }

  return (
    <div style={containerStyle} className="gameBoard">
      {!winner && <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{nextPlayer}</span></div>}
      {winner && <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{winner}</span></div>}
      <button style={buttonStyle} onClick={handleReset}>Reset</button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<Game />);