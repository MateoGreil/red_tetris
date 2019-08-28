const {
  CONNECTION,
  DISCONNECT,

  START,
  RESTART,
  GAMEOVER,
  GAME_BUSY,

  PLAYERS,

  NEW_PIECE,
  ADD_ROW,
  ARRAY,
  SCORE
} = require('../../common/eventSocket')

export default function catchError(socket, getState, username, gameName) {
    socket.on(GAME_BUSY, () => {
    getState().manageGame.error = {
      text: "ERROR: game is busy",
      nb: 1
    }
	})

	if (!username || !gameName) {
		getState().manageGame.error = {
      text: "ERROR: username or room name is invalid or incomplete.",
      nb: 0
    }
	}
}