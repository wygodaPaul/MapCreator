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
camera.position.y = grid*10;
camera.position.z = grid*10/2-5;
camera.lookAt( grid*10/2-5, 0, grid*10/2-5 )

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

for (let i = 0; i< arrayOfPlanes.length; i++) {
    console.log(worldMap[i])
    scene.add( arrayOfPlanes[i] )
}

const tileOptions = [
    { tile: 'land', tile_ID: 0, color: "green", rules: {top: [0], right: [0, 1], bottom: [0, 1], left: [0]}},
    { tile: 'coast', tile_ID: 1, color: "yellow", rules: {top: [0, 1], right: [1, 2], bottom: [1, 2], left: [0, 1]}  },
    { tile: 'sea', tile_ID: 2, color: "blue", rules: {top: [1, 2], right: [2], bottom: [2], left: [1, 2]}  }
]
    // let digit = getRandomNumber(worldMap.length)
    // worldMap[digit].option = [getRandomNumber(3)]
    // worldMap[digit].isCollapsed = true

	// digit = getRandomNumber(worldMap.length)
    // worldMap[digit].option = [getRandomNumber(3)]
    // worldMap[digit].isCollapsed = true

	// const pickRandom = () => {
	// 	let planeMaterial = new THREE.MeshBasicMaterial({color: options[worldMap[digit].option].color})
	// 	let planeGeometry = new THREE.BoxGeometry( 8.9, 1, 8.9 )
	// 	let plane = new THREE.Mesh( planeGeometry, planeMaterial )
	// 	plane.position.x = 10 * worldMap[digit].row
	// 	plane.position.y = 1
	// 	plane.position.z = 10 * worldMap[digit].column
	// 	scene.add( plane )
	// }

const test = () => {
	console.log('currentCell - ', worldMap[0 + 1 * grid])

	console.log('otherCell - ', worldMap[1 + 1 * grid])

}
// middle
worldMap[1 + 1 * grid].option = [0]
// above middle
worldMap[1 + 0 * grid].option = [0, 1, 2]
let currentCell =  worldMap[1 + 1 * grid]
console.log('currentCell - ', worldMap[1 + 1 * grid])
// test()

//Find lowest entropy
const findLowest = () => {
	let tempArray = Array.from(worldMap)
	tempArray.sort((a, b) => a.option.length - b.option.length)
	let myArray = tempArray.filter(x => tempArray[0].option.length === x.option.length)
	let randomCell = myArray[getRandomNumber(myArray.length)]
	// console.log("randomCell - ", randomCell)
	return randomCell
}

findLowest()

const checkNeighbors = (currentCell) => {
	let otherCellPossibleOptions
	let newTileOptions = []
	let tempArr = []

	// Check Top
	if (currentCell.row > 0 || !worldMap[currentCell.column + (currentCell.row - 1) * grid].isCollapsed) {
		console.log("CHECK TOP")
		// add all posible options depending on tiles available
		for (let i = 0; i < currentCell.option.length; i++) {
			tempArr.push(tileOptions[currentCell.option[i]].rules.top)
		}
		// flaten array and discard duplicates
		otherCellPossibleOptions = [...new Set(tempArr.flat(Infinity))]
		// Match possible options with options availalbe for top and sort them
		let newArr = worldMap[currentCell.column + (currentCell.row - 1) * grid].option.concat(otherCellPossibleOptions).sort()
		// check which options repeat
		for (let i = 0; i < newArr.length - 1; i++) {
			if (newArr[i] === newArr[i+1]) {
				newTileOptions.push(newArr[i])
			}
		}
		// discard duplicates
		newTileOptions = [...new Set(newTileOptions)]
		// assaign new options for top tile
		worldMap[currentCell.column + (currentCell.row - 1) * grid].option = newTileOptions
		// clear array's
		newTileOptions = []
		tempArr = []
	}

	// Check Right
	if (currentCell.column < grid - 1 || !worldMap[(currentCell.column + 1) + currentCell.row * grid].isCollapsed) {
		console.log("CHECK RIGHT")
		// add all posible options depending on tiles available
		for (let i = 0; i < currentCell.option.length; i++) {
			tempArr.push(tileOptions[currentCell.option[i]].rules.right)
		}
		// flaten array and discard duplicates
		otherCellPossibleOptions = [...new Set(tempArr.flat(Infinity))]
		// Match possible options with options availalbe for right and sort them
		let newArr = worldMap[(currentCell.column + 1) + currentCell.row * grid].option.concat(otherCellPossibleOptions).sort()
		// check which options repeat
		for (let i = 0; i < newArr.length - 1; i++) {
			if (newArr[i] === newArr[i+1]) {
				newTileOptions.push(newArr[i])
			}
		}
		// discard duplicates
		newTileOptions = [...new Set(newTileOptions)]
		// assaign new options for right tile
		worldMap[(currentCell.column + 1) + currentCell.row * grid].option = newTileOptions
		// clear array's
		newTileOptions = []
		tempArr = []
	}

	// Check Bottom
	if (currentCell.row < grid - 1 || !worldMap[currentCell.column + (currentCell.row + 1) * grid].isCollapsed) {
		console.log("CHECK BOTTOM")
		// add all posible options depending on tiles available
		for (let i = 0; i < currentCell.option.length; i++) {
			tempArr.push(tileOptions[currentCell.option[i]].rules.bottom)
		}
		// flaten array and discard duplicates
		otherCellPossibleOptions = [...new Set(tempArr.flat(Infinity))]
		// Match possible options with options availalbe for bottom and sort them
		let newArr = worldMap[currentCell.column + (currentCell.row + 1) * grid].option.concat(otherCellPossibleOptions).sort()
		// check which options repeat
		for (let i = 0; i < newArr.length - 1; i++) {
			if (newArr[i] === newArr[i+1]) {
				newTileOptions.push(newArr[i])
			}
		}
		// discard duplicates
		newTileOptions = [...new Set(newTileOptions)]
		// assaign new options for bottom tile
		worldMap[currentCell.column + (currentCell.row + 1) * grid].option = newTileOptions
		// clear array's
		newTileOptions = []
		tempArr = []

	}

	// Check Left
	if (currentCell.column > 0 || !worldMap[(currentCell.column - 1) + currentCell.row * grid].isCollapsed) {
		console.log("CHECK LEFT")
		// add all posible options depending on tiles available
		for (let i = 0; i < currentCell.option.length; i++) {
			tempArr.push(tileOptions[currentCell.option[i]].rules.left)
		}
		// flaten array and discard duplicates
		otherCellPossibleOptions = [...new Set(tempArr.flat(Infinity))]
		// Match possible options with options availalbe for left and sort them
		let newArr = worldMap[(currentCell.column - 1) + currentCell.row * grid].option.concat(otherCellPossibleOptions).sort()
		// check which options repeat
		for (let i = 0; i < newArr.length - 1; i++) {
			if (newArr[i] === newArr[i+1]) {
				newTileOptions.push(newArr[i])
			}
		}
		// discard duplicates
		newTileOptions = [...new Set(newTileOptions)]
		// assaign new options for left tile
		worldMap[(currentCell.column - 1) + currentCell.row * grid].option = newTileOptions
		// clear array's
		newTileOptions = []
		tempArr = []

	}
}

checkNeighbors(currentCell)

console.log("worldMap - ",worldMap)
const checkValidation = (x, availableChoices, direction) => {
	// let nyArr = []
	// const result = [...new Set([...firstArr, ...secondArr])]

	// for (let i = 0; i<x.option.length; i++) {
	// 	myArray.push(tileOptions[x.option[i]].rules.top)
	// }
	// x.option
}


const draw = () => {
	for(let row = 0; row < grid; row++) {
		for(let column = 0; column < grid; column++) {
			let cell = worldMap[column + row * grid]
			if(cell.isCollapsed) {
				let planeMaterial = new THREE.MeshBasicMaterial({color: tileOptions[cell.option[0]].color})
				let planeGeometry = new THREE.BoxGeometry( 8.9, 1, 8.9 )
				let plane = new THREE.Mesh( planeGeometry, planeMaterial )
				plane.position.x = 10 * worldMap[column + row * grid].row
				plane.position.y = 1
				plane.position.z = 10 * worldMap[column + row * grid].column
				scene.add( plane )
			} else {
				let planeMaterial = new THREE.MeshBasicMaterial({color: "black"})
				let planeGeometry = new THREE.BoxGeometry( 8.9, 1, 8.9 )
				let plane = new THREE.Mesh( planeGeometry, planeMaterial )
				plane.position.x = 10 * worldMap[column + row * grid].row
				plane.position.y = 1
				plane.position.z = 10 * worldMap[column + row * grid].column
				scene.add( plane )
			}
		}
	}
}

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






