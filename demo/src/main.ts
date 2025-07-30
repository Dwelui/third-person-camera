import { ThirdPersonCameraController } from '../../module';
import * as THREE from 'three';

const canvas = document.querySelector('#main-canvas');
if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("Failed to get #main-canvas element.");
}

canvas.addEventListener("click", async () => {
    if (!document.pointerLockElement) {
        try {
            await canvas.requestPointerLock();
        } catch (e) {
            // Used for avoiding security restriction.
            // SecurityError: The user has exited the lock before this request was completed.
            console.log('WARNING::Tried to lock pointer to quickly after exiting.');
        }
    }
});

document.addEventListener("pointerlockchange", pointerLockChangeHandle, true);

const scene = new THREE.Scene();
const player = new THREE.Mesh(
    new THREE.CapsuleGeometry(1, 3),
    new THREE.MeshBasicMaterial({ color: 0xDDDDDD })
);
player.position.set(0, -3, 2);
scene.add(player);

const cameraController = new ThirdPersonCameraController(player);
function pointerLockChangeHandle() {
    if (document.pointerLockElement === canvas) {
        cameraController.attach();
    } else {
        cameraController.deattach();
    }
}

const renderer = new THREE.WebGLRenderer({ canvas });

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer): boolean {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio; // INFO: This thing here can cause performace degredation.
    const width = Math.floor(canvas.clientWidth * pixelRatio);
    const height = Math.floor(canvas.clientHeight * pixelRatio);
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

const camera = cameraController.getCamera();
function animate(time: number) {
    time *= 0.001;

    cube.rotation.x = time;
    cube.rotation.y = time;

    cameraController.update();

    if (resizeRendererToDisplaySize(renderer)) {
        camera.aspect = canvas!.clientWidth / canvas!.clientHeight;
        camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
