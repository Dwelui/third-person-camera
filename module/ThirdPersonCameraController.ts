import * as THREE from 'three';

export class ThirdPersonCameraController {
    #player: THREE.Mesh;
    #camera: THREE.PerspectiveCamera;
    #cameraOffset: THREE.Vector3;
    #cameraPivot: THREE.Object3D;
    #cameraPivotOffset: THREE.Vector3;
    #attached: boolean = false;
    #playerYawEuler: THREE.Euler = new THREE.Euler(0, 0, 0, 'YXZ');
    #sensitivity: number = 50;
    #handleInputBound: (e: MouseEvent) => void;

    constructor(
        player: THREE.Mesh
    ) {
        this.#handleInputBound = this.handleInput.bind(this);

        this.#player = player;

        this.#cameraPivotOffset = new THREE.Vector3(2, 1.5, 1); // TODO: Add half player size to y to level to head hight.
        this.#cameraOffset = new THREE.Vector3(0, 0, 5);

        this.#camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.#camera.position.copy(this.#cameraOffset);

        this.#cameraPivot = new THREE.Object3D();
        this.#cameraPivot.position.copy(this.#cameraPivotOffset);

        //this.#camera.position.set(...this.#cameraOffset.toArray());
        this.#cameraPivot.add(this.#camera);
        this.#player.add(this.#cameraPivot);
    }

    getCamera(): THREE.PerspectiveCamera { return this.#camera; }

    getSensitivity(): number { return this.#sensitivity };

    /**
     * Set camera controls sensitivity.
     *
     * @param number - Minimum value is 1 and maximum is 100. Default values is 50.
     *
     * @returns Returns false if range is not respected.
     */
    setSensitivity(number: number): boolean {
        if (number < 1 || number > 100) {
            return false;
        }

        this.#sensitivity = number;
        return true;
    }

    handleInput(e: MouseEvent): void {
        // Swapped x and y.
        this.#playerYawEuler.y -= e.movementX * Math.pow(this.#sensitivity, 2) * 0.000001;
        this.#playerYawEuler.x -= e.movementY * Math.pow(this.#sensitivity, 2) * 0.000001;

        if (this.#playerYawEuler.x > Math.PI / 2) {
            this.#playerYawEuler.x = Math.PI / 2;
        }

        if (this.#playerYawEuler.x < -Math.PI / 2) {
            this.#playerYawEuler.x = -Math.PI / 2;
        }
    }

    attach(): void {
        document.addEventListener("mousemove", this.#handleInputBound, false);
        this.#attached = true;

        console.info("ThirdPersonCameraController::Attached");
    }

    deattach(): void {
        document.removeEventListener("mousemove", this.#handleInputBound, false);
        this.#attached = false;

        console.info("ThirdPersonCameraController::Deattached");
    }

    /**
     * Updates camera using saved data.
     * Should usually called during game ticks.
     */
    update() {
        if (!this.#attached) return;

        // INFO: might need to seperate yaw and pitch.
        // yaw - should turn player.
        // pitch - should pitch camera pivot.
        this.#player.setRotationFromEuler(this.#playerYawEuler);
    }
}
