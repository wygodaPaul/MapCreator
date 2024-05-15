import { getRandomNumber } from "./getRandomNumber.js"

export const findCellWithLowestEntropy = (mainGrid) => {
    let temp = mainGrid.map(object => ({ ...object }))
    // console.log('tempArr1 - ', ARR)
	let tempArray = temp.filter(x => x.isCollapsed === false).sort((a, b) => a.option.length - b.option.length)
	// console.log('tempArr2 - ', tempArray)
	let myArray = tempArray.filter(x => tempArray[0].option.length === x.option.length)
	// console.log('tempArr3 - ', myArray)
	let randomCell = myArray[getRandomNumber(myArray.length)]
	// console.log("randomCell - ", randomCell)
	return randomCell
    
}