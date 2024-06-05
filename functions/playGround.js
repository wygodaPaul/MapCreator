import * as THREE from 'three';
import { tiles } from '../tiles';


export const playGround = () => {
    // let planeMaterial = new THREE.MeshPhongMaterial({ color: "yellow"})
    // let planeGeometry = new THREE.BoxGeometry( 10, 10, 3 )
    // let plane = new THREE.Mesh( planeGeometry, planeMaterial )
    const geometry = new THREE.CylinderGeometry( 6, 10, 3, 10 ); 
    const material = new THREE.MeshPhongMaterial( {color: 0xffff00} ); 
    const plane = new THREE.Mesh( geometry, material )
    plane.position.x = 0
    plane.position.y = 0
    plane.position.z = 0
    plane.rotation.x = 90 / (180/Math.PI)

    return plane
}