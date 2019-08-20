import React from 'react';
import './LeftPanel.css'
export default function LeftPanel({players, user, gameName}){
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
        <div className='bloc'>
            Next Piece :
        </div>
    </div>
    )
}
