
import checkCollision from './checkCollision'
import putPieceInGame from './putPieceInGame'
import reorganizeLines  from './manageLines'
import deleteLines  from './manageLines'
import {socket} from '../../listeners/socketListener'
const {
  CONNECTION,
  DISCONNECT,

  START,
  RESTART,
  GAMEOVER,

  NEW_PIECE,
  ADD_ROW,
  ARRAY,
  SCORE
} = require('../../../common/eventSocket')

/*
**  fonction deplacement de la piece vers la droite
*/

export function translateRight(state) {
    let tetrimino = state.tetriminos[0]
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

export function translateLeft(state) {
    var tetrimino = state.tetriminos[0]
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

export function translateDown(state) {
    var tetrimino = state.tetriminos[0]

    tetrimino.position.y++;
    const check = checkCollision(tetrimino, state.array);
    //  s'il n'y a pas de collision, alors retourne le nouveau state.
    if (!check) {
        return {...state, provisionalArray: putPieceInGame(state.array.map(row => row.map(value => {return value})), tetrimino)};
    }
    else if (check === 2){
        socket.emit(GAMEOVER, {})
        state.gameOver = true
    }
    else{
      state.score += 5
    }

    /*
    **  sinon, ça veut dire que la piece ne pourra plus descendre. On retourne donc notre state a jour :
    **  array, qui contient toutes les pieces qui sont immobiles et placer, prend la valeur de provisionalArray
    **  puisque provisionalArray contient la piece en mouvement, mais cette derniere etant au maximum en bas qu'
    **  elle puisse, elle se retrouve donc immobile, figer a jamais dans l'array :)
    */
   let [provisionalArray, score] = deleteLines(state.provisionalArray, socket, state.score);
    state.score = score
    socket.emit(SCORE, score)
    state.tetriminos.shift()
    if (state.tetriminos.length <= 1) {
        socket.emit(NEW_PIECE, {})
    }
    socket.emit(ARRAY, provisionalArray)
    return {...state, array: provisionalArray.map(row => row.map(value => {return value})), provisionalArray: provisionalArray}
}

    export function translateBottom(state) {
        var tetrimino = state.tetriminos[0]

        while (tetrimino == state.tetriminos[0]) {
            state = translateDown(state);
        }

    return {...state, array: state.provisionalArray.map(row => row.map(value => {return value}))}
}
