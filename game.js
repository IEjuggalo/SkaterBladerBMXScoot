// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a simple skate object
const geometry = new THREE.BoxGeometry(1, 0.1, 3);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const skate = new THREE.Mesh(geometry, material);
scene.add(skate);

// Create a simple character model
const charGeometry = new THREE.BoxGeometry(1, 2, 1);
const charMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const character = new THREE.Mesh(charGeometry, charMaterial);
scene.add(character);

// Position the character
character.position.y = 1;

// Adjust camera to top-down view
camera.position.set(0, 10, 0);
camera.lookAt(0, 0, 0);

// Create an infinite floor
const floorGeometry = new THREE.PlaneGeometry(1000, 1000);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x808080, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2;
scene.add(floor);

// Add event listener for user controls and camera controls
document.addEventListener('keydown', onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    // Character controls
    if (keyCode == 87) {
        character.position.z -= 0.1; // W key
    } else if (keyCode == 83) {
        character.position.z += 0.1; // S key
    } else if (keyCode == 65) {
        character.position.x -= 0.1; // A key
    } else if (keyCode == 68) {
        character.position.x += 0.1; // D key
    }
    // Camera follows the character
    camera.position.set(character.position.x, 10, character.position.z);
    camera.lookAt(character.position);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
