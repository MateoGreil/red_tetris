
import { GAME_MANAGER, Options } from '../../actions/manageGame'
import {
  translateRight,
  translateLeft,
  translateDown,
  translateBottom
} from './translation'
import {
  rotateRight,
  rotateLeft
} from './rotation'
import {
  username,
  gameName,
  socket
} from '../../listeners/socketListener'
import { addRow } from './manageLines'

const {
  RIGHT_TRANSLATION,
  LEFT_TRANSLATION,
  DOWN_TRANSLATION,
  BOTTOM_TRANSLATION,
  CLOCKWORK_ROTATION,
  COUNTER_CLOCKWORK_ROTATION,

  START,
  ADD_ROW
} = Options
const eventSocket = require('../../../common/eventSocket')
const GRID = require('../../../common/game')

/*
**  move est mon reducer, c'est ce dernier qui sera appelé par la fonction dispatch.
**  "state = {...}"" permet d'initialiser les states s'ils ne le sont pas.
*/

export const initialState = {
  tetriminos: [],
  array: GRID,
  provisionalArray: GRID,
  username: username,
  gameName: gameName,
  players: [{name: username, array: []}],
  socket: socket,
  error: null,
  start: false,
  gameOver: false,
  score : 0,
  date: 0,
  timer: 0
}

function start(state) {
  state.socket.emit(eventSocket.START)
  return {...state, start: true}
}

function startTimer(state, date){
  let newDate = new Date
  let newHour = newDate.getHours()
  let newMinutes = newDate.getMinutes()
  let newSecs = newDate.getSeconds()
  
  
  let diff = [newHour - date[1], newMinutes - date[2], newSecs - date[3]]    
  let inSec = diff[0] * 3600 + diff[1] * 60 + diff [2]
  let min = Math.floor(inSec/60)+"";
    while (min.length < 2) min = "0" + min;
  let sec = inSec%60+"";
    while (sec.length < 2) sec = "0" + sec;
  let timer = [min," : ",sec]
  return(timer)
}

export default function manageGame(state = initialState, action) {
  if (state.tetriminos[0] && state.gameOver === false) {
    if (state.date)
      state.timer = startTimer(state, state.date)
    switch (action.type) {
      case GAME_MANAGER:
        switch(action.option) {
          case RIGHT_TRANSLATION:
            return translateRight(state);
          case LEFT_TRANSLATION:
            return translateLeft(state);
          case DOWN_TRANSLATION:
            return translateDown(state);
          case BOTTOM_TRANSLATION:
            return translateBottom(state);
          case CLOCKWORK_ROTATION:
            return rotateRight(state);
          case COUNTER_CLOCKWORK_ROTATION:
            return rotateLeft(state)
          case ADD_ROW:
            return addRow(state)
          default:
            return {...state}
      }
      default:
        return {...state}
    }
  } else if (action.type == GAME_MANAGER && action.option == START) {
    return start(state);
  }
  return {...state}
}
