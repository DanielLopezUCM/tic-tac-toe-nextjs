'use client'
import { useState } from 'react'

const TURNS = {
  X: '❌',
  O: '⚪'
}

const WIN_VALUES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function Square ({ children, isSelected, index, updateBoard }) {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  return (
    <div className={className} onClick={() => updateBoard(index)}>
      {children}
    </div>
  )
}

function WinnerPannel ({ winner, restartGame }) {
  if (winner === null) return null

  const winnerText = winner === false ? 'Draw' : 'Winner:'

  return (
    <section className='winner'>
      <div className='text'>
        <h2>{winnerText}</h2>

        <header className='win'>
          {winner && <Square>{winner}</Square>}
        </header>

        <footer>
          <button onClick={restartGame}>New Game</button>
        </footer>
      </div>
    </section>
  )
}

export default function Home () {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    for (const combo of WIN_VALUES) {
      const [a, b, c] = combo
      if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) return boardToCheck[a]
    }
    return null
  }

  const checkDraw = (boardToCheck) => {
    return boardToCheck.every((square) => square !== null)
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkDraw(newBoard)) {
      setWinner(false)
    }
  }

  const restartGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <main className='board'>
      <h1>tic-tac-toe</h1>
      <button onClick={restartGame}>Restart Game</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {square}
              </Square>
            )
          }
          )
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerPannel winner={winner} restartGame={restartGame} />
    </main>
  )
}
