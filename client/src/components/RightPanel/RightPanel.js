import React from 'react';
import './RightPanel.css'
import Row from '../GameBoard/Rows/Row';

function Array({ array, username, gameOver, score }) {
  if (gameOver) {
    return(
      <div className='ArrayAndUsername' style={{backgroundColor: 'red'}}>
        {username}
        <div className='GameOver'>GAME OVER</div>
        {
          array.map((row, i) => <Row row={row} key={i} size={'10px'}/>)
        }

      <div className='ScoreRightPanel'>
        {score} p
      </div>
      </div>
    )
  }
  
  return (
      <div className='ArrayAndUsername' style={{backgroundColor: 'hsl(128, 100%, 27%)'}}>
        {username}
        {
          array.map((row, i) => <Row row={row} key={i} size={'10px'}/>)
        }

      <div className='ScoreRightPanel'>
        {score} p 
      </div>
      </div>
  )
}

export default function RightPanel({ players }) {
    return (
    <div className={'RightPanel'}> 
        {players.map(player => <Array array={player.array} username={player.name} gameOver={player.gameOver} score={player.score}/>)}
    </div>
    )
}
