import * as THREE from 'three';
export const gridCreator = (grid) => {
let map = []
let arrayOfPlanes = []

for (let i = 0; i < grid; i++) {
    for (let j = 0; j < grid; j++) {
        let planeMaterial = new THREE.MeshBasicMaterial({color: "grey"})
        let planeGeometry = new THREE.BoxGeometry( 9, 1, 9 )
        let plane = new THREE.Mesh( planeGeometry, planeMaterial )
        plane.position.x = 10 * i
        plane.position.y = 0
        plane.position.z = 10 * j
        let cell = {
            row : i,
            column : j,
            isCollapsed: false,
            option: [0, 1, 2]
        }
        map.push(cell)
        arrayOfPlanes.push(plane)
    }
}


console.log(arrayOfPlanes)
return  arrayOfPlanes 
}

