import * as THREE from 'three';

import { gridCreator } from "./gridCreator.js"
import { getRandomNumber } from "./functions/getRandomNumber.js"
import { getRandomOption } from './functions/getRandomOption.js';
import { draw } from "./functions/draw.js"
import { findCellWithLowestEntropy } from './functions/findLowestEntropy.js';
import { tiles } from './tiles.js';

const grid = 25
let { mainGrid, arrayOfPlanes } = gridCreator(grid)
let mapReady = false
let playerExists = false

const scene = new THREE.Scene();
// Camera Options
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.x = grid*10/2
camera.position.y = -grid*10
camera.position.z = grid*10
camera.lookAt( grid*10/2, -grid*10/2, 0 )

const axesHelper = new THREE.AxesHelper( 250 );
scene.add( axesHelper );

const ambientLight = new THREE.AmbientLight(0x606060);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.x = -grid*10
directionalLight.position.y = grid*10
directionalLight.position.z = 200
directionalLight.castShadow = true
scene.add( directionalLight );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

window.rotateCameraLeft = () => {
    camera.position.x = 0
    camera.position.y = -grid*10/2
    camera.lookAt( grid*10/2, -grid*10/2, 0 )
    camera.rotation.z -= 90 / (180/Math.PI)
}

window.rotateCameraRight = () => {
    camera.position.x = grid*10
    camera.position.y = -grid*10/2
    camera.lookAt( grid*10/2, -grid*10/2, 0 )
    camera.rotation.z += 90 / (180/Math.PI)
}

window.cameraStop = () => {
    camera.position.x = grid*10/2
    camera.position.y = 0
    camera.lookAt( grid*10/2, -grid*10/2, 0 )
    camera.rotation.z += 180 / (180/Math.PI)
}

window.cameraBottom = () => {
    camera.position.x = grid*10/2
    camera.position.y = -grid*10
    camera.lookAt( grid*10/2, -grid*10/2, 0 )
    camera.rotation.z += 0 / (180/Math.PI)
}

// Player creation and movement
window.createPlayer = () => {
    if (mapReady && !playerExists) {
        let planeMaterial = new THREE.MeshPhongMaterial({ color: "pink" })
        let planeGeometry = new THREE.BoxGeometry( 5, 5, 30 )
        let player = new THREE.Mesh( planeGeometry, planeMaterial )
        player.name = "player"
        player.position.x = 10*(Math.floor(grid/2))
        player.position.y = -10*(Math.floor(grid/2))
        player.position.z = 5
    
        playerExists = true
        scene.add(player)
    }
}

window.playerLeft = async () => {
    for (let i = 0; i<10; i++) {
        scene.children[scene.children.findIndex(kid => kid.name === 'player')].position.x -= 1
        await new Promise(resolve => setTimeout(resolve, 10))
    }
    
    console.log('LEFT')
}

window.playerUp = async () => {
    for (let i = 0; i<10; i++) {
        scene.children[scene.children.findIndex(kid => kid.name === 'player')].position.y += 1
        await new Promise(resolve => setTimeout(resolve, 10))
    }
    
    console.log('UP')
}

window.playerRight = async () => {
    for (let i = 0; i<10; i++) {
        scene.children[scene.children.findIndex(kid => kid.name === 'player')].position.x += 1
        await new Promise(resolve => setTimeout(resolve, 10))
    }
    
    console.log('RIGHT')
}

window.playerDown = async () => {
    for (let i = 0; i<10; i++) {
        scene.children[scene.children.findIndex(kid => kid.name === 'player')].position.y -= 1
        await new Promise(resolve => setTimeout(resolve, 10))
    }
    
    console.log('DOWN')
}

let planeMaterial = new THREE.MeshPhongMaterial({color: "brown"})
let planeGeometry = new THREE.BoxGeometry( 12*grid, 12*grid, 5 )
let plane = new THREE.Mesh( planeGeometry, planeMaterial )
plane.position.x = grid*10/2-5
plane.position.y = -grid*10/2+5
plane.position.z = 0

scene.add(plane)

function animate() {

	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

animate();

const checkNeighbors = (cell) => {
    // CHECK TOP
    if (cell.row > 0 && !mainGrid[cell.column + ( cell.row-1 ) * grid].isCollapsed) {
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
const loop = async () => {
    let count = 0
    while (count < grid*grid) {
        let test = mainGrid.filter(x => x.isCollapsed === false)
		if (test.length === 0) break

        const cell = findCellWithLowestEntropy(mainGrid)
        mainGrid[cell.column + cell.row * grid].option = [getRandomOption(cell.option)]
        mainGrid[cell.column + cell.row * grid].isCollapsed = true
        scene.add( draw(mainGrid[cell.column + cell.row * grid]) )
        checkNeighbors(mainGrid[cell.column + cell.row * grid])
        count++

        await new Promise(resolve => setTimeout(resolve, 1))
    }
    mapReady = true
}

await loop()

