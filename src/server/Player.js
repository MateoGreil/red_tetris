
const GRID = require('../common/game')

class Player {

    constructor(username, gameName, client) {
        this.name = username;
        this.gameName = gameName;
        client.join(this.gameName);
        this.array = GRID
        this.score = 0
        this.gameOver = false
    }
}

module.exports = Player