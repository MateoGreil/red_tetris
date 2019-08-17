import React from 'react';
import './App.css'

import GameBoardContainer from './containers/GameBoardContainer'
import Popup from './components/Popup/Popup'
import { username, gameName } from './socketListener'



function App() {
  if (username == null || gameName == null)
    return (<div>Please, select an username and a room name with the hash '#roomName[username]'</div>)
  return (
    <div className="App">
      <GameBoardContainer/>
    </div>
  );
}

export default App;
