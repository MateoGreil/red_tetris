
import checkCollision from './checkCollision'
import putPieceInGame from './putPieceInGame'


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

export function rotateRight(state) {
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

export function rotateLeft(state) {
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
  