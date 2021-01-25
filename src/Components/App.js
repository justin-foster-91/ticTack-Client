import './App.css';
import * as GameLogic from './GameLogic';
import React, { useState } from 'react';


function App() {
  const [dummy, setDummy] = useState(0);
  const [board, setBoard] = useState(GameLogic.gameBoard)
  console.log(board);

  const handleClick = (row, column) => {
    setDummy(dummy+1);
    // console.log(dummy);
    GameLogic.playGame(row,column)
    // console.log(GameLogic.gameBoard);

    fetch('http://localhost:8000/play', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        gameBoard: board,
        playerOneWins: GameLogic.playerOneWins,
        playerTwoWins: GameLogic.playerTwoWins
      })
    })
      .then(res => res.json)
      .then(json => console.log(json))
  }

  const drawBoard = () => {
    let ret = [];

    for (let row=0; row<board.length; row++) {
      let insideDiv = [];
      for (let column=0; column<board[0].length; column++) {
        insideDiv.push(<button key={''+row+''+column} type='button' className='tacTile' onClick={() => handleClick(row, column)}>{board[row][column]}</button>)
      }
      ret.push(<div key={row}>
        {insideDiv}
      </div>)
    }
    return ret;
  }

  const loadBoard = () => {
    fetch('http://localhost:8000/play', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setBoard(json.gameBoard)
        GameLogic.setGameBoard(json.gameBoard)
        
        // setDummy(dummy + 1)
      })

  }

  return (
    <section className='gameGrid'>
      {drawBoard()}
      Player one (X) wins: {GameLogic.playerOneWins} <br/>
      Player two (O) wins: {GameLogic.playerTwoWins}
      <button type='button' onClick={() => loadBoard()}>Load Board</button>
    </section>
  );
}

export default App;
