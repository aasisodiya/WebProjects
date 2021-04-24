# Device Specific Data & Functions

- [Device Specific Data & Functions](#device-specific-data--functions)
  - [Getting Device Specific Data Using `navigator`](#getting-device-specific-data-using-navigator)
  - [Detect Device Type](#detect-device-type)
  - [`devicePixelRatio` Property](#devicepixelratio-property)
  - [Detect Orientation or Orientation Change](#detect-orientation-or-orientation-change)
  - [Window Height Vs Document Height](#window-height-vs-document-height)
  - [Window Width Vs Document Width](#window-width-vs-document-width)
  - [`window.innerHeight` Vs `window.outerHeight`](#windowinnerheight-vs-windowouterheight)
  - [`window.innerWidth` Vs `window.outerWidth`](#windowinnerwidth-vs-windowouterwidth)
  - [Reference](#reference)

## Getting Device Specific Data Using `navigator`

|Properties|Description with Sample Value|
|-|-|
|`navigator.appVersion`|The appVersion property returns the version information of the browser. Sample Value : `5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36`|
|`navigator.cookieEnabled`|Returns false if setting a cookie will be ignored and true otherwise. Sample Value : `true`|
|`navigator.deviceMemory`|Returns the amount of device memory in gigabytes. This value is an approximation given by rounding to the nearest power of 2 and dividing that number by 1024. Sample Value : `8`|
|`navigator.hardwareConcurrency`|Returns the number of logical processor cores available. Sample Value : `4`|
|`navigator.maxTouchPoints`|Returns the maximum number of simultaneous touch contact points are supported by the current device. Sample Value : `0`|
|`navigator.platform`|Returns a string representing the platform of the browser. Do not rely on this function to return a significant value. Sample Value : `Win32`|
|`navigator.userAgent`|Returns the user agent string for the current browser. Sample Value : `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36`|
|`navigator.userAgentData.mobile`|Detects if device is mobile. Sample Value : `false`|
|`navigator.userAgentData.brands`| Sample Value : `[{"brand":"Google Chrome","version":"89"},{"brand":"Chromium","version":"89"},{"brand":";Not A Brand","version":"99"}]`|

Example: [Click Here](detect-device-example/)

> Note: `navigator.userAgentData.mobile` and `navigator.userAgentData.brands` doesn't work on mobile devices*

---

## Detect Device Type

Below function code will help you detect the device type i.e wether it is Android, iPhone or iPad.

```js
function getDeviceType() {
    let deviceData = navigator.userAgent.toLocaleLowerCase().toString();
    // deviceData has all the userAgent data in lowercase string format
    // Now we can check for keywords like - android, iphone and ipad
    let deviceType
    deviceData.indexOf('android') != -1 ? deviceType = "Android" : deviceType;
    deviceData.indexOf('iphone') != -1 ? deviceType = "iPhone" : deviceType;
    deviceData.indexOf('ipad') != -1 ? deviceType = "iPad" : deviceType;
    return deviceType;
}
let deviceType = getDeviceType();
```

Example: [Click Here](detect-device-type/)

---

## `devicePixelRatio` Property

```text
                    resolution in physical pixels
devicePixelRatio = -------------------------------
                       resolution in CSS pixels
```

The `devicePixelRatio` of Window interface returns the ratio of the resolution in physical pixels to the resolution in CSS pixels for the current display device. This value could also be interpreted as the ratio of pixel sizes: the size of one CSS pixel to the size of one physical pixel. In simpler terms, this tells the browser how many of the screen's actual pixels should be used to draw a single CSS pixel.

This is useful when dealing with the difference between rendering on a standard display versus a HiDPI or Retina display, which use more screen pixels to draw the same objects, resulting in a sharper image.

You can use `window.matchMedia()` to check if the value of `devicePixelRatio` changes (which can happen, for example, if the user drags the window to a display with a different pixel density).

Example: [Click Here](detect-device-type/)

---

## Detect Orientation or Orientation Change

You can detect orientation change using `$(window).on("orientationchange")`

You can detect orientation using below code

```js
if(window.innerHeight > window.innerWidth){
    //portrait
}
if(window.innerWidth > window.innerHeight){
    //landscape
}
```

Another code to detect the orientation is as given below

```js
screen?.orientation?.type
```

Above property will give you values like `"landscape-primary"` and `"portrait-primary"`

Example: [Click Here](detect-device-type/)

---

## Window Height Vs Document Height

|Window Height|Document Height|
|-|-|
|`$(window).height()` gets you an unit-less pixel value of the height of the (browser) window aka viewport|`$(document).height()` returns an unit-less pixel value of the height of the document being rendered|
|With respect to the web browsers the viewport here is visible portion of the canvas(which often is smaller than the document being rendered)|It is the actual document height. Also if the actual document’s body height is less than the viewport height then it will return the viewport height instead|

> `$(window).height()` = `document.documentElement.clientHeight` and `window.innerHeight` != `document.documentElement.clientHeight`

## Window Width Vs Document Width

|Window Width|Document Width|
|-|-|
|`$(window).width()` gets you an unit-less pixel value of the width of the (browser) window aka viewport|`$(document).width()` returns an unit-less pixel value of the width of the document being rendered|
|With respect to the web browsers the viewport here is visible portion of the canvas(which often is smaller than the document being rendered)|It is the actual document width. Also if the actual document’s body width is less than the viewport width then it will return the viewport width instead|

> `$(window).width()` = `document.documentElement.clientWidth` and `window.innerWidth` != `document.documentElement.clientWidth`

## `window.innerHeight` Vs `window.outerHeight`

|`window.innerHeight`|`window.outerHeight`|
|-|-|
|The `window.innerHeight` property returns the height of a window's content area.|The `window.outerHeight` property returns the outer height of the browser window, including all interface elements (like toolbars/scrollbars)|
|Changes when you resize the window or zoom in / zoom out|Stays the same when you resize the window or zoom in / zoom out|

## `window.innerWidth` Vs `window.outerWidth`

|`window.innerWidth`|`window.outerWidth`|
|-|-|
|The `window.innerWidth` property returns the width of a window's content area.|The `window.outerWidth` property returns the outer width of the browser window, including all interface elements (like toolbars/scrollbars).|
|Changes when you resize the window or zoom in / zoom out|Stays the same when you resize the window or zoom in / zoom out|

---

## Reference

- [Navigator](https://developer.mozilla.org/en-US/docs/Web/API/Navigator)
- [devicePixelRation](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio)
