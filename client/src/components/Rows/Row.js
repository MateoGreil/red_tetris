import React from 'react'
import { tetriminos, colors } from '../Tetriminos/Tetriminos.js'
import './Row.css'


//TODO: commenter et modifier ca... c'est dego.
function Row(props) {
    var row = props.row
    var uiRow = [];

    for (var i = 0; i < 10; i++) {
        uiRow.push(<square style={{backgroundColor: tetriminos[row[i]].color}}/>)
    }

    return (
        <div className="Row">
            {uiRow}
        </div>
    );
}

export default Row