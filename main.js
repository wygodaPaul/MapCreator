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

const options = [
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

test()

//Find lowest entropy
const findLowest = () => {
	let tempArray = worldMap.sort((a, b) => a.option.length - b.option.length)
	let myArray = tempArray.filter(x => tempArray[0].option.length === x.option.length)
	let randomCell = myArray[getRandomNumber(myArray.length)]
	console.log("randomCell - ", randomCell)
	return randomCell
}

findLowest()

const checkNeighbors = (currentCell) => {
	let allPossibleOptions = [0, 1, 2]
	let otherCellAvaliableOptions
	// Check Top
	if (currentCell.row > 0) {
		otherCellAvaliableOptions = worldMap[currentCell.column + (currentCell.row - 1) * grid]
	}

	// Check Right
	if (currentCell.column < grid - 1) {
		otherCellAvaliableOptions = worldMap[(currentCell.column + 1) + currentCell.row * grid]
	}

	// Check Bottom
	if (currentCell.row < grid - 1) {
		otherCellAvaliableOptions = worldMap[currentCell.column + (currentCell.row + 1) * grid]

	}

	// Check Left
	if (currentCell.column > 0) {
		otherCellAvaliableOptions = worldMap[(currentCell.column - 1) + currentCell.row * grid]

	}
}


const draw = () => {
	for(let row = 0; row < grid; row++) {
		for(let column = 0; column < grid; column++) {
			let cell = worldMap[column + row * grid]
			if(cell.isCollapsed) {
				let planeMaterial = new THREE.MeshBasicMaterial({color: options[cell.option[0]].color})
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


console.log("PING")




