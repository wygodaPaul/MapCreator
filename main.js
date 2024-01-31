console.log('START')

// String part
let map = '\n'

for (let x = 0; x<9; x++) {
    map += '| '

    for (let y = 0; y<9; y++) {
        let position = x + "" + y + " "
        map += position
    }

    map += ' |\n'
}

console.log('Map:', map)

// Space can become three tiles:
// SEA - 'S', COAST - 'C', LAND - 'L'

// Array Part
// First I need to add posibilities for each space
let arrayMap = [] 

for (let x = 0; x<9; x++) {
    arrayMap[x] = []

    for (let y = 0; y<9; y++) {
        arrayMap[x][y] = ['S','C','L']
    }
}

console.log('arrayMap - ', arrayMap)

console.log('END')