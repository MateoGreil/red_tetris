import React from 'react';
import './App.css'

import GameBoardContainer from './containers/GameBoardContainer'
import LeftPanelContainer from './containers/LeftPanelContainer';

function App() {
  return (
    <div className="App">
      <LeftPanelContainer/>
      <GameBoardContainer/>
      {/* <RightPanel/> */}
    </div>
  );
}

export default App;
