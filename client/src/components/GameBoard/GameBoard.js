import React from 'react'
import PropTypes from 'prop-types'
import Row from '../Rows/Row'
import './GameBoard.css'
import { Direction } from '../../actions/actions'

const { RIGHT, LEFT, DOWN } = Direction

function GameBoard({ board, move }) {
  var handleKeyPress = (event) => {
    if(event.key === 'd')
        move(RIGHT)
    else if (event.key === 'a')
        move(LEFT)
    else if (event.key === 's')
        move(DOWN)
  };

  React.useEffect(() => {
      let interval = null;
      interval = setInterval(() => {
        move(DOWN)
      }, 100);
      document.addEventListener('keydown', handleKeyPress);
      return () => clearInterval(interval);
  }, []);

  return (
    <div className="GameBoard">
      {board.map((row, i) => <Row row={row} key={i}/>)}
    </div>
  )
}
  

GameBoard.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
}

export default GameBoard