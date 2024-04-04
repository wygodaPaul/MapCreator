import * as THREE from 'three';

import { gridCreator } from "./gridCreator.js"
import { getRandomNumber } from "./optionFunctions.js"

const grid = 5
const numberOfoptions = 3
let  arrayOfPlanes  = gridCreator(grid)

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// const geometry = new THREE.BoxGeometry( 10, 10, 10 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );
for (let i = 0; i< arrayOfPlanes.length; i++) {
    console.log('PING')
    scene.add( arrayOfPlanes[i] )
}

camera.position.x = grid*10/2-5;
camera.position.y = grid*10;
camera.position.z = grid*10/2-5;
camera.lookAt( grid*10/2-5, 0, grid*10/2-5 )

function animate() {
	requestAnimationFrame( animate );

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();




// // ??
// worldMap[getRandomNumber(worldMap.length)].option = [getRandomNumber(numberOfoptions)]
// worldMap[getRandomNumber(worldMap.length)].isCollapsed = true
// // console.log(worldMap)
// for (let i = 0; i<worldMap.length; i++) {

// }
 