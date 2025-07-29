import { ThirdPersonCameraController } from '../../module';
import * as THREE from 'three';

const scene = new THREE.Scene();
const player = new THREE.Mesh(
    new THREE.CapsuleGeometry(1, 3),
    new THREE.MeshBasicMaterial({ color: 0xDDDDDD })
);
scene.add(player);

const cameraController = new ThirdPersonCameraController(player);

const canvas = document.querySelector('#main-canvas');
if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("Failed to get #main-canvas element.");
};

const renderer = new THREE.WebGLRenderer({ canvas });

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

function animate() {
    renderer.render(scene, cameraController.getCamera());
}
renderer.setAnimationLoop(animate);
