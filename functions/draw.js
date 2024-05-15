import * as THREE from 'three';


export const draw = () => {
    let planeMaterial = new THREE.MeshBasicMaterial({ color: "red" })
    let planeGeometry = new THREE.BoxGeometry( 8.9, 8.9, 1 )
    let plane = new THREE.Mesh( planeGeometry, planeMaterial )
    plane.position.x = 10 * 1
    plane.position.y = -10 * 1
    plane.position.z = 1

    return plane
}