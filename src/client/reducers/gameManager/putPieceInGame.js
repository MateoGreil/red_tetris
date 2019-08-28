/*
**  putPieceInGame va placer la piece dans la tableau donner en paremetre, et le retourne.
*/

export default function putPieceInGame(rows, tetrimino) {
    if (tetrimino) {
        let y = 0
        while (tetrimino.piece[y] != null) {
            let x = 0
            while (tetrimino.piece[y][x] != null) {
                if (y + tetrimino.position.y >= 0 && tetrimino.piece[y][x] != 0) {
                    rows[y + tetrimino.position.y][x + tetrimino.position.x] = tetrimino.piece[y][x]
                }
                x++
            }
            y++;
        }
    }
    return (rows);
}
