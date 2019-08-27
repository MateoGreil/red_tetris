import React, {useState} from 'react';
import './App.css'

import GameBoardContainer from '../../containers/GameBoardContainer'
import LeftPanelContainer from '../../containers/LeftPanelContainer';
import RightPanelContainer from '../../containers/RightPanelContainer';
import pelican from '../../img/pelican.png'



function MainMenu() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')

  function Submit() {
    if (room != '' && username != '')
      document.location.href = '#' + room + '[' + username + ']'
      document.location.reload()
  }

  return (
    <div className='MainMenu'>
      <div className='Red'>Red</div>
      <div className='glow'>Tetris</div>
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
    return (
    <div>
      <img src={pelican} className="Animation"/>
      <div className="App">
        <MainMenu/>
      </div>
    </div>)
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
