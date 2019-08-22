import React from 'react';
import './RightPanel.css'
import Row from '../GameBoard/Rows/Row';

function Array({ array, username }) {
    return (
        <div className='Array'>
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
        {manageGame.players.map(player => <Array array={player.array} username={player.name}/>)}
    </div>
    )
}
