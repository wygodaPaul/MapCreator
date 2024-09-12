import * as THREE from 'three';
export const gridCreator = (grid) => {
let mainGrid = []
let arrayOfPlanes = []

for (let i = 0; i < grid; i++) {
    for (let j = 0; j < grid; j++) {
        let planeMaterial = new THREE.MeshBasicMaterial({color: "grey"})
        let planeGeometry = new THREE.BoxGeometry( 9, 9, 1 )
        let plane = new THREE.Mesh( planeGeometry, planeMaterial )
        plane.position.x = 10 * i
        plane.position.y = -10 * j
        plane.position.z = 0
        plane.row = i
        plane.column = j
        let cell = {
            row : i,
            column : j,
            isCollapsed: false,
            option: [0, 1, 2, 3],
        }
        mainGrid.push(cell)
        arrayOfPlanes.push(plane)
    }
}

return { mainGrid, arrayOfPlanes } 
}

