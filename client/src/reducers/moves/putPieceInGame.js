/*
**  putPieceInGame va placer la piece dans la tableau donner en paremetre, et le retourne.
*/

export default function putPieceInGame(rows, tetrimino) {
    if (tetrimino) {
        let i = 0;
        while (tetrimino.piece[i] != null) {
            let j = 0;
            while (tetrimino.piece[i][j] != null) {//ajouter if piece.piece[i][j] != 0
                if (i + tetrimino.position.y >= 0 && tetrimino.piece[i][j] != 0) {
                rows[i + tetrimino.position.y][j + tetrimino.position.x] = tetrimino.piece[i][j];
                }
                j++;
            }
            i++;
        }
    }
    return (rows);
}