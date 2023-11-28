// ball.js
import * as THREE from 'https://threejs.org/build/three.module.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load the texture
var textureLoader = new THREE.TextureLoader();
var texture = textureLoader.load('red-scifi-metal_normal-dx.png');

// Create the ball
var geometry = new THREE.SphereGeometry(1, 32, 32);
var material = new THREE.MeshPhongMaterial({map: texture, shininess: 100}); // Use Phong material for dynamic lighting
var ball = new THREE.Mesh(geometry, material);
scene.add(ball);

// Add a rotating point light
var light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(10, 10, 10);
scene.add(light);

// Add ambient light
var ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Position the camera
camera.position.z = 5;

// Create a particle system for a starfield effect
var starGeometry = new THREE.BufferGeometry();
var vertices = [];

// Custom function to generate a random float within a certain spread
function randFloatSpread(range) {
    return range * (2 * Math.random() - 1);
}

for (var i = 0; i < 10000; i++) {
    vertices.push(randFloatSpread(2000)); // x
    vertices.push(randFloatSpread(2000)); // y
    vertices.push(randFloatSpread(2000)); // z
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
var starMaterial = new THREE.PointsMaterial({color: 0x888888});
var starField = new THREE.Points(starGeometry, starMaterial);
scene.add(starField);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the ball and the light
    ball.rotation.x += 0.01;
    ball.rotation.y += 0.01;
    light.position.x = 10 * Math.sin(Date.now() * 0.001);
    light.position.y = 10 * Math.cos(Date.now() * 0.001);

    renderer.render(scene, camera);
}
animate();