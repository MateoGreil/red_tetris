const Player = require('./Player.js');
const Game = require('./Game.js');
var http = require('http');
var server = http.createServer();
var io = require('socket.io').listen(server);

var games = [];

function usernameFrom(referer) {
  var username = referer.split('/')[3].split('[')[1].split(']')[0];
  return username;
}

function roomFrom(referer) {
  var room = referer.split('/')[3].split('[')[0];
  return room;
}

//connexion au client
io.sockets.on('connection', function(client) {

  var player = new Player(usernameFrom(client.request.headers.referer), roomFrom(client.request.headers.referer), client);
  
  if (!games[player.gameName]) {
    games[player.gameName] = new Game(player);
    console.log("Game " + player.gameName + " is created.");
  } else {
    games[player.gameName].addPlayer(player);
  }

  console.log("User " + player.name + "(" + player.id + ") is connected to : ");
  console.log("Game " + games[player.gameName].name + " with " + games[player.gameName].players.length + " player(s). " + games[player.gameName].p1.name + " is P1.");
  
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
