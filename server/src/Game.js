Piece = require('./Piece')

class Game {

    constructor(p1) {
        this.name = p1.gameName
        this.p1 = p1
        this.players = [p1]
        p1.id = 0
        this.playing = false
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

    start(io) {
      /*let piece = new Piece
      io.to(this.gameName).emit('newPiece', {piece: piece.shape})
      console.log('sending piece')
      console.log(piece.shape)*/
      console.log('starting game ' + this.name)
      this.playing = true
      this.sendNewPiece(io)
    }

    sendNewPiece(io) {
        console.log("sending new piece to " + this.name)
        io.to(this.name).emit('newPiece', {piece: new Piece})
        io.to(this.name).emit('newPiece', {piece: new Piece})
    }
}

module.exports = Game;
