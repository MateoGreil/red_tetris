const Player = require('./Player.js');
const Game = require('./Game.js');
const Piece = require('./Piece')
var http = require('http');
var server = http.createServer();
var io = require('socket.io').listen(server);

var games = [];


function connect(client) {
  console.log(client.handshake.query.username + ' is connected to game ' + client.handshake.query.gameName)

  var indexGame = games.findIndex((game) => game.name == client.handshake.query.gameName)

  var player = new Player(client.handshake.query.username, indexGame ? indexGame : games.length, client);

  if (indexGame == -1) {
    games[games.length] = new Game(player, client.handshake.query.gameName);
  } else {
    games[indexGame].addPlayer(player);
  }
  return player
}

function disconnect(player) {
  games[player.indexGame].rmPlayer(player);
  console.log("Player " + player.name + " is disconnected from " + player.gameIndex);
  if (!games[player.gameIndex]) {
    games.splice(player.indexGame, 1);
    console.log("Game " + player.gameName + " is removed.");
  }
}

//connexion au client
io.sockets.on('connection', function(client) {
  //valid username and gameName
  if (client.handshake.query.username != 'null' && client.handshake.query.gameName != 'null') {
    let player = connect(client)  

    client.on('disconnect', () => {
      client.leave(player.gameName)
      disconnect(player)
    });

    client.on('start', () => {
      console.log('start')
      let piece = new Piece
      client.emit('newPiece', piece)
      console.log(piece)
      //games[player.gameName].sendPiece(io)
    })
  } else {  // invalid username and gameName
    console.log("Joueur inconnu s'est connecté au menu")
    client.emit('games', games)
  }

});

server.listen(8000);
