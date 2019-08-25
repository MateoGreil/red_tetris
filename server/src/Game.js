Piece = require('./Piece')

class Game {

    constructor(p1) {
        this.name = p1.gameName
        this.players = [p1]
        this.playing = false
    }

    addPlayer(player) {
        this.players.push(player);
        player.id = this.players.length - 1;
    }

    rmPlayer(player) {
        this.players.splice(player.id, 1);
    }

    start(io) {
      this.playing = true
      this.sendNewPiece(io)
    }

    sendNewPiece(io) {
        io.to(this.name).emit('newPiece', {piece: new Piece})
        io.to(this.name).emit('newPiece', {piece: new Piece})
    }
}

module.exports = Game;
