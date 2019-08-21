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
        let piece = new Piece
        io.to(this.name).emit('newPiece', {piece: piece})
    }
}

module.exports = Game;