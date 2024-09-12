import { getRandomNumber } from "./getRandomNumber.js"

export const findCellWithLowestEntropy = (mainGrid) => {
    let temp = mainGrid.map(object => ({ ...object }))
	let tempArray = temp.filter(x => x.isCollapsed === false).sort((a, b) => a.option.length - b.option.length)
	let myArray = tempArray.filter(x => tempArray[0].option.length === x.option.length)
	let randomCell = myArray[getRandomNumber(myArray.length)]
	return randomCell
    
}