import React, {useState} from 'react';
import './App.css'

import GameBoardContainer from '../../containers/GameBoardContainer'
import LeftPanelContainer from '../../containers/LeftPanelContainer';
import RightPanelContainer from '../../containers/RightPanelContainer';



function MainMenu() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')

  function Submit() {
    if (room != '' && username != '')
      document.location.href = '#' + room + '[' + username + ']'
  }

  return (
    <div className='MainMenu'>
      <form onSubmit={Submit} className='Form'>
        <label>
          username :
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          room :
          <input type="text" value={room} onChange={e => setRoom(e.target.value)} />
        </label>
        <div>
          <input type="submit" value="submit"/>
        </div>
      </form>
    </div>
  )
}

function App({ error }) {
  
  if (error) {
    if (error.nb)
    return (<div>{ error.text }</div>)
  else if (error.nb === 0)
    return (<MainMenu/>)
  }
  
  return (
    <div className="App">
      <LeftPanelContainer/>
      <GameBoardContainer/>
      <RightPanelContainer/>
    </div>
  );
}

export default App;
