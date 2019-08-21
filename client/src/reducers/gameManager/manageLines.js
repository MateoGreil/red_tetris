/*
** Module to check if the rows are full, delete them if it is the case,
** and then reorganize the array.
*/

function checkRow(row) {
  for (var i = 0; i < row.length; i++) {
    if (!row[i])
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
  array[to] = array[from]
  return array
}

function replaceRow(array, rowNb, newNb) {
  array[rowNb].forEach((element) => {
    element = newNb
  })
  return array
}

export default function deleteLines(array, socket, gameName) {
    let rowsToDelete = checkLines(array);
    
    if (rowsToDelete.length > 1) {
      console.log('emit add row')
      socket.emit('addRowToAdvers', rowsToDelete.length)
    }
    for (var i = 0; i < rowsToDelete.length; i++) {
      for (var row = rowsToDelete[i]; row > 1; row--) {
        array = copyRow(array, row - 1, row)
      }
      array = replaceRow(array, 0, 0)
    }

    return (array);
}

export function addRow(state) {
  console.log('addRow')
  let array = state.array
  for (let i = 0; i + 1 < array.length; i++) {
    array = copyRow(array, i + 1, i)
  }
  array = replaceRow(array, 19, 1);
  console.log(array[19])
  return {...state, array: array, provisionalArray: array.map(row => row.map(value => {return value}))}
}
