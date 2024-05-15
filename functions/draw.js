import * as THREE from 'three';
import { tiles } from '../tiles';


export const draw = (cell) => {
    let planeMaterial = new THREE.MeshBasicMaterial({ color: tiles[cell.option[0]].COLOR })
    let planeGeometry = new THREE.BoxGeometry( 8.9, 8.9, 1 )
    let plane = new THREE.Mesh( planeGeometry, planeMaterial )
    plane.position.x = 10 * cell.column
    plane.position.y = -10 * cell.row
    plane.position.z = 1

    return plane
}