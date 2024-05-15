import * as THREE from 'three';
import { tiles } from '../tiles';


export const draw = (cell) => {
    let planeMaterial = new THREE.MeshPhongMaterial({ color: tiles[cell.option[0]].COLOR })
    let planeGeometry = new THREE.BoxGeometry( 10, 10, 3 )
    let plane = new THREE.Mesh( planeGeometry, planeMaterial )
    plane.position.x = 10 * cell.column
    plane.position.y = -10 * cell.row
    plane.position.z = 2 * tiles[cell.option[0]].HEIGHT

    return plane
}