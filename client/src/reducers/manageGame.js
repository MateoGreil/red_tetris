import io from 'socket.io-client';
import { MANAGE_GAME, Options } from '../actions/manageGame'
import { username, gameName, socket } from '../socketListener'

const { START } = Options

function start(state) {
  console.log('emitting start')
  state.socket.emit('start')
  return {...state}
}

/*
**  manageGame est mon reducer, c'est ce dernier qui sera appelé par la fonction dispatch.
**  "state = ..." permet d'initialiser les states s'ils ne le sont pas.
*/

export default function manageGame(state = {
  username: username,
  gameName: gameName,
  socket: socket
}, action) {
  switch (action.type) {
    case MANAGE_GAME:
      switch(action.option) {
        case START:
          return start(state);
        default:
          return {...state}
    }
    default:
      return {...state}
  }
}
