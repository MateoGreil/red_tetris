import io from 'socket.io-client';
import { MAIN_MENU, Options } from '../actions/mainMenu'

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

export default function mainMenu(state = {
  games: null
}, action) {
  switch (action.type) {
    case MAIN_MENU:
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
