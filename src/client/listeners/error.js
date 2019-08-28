const {
  GAME_BUSY
} = require('../../common/eventSocket')
const errors = require('../../common/errors')

export default function catchError(socket, getState, username, gameName) {
    socket.on(GAME_BUSY, () => {
    getState().manageGame.error = errors.GAME_BUSY
	})

	if (!username || !gameName) {
		getState().manageGame.error = errors.INVALID_ENTRY
	}
}