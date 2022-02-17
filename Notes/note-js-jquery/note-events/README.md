# Events in JS

- [Events in JS](#events-in-js)
  - [List Of Events](#list-of-events)
  - [Handle Touch Move / Cursor Move Event](#handle-touch-move--cursor-move-event)
  - [Detecting Device Orientation](#detecting-device-orientation)
    - [Processing `DeviceOrientationEvent` events](#processing-deviceorientationevent-events)
    - [Processing `DeviceMotionEvent` Events](#processing-devicemotionevent-events)
    - [Steps To Emulate Orientation](#steps-to-emulate-orientation)
  - [Reference](#reference)

---

## List Of Events

| Event                      | Document | Element |
| -------------------------- | -------- | ------- |
| copy                       | ✅       | ✅      |
| cut                        | ✅       | ✅      |
| fullscreenchange           | ✅       | ✅      |
| fullscreenerror            | ✅       | ✅      |
| keydown                    | ✅       | ✅      |
| keypress                   | ✅       | ✅      |
| keyup                      | ✅       | ✅      |
| paste                      | ✅       | ✅      |
| scroll                     | ✅       | ✅      |
| touchcancel                | ✅       | ✅      |
| touchend                   | ✅       | ✅      |
| touchmove                  | ✅       | ✅      |
| touchstart                 | ✅       | ✅      |
| wheel                      | ✅       | ✅      |
| afterscriptexecute         | ❌       | ✅      |
| animationcancel            | ✅       | ❌      |
| animationend               | ✅       | ❌      |
| animationiteration         | ✅       | ❌      |
| animationstart             | ✅       | ❌      |
| auxclick                   | ❌       | ✅      |
| beforescriptexecute        | ❌       | ✅      |
| blur                       | ❌       | ✅      |
| click                      | ❌       | ✅      |
| compositionend             | ❌       | ✅      |
| compositionstart           | ❌       | ✅      |
| compositionupdate          | ❌       | ✅      |
| contextmenu                | ❌       | ✅      |
| dblclick                   | ❌       | ✅      |
| DOMActivate                | ❌       | ✅      |
| DOMContentLoaded           | ✅       | ❌      |
| DOMMouseScroll             | ❌       | ✅      |
| drag                       | ✅       | ❌      |
| dragend                    | ✅       | ❌      |
| dragenter                  | ✅       | ❌      |
| dragleave                  | ✅       | ❌      |
| dragover                   | ✅       | ❌      |
| dragstart                  | ✅       | ❌      |
| drop                       | ✅       | ❌      |
| error                      | ❌       | ✅      |
| focus                      | ❌       | ✅      |
| focusin                    | ❌       | ✅      |
| focusout                   | ❌       | ✅      |
| gesturechange              | ❌       | ✅      |
| gestureend                 | ❌       | ✅      |
| gesturestart               | ❌       | ✅      |
| gotpointercapture          | ✅       | ❌      |
| lostpointercapture         | ✅       | ❌      |
| mousedown                  | ❌       | ✅      |
| mouseenter                 | ❌       | ✅      |
| mouseleave                 | ❌       | ✅      |
| mousemove                  | ❌       | ✅      |
| mouseout                   | ❌       | ✅      |
| mouseover                  | ❌       | ✅      |
| mouseup                    | ❌       | ✅      |
| mousewheel                 | ❌       | ✅      |
| msContentZoom              | ❌       | ✅      |
| MSGestureChange            | ❌       | ✅      |
| MSGestureEnd               | ❌       | ✅      |
| MSGestureHold              | ❌       | ✅      |
| MSGestureStart             | ❌       | ✅      |
| MSGestureTap               | ❌       | ✅      |
| MSInertiaStart             | ❌       | ✅      |
| MSManipulationStateChanged | ❌       | ✅      |
| overflow                   | ❌       | ✅      |
| pointercancel              | ✅       | ❌      |
| pointerdown                | ✅       | ❌      |
| pointerenter               | ✅       | ❌      |
| pointerleave               | ✅       | ❌      |
| pointerlockchange          | ✅       | ❌      |
| pointerlockerror           | ✅       | ❌      |
| pointermove                | ✅       | ❌      |
| pointerout                 | ✅       | ❌      |
| pointerover                | ✅       | ❌      |
| pointerup                  | ✅       | ❌      |
| readystatechange           | ✅       | ❌      |
| select                     | ❌       | ✅      |
| selectionchange            | ✅       | ❌      |
| selectstart                | ✅       | ❌      |
| show                       | ❌       | ✅      |
| transitioncancel           | ✅       | ❌      |
| transitionend              | ✅       | ❌      |
| transitionrun              | ✅       | ❌      |
| transitionstart            | ✅       | ❌      |
| underflow                  | ❌       | ✅      |
| visibilitychange           | ✅       | ❌      |
| webkitmouseforcechanged    | ❌       | ✅      |
| webkitmouseforcedown       | ❌       | ✅      |
| webkitmouseforceup         | ❌       | ✅      |
| webkitmouseforcewillbegin  | ❌       | ✅      |

---

## Handle Touch Move / Cursor Move Event

Below code can help you with handling the touch drag and cursor movement event and perform your intended operation. `mousemove` and
`touchmove` are the event that we are working on. Then we are extracting the positional data of cursor/touch. Modify the code as you need to, for your scenario.

`event.changedTouches` and `event.touches` helps you to get the touch point co-ordinates

```javascript
// Below code handles the mouse movement event
$("body").on("mousemove touchmove", function (event) {
  let positionaldata;
  if (event.type == "touchmove") {
    let x = event.changedTouches[0].clientX;
    let y = event.changedTouches[0].clientY;
    // let x = event.touches[0].clientX;
    // let y = event.touches[0].clientY;
    positionaldata = `translate3d(${x}px, ${y}px, 0)`;
  } else {
    positionaldata = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
  }
  // Use the PositionalData as you like
});
```

Watch the implemented code in action [here](https://aasisodiya.github.io/WebProjects/33Torch)

---

## Detecting Device Orientation

There are two JavaScript events that handle orientation information. 

- DeviceMotionEvent
- DeviceOrientationEvent

|DeviceOrientationEvent|DeviceMotionEvent|
|-|-|
|Is sent when the accelerometer detects a change to the orientation of the device.|Is sent when a change in acceleration was added.
|By receiving and processing the data reported by these orientation events, it's possible to interactively respond to rotation and elevation changes caused by the user moving the device.|`DeviceMotionEvent` is different from the `DeviceOrientationEvent` because it is listening for changes in acceleration as opposed to orientation.
|`DeviceOrientationEvent` is more commonly found in mobile devices.|Sensors that are commonly capable of detecting `DeviceMotionEvent` include sensors in laptops to protect moving storage devices.|

### Processing `DeviceOrientationEvent` events

All you need to do in order to begin receiving orientation change is to listen to the `deviceorientation` event

```js
window.addEventListener("deviceorientation", handleOrientation, true);
```

The orientation event contains four values:

|Orientation Event|Description|
|-|-|
|`DeviceOrientationEvent.absolute`|Indicates whether or not the device is providing orientation data absolutely (that is, in reference to the Earth's coordinate frame) or using some arbitrary frame determined by the device.|
|`DeviceOrientationEvent.alpha`|value represents the motion of the device around the z axis, represented in degrees with values ranging from 0 (inclusive) to 360 (exclusive).|
|`DeviceOrientationEvent.beta`|value represents the motion of the device around the x axis, represented in degrees with values ranging from -180 (inclusive) to 180 (exclusive). This represents a front to back motion of the device.|
|`DeviceOrientationEvent.gamma`|value represents the motion of the device around the y axis, represented in degrees with values ranging from -90 (inclusive) to 90 (exclusive). This represents a left to right motion of the device.|

```js
// The handleOrientation function can look something like this:
function handleOrientation(event) {
  let absolute = event.absolute;
  let alpha    = event.alpha;
  let beta     = event.beta;
  let gamma    = event.gamma;
  console.log(absolute, alpha, beta, gamma);
  // Do stuff with the new orientation data
}
```

### Processing `DeviceMotionEvent` Events

All you need to do in order to begin receiving orientation change is to listen to the `devicemotion` event

```js
window.addEventListener("devicemotion", handleMotion, true);
```

The motion event contains four properties:

|Motion Event|Description|
|-|-|
|`DeviceMotionEvent.acceleration`|The acceleration property returns the amount of acceleration recorded by the device, in meters per second squared (m/s²). The acceleration value does not include the effect of the gravity force, in constrast to DeviceMotionEvent.accelerationIncludingGravity.|
|`DeviceMotionEvent.accelerationIncludingGravity`|The accelerationIncludingGravity property returns the amount of acceleration recorded by the device, in meters per second squared (m/s²). Unlike DeviceMotionEvent.acceleration which compensates for the influence of gravity, its value is the sum of the acceleration of the device as induced by the user and an acceleration equal and opposite to that caused by gravity. In other words, it measures the g-force. In practice, this value represents the raw data measured by an accelerometer.|
|`DeviceMotionEvent.rotationRate`|Returns the rate at which the device is rotating around each of its axes in degrees per second.|
|`DeviceMotionEvent.interval`|Returns the interval, in milliseconds, at which data is obtained from the underlying hardware. You can use this to determine the granularity of motion events.|

```js
// The handleMotion function can look something like this:
function handleMotion(deviceMotionEvent) {
  let acceleration = deviceMotionEvent.acceleration;
  let ax = acceleration.x;
  let ay = acceleration.y;
  let az = acceleration.z;
  let accelerationIncludingGravity = deviceMotionEvent.accelerationIncludingGravity;
  let agx = accelerationIncludingGravity.x;
  let agy = accelerationIncludingGravity.y;
  let agz = accelerationIncludingGravity.z;
  let rotationRate = deviceMotionEvent.rotationRate;
  let alpha    = rotationRate.alpha;
  let beta     = rotationRate.beta;
  let gamma    = rotationRate.gamma;
  let interval = deviceMotionEvent.interval;
  console.table(acceleration, ax, ay, az, accelerationIncludingGravity, agx, agy, agz, rotationRate, alpha, beta, gamma, interval);
  // Do stuff with the new motion data
}
```

> Reference: [Link](https://developer.mozilla.org/en-US/docs/Web/Events/Detecting_device_orientation#processing_orientation_events)

> Example: [Link](./orientation-motion/)

### Steps To Emulate Orientation

1. Open Developer Tools
2. Press `CTRL + SHIFT + P` on console
3. Type `Show Sensor`
4. Scroll down to orientation.

> You can also use it for Location

---

## Reference

- [Events](https://developer.mozilla.org/en-US/docs/Web/Events)
