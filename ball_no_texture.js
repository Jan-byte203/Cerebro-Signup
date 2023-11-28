// ball.js
import * as THREE from 'https://threejs.org/build/three.module.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the transparent ball
var geometry = new THREE.SphereGeometry(1, 32, 32);
var material = new THREE.MeshBasicMaterial({
    color: 0x00ff00, // Green
    transparent: true,
    opacity: 0.1
});
var ball = new THREE.Mesh(geometry, material);
scene.add(ball);

// Position the camera
camera.position.z = 5;

// Custom function to generate a random float within a certain spread
function randFloatSpread(range) {
    return range * (2 * Math.random() - 1);
}

// Create a particle system for the dust effect
var particleCount = 1000;
var particleGeometry = new THREE.Geometry();
var particleVelocities = [];
for (var i = 0; i < particleCount; i++) {
    var vertex = new THREE.Vector3();
    particleGeometry.vertices.push(vertex);
    var velocity = new THREE.Vector3(randFloatSpread(0.02), randFloatSpread(0.02), randFloatSpread(0.02));
    particleVelocities.push(velocity);
}
var particleMaterial = new THREE.PointsMaterial({color: 0x00ff00, size: 0.1});
var particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the ball
    ball.rotation.x += 0.01;
    ball.rotation.y += 0.01;

    // Update the positions of the particles
    for (var i = 0; i < particleCount; i++) {
        particles.geometry.vertices[i].add(particleVelocities[i]);
        if (particles.geometry.vertices[i].length() > 5) {
            particles.geometry.vertices[i].set(0, 0, 0);
            particleVelocities[i].set(randFloatSpread(0.02), randFloatSpread(0.02), randFloatSpread(0.02));
        }
    }
    particles.geometry.verticesNeedUpdate = true;

    renderer.render(scene, camera);
}
animate();