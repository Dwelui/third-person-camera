import html from './resources/ThirdPersonCameraComponentTemplate.html?raw';

export class ThirdPersonCameraComponent extends HTMLElement {
    constructor() {
        super();

        console.info("ThirdPersonCameraComponent::Started");

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = html;

        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            console.log('YOU CLICKED IT!');
        });
    }
}

customElements.define('third-person-camera-component', ThirdPersonCameraComponent);

