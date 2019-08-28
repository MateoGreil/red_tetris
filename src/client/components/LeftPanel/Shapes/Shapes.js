import React from 'react'
import './Shapes.css'

const colors = {
    0: "#ffffff00",
    1: "#00D9DA",
    2: "#E6E703",
    3: "#9400DE",
    4: "#55E255",
    5: "#DA0000",
    6: "#0000DC",
    7: "#E99B03"
}



function Shapes({ shapes }) {
    return (
        <div className="Shapes" style={{width: shapes.length * 15, height: shapes.length * 15}}>
            {shapes.map((shape) => {
                let line = []
                shape.forEach(cube => {
                    line.push(<cube style={{backgroundColor: colors[cube]}}/>)
                });
                return (line)
            })}
        </div>
    );
}

export default Shapes
