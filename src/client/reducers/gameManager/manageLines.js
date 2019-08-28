/*
** Module to check if the rows are full, delete them if it is the case,
** and then reorganize the array.
*/

function checkRow(row) {
  for (var i = 0; i < row.length; i++) {
    if (!row[i] || row[i] == 8)
      return false
  }
  return true
}

function checkLines(array){
  let rowsToDelete = []
  array.forEach((row, rowNb) => {
    if (checkRow(row))
      rowsToDelete.push(rowNb)
  });

  return (rowsToDelete);
}

function copyRow(array, from, to) {
  array[to].forEach((element, i) => {
    array[to][i] = array[from][i]
  })
  return array
}

function replaceRow(array, rowNb, newNb) {
  array[rowNb].forEach((element, i) => {
    array[rowNb][i] = newNb
  })
  return array
}

function changeScore(score, lines) {
  let toAdd = 0;
  if (lines > 1) {
    toAdd = 100 * 1.5 * lines;
  }
  else if (lines === 1)
    toAdd = 100;
  score += toAdd;
  return (score);
}

export default function deleteLines(array, socket, score) {
    let rowsToDelete = checkLines(array);
    let newscore = changeScore(score, rowsToDelete.length)
    if (rowsToDelete.length > 1) {
      socket.emit('addRowToAdvers', rowsToDelete.length - 1)
    }
    for (var i = 0; i < rowsToDelete.length; i++) {
      for (var row = rowsToDelete[i]; row > 1; row--) {
        array = copyRow(array, row - 1, row)
      }
      array = replaceRow(array, 0, 0)
    }
    return ([array, newscore]);
}

export function addRow(state) {
  let array = state.array

  for (let i = 1; i < array.length; i++) {
    array = copyRow(array, i, i - 1)
  }
  array = replaceRow(array, 19, 8);

  return {...state, array: array, provisionalArray: array.map(row => row.map(value => {return value}))}
}
