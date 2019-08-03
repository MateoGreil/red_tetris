
import { MOVE, Moves } from '../actions/moves'
import tetriminos from '../components/Tetriminos/Tetriminos';

const { 
  RIGHT_TRANSLATION, 
  LEFT_TRANSLATION,
  DOWN_TRANSLATION,
  CLOCKWORK_ROTATION,
  COUNTER_CLOCKWORK_ROTATION
} = Moves


function checkCollision(tetrimino, array) {
  var check = false

  /*
  **  pour chaque partie de la piece, va verifier si sa nouvelle position est deja prise par quelque chose
  **  (donc si la valeure dans array a cette nouvelle position est bien egal a 0). De plus, va verifier si
  **  cette nouvelle position est bien dans le plateau de jeu (x >= 0 && x < 10 && y >= 0 && y < 20).
  */

  tetrimino.piece.map((rowPiece, i) => {
      rowPiece.map((square, j) => {
          if (square && (tetrimino.position.y + i >= 20 || tetrimino.position.x + j >= 10 || tetrimino.position.x + j < 0 || array[tetrimino.position.y + i][tetrimino.position.x + j])) {
              check = true
          }
      });
  });
  return check;
}

/*
**  putPieceInGame va placer la piece dans la tableau donner en paremetre, et le retourne.
*/

function putPieceInGame(rows, tetrimino) {
  if (tetrimino) {
      let i = 0;
      while (tetrimino.piece[i] != null) {
          let j = 0;
          while (tetrimino.piece[i][j] != null) {//ajouter if piece.piece[i][j] != 0
            if (tetrimino.piece[i][j] != 0) {
              rows[i + tetrimino.position.y][j + tetrimino.position.x] = tetrimino.piece[i][j];
            }
            j++;
          }
          i++;
      }
  }
  return (rows);
}


/*
**  fonction deplacement de la piece vers la droite
*/

function goRight(state) {
  let tetrimino = state.tetrimino
  let array = state.array
  tetrimino.position.x++;
  const check = checkCollision(tetrimino, array);

  //  s'il n'y a pas de collision, alors retourne le nouveau state.
  if (!check) {
      return {...state, tetrimino: tetrimino, array: array, provisionalArray: putPieceInGame(array.map(row => row.map(value => {return value})), tetrimino)};
  }

  tetrimino.position.x--;
  // sinon, retourne le meme state qu'avant, par consequent la piece n'aura pas bouger
  return {...state};
}


/*
**  dans les trois prochaines fonctions, j'utilise des array.map, et pas des array. c'est pour envoyer des copies de ces derniers, sinon
**  les valeurs des arrays seraient modifier dans les fonctions, or ce n'est pas ce que je veux, par exemple dans le premier return ici bas :
**    "return {tetrimino: tetrimino, array: array, provisionalArray: putPieceInGame(array.map(row => row.map(value => {return value})), tetrimino)};"
**  je ne veux pas que array soit modifier, sinon, la piece serait ajouter a chaque deplacement dans l'array principal. Je sais pas si c'est tres clair,
**  mais au pire essaie d'envoyer simplement l'array, tu comprendras vite.
*/

/*
**  fonction deplacement de la piece vers la gauche
*/

function goLeft(state) {
  var tetrimino = state.tetrimino
  var array = state.array
  tetrimino.position.x--;
  const check = checkCollision(tetrimino, array);

  //  s'il n'y a pas de collision, alors retourne le nouveau state.
  if (!check) {
      return {...state, tetrimino: tetrimino, array: array, provisionalArray: putPieceInGame(array.map(row => row.map(value => {return value})), tetrimino)};
  }

  tetrimino.position.x++;
  // sinon, retourne le meme state qu'avant, par consequent la piece n'aura pas bouger
  return {...state};
}


/*
**  fonction deplacement de la piece vers le bas
*/

function goDown(state) {
  var tetrimino = state.tetrimino
  var array = state.array

  tetrimino.position.y++;
  const check = checkCollision(tetrimino, array);

  //  s'il n'y a pas de collision, alors retourne le nouveau state.
  if (!check) {
    return {...state, tetrimino: tetrimino, array: array, provisionalArray: putPieceInGame(array.map(row => row.map(value => {return value})), tetrimino)};
  }

  tetrimino.position.y = 0;
  tetrimino.position.x = 3;
  /*
  **  sinon, ça veut dire que la piece ne pourra plus descendre. On retourne donc notre state a jour :
  **  array, qui contient toutes les pieces qui sont immobiles et placer, prend la valeur de provisionalArray
  **  puisque provisionalArray contient la piece en mouvement, mais cette derniere etant au maximum en bas qu'
  **  elle puisse, elle se retrouve donc immobile, figer a jamais dans l'array :)
  */
  return {...state, tetrimino: tetrimino, array: state.provisionalArray.map(row => row.map(value => {return value})), provisionalArray: state.provisionalArray}
}

/*
**  fonction rotation de la piece vers la droite
*/

function modTetri(tetrimino, rot) {
  if (tetrimino.name === "X") {
    return (tetrimino);
  } 

  let size = tetrimino.piece.length - 1;
  let tempTetri = tetrimino.piece.map(row => {return {...row}});//il faut copier en profondeur les variables

  /* ca sert a r
  for (let i = 0; tempTetri.piece[i]; i++) {
    for (let j = 0; tempTetri.piece[i][j]; j++) {
      tempTetri.piece[i][j] = 0;
    };
  }*/

  if (rot === 1) {
    for (let i = 0; tempTetri[i] != null; i++) {
      for (let j = 0; tempTetri[i][j] != null; j++) {
        tetrimino.piece[i][j] = tempTetri[size - j][i]
      }
    }
  }

  else if (rot === 2) {
    for (let i = 0; tempTetri[i] != null; i++) {
      for (let j = 0; tempTetri[i][j] != null; j++) {
        tetrimino.piece[i][j] = tempTetri[j][size - i];
      }
    }
  }

  console.log(tetrimino.piece)
  return (tetrimino);
}

function turnRight(state) {
  let tetrimino = state.tetrimino;
  let array = state.array;
  tetrimino = modTetri(tetrimino, 1);
  const check = checkCollision(tetrimino, array);

  //  s'il n'y a pas de collision, alors retourne le nouveau state.
  if (!check) {
      return {...state, tetrimino: tetrimino, array: array, provisionalArray: putPieceInGame(array.map(row => row.map(value => {return value})), tetrimino)};
  }

  // sinon, retourne le meme state qu'avant, par consequent la piece n'aura pas bouger
  return {...state};
}


/*
**  dans les trois prochaines fonctions, j'utilise des array.map, et pas des array. c'est pour envoyer des copies de ces derniers, sinon
**  les valeurs des arrays seraient modifier dans les fonctions, or ce n'est pas ce que je veux, par exemple dans le premier return ici bas :
**    "return {tetrimino: tetrimino, array: array, provisionalArray: putPieceInGame(array.map(row => row.map(value => {return value})), tetrimino)};"
**  je ne veux pas que array soit modifier, sinon, la piece serait ajouter a chaque deplacement dans l'array principal. Je sais pas si c'est tres clair,
**  mais au pire essaie d'envoyer simplement l'array, tu comprendras vite.
*/

/*
**  fonction deplacement de la piece vers la gauche
*/

function turnLeft(state) {
  let tetrimino = state.tetrimino;
  let array = state.array;
  tetrimino = modTetri(tetrimino, 2);
  const check = checkCollision(tetrimino, array);

  //  s'il n'y a pas de collision, alors retourne le nouveau state.
  if (!check) {
      return {...state, tetrimino: tetrimino, array: array, provisionalArray: putPieceInGame(array.map(row => row.map(value => {return value})), tetrimino)};
  }

  // sinon, retourne le meme state qu'avant, par consequent la piece n'aura pas bouger
  return {...state};
}

/*
**  move est mon reducer, c'est ce dernier qui sera appelé par la fonction dispatch.
**  "state = {...}"" permet d'initialiser les states s'ils ne le sont pas.
*/

export default function move(state = {
  tetrimino: tetriminos[3],
  array: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  provisionalArray: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
}, action) {

  switch (action.type) {
    case MOVE:
      switch(action.move) {
        case RIGHT_TRANSLATION:
          return goRight(state);
        case LEFT_TRANSLATION:
          return goLeft(state);
        case DOWN_TRANSLATION:
          return goDown(state);
        case CLOCKWORK_ROTATION:
          return turnRight(state);
        case COUNTER_CLOCKWORK_ROTATION:
          return turnLeft(state)
        default:
          return {...state}
    }
    default:
      return {...state}
  }
}
