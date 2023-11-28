import * as THREE from 'https://threejs.org/build/three.module.js';
import { GLTFLoader } from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';

// Create a scene
var scene = new THREE.Scene();

// Create a camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a GLTFLoader
var loader = new GLTFLoader();

// Load your 3D model
loader.load(
  'diorama_of_cyberpunk_city.glb', // replace with the filename of your model
  function(gltf) {
    scene.add(gltf.scene);
  },
  undefined, // onProgress callback not needed here
  function(error) {
    console.error(error);
  }
);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();