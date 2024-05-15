import * as THREE from 'three';

import { gridCreator } from "./gridCreator.js"
import { getRandomNumber } from "./functions/getRandomNumber.js"
import { draw } from "./functions/draw.js"
import { findCellWithLowestEntropy } from './functions/findLowestEntropy.js';
import { tiles } from './tiles.js';

const grid = 3
let { mainGrid, arrayOfPlanes } = gridCreator(grid)

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
    console.log(mainGrid[i])
    scene.add( arrayOfPlanes[i] )
}

function animate() {

	requestAnimationFrame( animate );

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();

const checkNeighbors = (cell) => {
    console.log('THIS - ', cell)

    // CHECK TOP
    if (cell.row > 0 && !mainGrid[cell.column + ( cell.row-1 ) * grid].isCollapsed) {
        console.log('CHECKING TOP')
        let topOptions = mainGrid[cell.column + ( cell.row-1 ) * grid]
    }
}

// START
const cell = findCellWithLowestEntropy(mainGrid)
console.log('picked - ', cell)
mainGrid[cell.column + cell.row * grid].option = [cell.option[getRandomNumber(cell.option.length)]]
console.log('test - ', mainGrid)
mainGrid[cell.column + cell.row * grid].isCollapsed = true
scene.add( draw(mainGrid[cell.column + cell.row * grid]) )
checkNeighbors(mainGrid[cell.column + cell.row * grid])


// scene.children[4].material.color.b = 255
// console.log(scene.children[4].material.color.b)