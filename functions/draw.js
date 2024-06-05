import * as THREE from 'three';
import { tiles } from '../tiles';
import { getRandomNumber } from './getRandomNumber';


export const draw = (cell) => {


    const geometry = new THREE.CylinderGeometry( 7, getRandomNumber(7) + 7, 2, 8 ); 
    const material = new THREE.MeshPhongMaterial( { color: tiles[cell.option[0]].COLOR } ); 
    const plane = new THREE.Mesh( geometry, material )
    plane.position.x = 10 * cell.column
    plane.position.y = -10 * cell.row
    plane.position.z = 2 * tiles[cell.option[0]].HEIGHT
    plane.rotation.x = 90 / (180/Math.PI)

    // let planeMaterial = new THREE.MeshPhongMaterial({ color: tiles[cell.option[0]].COLOR })
    // let planeGeometry = new THREE.BoxGeometry( 10, 10, 3 )
    // let plane = new THREE.Mesh( planeGeometry, planeMaterial )
    // plane.position.x = 10 * cell.column
    // plane.position.y = -10 * cell.row
    // plane.position.z = 2 * tiles[cell.option[0]].HEIGHT

    return plane
}