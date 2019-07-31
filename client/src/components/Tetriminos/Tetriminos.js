import React from 'react'

export const colors = {
    white: "#ffffff",
    lightBlue: "#00D9DA",
    yellow: "#E6E703",
    purple: "#9400DE",
    green: "#55E255",
    red: "#DA0000",
    darkBlue: "#0000DC",
    orange: "#E99B03"
}

export const tetriminos = {
    0 : {
        name: "X",
        color: colors.white,
        piece: [],
        position : {
          x: 3,
          y: 0
        }
    },
    1 : {
        name: "I",
        color: colors.lightBlue,
        piece: [
            [1, 1, 1, 1]
        ],
        position: {
            x: 3,
            y: 0
        }
    },
    2 : {
        name: "O",
        color: colors.yellow,
        piece: [
            [2, 2],
            [2, 2]
        ],
        position: {
            x: 3,
            y: 0
        }
    },
    3 : {
        name: "T",
        color: colors.purple,
        piece: [
            [0, 3, 0]
            [3, 3, 3]
        ],
        position: {
            x: 3,
            y: 0
        }
    },
    4 : {
        name: "S",
        color: colors.green,
        piece: [
            [0, 4, 4],
            [4, 4, 0]
        ],
        position: {
            x: 3,
            y: 0
        }
    },
    5 : {
        name: "Z",
        color: colors.red,
        piece: [
            [5, 5, 0],
            [0, 5, 5]
        ],
        position: {
            x: 3,
            y: 0
        }
    },
    6 : {
        name: "J",
        color: colors.darkBlue,
        piece: [
            [6, 0, 0],
            [6, 6, 6]
        ],
        position: {
            x: 3,
            y: 0
        }
    },
    7 : {
        name: "L",
        color: colors.orange,
        piece: [
            [0, 0, 7],
            [7, 7, 7]
        ],
        position: {
            x: 3,
            y: 0
        }
    }
}

export default tetriminos;