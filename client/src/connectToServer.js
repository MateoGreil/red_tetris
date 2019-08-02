import io from 'socket.io-client';
 
const SERVER_ADDRESS = 'localhost:8000',
      CONNECT_TO_GAME = 'connectToGame'

function catchNamesFrom(hash) {
  var username = hash.split('[')[1].split(']')[0]
  var gameName = hash.split('#')[1].split('[')[0]

  return {username, gameName}
}

export default function connectToServer(store, hash) {
  let {username, gameName} = catchNamesFrom(hash)

  const socket = io.connect(SERVER_ADDRESS, {query: {
    username: username,
    gameName: gameName
  }})

  console.log("username: " + username + ", game name: " + gameName);

  

  /*socket.on('message', message => {
    store.dispatch(actions.addResponse(message));
  });*/
}

