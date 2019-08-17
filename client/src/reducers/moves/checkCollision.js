export default function checkCollision(tetrimino, array) {
  var check = false

  /*
  **  pour chaque partie de la piece, va verifier si sa nouvelle position est deja prise par quelque chose
  **  (donc si la valeure dans array a cette nouvelle position est bien egal a 0). De plus, va verifier si
  **  cette nouvelle position est bien dans le plateau de jeu (x >= 0 && x < 10 && y >= 0 && y < 20).
  */

  tetrimino.piece.map((rowPiece, i) => {
      rowPiece.map((square, j) => {
          if (square && (tetrimino.position.y + i >= 20 || tetrimino.position.x + j >= 10 || tetrimino.position.x + j < 0 || (tetrimino.position.y + i >= 0 && array[tetrimino.position.y + i][tetrimino.position.x + j]))) {
              check = true
          }
      });
  });
  return check;
}
  