const Player = require('./Player.js');
const Game = require('./Game.js');
var http = require('http');
var server = http.createServer();
var io = require('socket.io').listen(server);

var games = [];

//connexion au client
io.sockets.on('connection', function(client) {
  //console.log('connection: ', client)
  console.log(client.handshake.query.username + ' is connected to game ' + client.handshake.query.gameName)
  var player = new Player(client.handshake.query.username, client.handshake.query.gameName, client);
  
  if (!games[player.gameName]) {
    games[player.gameName] = new Game(player);
    console.log("Game " + player.gameName + " is created.");
  } else {
    games[player.gameName].addPlayer(player);
  }

  client.on('disconnect', () => {
    games[player.gameName].rmPlayer(player);
    console.log("Player " + player.name + " is disconnected from " + player.gameName);
    if (games[player.gameName].players.length == 0) {
      games[player.gameName] = null;
      console.log("Game " + player.gameName + " is removed.");
    }
  });

});

server.listen(8000);
