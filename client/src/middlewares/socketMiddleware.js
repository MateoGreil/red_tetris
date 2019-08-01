import io from 'socket.io-client';

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

const redTetrisMiddleware = store => next => action => {
    switch (action.type) {
        case MOVE:
            const tetrimino = store.tetrimino
            const array = store.array
            switch(action.direction) {
                case RIGHT:
                    if (checkCollision(tetrimino, array, {x: 1, y: 0}))
                        next(action)
                case LEFT:
                    if (checkCollision(tetrimino, array, {x: -1, y: 0}))
                        next(action)
                case DOWN:
                    if (checkCollision(tetrimino, array, {x: 0, y: 1}))
                        next(action)
                default:
                    next(action)
        }
        default:
            next(action)
      }
}

export default redTetrisMiddleware