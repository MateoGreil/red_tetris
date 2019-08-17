const Player = require('./Player.js');
const Game = require('./Game.js');
const Piece = require('./Piece')
var http = require('http');
var server = http.createServer();
var io = require('socket.io').listen(server);

var games = [];

function connect(client) {
  console.log(client.handshake.query.username + ' is connected to game ' + client.handshake.query.gameName)
  var player = new Player(client.handshake.query.username, client.handshake.query.gameName, client);

  if (!games[player.gameName]) {
    games[player.gameName] = new Game(player);
    console.log("Game " + player.gameName + " is created.");
  } else {
    games[player.gameName].addPlayer(player);
  }
  return player
}

function disconnect(player) {
  games[player.gameName].rmPlayer(player);
  console.log("Player " + player.name + " is disconnected from " + player.gameName);
  if (games[player.gameName].players.length == 0) {
    games[player.gameName] = null;
    console.log("Game " + player.gameName + " is removed.");
  }
}

//connexion au client
io.sockets.on('connection', function(client) {
  //console.log('connection: ', client)
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

});

server.listen(8000);
