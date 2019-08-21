import io from 'socket.io-client'
import catchError from './error'

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

	socket.on('newPiece', data => {
		getState().manageGame.tetriminos.push(data.piece)
	});

	socket.on('PlayerNb', data => {
		getState().manageGame.players = data.PlayerNumber
	});

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
