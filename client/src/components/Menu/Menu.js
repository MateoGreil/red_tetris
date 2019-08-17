import React from 'react';
import ListGame from './ListGame'

function Menu({ games }) {
  return (
    <div>
      <ListGame games={games}/>
    </div>
  );
}


export default Menu;
