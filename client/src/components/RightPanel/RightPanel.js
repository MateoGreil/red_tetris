import React from 'react';
import './RightPanel.css'
import Row from '../GameBoard/Rows/Row';

function Array({ array, username, gameOver }) {
  
  if (gameOver) {
    return(
      <div className='ArrayAndUsername' style={{backgroundColor: 'red'}}>
        {username}
        <div className='GameOver'>GAME OVER</div>
        {
          array.map((row, i) => <Row row={row} key={i} size={'10px'}/>)
        }
      </div>
    )
  }
  
  return (
      <div className='ArrayAndUsername' style={{backgroundColor: 'hsla(204, 80%, 77%, 0.822)'}}>
        {username}
        {
          array.map((row, i) => <Row row={row} key={i} size={'10px'}/>)
        }
      </div>
  )
}

export default function RightPanel({ manageGame }) {
    return (
    <div className={'RightPanel'}> 
        {manageGame.players.map(player => <Array array={player.array} username={player.name} gameOver={player.gameOver}/>)}
    </div>
    )
}
