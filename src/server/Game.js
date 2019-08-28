Piece = require('./Piece')
const {
  CONNECTION,
  DISCONNECT,

  START,
  RESTART,
  GAMEOVER,

  PLAYERS,

  NEW_PIECE,
  ADD_ROW,
  ARRAY,
  SCORE
} = require('../common/eventSocket')

function isGameOver(player) {
  if (player.gameOver)
    return true
  return false
}

function isNotGameOver(player) {
  if (player.gameOver)
    return false
  return true
}

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
      if (!this.players.every(isNotGameOver)) {
        console.log(RESTART)
        this.players.forEach(player => {
          player.gameOver = false
          player.array = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          ]
          player.score = 0
        })
        io.to(this.name).emit(PLAYERS, this.players)
        console.log(this.players)
        io.to(this.name).emit(RESTART)
      }
      io.to(this.name).emit(NEW_PIECE, {piece: new Piece})
      io.to(this.name).emit(NEW_PIECE, {piece: new Piece})
    }

    sendNewPiece(io) {
        io.to(this.name).emit(NEW_PIECE, {piece: new Piece})
    }

    isDone() {
      if (this.players.every(isGameOver))
        return true
      return false
    }
}

module.exports = Game;
