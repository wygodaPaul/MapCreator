import * as THREE from 'three';

import { gridCreator } from "./gridCreator.js"
import { getRandomNumber } from "./functions/getRandomNumber.js"
import { draw } from "./functions/draw.js"
import { findCellWithLowestEntropy } from './functions/findLowestEntropy.js';

const grid = 3
let { mainGrid, arrayOfPlanes } = gridCreator(grid)

const tiles = [
    {ID: 0, TILE: 'Land', COLOR: 'green', RULES: {TOP: [0, 1], RIGHT: [0, 1], BOTTOM: [0, 1], LEFT: [0, 1]}},
    {ID: 1, TILE: 'Coast', COLOR: 'yellow', RULES: {TOP: [0, 1, 2], RIGHT: [0, 1, 2], BOTTOM: [0, 1, 2], LEFT: [0, 1, 2]}},
    {ID: 2, TILE: 'Sea', COLOR: 'blue', RULES: {TOP: [1, 2], RIGHT: [1, 2], BOTTOM: [1, 2], LEFT: [1, 2]}}
]

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

const cell = findCellWithLowestEntropy(mainGrid)
console.log('Random cell - ', cell)

scene.add( draw() )
// scene.children[4].material.color.b = 255
// console.log(scene.children[4].material.color.b)