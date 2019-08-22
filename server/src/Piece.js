const colors = {
  white: "#ffffff",
  lightBlue: "#00D9DA",
  yellow: "#E6E703",
  purple: "#9400DE",
  green: "#55E255",
  red: "#DA0000",
  darkBlue: "#0000DC",
  orange: "#E99B03"
}

const tetriminos = {
  0 : {
    name: "X",
    color: colors.white,
    piece: [],
    position : {
      x: 3,
      y: 0
    },
    height: -1
  },
  1 : {
      name: "I",
      color: colors.lightBlue,
      piece: [
          [0, 0, 0, 0],
          [1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
      ],
      position: {
          x: 3,
          y: -4
      },
      height: 0
  },
  2 : {
      name: "O",
      color: colors.yellow,
      piece: [
          [2, 2],
          [2, 2]
      ],
      position: {
          x: 4,
          y: -2
      },
      height: -1
  },
  3 : {
      name: "T",
      color: colors.purple,
      piece: [
          [0, 3, 0],
          [3, 3, 3],
          [0, 0, 0]
      ],
      position: {
          x: 3,
          y: -3
      },
      height: -1
  },
  4 : {
      name: "S",
      color: colors.green,
      piece: [
          [0, 4, 4],
          [4, 4, 0],
          [0, 0, 0]

      ],
      position: {
          x: 3,
          y: -3
      },
      height: -1
  },
  5 : {
      name: "Z",
      color: colors.red,
      piece: [
          [5, 5, 0],
          [0, 5, 5],
          [0, 0, 0]
      ],
      position: {
          x: 3,
          y: -3
      },
      height: -1
  },
  6 : {
      name: "J",
      color: colors.darkBlue,
      piece: [
          [6, 0, 0],
          [6, 6, 6],
          [0, 0, 0]
      ],
      position: {
          x: 3,
          y: -3
      },
      height: -1
  },
  7 : {
      name: "L",
      color: colors.orange,
      piece: [
          [0, 0, 7],
          [7, 7, 7],
          [0, 0, 0]
      ],
      position: {
          x: 3,
          y: -3
      },
      height: -1
  }
}

class Piece {
  constructor() {
    let pieceNb = Math.floor((Math.random() * 7) + 1)
    this.color = tetriminos[pieceNb].color
    this.piece = tetriminos[pieceNb].piece
    this.name = tetriminos[pieceNb].name
    this.position = tetriminos[pieceNb].position
    this.height = tetriminos[pieceNb].height

  }
}

module.exports = Piece
