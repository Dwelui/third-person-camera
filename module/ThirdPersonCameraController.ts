import * as THREE from 'three';

export class ThirdPersonCameraController {
    #player: THREE.Object3D;
    #camera: THREE.Camera;

    constructor(
        player: THREE.Object3D
    ) {
        this.#player = player;
        this.#camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.#camera.position.z = 5;
    }

    getCamera(): THREE.Camera { return this.#camera; }
}
