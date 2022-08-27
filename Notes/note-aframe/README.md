# A-Frame Notes

[![Visitors](https://api.visitorbadge.io/api/visitors?path=aasisodiya.WebProjects.notes.aframe&labelColor=%23ffa500&countColor=%23263759&labelStyle=upper)](https://visitorbadge.io/status?path=aasisodiya.WebProjects.notes.aframe)

- [A-Frame Notes](#a-frame-notes)
  - [Fog In Scene](#fog-in-scene)
    - [Linear Fog](#linear-fog)
    - [Exponential Fog](#exponential-fog)
    - [Excluding a Material from Fog](#excluding-a-material-from-fog)
  - [Mixins](#mixins)
  - [Sky](#sky)
    - [Example](#example)
    - [Attributes](#attributes)
  - [Light](#light)
  - [3D Model](#3d-model)
  - [Camera](#camera)
  - [Box Animation](#box-animation)
  - [Box Cloud Animation](#box-cloud-animation)
  - [Plane Reveal Animation](#plane-reveal-animation)
  - [Shutting Down The Keyboard Input](#shutting-down-the-keyboard-input)
  - [Edge Of Cube Shape](#edge-of-cube-shape)
  - [Generic Box Logo](#generic-box-logo)
  - [Image Animation](#image-animation)
  - [Sun Planet](#sun-planet)
  - [`a-scene` Stats](#a-scene-stats)
  - [Audio](#audio)
    - [Audio Attributes](#audio-attributes)
    - [Playing on an Event](#playing-on-an-event)
  - [If Both Surface Needs To Be Visible](#if-both-surface-needs-to-be-visible)
  - [Hexagon Cylinder](#hexagon-cylinder)
  - [Screenshot](#screenshot)
  - [Cone](#cone)
    - [Cone Example](#cone-example)
  - [C4D 3D Model In VR](#c4d-3d-model-in-vr)
    - [3D Model Example](#3d-model-example)
  - [`a-sphere` Earth](#a-sphere-earth)
  - [Easing Animation](#easing-animation)
  - [Text `a-text`](#text-a-text)
  - [360 Video](#360-video)
  - [Video](#video)
  - [Donut / Tube / Ring](#donut--tube--ring)
  - [Torus Knot](#torus-knot)
  - [Tetrahedron](#tetrahedron)
  - [Disable Inspect Element](#disable-inspect-element)
    - [Right Click](#right-click)
    - [Keys](#keys)
  - [Panaroma Image 360](#panaroma-image-360)
  - [CDN Links](#cdn-links)
  - [Flying Camera](#flying-camera)
  - [Point Light Animation](#point-light-animation)
  - [Text 3d VR](#text-3d-vr)
  - [Follow a predefined path](#follow-a-predefined-path)
  - [FPS view](#fps-view)
  - [Linking Pages HREF](#linking-pages-href)
    - [HREF](#href)
  - [Infinity Floor](#infinity-floor)
  - [Making Object Solid](#making-object-solid)
  - [Mountain](#mountain)
  - [Sun Sky](#sun-sky)

## Fog In Scene

```html
<a-scene fog="type: linear; color: #AAB; far: 30; near: 0">
  <a-scene fog="color: #bc483e; near: 0; far: 65;"> </a-scene
></a-scene>
```

| Property | Description                                                                          | Default Value |
| -------- | ------------------------------------------------------------------------------------ | ------------- |
| type     | Type of fog distribution. Can be linear or exponential.                              | linear        |
| color    | Color of fog. For example, if set to black, far away objects will be rendered black. | #000          |

### Linear Fog

Linear fog grows linearly denser with distance.

| Property | Description                                                                                | Default Value |
| -------- | ------------------------------------------------------------------------------------------ | ------------- |
| near     | Minimum distance to start applying fog. Objects closer than this won’t be affected by fog. | 1             |
| far      | Maximum distance to stop applying fog. Objects farther than this won’t be affected by fog. | 1000          |

### Exponential Fog

Exponential fog grows exponentially denser with distance.

| Property | Description                      | Default Value |
| -------- | -------------------------------- | ------------- |
| density  | How quickly the fog grows dense. | 0.00025       |

### Excluding a Material from Fog

To not apply fog to certain entities, we can disable fog for certain materials.

```html
<a-entity material="fog: false"></a-entity>
```

## Mixins

Mixins provide a way to compose and reuse commonly-used sets of component properties. They are defined using the `<a-mixin></a-mixin>` element and are placed in `<a-assets></a-assets>`. Mixins should be set with an id, and when an entity sets that id as its mixin attribute, the entity will absorb all of the mixin’s attributes.

```html
<a-scene>
  <a-assets>
    <a-mixin id="red" material="color: red"></a-mixin>
    <a-mixin id="blue" material="color: blue"></a-mixin>
    <a-mixin id="cube" geometry="primitive: box"></a-mixin>
  </a-assets>
  <a-entity mixin="red cube"></a-entity>
  <a-entity mixin="blue cube"></a-entity>
</a-scene>
```

The entity with red cube will take the properties from the red mixin and the cube mixin in that order. Likewise with the blue cube. Conceptually, the entities above expand to:

```html
<a-entity material="color: red" geometry="primitive: box"></a-entity>
<a-entity material="color: blue" geometry="primitive: box"></a-entity>
```

## Sky

```html
<a-sky></a-sky>
```

The sky primitive adds a background color or 360° image to a scene. A sky is a large sphere with a color or texture mapped to the inside.

### Example

An equirectangular image as a background:

```html
<a-scene>
  <a-assets>
    <img id="sky" src="sky.png" />
  </a-assets>
  <a-sky src="#sky"></a-sky>
</a-scene>
```

A plain color as a background:

```html
<a-sky color="#6EBAA7"></a-sky>
```

### Attributes

| Attribute       | Component Mapping       | Default Value |
| --------------- | ----------------------- | ------------- |
| color           | material.color          | #FFF          |
| metalness       | material.metalness      | 0             |
| opacity         | material.opacity        | 1             |
| phi-length      | geometry.phiLength      | 360           |
| phi-start       | geometry.phiStart       | 0             |
| radius          | geometry.radius         | 5000          |
| repeat          | material.repeat         | None          |
| roughness       | material.roughness      | 0.5           |
| segments-height | geometry.segmentsHeight | 20            |
| segments-width  | geometry.segmentsWidth  | 64            |
| shader          | material.shader         | flat          |
| side            | material.side           | front         |
| src             | material.src            | None          |
| theta-length    | geometry.thetaLength    | 180           |
| theta-start     | geometry.thetaStart     | 0             |
| transparent     | material.transparent    | false         |

```html
<a-entity
  id="sky"
  geometry="primitive: sphere; radius: 65;"
  material="shader: skyGradient; colorTop: #353449; colorBottom: #BC483E; side: back"
></a-entity>
```

## Light

```html
<a-mixin
  id="light"
  geometry="primitive: sphere; radius: 1.5"
  material="color: #FFF; shader: flat"
  light="color: #DDDDFF; distance: 120; intensity: 2; type: point"
>
</a-mixin>
```

```html
<a-entity
  light="type: point; color: #f4f4f4; intensity: 0.2; distance: 0"
  position="8 10 18"
></a-entity>
<a-entity
  light="type: point; color: #f4f4f4; intensity: 0.6; distance: 0"
  position="-8 10 -18"
></a-entity>
<a-entity
  light="type: ambient; color: #f4f4f4; intensity: 0.4;"
  position="-8 10 -18"
></a-entity>
<a-entity light="type: spot; angle: 45"></a-entity>
<a-entity
  light="type: point; intensity: 0.75; distance: 50; decay: 2"
  position="0 10 10"
></a-entity>
<a-entity
  light="type: hemisphere; color: #33C; groundColor: #3C3; intensity: 2"
></a-entity>
<a-light
  type="directional"
  position="0 0 0"
  rotation="-90 0 0"
  target="#directionaltarget"
>
  <a-entity id="directionaltarget" position="0 0 -1"></a-entity>
</a-light>
<a-entity
  light="type: directional; color: #EEE; intensity: 0.5"
  position="-1 1 0"
></a-entity>
<a-entity light="type: ambient; color: #CCC"></a-entity>
<a-entity light="type: ambient; color: #BBB"></a-entity>
<a-entity
  light="type: directional; color: #FFF; intensity: 0.6"
  position="-0.5 1 1"
></a-entity>
```

```html
<!-- Red directional light shining from the top left. -->
<a-light color="red" position="-1 1 0"></a-light>
<!-- Blue point light, 5 meters in the air. -->
<a-light type="point" color="blue" position="0 5 0"></a-light>
<!-- Dim ambient lighting. -->
<a-light type="ambient" color="#222"></a-light>
```

| Attribute | Component Mapping        | Default Value |
| --------- | ------------------------ | ------------- |
| angle     | light.angle              | 60            |
| color     | light.color              | #fff          |
| decay     | light.decay              | 1             |
| distance  | light.distance           | 0.0           |
| ground    | -color light.groundColor | #fff          |
| intensity | light.intensity          | 1.0           |
| penumbra  | light.penumbra           | 0.0           |
| type      | light.type               | directional   |
| target    | light.target             | null          |

## 3D Model

```html
<a-assets>
  <a-asset-item
    id="tree"
    src="../../assets/models/tree2/tree2.dae"
  ></a-asset-item>
</a-assets>

<a-collada-model src="#tree" rotation="0 45 0"></a-collada-model>
<a-sky color="#ECECEC"></a-sky>
<a-entity position="0 0 4">
  <a-camera></a-camera>
</a-entity>
```

## Camera

```html
<!-- Quasi-isometric camera -->
<a-entity>
  <a-entity position="0 880 1290" rotation="-34 0 0">
    <a-camera
      id="camera"
      near="1000"
      far="4000"
      fov="2.2"
      user-height="0"
      wasd-controls-enabled="false"
      look-controls-enabled="false"
    ></a-camera>
  </a-entity>
</a-entity>
```

## Box Animation

```html
<a-entity rotation="-140 0 0" position="0 15 0" scale="1 0 1">
  <a-animation
    attribute="scale"
    to="1 1 1"
    delay="800"
    dur="800"
    easing="ease-out"
  ></a-animation>
  <a-box
    width="12.49"
    depth=".1"
    height="30"
    color="#ffa500"
    position="0 15 -.52"
    shader="flat"
  ></a-box>
  <a-box
    width="12.5"
    depth="1"
    height="30"
    color="#323232"
    position="0 15 0"
  ></a-box>
</a-entity>
```

## Box Cloud Animation

```html
<a-box color="white" opacity="0.65" width="8" depth="12" height="4">
  <a-animation
    attribute="position"
    from="5 32 -80"
    to="5 32 120"
    delay="12000"
    dur="48000"
    easing="linear"
    repeat="indefinite"
    fill="both"
  ></a-animation>
</a-box>
```

## Plane Reveal Animation

```html
<!-- Series of planes that use pivot, position, and animated scales to reveal themselves. -->
<a-entity position="-2 -1 -7" rotation="0 35 0">
  <a-plane mixin="plane" position="0 6 0" color="#F16745">
    <a-animation
      attribute="scale"
      from="1 0 1"
      to="1 1 1"
      dur="750"
      delay="500"
      fill="backwards"
    ></a-animation>
  </a-plane>

  <a-plane mixin="plane" position="0 4 0" color="#7BC8A4">
    <a-animation
      attribute="scale"
      from="0 1 1"
      to="1 1 1"
      dur="750"
      delay="500"
      fill="backwards"
    ></a-animation>
  </a-plane>

  <a-plane mixin="plane" position="0 2 0" color="#4CC3D9">
    <a-animation
      attribute="scale"
      from="0 0 0"
      to="1 0.05 1"
      dur="500"
      delay="500"
    ></a-animation>
    <a-animation
      attribute="scale"
      from="1 0.05 1"
      to="1 1 1"
      dur="250"
      delay="1000"
      fill="both"
    ></a-animation>
  </a-plane>

  <a-plane mixin="plane" position="0 0 0" color="#EF2D5E">
    <a-animation
      attribute="rotation"
      from="90 0 0"
      to="0 0 0"
      dur="750"
      delay="500"
      x
      fill="backwards"
    ></a-animation>
  </a-plane>
</a-entity>
```

## Shutting Down The Keyboard Input

```html
<a-entity>
  <a-camera
    fov="80"
    near="0.1"
    wasd-controls-enabled="false"
    user-height="0"
    look-controls-enabled="false"
  ></a-camera>
</a-entity>
```

## Edge Of Cube Shape

```html
<a-assets>
  <a-mixin
    id="frame-edge"
    geometry="primitive: box; depth: 10; height: 0.5; width: 1"
    material="color: #404040"
  ></a-mixin>
</a-assets>
```

```html
<a-entity scale="0.04 0.04 0.04">
  <a-entity mixin="frame-edge" position="5 5 0" rotation="0 0 0"></a-entity>
  <a-entity mixin="frame-edge" position="5 -5 0" rotation="0 0 0"></a-entity>
  <a-entity mixin="frame-edge" position="-5 5 0" rotation="0 0 0"></a-entity>
  <a-entity mixin="frame-edge" position="-5 -5 0" rotation="0 0 0"></a-entity>
  <a-entity mixin="frame-edge" position="0 5 5" rotation="0 90 0"></a-entity>
  <a-entity mixin="frame-edge" position="0 5 -5" rotation="0 90 0"></a-entity>
  <a-entity mixin="frame-edge" position="0 -5 5" rotation="0 90 0"></a-entity>
  <a-entity mixin="frame-edge" position="0 -5 -5" rotation="0 90 0"></a-entity>
  <a-entity mixin="frame-edge" position="5 0 5" rotation="90 0 0"></a-entity>
  <a-entity mixin="frame-edge" position="5 0 -5" rotation="90 0 0"></a-entity>
  <a-entity mixin="frame-edge" position="-5 0 5" rotation="90 0 0"></a-entity>
  <a-entity mixin="frame-edge" position="-5 0 -5" rotation="90 0 0"></a-entity>
</a-entity>
```

## Generic Box Logo

```html
<a-entity id="box">
  <a-animation
    attribute="scale"
    from="0 0 0"
    to="1 1 1"
    delay="500"
    dur="500"
    fill="both"
    easing="ease-out"
  ></a-animation>
  <a-animation
    attribute="position"
    from="0 -0.5 0"
    to="0 0 0"
    delay="500"
    dur="500"
    fill="both"
    easing="ease-out"
  ></a-animation>
  <a-animation
    attribute="rotation"
    from="0 -300 0"
    to="30 54 36"
    delay="500"
    dur="1200"
    fill="both"
    easing="ease-out"
  ></a-animation>
  <a-box width="0.25" depth="0.25" height="0.25" color="#EF2D5E"></a-box>

  <a-entity scale="0.04 0.04 0.04">
    <a-entity mixin="frame-edge" position="5 5 0" rotation="0 0 0"></a-entity>
    <a-entity mixin="frame-edge" position="5 -5 0" rotation="0 0 0"></a-entity>
    <a-entity mixin="frame-edge" position="-5 5 0" rotation="0 0 0"></a-entity>
    <a-entity mixin="frame-edge" position="-5 -5 0" rotation="0 0 0"></a-entity>
    <a-entity mixin="frame-edge" position="0 5 5" rotation="0 90 0"></a-entity>
    <a-entity mixin="frame-edge" position="0 5 -5" rotation="0 90 0"></a-entity>
    <a-entity mixin="frame-edge" position="0 -5 5" rotation="0 90 0"></a-entity>
    <a-entity
      mixin="frame-edge"
      position="0 -5 -5"
      rotation="0 90 0"
    ></a-entity>
    <a-entity mixin="frame-edge" position="5 0 5" rotation="90 0 0"></a-entity>
    <a-entity mixin="frame-edge" position="5 0 -5" rotation="90 0 0"></a-entity>
    <a-entity mixin="frame-edge" position="-5 0 5" rotation="90 0 0"></a-entity>
    <a-entity
      mixin="frame-edge"
      position="-5 0 -5"
      rotation="90 0 0"
    ></a-entity>
  </a-entity>
</a-entity>
```

## Image Animation

```html
<a-image id="webvr" src="webvr.png" width="1" height="0.25" opacity="0.75">
  <a-animation
    attribute="scale"
    from="1 0 1"
    to="0.75 0.75 0.75"
    delay="1500"
    dur="200"
    fill="both"
    easing="ease-out"
  ></a-animation>
  <a-animation
    attribute="position"
    from="0 -3 0"
    to="0 -0.7 0"
    delay="1000"
    dur="1000"
    fill="both"
    easing="ease-out"
  ></a-animation>
</a-image>
```

## Sun Planet

```html
<a-assets>
  <a-mixin id="planet" geometry="primitive: sphere; radius: 0.5"></a-mixin>
  <a-mixin
    id="orbit"
    attribute="rotation"
    to="0 360 0"
    repeat="indefinite"
    easing="linear"
    dur="3000"
  ></a-mixin>
  <a-mixin
    id="spin"
    attribute="rotation"
    to="0 360 0"
    repeat="indefinite"
    easing="linear"
    dur="96000"
  ></a-mixin>
  <img id="sun" src="sun.jpg" />
</a-assets>

<a-entity position="0 0 0">
  <a-animation mixin="orbit" dur="8000"></a-animation>
  <a-entity
    mixin="planet"
    material="color: red"
    position="8 0 0"
    geometry="radius: 1"
  ></a-entity>
</a-entity>

<a-entity
  mixin="planet"
  geometry="radius: 3"
  material="shader: flat; src: #sun"
  rotation="0 0 0"
>
  <a-animation mixin="spin"></a-animation>
</a-entity>
```

## `a-scene` Stats

```html
<a-scene stats></a-scene>
```

## Audio

```html
<a-sound src="src: url(click.mp3)" autoplay="true" position="0 2 5"></a-sound>
```

### Audio Attributes

| Attribute | Component Mapping                                                                    | Default Value |
| --------- | ------------------------------------------------------------------------------------ | ------------- |
| autoplay  | sound.autoplay                                                                       | false         |
| loop      | sound.loop                                                                           | false         |
| on        | sound.on                                                                             | null          |
| src       | sound.src                                                                            | null          |
| volume    | sound.volume                                                                         | 1             |
| poolSize  | Numbers of simultaneous instances of this sound that can be playing at the same time |               |

### Playing on an Event

The sound component can also listen to an event before playing as well. For example, we might have a laughing sound play every time we click a monster:

```html
<a-entity cursor position="0 0 -5"></a-entity>
<a-entity
  id="elmo"
  geometry="primitive: box"
  material="src: elmo.png"
  sound="src: url(ticklelaugh.mp3); on: click"
></a-entity>
```

## If Both Surface Needs To Be Visible

```html
side="double"
```

## Hexagon Cylinder

```html
<!-- Hexagon -->
<a-cylinder
  position="-4 0 -5"
  rotation="90 -90 20"
  radius="1"
  segments-radial="6"
  color="#F16745"
></a-cylinder>
```

## Screenshot

Did you know that A-Frame v0.4.0 lets you take a screenshot of any scene? Press <kbd>ctrl</kbd> + <kbd>alt</kbd> + s to take a regular screenshot or <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>shift</kbd> + <kbd>s</kbd> to capture an equirectangular panorama.

## Cone

```html
<a-cone></a-cone>
```

The cone primitive creates a cone shape.

### Cone Example

```html
<a-assets>
  <img id="texture" src="texture.png" />
</a-assets>
<!-- Basic cone. -->
<a-cone color="tomato" radius-bottom="2" radius-top="0.5"></a-cone>
<!-- Textured box. -->
<a-cone src="#texture"></a-cone>
```

## C4D 3D Model In VR

The `.OBJ` model primitive displays a 3D Wavefront model.

### 3D Model Example

```html
<a-scene>
  <a-assets>
    <a-asset-item id="crate-obj" src="crate.obj"></a-asset-item>
    <a-asset-item id="crate-mtl" src="crate.mtl"></a-asset-item>
  </a-assets>
  <!-- Using the asset management system. -->
  <a-obj-model src="#crate-obj" mtl="#crate-mtl"></a-obj-model>
  <!-- Defining the URL inline. Not recommended but may be more comfortable. -->
  <a-obj-model src="crate.obj" mtl="crate.mtl"></a-obj-model>
</a-scene>
```

## `a-sphere` Earth

```html
<a-sphere src="#earth" radius="2" position="0 1 -3" side="double"></a-sphere>
```

## Easing Animation

```html
easing="linear"
```

## Text `a-text`

```html
<a-text
  value="COLLADA"
  color="#000000"
  position="-2 -2 6"
  scale="1.5 1.5 1.5"
></a-text>

<a-entity
  position="0 4 -4"
  text="color: white; align: left; width: 5; font: exo2semibold;
              value: align='left' (default anchor) Exo2SemiBold 123456789012345678901234567890123456789012345678901234567890"
></a-entity>

<a-entity
  position="0 5 -4"
  text="color: white; align: center; width: 5; font: kelsonsans;
              value: align='center' (default anchor) KelsonSans 123456789012345678901234567890123456789012345678901234567890"
></a-entity>

<a-text
  value="COLLADA"
  color="#000000"
  position="-2 0 -6"
  scale="1.5 1.5 1.5"
  font="exo2semibold"
></a-text>
<a-text
  value="COLLADA"
  color="#000000"
  position="-4 0 -6"
  scale="1.5 1.5 1.5"
  font="kelsonsans"
></a-text>
```

## 360 Video

```html
  <a-assets>
    <video id="antarctica" autoplay loop="true" src="antarctica.mp4">
  </a-assets>
  <!-- Using the asset management system. -->
  <a-videosphere src="#antarctica"></a-videosphere>
  <!-- Defining the URL inline. Not recommended but more comfortable for web developers. -->
  <a-videosphere src="africa.mp4"></a-videosphere>
```

## Video

```html
<a-scene>
  <a-assets>
    <video
      id="penguin-sledding"
      autoplay
      loop="true"
      src="penguin-sledding.mp4"
    ></video>
  </a-assets>
  <!-- Using the asset management system. -->
  <a-video
    src="#penguin-sledding"
    width="16"
    height="9"
    position="0 0 -20"
  ></a-video>
  <!-- Defining the URL inline. Not recommended but more comfortable for web developers. -->
  <a-video src="airbending.mp4"></a-video>
</a-scene>
```

## Donut / Tube / Ring

```html
<a-torus color="#43A367" arc="270" radius="5" radius-tubular="0.5"></a-torus>
```

## Torus Knot

```html
<a-torus-knot
  color="#B84A39"
  arc="190"
  p="5"
  q="2"
  radius="5"
  radius-tubular="0.1"
></a-torus-knot>

<a-mixin
  id="torus-knot"
  geometry="primitive: torusKnot"
  material="color: red"
></a-mixin>
```

## Tetrahedron

```html
<a-tetrahedron color="#FF926B" radius="5"></a-tetrahedron>
```

## Disable Inspect Element

```html
<script language="text/javascript">
  document.onmousedown = disableclick;
  status = "Right Click Disabled";
  function disableclick(event) {
    if (event.button == 2) {
      alert(status);
      return false;
    }
  }
</script>
```

### Right Click

Copy the HTML below!

```html
<body oncontextmenu="return false;"></body>
```

### Keys

Copy the JavaScript below!

```js
document.onkeydown = function (e) {
  if (event.keyCode == 123) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
    return false;
  }
};
```

## Panaroma Image 360

```html
<a-sky src="puydesancy.jpg" rotation="0 -130 0"></a-sky>
```

## CDN Links

```txt
https://rawgit.com/aframevr/aframe/1a74a089df988f018f4fb206338fb6f30a1aeb41/dist/aframe-master.min.js
```

## Flying Camera

`wasd-controls="fly: true"` add this inside `<a-camera>`

## Point Light Animation

```html
<!-- Animating point light. -->
<a-entity position="" rotation="" scale="" visible="">
  <a-entity
    geometry="primitive: sphere; radius: 0.25"
    material="color: #EF2D5E; shader: flat"
    light="castShadow: true; color: #EF2D5E; intensity: 1; shadowBias: 0.01&#10;                           shadowCameraNear: 1; shadowCameraBias: 0.01;&#10;                           type: point; shadowMapWidth: 1024; shadowMapHeight: 1024"
    position="0 5 5"
    rotation=""
    scale=""
    visible=""
  ></a-entity>
  <a-animation
    attribute="rotation"
    to="0 360 360"
    dur="5000"
    easing="linear"
    repeat="indefinite"
  ></a-animation>
</a-entity>
```

## Text 3d VR

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.5.0/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-text-geometry-component@^0.5.0/dist/aframe-text-geometry-component.min.js"></script>
</head>

<body>
  <a-scene>
    <a-assets>
      <a-asset-item
        id="optimerBoldFont"
        src="https://rawgit.com/mrdoob/three.js/dev/examples/fonts/optimer_bold.typeface.json"
      ></a-asset-item>
    </a-assets>

    <a-entity text-geometry="value: What's up"></a-entity>
    <a-entity text-geometry="value: Dog?; font: #optimerBoldFont"></a-entity>
  </a-scene>
</body>
```

## Follow a predefined path

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.3.0/aframe.min.js"></script>
  <script src="https://rawgit.com/protyze/aframe-alongpath-component/master/dist/aframe-alongpath-component.min.js"></script>
</head>

<body>
  <a-scene>
    <a-sphere
      color="red"
      radius="0.25"
      position="0 0 0"
      alongpath="path:2,2,-5 -2,1,-2.5 0,1,-1; closed:false; dur:5000; delay:4000; inspector:false;"
    >
    </a-sphere>
  </a-scene>
</body>
```

## FPS view

```html
<a-scene>
  <a-entity camera fps-look-controls></a-entity>
</a-scene>
```

## Linking Pages HREF

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.2.0/aframe.min.js"></script>
  <script src="https://rawgit.com/gasolin/aframe-href-component/master/dist/aframe-href-component.min.js"></script>
</head>

<body>
  <a-scene>
    <a-entity position="0 1.8 4">
      <a-camera>
        <a-cursor color="#4CC3D9"></a-cursor>
      <a-camera>
    </a-entity>

    <a-box id="orange-cube" position="0 3.5 -2" rotation="30 30 0"
      width="2" depth="2" height="2" color="#F16745"
      href="https://github.com/gasolin/aframe-href-component"></a-box>
  </a-scene>
</body>
```

### HREF

```html
onClick="location.href='living-room/index.html'"
```

## Infinity Floor

```html
<a-entity
  static-body
  geometry="primitive: plane; height: 5000; width: 5000"
  position="0 -0.5 -5"
  rotation="-90 0 0"
  material="shader: flat; src: url(shadow.png); repeat: 2001 2001"
></a-entity>
```

```html
<a-entity
  geometry="primitive: plane; width: 10000; height: 10000;"
  rotation="-90 0 0"
  material="src: #grid; repeat: 10000 10000; transparent: true;metalness:0.6; roughness: 0.4; sphericalEnvMap: #sky;"
></a-entity>
```

## Making Object Solid

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/aframe/0.5.0/aframe.js"></script>
<script src="//cdn.rawgit.com/donmccurdy/aframe-extras/v3.3.4/dist/aframe-extras.js"></script>
<a-scene physics>
  <a-assets>
    <a-asset-item
      id="optimerBoldFont"
      src="https://rawgit.com/mrdoob/three.js/dev/examples/fonts/optimer_bold.typeface.json"
    ></a-asset-item>
  </a-assets>
  <a-entity
    static-body
    geometry="primitive: box; depth: 0.1; height: 2; width: 10"
    position="0 1 -4"
    material="shader: flat; opacity: 1; color: red;"
  ></a-entity>
  <a-box
    dynamic-body
    color="yellow"
    position="0 2 0"
    height="1"
    width="1"
    depth="1"
  ></a-box>
  <a-entity
    static-body
    geometry="primitive: box; depth: 10; height: 0.5; width: 10"
    position="0 1 0"
    rotation="0 90 0"
    material="shader: flat; src: url(images/grass.jpg); repeat: 3 3;"
  ></a-entity>
  <a-entity
    camera
    kinematic-body
    universal-controls
    position="0 5 0"
  ></a-entity>
</a-scene>
```

## Mountain

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.3.0/aframe.min.js"></script>
  <script src="https://rawgit.com/ngokevin/kframe/tree/master/components/mountain/dist/aframe-mountain-component.min.js"></script>
</head>

<body>
  <a-scene>
    <a-mountain color="red"></a-mountain>
    <!-- <a-entity mountain="color: red"></a-entity> -->
  </a-scene>
</body>
```

## Sun Sky

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.3.0/aframe.min.js"></script>
  <script src="https://rawgit.com/ngokevin/kframe/tree/master/components/sun-sky/dist/aframe-sun-sky.min.js"></script>
</head>

<body>
  <a-scene>
    <a-sun-sky></a-sun-sky>
  </a-scene>
</body>
```

[![Visitors](https://api.visitorbadge.io/api/visitors?path=aasisodiya.WebProjects&label=aasisodiya/WebProjects&labelColor=%23ffa500&countColor=%23263759&labelStyle=upper)](https://visitorbadge.io/status?path=aasisodiya.WebProjects)
