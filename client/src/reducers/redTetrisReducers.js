import { combineReducers } from 'redux'
import move from './move.js'
import manageGame from './manageGame'
import rotation from './rotation'


/*
**  combineReducers permet simplement de combiner pleins de reducers ensemble,
**  ici c'est inutile, je n'en ai qu'un. Mais c'est parce que je sais tres bien qu'il
**  y en aura bientot d'autres. Il suffira d'ajouter ici le nom de ton reducer.
*/

const redTetrisReducers = combineReducers({
  move,
  manageGame,
  rotation
})

export default redTetrisReducers