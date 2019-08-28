
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

/*
**  move est mon reducer, c'est ce dernier qui sera appelé par la fonction dispatch.
**  "state = {...}"" permet d'initialiser les states s'ils ne le sont pas.
*/

export const initialState = {
  tetriminos: [],
  array: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  provisionalArray: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  username: username,
  gameName: gameName,
  players: [{name: username, array: []}],
  socket: socket,
  error: null,
  start: false,
  gameOver: false,
  score : 0
}

function start(state) {
  state.socket.emit(eventSocket.START)
  return {...state, start: true}
}

export default function manageGame(state = initialState, action) {
  if (state.tetriminos[0] && state.gameOver === false) {
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
