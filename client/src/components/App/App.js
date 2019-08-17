import React from 'react';
import './App.css'

import GameBoardContainer from '../../containers/GameBoardContainer'

function App({ error }) {
  if (error != null)
    return (<div>{ error }</div>)
  return (
    <div className="App">
      <GameBoardContainer/>
    </div>
  );
}

export default App;
