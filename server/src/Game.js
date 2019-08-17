Piece = require('./Piece')

class Game {

  constructor(p1, gameName) {
      this.name = gameName
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

  sendPiece(io) {
    let piece = new Piece
    io.to(this.gameName).emit('newPiece', {piece: piece.shape})
    console.log('sending piece')
    console.log(piece.shape)
  }
}

module.exports = Game;