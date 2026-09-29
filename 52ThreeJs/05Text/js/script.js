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

// Function to manipulate camera distance - basically zoom in and out
let zoomIn = true;

function zoom(min, max, value) {
    zoomIn = value > max ? true : value < min ? false : zoomIn;
    return zoomIn ? value - 0.1 : value + 0.1;
}

// To actually be able to display anything with three.js, we need three things: scene, camera and renderer, so that we can render the scene with camera.
// Add Scene ------------------------------------------------- 1
const scene = new THREE.Scene();
// Set background color
scene.background = new THREE.Color(0x2f2f2f);

// Add Camera ------------------------------------------------ 2
// fieldOfView - FOV is the extent of the scene that is seen on the display at any given moment. The value is in degrees.
const fieldOfView = 45;
// aspectRatio - You almost always want to use the width of the element divided by the height, or you'll get the same result as when you play old movies on a widescreen TV - the image looks squished.
let aspectRatio = window.innerWidth / window.innerHeight;
// near and far clipping plane. What that means, is that objects further away from the camera than the value of far or closer than near won't be rendered.
const near = 1;
const far = 500;
let camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);

// Add Renderer ---------------------------------------------- 3
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add Object ------------------------------------------------ 4
// Add Geometry ---------------------------------------------- 4.1
// Geometry is an object that contains all the points (vertices) and fill (faces)
const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));
const geometry = new THREE.BufferGeometry().setFromPoints(points);
// Add Material ---------------------------------------------- 4.2
// material to color it - define a material. For lines we have to use LineBasicMaterial or LineDashedMaterial.
const material = new THREE.LineBasicMaterial({
    color: 0xffa500,
});
// Add Mesh -------------------------------------------------- 4.3
// mesh is an object that takes a geometry, and applies a material to it, which we then can insert to our scene, and move freely around.
const line = new THREE.Line(geometry, material);

// Add the object to the scene ------------------------------- 5
scene.add(line);
// By default, when we call scene.add(), the thing we add will be added to the coordinates (0,0,0). This would cause both the camera and the cube to be inside each other. To avoid this, we simply move the camera out a bit.
camera.position.z = 5;

// Method to set camera position
camera.position.set(0, 0, 100);
// Angle the camera to look at origin
camera.lookAt(0, 0, 0);

const loader = new THREE.FontLoader();
let textMesh1;
loader.load(
    "https://unpkg.com/three@0.77.0/examples/fonts/gentilis_bold.typeface.json",
    function (response) {
        const textGeo = new THREE.TextGeometry("Everything Is Awesome!", {
            font: response,
            size: 3,
            height: 2,
            curveSegments: 12,
            // bevelEnabled: true,
            // bevelThickness: 10,
            // bevelSize: 8,
            // bevelOffset: 0,
            // bevelSegments: 5
        });
        textGeo.computeBoundingBox();

        let materials = [
            new THREE.MeshPhongMaterial({
                color: 0xffa500,
                flatShading: true,
            }), // front
            new THREE.MeshPhongMaterial({
                color: 0xff4500,
            }), // side
        ];
        textMesh1 = new THREE.Mesh(textGeo, materials);

        const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);
        // textMesh1.position.x = centerOffset ;
        textMesh1.position.y = 0;
        textMesh1.position.z = 0;

        textMesh1.rotation.x = 0;
        // textMesh1.rotation.y = Math.PI * 0.5;

        scene.add(textMesh1);
        // Turns out it is necessary to add light. Without light, meshphongmaterial gives black color.

        var light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 1, 1).normalize();
        scene.add(light);
        console.log(textMesh1);

        var center = new THREE.Vector3();
        textMesh1.geometry.computeBoundingBox();
        textMesh1.geometry.boundingBox.getCenter(center);
        textMesh1.geometry.center();
        // console.log(center);
        // center.x = centerOffset ;
        // textMesh1.position.copy(center);
    }
);

// Render the Scene ------------------------------------------ 6
// you wouldn't be able to see anything. This is because we're not actually rendering anything yet. For that, we need what's called a render or animate loop.
function animate() {
    requestAnimationFrame(animate);
    // Animating the lines ------------------------------------ 7
    line.rotation.y += 0.01;
    // textMesh1.rotation.x += 0.01;
    // textMesh1.rotation.y += 0.01;
    // textMesh1.rotation.z += 0.01;
    // camera.position.z = zoom(5, 10, camera.position.z);
    // Basically, anything you want to move or change while the app is running has to go through the animate loop. You can of course call other functions from there, so that you don't end up with an animate function that's hundreds of lines.
    renderer.render(scene, camera);
}
animate();

// This will create a loop that causes the renderer to draw the scene every time the screen is refreshed (on a typical screen this means 60 times per second). If you're new to writing games in the browser, you might say "why don't we just create a setInterval ?" The thing is - we could, but requestAnimationFrame has a number of advantages. Perhaps the most important one is that it pauses when the user navigates to another browser tab, hence not wasting their precious processing power and battery life.

// Handle window resize
function windowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    aspectRatio = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
}

window.addEventListener("resize", windowResize);

window.addEventListener("deviceorientation", handleOrientation, true);

function handleOrientation(event) {
    let absolute = event.absolute;
    let alpha = event.alpha; // (0-360)
    let beta = event.beta; // (0 - 180)
    let gamma = event.gamma; // (-90 to +90)
    console.log(absolute, alpha, beta, gamma);
    // Do stuff with the new orientation data
    textMesh1.rotation.y = Math.PI * (alpha / 360);
}