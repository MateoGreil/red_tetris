import io from 'socket.io-client'
import catchError from './error'
import { manageGame } from '../actions/manageGame';
import { Options } from '../actions/manageGame'
import initialState from '../reducers/gameManager/manageGame'

const {
	ADD_ROW
} = Options
const eventSocket = require('../../common/eventSocket')

const SERVER_ADDRESS = 'localhost:8000'


function catchNamesFrom(hash) {
	var username = null
	var gameName = null
	if (hash.split('[')[1] && hash.split('[')[1].split(']')[0] && hash.split('#')[1] && hash.split('#')[1].split('[')[0]) {
		username = hash.split('[')[1].split(']')[0]
		gameName = hash.split('#')[1].split('[')[0]
	}
	return {username, gameName}
}

export const {
    username,
    gameName
} = catchNamesFrom(document.location.hash)

export const socket = io.connect(SERVER_ADDRESS, {query: {
    username: username,
    gameName: gameName
}})

export default function (dispatch, getState) {

	socket.on(eventSocket.NEW_PIECE, data => {
		getState().manageGame.tetriminos.push(data.piece)
	});

	socket.on(eventSocket.PLAYERS, players => {
		getState().manageGame.players = players
	});

	socket.on(eventSocket.ADD_ROW, data => {
		for (let i = 0; i < data; i++) {
			dispatch(manageGame(ADD_ROW))
		}
  })
  
  socket.on(eventSocket.RESTART, () => {
    getState().manageGame.array = [
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
  ]
    getState().manageGame.tetriminos = []
    getState().manageGame.provisionalArray = [
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
  ]
    getState().manageGame.score = 0
    getState().manageGame.gameOver = false
    getState().manageGame.start = true
    getState().manageGame.date = [new Date().getDate(), new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()]
    console.log(getState().manageGame)
  })

	catchError(socket, getState, username, gameName)
	// socket.on('dispatch', action => {
	// 	/*
	// 	 * If I wanted to send certain events directly through
	// 	 * to the dispatch method without defining specific
	// 	 * listeners for each one, I can use the 'dispatch'
	// 	 * event type to do it
	// 	 */
	// 	 dispatch(action);
	// });

	// socket.on('reconnect', () => {
	// 	/*
	// 	 * Here I need to use an action creator to produce
	// 	 * a Thunk function to dispatch. Additionally, the
	// 	 * dispatch depends on the current state.
	// 	 */
	// 	var state = getState();
	// 	if (state.chat.room && state.chat.username) {
	// 		dispatch(join(state.chat.room, state.chat.username));
	// 	}
	// });
}
