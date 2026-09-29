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

let cloudMaterial, cloudGeo, rainMaterial, ambient, directionalLight, scene, camera, renderer, cloudParticles = [],
    flash, rain, rainGeo, rainCount = 15000;
let rainDropPoints = [];
const velocities = [];

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 0.27;
    ambient = new THREE.AmbientLight(0x555555);
    scene.add(ambient);
    directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);
    flash = new THREE.PointLight(0x062d89, 30, 500, 1.7);
    flash.position.set(200, 300, 100);
    scene.add(flash);
    renderer = new THREE.WebGLRenderer();
    scene.fog = new THREE.FogExp2(0x11111f, 0.002);
    renderer.setClearColor(scene.fog.color);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    for (let i = 0; i < rainCount; i++) {
        let rainDrop = new THREE.Vector3(
            Math.random() * 400 - 200,
            Math.random() * 500 - 250,
            Math.random() * 400 - 200
        );
        velocities.push(0);
        rainDropPoints.push(rainDrop);
    }
    rainGeo = new THREE.BufferGeometry().setFromPoints(rainDropPoints);
    rainMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.1,
        transparent: true
    });
    rain = new THREE.Points(rainGeo, rainMaterial);
    scene.add(rain);
    let loader = new THREE.TextureLoader();
    loader.load("img/smoke.png", function (texture) {
        cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
        cloudMaterial = new THREE.MeshLambertMaterial({
            map: texture,
            transparent: true
        });
        for (let p = 0; p < 25; p++) {
            let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
            cloud.position.set(
                Math.random() * 800 - 400,
                500,
                Math.random() * 500 - 450
            );
            cloud.rotation.x = 1.16;
            cloud.rotation.y = -0.12;
            cloud.rotation.z = Math.random() * 360;
            cloud.material.opacity = 0.6;
            cloudParticles.push(cloud);
            scene.add(cloud);
        }
        animate();
    });
}

function animate() {
    cloudParticles.forEach(p => {
        p.rotation.z -= 0.002;
    });
    const positionAttribute = rainGeo.getAttribute('position');
    for (let i = 0; i < positionAttribute.count; i++) {
        velocities[i] -= 0.1 + Math.random() * 0.1;
        let y = positionAttribute.getY(i) + velocities[i];
        positionAttribute.setY(i, y)
        if (y < -200) {
            positionAttribute.setY(i, 200)
            velocities[i] = 0;
        }
    }
    positionAttribute.needsUpdate = true;
    rain.rotation.y += 0.002;
    if (Math.random() > 0.93 || flash.power > 100) {
        if (flash.power < 100)
            flash.position.set(
                Math.random() * 400,
                300 + Math.random() * 200,
                100
            );
        flash.power = 50 + Math.random() * 500;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
init();