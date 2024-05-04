import * as THREE from 'three';

import { gridCreator } from "./gridCreator.js"
import { getRandomNumber } from "./optionFunctions.js"

const grid = 3
const numberOfoptions = 3
let { worldMap, arrayOfPlanes } = gridCreator(grid)

const scene = new THREE.Scene();
// Camera Options
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.x = grid*10/2-5;
camera.position.y = -(grid*10/2-5)
camera.position.z = grid*10;
camera.lookAt( grid*10/2-5, -(grid*10/2-5), 0 )

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

for (let i = 0; i< arrayOfPlanes.length; i++) {
    console.log(worldMap[i])
    scene.add( arrayOfPlanes[i] )
}

const tileOptions = [
    { tile: 'land', tile_ID: 0, color: "green", rules: {top: 1, right: 1, bottom: 1, left: 1}},
    { tile: 'coast', tile_ID: 1, color: "yellow", rules: {top: 1, right: 2, bottom: 2, left: 1}},
    { tile: 'sea', tile_ID: 2, color: "blue", rules: {top: 2, right: 2, bottom: 2, left: 2}}
]

//Find lowest entropy
const findLowest = async (worldMap) => {
	// console.log("worldmap - ", worldMap)
	let tempArray = worldMap.slice(0)
	// console.log('tempArr1 - ', tempArray)
	tempArray.filter(x => x.isCollapsed === false).sort((a, b) => a.option.length - b.option.length)
	// console.log('tempArr2 - ', tempArray)
	let myArray = tempArray.filter(x => tempArray[0].option.length === x.option.length)
	// console.log('tempArr3 - ', myArray)
	let randomCell = myArray[getRandomNumber(myArray.length)]
	// console.log("randomCell - ", randomCell)
	return randomCell
}

const checkNeighbors = async (currentCell) => {
	let otherCellPossibleOptions
	let possibleOptions = []
	let newTileOptions = []
	let tempArr = []
	console.log('currentCell - ', currentCell)

	// // Check Top
	// if (currentCell.row > 0 && !worldMap[currentCell.column + (currentCell.row - 1) * grid].isCollapsed) {
	// 	console.log("CHECK TOP")

	// 	let socket = tileOptions[currentCell.option[0]].rules.top
	// 	tileOptions.forEach(x => x.rules.bottom === socket ? possibleOptions.push(x.tile_ID) : false )
	// 	otherCellPossibleOptions = worldMap[currentCell.column + (currentCell.row - 1) * grid].option
	// 	let newArr = possibleOptions.concat(otherCellPossibleOptions).sort()

	// 	// check which options repeat
	// 	for (let i = 0; i < newArr.length - 1; i++) {
	// 		if (newArr[i] === newArr[i+1]) {
	// 			newTileOptions.push(newArr[i])
	// 		}
	// 	}
	// 	// discard duplicates
	// 	newTileOptions = [...new Set(newTileOptions)]
		
	// 	// assaign new options for top tile
	// 	worldMap[currentCell.column + (currentCell.row - 1) * grid].option = newTileOptions
	// 	// clear array's
	// 	newTileOptions = []
	// 	possibleOptions = []
	// 	tempArr = []
	// }

	// // Check Right
	// if (currentCell.column < grid - 1 && !worldMap[(currentCell.column + 1) + currentCell.row * grid].isCollapsed) {
	// 	console.log("CHECK RIGHT")

	// 	let socket = tileOptions[currentCell.option[0]].rules.right
	// 	tileOptions.forEach(x => x.rules.left === socket ? possibleOptions.push(x.tile_ID) : false )
	// 	otherCellPossibleOptions = worldMap[(currentCell.column + 1) + currentCell.row * grid].option
	// 	let newArr = possibleOptions.concat(otherCellPossibleOptions).sort()

	// 	// check which options repeat
	// 	for (let i = 0; i < newArr.length - 1; i++) {
	// 		if (newArr[i] === newArr[i+1]) {
	// 			newTileOptions.push(newArr[i])
	// 		}
	// 	}
	// 	// discard duplicates
	// 	newTileOptions = [...new Set(newTileOptions)]
		
	// 	// assaign new options for top tile
	// 	worldMap[(currentCell.column + 1) + currentCell.row * grid].option = newTileOptions
	// 	// clear array's
	// 	newTileOptions = []
	// 	possibleOptions = []
	// 	tempArr = []
	// }

	// // Check bottom
	// if (currentCell.row < grid - 1 && !worldMap[currentCell.column + (currentCell.row + 1) * grid].isCollapsed) {
	// 	console.log("CHECK BOTTOM")

	// 	let socket = tileOptions[currentCell.option[0]].rules.bottom
	// 	tileOptions.forEach(x => x.rules.top === socket ? possibleOptions.push(x.tile_ID) : false )
	// 	otherCellPossibleOptions = worldMap[currentCell.column + (currentCell.row + 1) * grid].option
	// 	let newArr = possibleOptions.concat(otherCellPossibleOptions).sort()

	// 	// check which options repeat
	// 	for (let i = 0; i < newArr.length - 1; i++) {
	// 		if (newArr[i] === newArr[i+1]) {
	// 			newTileOptions.push(newArr[i])
	// 		}
	// 	}
	// 	// discard duplicates
	// 	newTileOptions = [...new Set(newTileOptions)]
		
	// 	// assaign new options for top tile
	// 	worldMap[currentCell.column + (currentCell.row + 1) * grid].option = newTileOptions
	// 	// clear array's
	// 	newTileOptions = []
	// 	possibleOptions = []
	// 	tempArr = []
	// }

	// // Check Left
	// if (currentCell.column > 0 && !worldMap[(currentCell.column - 1) + currentCell.row * grid].isCollapsed) {
	// 	console.log("CHECK LEFT")

	// 	let socket = tileOptions[currentCell.option[0]].rules.left
	// 	tileOptions.forEach(x => x.rules.right === socket ? possibleOptions.push(x.tile_ID) : false )
	// 	otherCellPossibleOptions = worldMap[(currentCell.column - 1) + currentCell.row * grid].option
	// 	let newArr = possibleOptions.concat(otherCellPossibleOptions).sort()

	// 	// check which options repeat
	// 	for (let i = 0; i < newArr.length - 1; i++) {
	// 		if (newArr[i] === newArr[i+1]) {
	// 			newTileOptions.push(newArr[i])
	// 		}
	// 	}
	// 	// discard duplicates
	// 	newTileOptions = [...new Set(newTileOptions)]
		
	// 	// assaign new options for top tile
	// 	worldMap[(currentCell.column - 1) + currentCell.row * grid].option = newTileOptions
	// 	// clear array's
	// 	newTileOptions = []
	// 	possibleOptions = []
	// 	tempArr = []
	// }

	
 
}


// NEVER CHANGE THIS !!! 
//		^ y
//		|
//		|
//--------------> x
//		| 0 1 2
//		| 3 4 5
//z		| 6 7 8


// Camera ^ 
const draw = async () => {
	for(let row = 0; row < grid; row++) {
		for(let column = 0; column < grid; column++) {
			let cell = worldMap[column + row * grid]
			if(cell.isCollapsed === false && cell.option.length === 1) {
				let planeMaterial = new THREE.MeshBasicMaterial({color: tileOptions[cell.option[0]].color})
				let planeGeometry = new THREE.BoxGeometry( 8.9, 8.9, 1 )
				let plane = new THREE.Mesh( planeGeometry, planeMaterial )
				plane.position.x = 10 * worldMap[column + row * grid].column
				plane.position.y = -10 * worldMap[column + row * grid].row
				plane.position.z = 1
				worldMap[column + row * grid].isCollapsed = true
				scene.add( plane )
				await new Promise(resolve => setTimeout(resolve, 500))
				await checkNeighbors(cell)
			} 
			else {
				let planeMaterial = new THREE.MeshBasicMaterial({color: "teal"})
				let planeGeometry = new THREE.BoxGeometry( 8.9, 8.9, 1 )
				let plane = new THREE.Mesh( planeGeometry, planeMaterial )
				plane.position.x = 10 * worldMap[column + row * grid].column
				plane.position.y = -10 * worldMap[column + row * grid].row
				plane.position.z = 1
				scene.add( plane )
				await new Promise(resolve => setTimeout(resolve, 250))
			}
		}
	}
}

const loopMe = async () => {
	console.log("START LOOP")
	// worldMap[1].option = [getRandomNumber(3)]
	let counter = 0
	while(counter < 1) {

		// NOTE: Maybe assending order is what makes this wrong ?
		// for (let i = 0; i< grid*grid; i++) {
		// 	await checkNeighbors(worldMap[i])
		// }

		// CHANGE!!!! FIND JUST ONE 
		const temp = worldMap.filter(x => x.isCollapsed === false)
		console.log('TEMP - ', temp)
		if (temp.length === 0) break

		let currentCell = await findLowest(temp)
		worldMap[currentCell.row + currentCell.column * grid].option = [getRandomNumber(currentCell.option.length)]
		// console.log('currentCell - ', currentCell)
		// console.log("worldMap - ", worldMap)
		
		await draw()
		await new Promise(resolve => setTimeout(resolve, 3000))
		counter++
	}
}

// const testMe = () => {
// 	for(let column = 0; column < grid; column++) {
// 		for(let row = 0; row < grid; row++) {
// 			let cell = worldMap[row + column * grid]
// 			if(cell.isCollapsed === false) {
// 				let planeMaterial = new THREE.MeshBasicMaterial({color: tileOptions[cell.option[0]].color})
// 				let planeGeometry = new THREE.BoxGeometry( 8.9, 1, 8.9 )
// 				let plane = new THREE.Mesh( planeGeometry, planeMaterial )
// 				plane.position.z = 10 * worldMap[column + row * grid].row
// 				plane.position.y = 1
// 				plane.position.x = 10 * worldMap[column + row * grid].column
// 				worldMap[column + row * grid].isCollapsed = true
// 				scene.add( plane )

// 			} 
// 			else {
// 				let planeMaterial = new THREE.MeshBasicMaterial({color: "black"})
// 				let planeGeometry = new THREE.BoxGeometry( 8.9, 1, 8.9 )
// 				let plane = new THREE.Mesh( planeGeometry, planeMaterial )
// 				plane.position.x = 10 * worldMap[column + row * grid].row
// 				plane.position.y = 1
// 				plane.position.z = 10 * worldMap[column + row * grid].column
// 				scene.add( plane )
// 			}
// 		}
// 	}
// }

function animate() {

	requestAnimationFrame( animate );

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();

setTimeout( () => {
	draw()
},1000)


console.log(worldMap)




