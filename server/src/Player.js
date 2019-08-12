class Player {

    constructor(username, indexGame, client) {
        this.name = username;
        this.indexGame = indexGame;
        client.join(this.gameName);
    }
}

module.exports = Player;