// Template Code Start
"use strict";
// Just for Fun!
console.log(
    "%c Stop Right There! ",
    "background: #222; color: orange;font-size:20px"
);
console.log(
    "%c You Shall Not Pass! ",
    "background: #222; color: red; font-size:40px"
);
// Template Code End

// To actually be able to display anything with three.js, we need three things: scene, camera and renderer, so that we can render the scene with camera.
// Add Scene ------------------------------------------------- 1
const scene = new THREE.Scene();

// Add Camera ------------------------------------------------ 2
// fieldOfView - FOV is the extent of the scene that is seen on the display at any given moment. The value is in degrees.
const fieldOfView = 75;
// aspectRatio - You almost always want to use the width of the element divided by the height, or you'll get the same result as when you play old movies on a widescreen TV - the image looks squished.
const aspectRatio = window.innerWidth / window.innerHeight;
// near and far clipping plane. What that means, is that objects further away from the camera than the value of far or closer than near won't be rendered.
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);

// Add Renderer ---------------------------------------------- 3
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add Object ------------------------------------------------ 4
// Add Geometry ---------------------------------------------- 4.1
// Geometry is an object that contains all the points (vertices) and fill (faces)
const geometry = new THREE.BoxGeometry();
// Add Material ---------------------------------------------- 4.2
// material to color it
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
});
// Add Mesh -------------------------------------------------- 4.3
// mesh is an object that takes a geometry, and applies a material to it, which we then can insert to our scene, and move freely around.
const cube = new THREE.Mesh(geometry, material);

// Add the object to the scene ------------------------------- 5
scene.add(cube);
// By default, when we call scene.add(), the thing we add will be added to the coordinates (0,0,0). This would cause both the camera and the cube to be inside each other. To avoid this, we simply move the camera out a bit.
camera.position.z = 5;

// Render the Scene ------------------------------------------ 6
// you wouldn't be able to see anything. This is because we're not actually rendering anything yet. For that, we need what's called a render or animate loop.
function animate() {
    requestAnimationFrame(animate);
    // Animating the Cube ------------------------------------ 7
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    // Basically, anything you want to move or change while the app is running has to go through the animate loop. You can of course call other functions from there, so that you don't end up with an animate function that's hundreds of lines.
    renderer.render(scene, camera);
}
animate();

// This will create a loop that causes the renderer to draw the scene every time the screen is refreshed (on a typical screen this means 60 times per second). If you're new to writing games in the browser, you might say "why don't we just create a setInterval ?" The thing is - we could, but requestAnimationFrame has a number of advantages. Perhaps the most important one is that it pauses when the user navigates to another browser tab, hence not wasting their precious processing power and battery life.