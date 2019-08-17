import React from 'react';
import './App.css'

import GameBoardContainer from './containers/GameBoardContainer'
import LeftPanelContainer from './containers/LeftPanelContainer';
import RightPanelContainer from './containers/RightPanelContainer';

function App() {
  return (
    <div className="App">
      <LeftPanelContainer/>
      <GameBoardContainer/>
      <RightPanelContainer/>
    </div>
  );
}

export default App;
