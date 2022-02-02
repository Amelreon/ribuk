import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

let gltfLoader = new GLTFLoader();
let gltfLoader2 = new GLTFLoader();

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe0e0e0);
scene.fog = new THREE.Fog(0xe0e0e0, 20, 100);

// Lights

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(0, 4, 8);
dirLight.castShadow = true;
scene.add(dirLight);

// Objects
const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);

// Materials

const material = new THREE.MeshBasicMaterial();
material.color = new THREE.Color(0xff0000);

// Mesh
const sphere = new THREE.Mesh(geometry, material);
// scene.add(sphere);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 4;
scene.add(camera);

//  our Main Seen

gltfLoader.load("all-sceen.gltf", (gltf) => {
  gltf.scene.scale.set(3, 3, 3);
  gltf.scene.rotation.set(0.2, -0.3, 0);
  scene.add(gltf.scene);
});

//  our Man
gltfLoader2.load("Home.gltf", (gltf) => {
  gltf.scene.scale.set(3, 3, 3);
  gltf.scene.rotation.set(-1, 0, 0);
  gltf.scene.position.set(0, -0.5, 2);
  scene.add(gltf.scene);

 

  window.addEventListener(
    "keydown",
    function (event) {
      if (event.defaultPrevented) {
        return;
      }
      if (event.code === "ArrowDown") {
        gltf.scene.position.y += -0.5;
      } else if (event.code === "ArrowUp") {
        gltf.scene.position.y += 0.5;
      } else if (event.code === "ArrowLeft") {
        gltf.scene.position.x += -0.5;
      } else if (event.code === "ArrowRight") {
        gltf.scene.position.x += 0.5;
      }
      event.preventDefault();
    },
    true
  );
});

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
