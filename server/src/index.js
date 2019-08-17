const Player = require('./Player.js');
const Game = require('./Game.js');
const Piece = require('./Piece')
var http = require('http');
var server = http.createServer();
var io = require('socket.io').listen(server);

var games = [];

function connect(client) {
  if (client.handshake.query.username == 'null' || client.handshake.query.gameName == 'null')
    return null
  console.log(client.handshake.query.username + ' is connected to game ' + client.handshake.query.gameName)
  var player = new Player(client.handshake.query.username, client.handshake.query.gameName, client);

  if (!games[player.gameName]) {
    games[player.gameName] = new Game(player);
    console.log("Game " + player.gameName + " is created.");
  } else if (!games[player.gameName].playing) {
    games[player.gameName].addPlayer(player);
  } else {
    client.emit('gameIsBusy')
    console.log('gameIsBusy for ' + player.name + ' in ' + player.gameName)
    return null
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
  if (player) {
    client.on('disconnect', () => {
      client.leave(player.gameName)
      disconnect(player)
    });
  
    client.on('start', () => {
      games[player.gameName].start(io)
    })
  }

});

server.listen(8000);
