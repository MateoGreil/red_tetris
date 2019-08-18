import io from 'socket.io-client';
import { MANAGE_GAME, Options } from '../actions/manageGame'
import { username, gameName, socket } from '../listeners/socketListener'

const { START, ASK_FOR_NEW_PIECE } = Options

function start(state) {
  console.log('emitting start')
  state.socket.emit('start')
  return {...state, start: true}
}

/*
**  manageGame est mon reducer, c'est ce dernier qui sera appelé par la fonction dispatch.
**  "state = ..." permet d'initialiser les states s'ils ne le sont pas.
*/

export default function manageGame(state = {
  username: username,
  gameName: gameName,
  socket: socket,
  error: null,
  start: false
}, action) {
  switch (action.type) {
    case MANAGE_GAME:
      switch(action.option) {
        case START:
          if (!state.start)
            return start(state);
          return {...state}
        default:
          return {...state}
    }
    default:
      return {...state}
  }
}
