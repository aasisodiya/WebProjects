# Events in JS

- [Events in JS](#events-in-js)
  - [List Of Events](#list-of-events)
  - [Handle Touch Move / Cursor Move Event](#handle-touch-move--cursor-move-event)
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

## Reference

- [Events](https://developer.mozilla.org/en-US/docs/Web/Events)
