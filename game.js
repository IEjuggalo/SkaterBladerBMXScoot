// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load 3D models using GLTFLoader
const loader = new THREE.GLTFLoader();

let character, skateboard, bmxBike, scooter, aggressiveInline;

// Load character model
function loadCharacter(callback) {
    loader.load('models/character.glb', function(gltf) {
        character = gltf.scene;
        character.scale.set(1, 1, 1);
        scene.add(character);
        callback();
    });
}

// Load skateboard model
function loadSkateboard() {
    loader.load('models/skateboard.glb', function(gltf) {
        skateboard = gltf.scene;
        skateboard.scale.set(1, 1, 1);
        character.add(skateboard);
        skateboard.position.set(0, -1, 0);
    });
}

// Load BMX bike model
function loadBmxBike() {
    loader.load('models/bmxBike.glb', function(gltf) {
        bmxBike = gltf.scene;
        bmxBike.scale.set(1, 1, 1);
        character.add(bmxBike);
        bmxBike.position.set(0, -1, 0);
    });
}

// Load scooter model
function loadScooter() {
    loader.load('models/scooterCharacter.glb', function(gltf) {
        scooter = gltf.scene;
        scooter.scale.set(1, 1, 1);
        scene.add(scooter);
        scooter.position.set(0, 1, 0);
    });
}

// Load aggressive inline model
function loadAggressiveInline() {
    loader.load('models/aggressiveInline.glb', function(gltf) {
        aggressiveInline = gltf.scene;
        aggressiveInline.scale.set(1, 1, 1);
        character.add(aggressiveInline);
        aggressiveInline.position.set(0, -1, 0);
    });
}

// Position the character
function positionCharacter() {
    character.position.y = 1;
}

// Adjust camera to top-down view
camera.position.set(0, 50, 0);
camera.lookAt(0, 0, 0);

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

// Add event listener for user controls and camera controls
document.addEventListener('keydown', onDocumentKeyDown, false);
document.addEventListener('keyup', onDocumentKeyUp, false);
document.addEventListener('mousemove', onDocumentMouseMove, false);

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

// Functions to switch vehicles
function switchToSkateboard() {
    if (character) {
        character.remove(skateboard);
        character.remove(bmxBike);
        character.remove(scooter);
        character.remove(aggressiveInline);
        loadSkateboard();
    }
}

function switchToBmxBike() {
    if (character) {
        character.remove(skateboard);
        character.remove(bmxBike);
        character.remove(scooter);
        character.remove(aggressiveInline);
        loadBmxBike();
    }
}

function switchToScooter() {
    if (character) {
        character.remove(skateboard);
        character.remove(bmxBike);
        character.remove(scooter);
        character.remove(aggressiveInline);
        loadScooter();
    }
}

function switchToAggressiveInline() {
    if (character) {
        character.remove(skateboard);
        character.remove(bmxBike);
        character.remove(scooter);
        character.remove(aggressiveInline);
        loadAggressiveInline();
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Apply friction
    velocity.multiplyScalar(friction);

    // Apply gravity
    if (character && character.position.y > 1) {
        velocity.y -= 0.01;
    } else if (character) {
        velocity.y = 0;
        character.position.y = 1;
    }

    // Update character position
    if (character) {
        character.position.add(velocity);
    }

    renderer.render(scene, camera);
}
animate();

// Load the character and then switch to the default mode
loadCharacter(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');

    // Load the appropriate mode
    if (mode === 'skateboard') {
        switchToSkateboard();
    } else if (mode === 'bmx') {
        switchToBmxBike();
    } else if (mode === 'scooter') {
        switchToScooter();
    } else if (mode === 'inline') {
        switchToAggressiveInline();
    }
});
