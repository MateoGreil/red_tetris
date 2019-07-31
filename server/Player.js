class Player {

    constructor(username, gameName, client) {
        this.name = username;
        this.gameName = gameName;
        client.join(this.gameName);
    }
}

module.exports = Player;