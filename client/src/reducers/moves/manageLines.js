/*
** Module to check if the rows are full, delete them if it is the case,
** and then reorganize the array.
*/

function checkLines (state){
    array = [];
    pix = 0;
    line = 0;
    check = 0;
    for (row of state.provisionalArray) {
        for (elem of row){
            if (elem !== 0){
                pix++;
            }
        if (pix === 10) {
            array.push(line)
            check++;
        }
        pix = 0;
        line++;
        }
    }
    return(check, array);
}

export default function deleteLines(state) {
    testRows = checkLines(state);
    if (testRows[0] === 0) {
        return array;
    }
    array = state.provisionalArray;

    return (array);
}

export default function reorganizeLines(state) {
    array = state.provisionalArray;
    return (array);
}
