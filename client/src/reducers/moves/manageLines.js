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
  console.log('rowsToDelete=')
  console.log(rowsToDelete)
  return (rowsToDelete);
}

function copyRow(array, from, to) {
  array[to] = array[from]
  return array
}

function deleteFirstRow(array) {
  array[0].forEach(element => {
    element = 0
  })
  return array
}

export default function deleteLines(array) {
    let rowsToDelete = checkLines(array);
    
    for (var i = 0; i < rowsToDelete.length; i++) {
      for (var i = rowsToDelete[i]; i > 1; i--) {
        array = copyRow(array, i - 1, i)
      }
      array = deleteFirstRow(array)
    }

    return (array);
}
