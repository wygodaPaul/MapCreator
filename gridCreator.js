
export const gridCreator = () => {
const grid = 3
let map = []

for (let i = 0; i < grid; i++) {
    for (let j = 0; j < grid; j++) {
        let cell = {
            row : i,
            column : j,
            isCollapsed: false,
            option: [0, 1, 2]
        }
        map.push(cell)
    }
}


// console.log(map)
return map
}

