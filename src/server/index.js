const Player = require('./Player.js');
const Game = require('./Game.js');
const Piece = require('./Piece')
var http = require('http');
var server = http.createServer();
var io = require('socket.io').listen(server);
const {
  CONNECTION,
  DISCONNECT,

  START,
  RESTART,
  GAMEOVER,
  GAME_BUSY,

  PLAYERS,

  NEW_PIECE,
  ADD_ROW,
  ARRAY,
  SCORE
} = require('../common/eventSocket')

var games = [];

function connect(client) {
  if (client.handshake.query.username == 'null' || client.handshake.query.gameName == 'null')
    return null
  console.log(client.handshake.query.username + ' is connected to game ' + client.handshake.query.gameName)
  var player = new Player(client.handshake.query.username, client.handshake.query.gameName, client);

  if (!games[player.gameName]) {
    games[player.gameName] = new Game(player);
    client
    console.log("Game " + player.gameName + " is created.");
  } else if (!games[player.gameName].playing || games[player.gameName].isDone()) {
    games[player.gameName].addPlayer(player);
  } else {
    client.emit(GAME_BUSY)
    console.log('gameIsBusy for ' + player.name + ' in ' + player.gameName)
    return null
  }
  io.to(player.gameName).emit(PLAYERS, games[player.gameName].players)
  return player
}

function disconnect(player) {
  games[player.gameName].rmPlayer(player);
  console.log("Player " + player.name + " is disconnected from " + player.gameName);
  if (games[player.gameName].players.length == 0) {
    games[player.gameName] = null;
    console.log("Game " + player.gameName + " is removed.");
  } else {
    io.to(player.gameName).emit(PLAYERS, games[player.gameName].players)
  }
}

function arraySpectrum(array) {
  for (let i = 0; i < array[0].length; i++) {
    let isGrey = false
    for (let j = 0; j < array.length; j++) {
      if (isGrey)
        array[j][i] = 8
      else if (array[j][i]) {
        isGrey = true
        array[j][i] = 8
      }
    }
  }
  return array
}

//connexion au client
io.sockets.on(CONNECTION, function(client) {
  //console.log('connection: ', client)
  let player = connect(client)
  if (player) {
    client.on(DISCONNECT, () => {
      client.leave(player.gameName)
      disconnect(player)
    });

    client.on(START, () => {
      games[player.gameName].start(io)
    })

    client.on(NEW_PIECE, () => {
      games[player.gameName].sendNewPiece(io)
    })

    client.on(ADD_ROW, (nbOfRowToAdd) => {
      client.broadcast.to(player.gameName).emit(ADD_ROW, nbOfRowToAdd)
    })

    client.on(GAMEOVER, () => {
      player.gameOver = true
      io.to(player.gameName).emit(PLAYERS, games[player.gameName].players)
    })

    client.on(ARRAY, array => {
      player.array = arraySpectrum(array)
      io.to(player.gameName).emit(PLAYERS, games[player.gameName].players)
    })

    client.on(SCORE, score => {
      player.score = score
      console.log(games[player.gameName].players)
      io.to(player.gameName).emit(PLAYERS, games[player.gameName].players)
    })
  }

});

server.listen(8000);
