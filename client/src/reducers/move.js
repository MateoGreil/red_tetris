
import { MOVE, Direction } from '../actions/actions'
import tetriminos from '../components/Tetriminos/Tetriminos';

const { RIGHT, LEFT, DOWN } = Direction

function checkCollision(tetrimino, array, dir) {
  var check = false
  tetrimino.piece.map((rowPiece, i) => {
      rowPiece.map((square, j) => {
          if (square && (tetrimino.position.y + i + dir.y >= 20 || tetrimino.position.x + j + dir.x >= 10 || tetrimino.position.x + j + dir.x < 0 || array[tetrimino.position.y + i + dir.y][tetrimino.position.x + j + dir.x])) {
              check = true
          }
      });
  });
  return check;
}

function putPieceInGame(rows, tetrimino) {
  if (tetrimino) {
      var i = 0;
      while (tetrimino.piece[i] != null) {
          var j = 0;
          while (tetrimino.piece[i][j] != null) {//ajouter if piece.piece[i][j] != 0
              rows[i + tetrimino.position.y][j + tetrimino.position.x] = tetrimino.piece[i][j];
              j++;
          }
          i++;
      }
  }
  return (rows);
}

function goRight(state) {
  var tetrimino = state.tetrimino
  var array = state.array
  const check = checkCollision(tetrimino, array, {x: 1, y: 0});

  if (!check) {
      tetrimino.position.x++;
      return {tetrimino: tetrimino, array: array, provisionalArray: putPieceInGame(array.map(row => row.map(value => {return value})), tetrimino)};
  }
  return {tetrimino: tetrimino, array: array, provisionalArray: state.provisionalArray, tetrimino};
}

function goLeft(state) {
  var tetrimino = state.tetrimino
  var array = state.array
  const check = checkCollision(tetrimino, array, {x: -1, y: 0});
  if (!check) {
      tetrimino.position.x--;
      return {tetrimino: tetrimino, array: array, provisionalArray: putPieceInGame(array.map(row => row.map(value => {return value})), tetrimino)};
  }
  return {tetrimino: tetrimino, array: array, provisionalArray: state.provisionalArray, tetrimino};
}

function goDown(state) {
  var tetrimino = state.tetrimino
  var array = state.array

  const check = checkCollision(tetrimino, array, {x: 0, y: 1});
  if (!check) {
    tetrimino.position.y++;
    return {tetrimino: tetrimino, array: array, provisionalArray: putPieceInGame(array.map(row => row.map(value => {return value})), tetrimino)};
  }
  tetrimino.position.y = 0;
  tetrimino.position.x = 3;
  return {tetrimino: tetrimino, array: state.provisionalArray.map(row => row.map(value => {return value})), provisionalArray: state.provisionalArray}
}

export default function move(state = {
  tetrimino: tetriminos[1],
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
      switch(action.direction) {
        case RIGHT:
          return goRight(state);
        case LEFT:
          return goLeft(state);
        case DOWN:
          return goDown(state);
        default:
          return state
    }
    default:
      return state
  }
}
