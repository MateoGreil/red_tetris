import { combineReducers } from 'redux'
import move from './move.js'

const redTetrisReducers = combineReducers({
  move
})

export default redTetrisReducers