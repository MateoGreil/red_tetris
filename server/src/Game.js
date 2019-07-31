class Game {

    constructor(p1) {
        this.name = p1.gameName;
        this.p1 = p1;
        this.players = [p1];
        p1.id = 0;
    }

    addPlayer(player) {
        this.players.push(player);
        player.id = this.players.length - 1;
    }

    rmPlayer(player) {
        this.players.splice(player.id, 1);
        if (this.p1 === player && this.players.length) {
            this.p1 = this.players[0];
            console.log("Player 1 (" + player.name + ") is disonnected, new Player 1 is " + this.players[0].name);
        }
    }

    startGame() {
       
    }
}

module.exports = Game;