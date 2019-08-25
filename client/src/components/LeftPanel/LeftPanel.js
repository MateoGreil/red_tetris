import React from 'react';
import './LeftPanel.css'
import Shapes from './Shapes/Shapes'

export default function LeftPanel({players, user, gameName, nextPiece, score}){
    return (
    <div className='LeftPanel'>
        <div className='bloc'>
            {gameName}
        </div>
        <div className='bloc'>
            Your Name : {user}
        </div>
        <div className='bloc'>
            Number of players : {players.length}
        </div>
        <div className='bloc'>
            Players : {players.map((player, i) => (i ? ', ': '') + player.name) }
        </div>
        <div className='bloc'>
            Time : 00:07
        </div>
        <div className='bloc' style={{heigth:"200px"}}>
            Next Piece :  "{nextPiece ? <Shapes shapes={nextPiece.piece} /> : '' }"
        </div>
        <div className='bloc' style={{heigth:"200px"}}>
            Score :  "{score}"
        </div>
    </div>
    )
}
