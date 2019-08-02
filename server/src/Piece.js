const tetriminos = {
  1:  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  2:  [
    [2, 2],
    [2, 2]
  ],
  3:  [
    [0, 3, 0],
    [3, 3, 3],
    [0, 0, 0]
  ],
  4:  [
    [0, 4, 4],
    [4, 4, 0],
    [0, 0, 0]

  ],
  5:  [
    [5, 5, 0],
    [0, 5, 5],
    [0, 0, 0]
  ],
  6:  [
    [6, 0, 0],
    [6, 6, 6],
    [0, 0, 0]
  ],
  7:  [
    [0, 0, 7],
    [7, 7, 7],
    [0, 0, 0]
  ]
}

class Piece {    
  constructor() {
    let pieceNb = Math.floor((Math.random() * 8) + 1)
    let shape = tetriminos[pieceNb]
    console.log("new piece = ")
    console.log(shape)
  }
}

module.exports = Piece