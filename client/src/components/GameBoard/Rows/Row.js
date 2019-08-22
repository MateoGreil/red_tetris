import React from 'react'
import './Row.css'

const colors = {
    0: "#ffffffb0",
    1: "#00D9DA",
    2: "#E6E703",
    3: "#9400DE",
    4: "#55E255",
    5: "#DA0000",
    6: "#0000DC",
    7: "#E99B03",
    8: "#808080"
}

//TODO: commenter et modifier ca... c'est dego.
function Row(props) {
    var row = props.row
    var uiRow = [];

    for (var i = 0; i < 10; i++) {
        uiRow.push(<div style={{backgroundColor: colors[row[i]], height: props.size, width: props.size}}/>)
    }

    return (
        <div className="Row">
            {uiRow}
        </div>
    );
}

export default Row
