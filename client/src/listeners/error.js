export default function catchError(socket, getState, username, gameName) {
    socket.on('gameIsBusy', () => {
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