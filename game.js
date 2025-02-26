// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add basic lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Create a simple bean-shaped character
const beanGeometry = new THREE.SphereGeometry(1, 32, 32);
const beanMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const character = new THREE.Mesh(beanGeometry, beanMaterial);
character.scale.set(1, 2, 1); // Make it bean-shaped
scene.add(character);

// Create a simple skateboard
const skateboardGeometry = new THREE.BoxGeometry(1, 0.1, 3);
const skateboardMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const skateboard = new THREE.Mesh(skateboardGeometry, skateboardMaterial);
character.add(skateboard);
skateboard.position.set(0, -1, 0);

// Position the character
character.position.y = 1;

// Adjust camera to follow the character
camera.position.set(0, 5, 10);
camera.lookAt(0, 1, 0);

// Create an infinite floor
const floorGeometry = new THREE.PlaneGeometry(1000, 1000);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x808080, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2;
scene.add(floor);

let velocity = new THREE.Vector3(0, 0, 0);
const acceleration = 0.01;
const friction = 0.98;
let isJumping = false;

function onDocumentKeyDown(event) {
    var keyCode = event.which;
    // Apply force based on key press
    if (keyCode == 87) {
        velocity.z -= acceleration; // W key
    } else if (keyCode == 83) {
        velocity.z += acceleration; // S key
    } else if (keyCode == 65) {
        velocity.x -= acceleration; // A key
    } else if (keyCode == 68) {
        velocity.x += acceleration; // D key
    } else if (keyCode == 32 && !isJumping) { // Space key for jump
        velocity.y += 0.2;
        isJumping = true;
    }
}

function onDocumentKeyUp(event) {
    var keyCode = event.which;
    if (keyCode == 32) { // Space key
        isJumping = false;
    }
}

function onDocumentMouseMove(event) {
    // Implement mouse movement for tricks
    // Example: Rotate character based on mouse movement
    character.rotation.y = (event.clientX / window.innerWidth) * 2 * Math.PI;
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Apply friction
    velocity.multiplyScalar(friction);

    // Apply gravity
    if (character.position.y > 1) {
        velocity.y -= 0.01;
    } else {
        velocity.y = 0;
        character.position.y = 1;
    }

    // Update character position
    character.position.add(velocity);

    renderer.render(scene, camera);
}
animate();

// Add event listeners
document.addEventListener('keydown', onDocumentKeyDown, false);
document.addEventListener('keyup', onDocumentKeyUp, false);
document.addEventListener('mousemove', onDocumentMouseMove, false);
