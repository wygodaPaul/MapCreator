console.log('START')

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

console.log('END')