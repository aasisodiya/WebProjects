# WebXR

- [WebXR](#webxr)
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
