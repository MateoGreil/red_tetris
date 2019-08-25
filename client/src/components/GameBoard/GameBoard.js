import React from 'react'
import PropTypes from 'prop-types'
import Row from './Rows/Row'
import './GameBoard.css'
import { Options } from '../../actions/manageGame'

const {
  RIGHT_TRANSLATION,
  LEFT_TRANSLATION,
  DOWN_TRANSLATION,
  BOTTOM_TRANSLATION,
  CLOCKWORK_ROTATION,
  COUNTER_CLOCKWORK_ROTATION,

  START
} = Options



function GameBoard({ board, manageGame, gameManager, gameOver }) {
  /*
  **  handleKeyPress est la fonction qui permettra de decider en fonction de l'evenement, le
  **  mouvement a produire.
  */
  var handleKeyPress = (event) => {
    if(event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D')
      manageGame(RIGHT_TRANSLATION)
    else if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A')
      manageGame(LEFT_TRANSLATION)
    else if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S')
      manageGame(DOWN_TRANSLATION)
    else if (event.key === ' ')
      manageGame(BOTTOM_TRANSLATION)
    else if (event.key === 'c' || event.key === 'C' || event.key === 'e' || event.key === 'E')
      manageGame(CLOCKWORK_ROTATION)
    else if (event.key === 'ArrowUp' || event.key === 'x' || event.key === 'X' || event.key === 'q' || event.key === 'Q')
      manageGame(COUNTER_CLOCKWORK_ROTATION)
    else if ((event.key === 'r' || event.key === 'R') && gameManager.username == gameManager.players[0].name) {
      manageGame(START)
    }
  };


  /*
  **  useEffect est une fonction qui sera appelé par React a chaque fois que les states données
  **  en second parametres sont modifiés. Ici, je n'en ai pas mis, donc la fonction sera appelé
  **  une seule et unique fois : a la creation du component.
  */

  React.useEffect(() => {

      /*
      **  setInterval permet de répéter des actions tous les intervalles de temps donnés en
      **  second paramètre.
      */

      let interval = null;
      interval = setInterval(() => {
        manageGame(DOWN_TRANSLATION)
      }, 300);


      /*
      **  addEventListener, fonction js qui permet d'appliqué une fonction donné (en second parametre),
      **  a toutes les repetitions de l'evenement donné (en premier paremetre).
      */

      document.addEventListener('keydown', handleKeyPress);

      return () => clearInterval(interval);
  }, []);

  /*
  **  return retourne l'affichage.
  */

  if (gameOver && gameOver===true) {
    return(
        <div className="GameBoard">
          <div className="alert">GAME OVER ! </div>
        {
                  board.map((row, i) => <Row row={row} key={i} size={'calc((100vh - 8px) / 20)'}/>)
        }
      </div>
     )
  }
  else{
    return (
      <div className="GameBoard">
        {
          /*
          **  map est un fonction d'iteration : permet de retourner tous les elements d'une chaine.
          **  ici, en precisant qu'on lui appliquera une transformation.
          **  map retourne (row, i), et j'applique a cela la fonction fleché, donc retourne finalement
          **  un <Row/>. C'est la facon propre de faire ce que j'ai fait tres salement dans Row.js.
          */

          board.map((row, i) => <Row row={row} key={i} size={'calc((100vh - 8px) / 20)'}/>)
        }
      </div>
    )

  }
}


/*
**  permet de definir quelle type de props je retrouverai dans ce component. Je crois que ce n'est pas
**  obligatoire, mais c'est certainement plus propre.
*/

GameBoard.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
}

export default GameBoard
