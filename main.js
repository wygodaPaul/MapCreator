import * as THREE from 'three';

import { gridCreator } from "./gridCreator.js"
import { getRandomNumber } from "./functions/getRandomNumber.js"
import { draw } from "./functions/draw.js"
import { findCellWithLowestEntropy } from './functions/findLowestEntropy.js';
import { tiles } from './tiles.js';

const grid = 8
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
    // CHECK TOP
    if (cell.row > 0 && !mainGrid[cell.column + ( cell.row-1 ) * grid].isCollapsed) {
        console.log('CHECKING TOP')
        let topOptions = mainGrid[cell.column + ( cell.row-1 ) * grid].option
        let thisCellTopOptions = tiles[cell.option[0]].RULES.TOP
        let mergedOptions = topOptions.concat(thisCellTopOptions).sort()
        let newOptions = []
        for (let i = 0; i < mergedOptions.length-1; i++) {
            if (mergedOptions[i] === mergedOptions[i+1]) {
                newOptions.push(mergedOptions[i])
            }
        }
        mainGrid[cell.column + ( cell.row-1 ) * grid].option = newOptions
    }

    // CHECK RIGHT
    if (cell.column < grid-1 && !mainGrid[( cell.column + 1 ) + cell.row * grid].isCollapsed) {
        console.log('CHECKING RIGHT')
        let rightOptions = mainGrid[( cell.column + 1 ) + cell.row * grid].option
        let thisCellRightOptions = tiles[cell.option[0]].RULES.RIGHT
        let mergedOptions = rightOptions.concat(thisCellRightOptions).sort()
        let newOptions = []
        for (let i = 0; i < mergedOptions.length-1; i++) {
            if (mergedOptions[i] === mergedOptions[i+1]) {
                newOptions.push(mergedOptions[i])
            }
        }
        mainGrid[( cell.column + 1 ) + cell.row * grid].option = newOptions
    }

    // CHECK BOTTOM
    if (cell.row < grid-1 && !mainGrid[cell.column + ( cell.row+1 ) * grid].isCollapsed) {
        console.log('CHECKING BOTTOM')
        let bottomOptions = mainGrid[cell.column + ( cell.row+1 ) * grid].option
        let thisCellBottomOptions = tiles[cell.option[0]].RULES.BOTTOM
        let mergedOptions = bottomOptions.concat(thisCellBottomOptions).sort()
        let newOptions = []
        for (let i = 0; i < mergedOptions.length-1; i++) {
            if (mergedOptions[i] === mergedOptions[i+1]) {
                newOptions.push(mergedOptions[i])
            }
        }
        mainGrid[cell.column + ( cell.row+1 ) * grid].option = newOptions
    }

    // CHECK LEFT
    if (cell.column > 0 && !mainGrid[( cell.column - 1 ) + cell.row * grid].isCollapsed) {
        console.log('CHECKING LEFT')
        let leftOptions = mainGrid[( cell.column - 1 ) + cell.row * grid].option
        let thisCellLeftOptions = tiles[cell.option[0]].RULES.LEFT
        let mergedOptions = leftOptions.concat(thisCellLeftOptions).sort()
        let newOptions = []
        for (let i = 0; i < mergedOptions.length-1; i++) {
            if (mergedOptions[i] === mergedOptions[i+1]) {
                newOptions.push(mergedOptions[i])
            }
        }
        mainGrid[( cell.column - 1 ) + cell.row * grid].option = newOptions
    }
}

// START
const loop = () => {
    let count = 0
    while (count < grid*grid) {
        let test = mainGrid.filter(x => x.isCollapsed === false)
		if (test.length === 0) break

        const cell = findCellWithLowestEntropy(mainGrid)
        // console.log('picked - ', cell)
        mainGrid[cell.column + cell.row * grid].option = [cell.option[getRandomNumber(cell.option.length)]]
        // console.log('test - ', mainGrid)
        mainGrid[cell.column + cell.row * grid].isCollapsed = true
        scene.add( draw(mainGrid[cell.column + cell.row * grid]) )
        checkNeighbors(mainGrid[cell.column + cell.row * grid])
        count++
    }
}

loop()



// scene.children[4].material.color.b = 255
// console.log(scene.children[4].material.color.b)