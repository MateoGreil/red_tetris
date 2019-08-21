export default function catchError(socket, getState, username, gameName) {
    socket.on('gameIsBusy', () => {
		getState().manageGame.error = "ERROR: game is busy"
	})

	if (!username || !gameName) {
		getState().manageGame.error = "ERROR: username or room name is invalid or incomplete."
	}
}