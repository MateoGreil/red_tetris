
import { MANAGE_GAME, Options } from '../actions/manageGame'

const { START } = Options

function start(state) {
  console.log("STARTING GAME!")
}


/*
**  manageGame est mon reducer, c'est ce dernier qui sera appelé par la fonction dispatch.
**  "state = {...}"" permet d'initialiser les states s'ils ne le sont pas.
*/

export default function manageGame(state, action) {
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
