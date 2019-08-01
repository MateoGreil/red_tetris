import React from 'react'
import PropTypes from 'prop-types'
import Row from '../Rows/Row'
import './GameBoard.css'
import { Direction } from '../../actions/move'

const { RIGHT, LEFT, DOWN } = Direction


function GameBoard({ board, move }) {

  /*
  **  handleKeyPress est la fonction qui permettra de decider en fonction de l'evenement, le
  **  mouvement a produire.
  */

  var handleKeyPress = (event) => {
    if(event.key === 'd')
        move(RIGHT)
    else if (event.key === 'a')
        move(LEFT)
    else if (event.key === 's')
        move(DOWN)
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
        move(DOWN)
      }, 100);


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
  return (
    <div className="GameBoard">
      {
        /*
        **  map est un fonction d'iteration : permet de retourner tous les elements d'une chaine.
        **  ici, en precisant qu'on lui appliquera une transformation.
        **  map retourne (row, i), et j'applique a cela la fonction fleché, donc retourne finalement
        **  un <Row/>
        */

        board.map((row, i) => <Row row={row} key={i}/>)
      }
    </div>
  )
}

  
/*
**  permet de definir quelle type de props je retrouverai dans ce component. Je crois que ce n'est pas
**  obligatoire, mais c'est certainement plus propre.
*/

GameBoard.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
}

export default GameBoard