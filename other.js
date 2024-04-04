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

// console.log('arrayMap - ', arrayMap)


// Random number picker
const getRandomNumber = (max) => {
    return Math.floor(Math.random() * max)
}

console.log('END')

const checkTile = () => {

}

const cascade = (positionX, positionY, tiles) => {

    if (arrayMap[positionX][positionY].length === 1) return 

    if (positionX - 1 > 0) {

    }

    if (positionX + 1 < 9) {
        
    }

    if (positionY - 1 > 0) {
        
    }

    if (positionY + 1 < 9) {
        
    }
}

let count = 0
while(count < 1) {

    let x,y
    x = getRandomNumber(9)
    y = getRandomNumber(9)
    z = getRandomNumber(3)

    let tile = arrayMap[x][y][z]

    console.log('position - ',x,y,z, ' tile - ', tile )
    arrayMap[x][y] = [tile]

    console.log('array - ', arrayMap[x][y])


    count++
}