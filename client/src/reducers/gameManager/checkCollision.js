export default function checkCollision(tetrimino, array) {
  let check = 0
  let gameover = false

  /*
  **  pour chaque partie de la piece, va verifier si sa nouvelle position est deja prise par quelque chose
  **  (donc si la valeure dans array a cette nouvelle position est bien egal a 0). De plus, va verifier si
  **  cette nouvelle position est bien dans le plateau de jeu (x >= 0 && x < 10 && y >= 0 && y < 20).
  */

  tetrimino.piece.forEach((rowPiece, i) => {
    rowPiece.forEach((square, j) => {
      // console.log("pos = ", tetrimino.position.y, "height =", tetrimino.height)
      if (tetrimino.position.y + tetrimino.height < 0)
        gameover = true
      if (square && (tetrimino.position.y + i >= 20 || tetrimino.position.x + j >= 10 || tetrimino.position.x + j < 0 || (tetrimino.position.y + i >= 0 && array[tetrimino.position.y + i][tetrimino.position.x + j]))) {
        check = 1
      }
    });
  });
  // console.log(check, gameover, tetrimino.position.y, tetrimino.name)
  return (gameover && check ? 2 : check);
}
