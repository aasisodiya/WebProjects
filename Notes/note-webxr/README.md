# WebXR

- [WebXR](#webxr)
  - [Fundamentals of WebXR](#fundamentals-of-webxr)
    - [Basic concepts](#basic-concepts)
      - [What is field of view?](#what-is-field-of-view)
      - [Degrees of freedom](#degrees-of-freedom)
    - [General-purpose 3D frameworks](#general-purpose-3d-frameworks)
    - [Game toolkits](#game-toolkits)
  - [Resources](#resources)
  - [Libraries](#libraries)
  - [Reference](#reference)

**WebXR** is a group of standards which are used together to support rendering 3D scenes to hardware designed for presenting virtual worlds (virtual reality, or VR), or for adding graphical imagery to the real world, (augmented reality, or AR). The WebXR Device API implements the core of the WebXR feature set, managing the selection of output devices, render the 3D scene to the chosen device at the appropriate frame rate, and manage motion vectors created using input controllers.

WebXR-compatible devices include fully-immersive 3D headsets with motion and orientation tracking, eyeglasses which overlay graphics atop the real world scene passing through the frames, and handheld mobile phones which augment reality by capturing the world with a camera and augment that scene with computer-generated imagery.

To accomplish these things, the WebXR Device API provides the following key capabilities:

- Find compatible VR or AR output devices
- Render a 3D scene to the device at an appropriate frame rate
- (Optionally) mirror the output to a 2D display
- Create vectors representing the movements of input controls

At the most basic level, a scene is presented in 3D by computing the perspective to apply to the scene in order to render it from the viewpoint of each of the user's eyes by computing the position of each eye and rendering the scene from that position, looking in the direction the user is currently facing. Each of these two images is rendered into a single framebuffer, with the left eye's rendered image on the left and the right eye's viewpoint rendered into the right half of the buffer. Once both eyes' perspectives on the scene have been rendered, the resulting framebuffer is delivered to the WebXR device to be presented to the user through their headset or other appropriate display device.

While the older WebVR API was designed solely to support Virtual Reality (VR), WebXR provides support for both VR and Augmented Reality (AR) on the web. Support for AR functionality is added by the WebXR Augmented Reality Module.

A typical XR device can have either 3 or 6 degrees of freedom and might or might not have an external positional sensor.

The equipment may also include an accelerometer, barometer, or other sensors which are used to sense when the user moves through space, rotates their head, or the like.

> Use this [link](https://immersive-web.github.io/webxr-samples/) to check if your device supports VR/AR

## Fundamentals of WebXR

WebXR, with the WebXR Device API at its core, provides the functionality needed to bring both augmented and virtual reality (AR and VR) to the web. Together, these technologies are referred to as mixed reality (MR) or cross reality (XR). WebXR is not a rendering technology and does not provide features for managing 3D data or rendering it to the display. Difference Between WebVR and WebXR:

- The fundamental difference is that WebXR supports not only virtual reality, but also augmented reality, which blends virtual objects with the user's ambient environment.
- Another key difference is that WebXR has integrated support for the advanced input controllers that are used with most mixed reality headsets, while WebVR relied on the Gamepad API to support the controllers.
- In WebXR, the primary select and squeeze actions are directly supported using events, while other controls are available through a special WebXR-specific implementation of the Gamepad object.

### Basic concepts

Before getting into too much detail, let's consider some basic concepts that you need to know before you learn how to develop XR code.

#### What is field of view?

The field of view is the extent to which you are able to see the environment. The width of the field of view, specified in either degrees or radians, is measured as the angle defining the arc from the far left edge of your field of view to the far right edge.

![Field of View](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API/Fundamentals/binocular-vision.svg)

#### Degrees of freedom

The term degrees of freedom is an indication of how much freedom of movement the user has within the virtual world. This is directly related to how many types of movement the WebXR hardware configuration is capable of recognizing and reproducing into the virtual scene. Figure: Diagram showing the movements possible with 3 degree of freedom hardware: yaw, roll, and pitch.

![Degrees of freedom](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API/Fundamentals/3-degrees-of-freedom-min.svg)

**Freedom of rotational movement** - The first three degrees of freedom are rotational. The rotational degrees of freedom are:

- Pitch: looking up and down
- Yaw: looking left and right
- Roll: tilting left and right

**Freedom of translational movement**

The other three degrees of freedom are translational, providing the ability to sense movement through space: forward and backward, left and right, up and down. Support for all six degrees of freedom is referred to as 6DoF.

![Freedom of translational movement](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API/Fundamentals/xr-translation-headset.png)

### General-purpose 3D frameworks

These frameworks are good for general-purpose programming as well as for game development when you want to do the logic yourself. They're designed for creating and animating 3D scenes regardless of context.

- [A-Frame](https://aframe.io/) (specifically designed for creating WebXR-based apps)
- [Babylon.js](https://www.babylonjs.com/)
- [Three.js](https://threejs.org/)

### Game toolkits

The game toolkits are designed for game developers and often include gaming-specific features such as physics models, input control systems, asset management, 3D sound playback, and the like.

- [PlayCanvas](https://playcanvas.com/)

## Resources

- Khronos WebGL site The main web site for WebGL at the Khronos Group.
- WebGL Fundamentals A basic tutorial with fundamentals of WebGL.
- Raw WebGL: An introduction to WebGL A talk by Nick Desaulniers that introduces the basics of WebGL.
- WebGL playground An online tool for creating and sharing WebGL projects. Good for quick prototyping and experimenting.
- WebGL Academy An HTML/JavaScript editor with tutorials to learn basics of webgl programming.
- WebGL Stats A site with statistics about WebGL capabilities in browsers on different platforms.

## Libraries

- three.js is an open-source, fully featured 3D WebGL library.
- Babylon.js is a powerful, simple, and open game and 3D rendering engine packed into a friendly JavaScript framework.
- Pixi.js is a fast, open-source 2D WebGL renderer.
- Phaser is a fast, free and fun open source framework for Canvas and WebGL powered browser games.
- PlayCanvas is an open-source game engine.
- glMatrix is a JavaScript matrix and vector library for high-performance WebGL apps.
- twgl is a library for making webgl less verbose.
- RedGL is an open-source 3D WebGL library.
- vtk.js is a JavaScript library for scientific visualization in your browser.
- webgl-lint will help find errors in your WebGL code and provide useful info

## Reference

- [WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)
- [WebXR Samples](https://immersive-web.github.io/webxr-samples/)
- [W3 WebXR Device API](https://www.w3.org/TR/webxr/)
- [Experiment with AR and VR made for the web](https://blog.google/products/google-ar-vr/webxr-experiments/)
- [Github Immersive Web - WebXR](https://github.com/immersive-web/webxr)
- [WebXR Experiments](https://experiments.withgoogle.com/collection/webxr)
- [ImmersiveWeb.dev](https://immersiveweb.dev/)
- [Google Developers WebXR](https://developers.google.com/ar/develop/webxr)
- [Create an immersive AR session using WebXR](https://developers.google.com/ar/develop/webxr/hello-webxr)
