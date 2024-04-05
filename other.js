import { gridCreator } from "./gridCreator.js"
import { getRandomNumber } from "./optionFunctions.js"

console.log('START')

let { worldMap, arrayOfPlanes }  = gridCreator(3)




const pickRandom = () => {
    let digit = getRandomNumber(worldMap.length)
    worldMap[digit].option = [getRandomNumber(3)]
    worldMap[digit].isCollapsed = true
}

let counter = 0
while(counter < 4) {
    // First pick
    if (counter === 0) pickRandom()





    counter++
    console.log('End loop - ', counter)
}
 



console.log("worldMap - ", worldMap)











