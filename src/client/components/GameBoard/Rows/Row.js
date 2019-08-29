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
    8: ""
}

//TODO: commenter et modifier ca... c'est dego.
function Row({ row, size }) {

    return (
        <div className="Row">
            {row.map((square, i) => <div key={i} style={{backgroundColor: colors[square], height: size, width: size}}/>)}
        </div>
    );
}

export default Row
