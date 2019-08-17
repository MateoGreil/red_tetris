import React from 'react';

function ListGame({ games }) {
  console.log(games)
  if (games) {
    return (
      <div>
         <ul>
          {
            games.map((game, i) => <li>{game.name}</li>)
          }
        </ul> 
      </div>
    );
  }
  return (
    <h1>
      pqs de gqme
    </h1>
  )
}


export default ListGame;
