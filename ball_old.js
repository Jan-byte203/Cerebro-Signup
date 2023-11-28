// ball.js
import * as THREE from 'https://threejs.org/build/three.module.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load the textures
var textureLoader = new THREE.TextureLoader();
var colorTexture = textureLoader.load('red-scifi-metal_albedo.png');
var normalTexture = textureLoader.load('red-scifi-metal_normal-dx.png');
var aoTexture = textureLoader.load('red-scifi-metal_ao.png');
var displacementTexture = textureLoader.load('red-scifi-metal_height.png');
var metalnessTexture = textureLoader.load('red-scifi-metal_metallic.png');

// Create the ball
var geometry = new THREE.SphereGeometry(1, 32, 32);
var material = new THREE.MeshStandardMaterial({
    map: colorTexture,
    normalMap: normalTexture,
    aoMap: aoTexture,
    displacementMap: displacementTexture,
    displacementScale: 0.05, // You may need to adjust this value depending on your displacement map
    metalnessMap: metalnessTexture,
    metalness: 0.5, // Fully metallic material
    roughness: 0.7 // Adjust this value to control the roughness of the material
});
var ball = new THREE.Mesh(geometry, material);
scene.add(ball);

// Create the glow
var glowGeometry = new THREE.SphereGeometry(1.1, 32, 32); // Slightly larger radius
var glowMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00, // Green glow
    transparent: true,
    opacity: 0.5,
    side: THREE.BackSide // Render only the inside of the sphere
});
var glow = new THREE.Mesh(glowGeometry, glowMaterial);
scene.add(glow);

// Add a rotating point light
var light = new THREE.PointLight(0x00ff00, 2, 1000);
light.position.set(10, 10, 10);
scene.add(light);

// Add ambient light
var ambientLight = new THREE.AmbientLight(0x00ff00);
scene.add(ambientLight);

// Position the camera
camera.position.z = 5;

// Custom function to generate a random float within a certain spread
function randFloatSpread(range) {
    return range * (2 * Math.random() - 1);
}

// Create a particle system for a starfield effect
var starGeometry = new THREE.BufferGeometry();
var vertices = [];
for (var i = 0; i < 10000; i++) {
    vertices.push(randFloatSpread(2000)); // x
    vertices.push(randFloatSpread(2000)); // y
    vertices.push(randFloatSpread(2000)); // z
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
var starMaterial = new THREE.PointsMaterial({color: 0x00ff00});
var starField = new THREE.Points(starGeometry, starMaterial);
scene.add(starField);

// Create a particle system for the whirlwind effect
var particleGeometry = new THREE.BufferGeometry();
var particleVertices = [];
for (var i = 0; i < 1000; i++) {
    particleVertices.push(randFloatSpread(5)); // x
    particleVertices.push(randFloatSpread(5)); // y
    particleVertices.push(randFloatSpread(5)); // z
}
particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particleVertices, 3));
var particleMaterial = new THREE.PointsMaterial({size: 0.005, transparent: true, blending: THREE.AdditiveBlending});
var particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

// Create a first particle system for the dust effect
var dustGeometry = new THREE.BufferGeometry();
var dustVertices = [];
for (var i = 0; i < 5000; i++) {
    dustVertices.push(randFloatSpread(2)); // x
    dustVertices.push(randFloatSpread(2)); // y
    dustVertices.push(randFloatSpread(2)); // z
}
dustGeometry.setAttribute('position', new THREE.Float32BufferAttribute(dustVertices, 3));
var dustMaterial = new THREE.PointsMaterial({size: 0.0001, transparent: true, blending: THREE.AdditiveBlending, color: 0x00ff00});
var dust = new THREE.Points(dustGeometry, dustMaterial);
scene.add(dust);

// Create a second particle system for the dust effect
var dust2Geometry = new THREE.BufferGeometry();
var dust2Vertices = [];
for (var i = 0; i < 5000; i++) {
    dust2Vertices.push(randFloatSpread(2)); // x
    dust2Vertices.push(randFloatSpread(2)); // y
    dust2Vertices.push(randFloatSpread(2)); // z
}
dust2Geometry.setAttribute('position', new THREE.Float32BufferAttribute(dust2Vertices, 3));
var dust2Material = new THREE.PointsMaterial({size: 0.01, transparent: true, blending: THREE.AdditiveBlending, color: 0x00ff00});
var dust2 = new THREE.Points(dust2Geometry, dust2Material);
scene.add(dust2);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the ball and the light
    ball.rotation.x += 0.01;
    ball.rotation.y += 0.01;
    light.position.x = 10 * Math.sin(Date.now() * 0.001);
    light.position.y = 10 * Math.cos(Date.now() * 0.001);

    // Move the particles in a circular path around the ball
    var time = Date.now() * 0.0001;
    particles.rotation.x = time;
    particles.rotation.y = time;

    // Move the dust particles in a circular path around the ball
    var dustTime = Date.now() * 0.00005;
    dust.rotation.x = dustTime;
    dust.rotation.y = dustTime;

    // Move the second dust particles in a circular path around the ball
    var dust2Time = Date.now() * 0.00005;
    dust2.rotation.x = dust2Time;
    dust2.rotation.y = dust2Time;

    renderer.render(scene, camera);
}
animate();