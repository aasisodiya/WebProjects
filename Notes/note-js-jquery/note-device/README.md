# Device Specific Data & Functions

- [Device Specific Data & Functions](#device-specific-data--functions)
  - [Getting Device Specific Data Using `navigator`](#getting-device-specific-data-using-navigator)
  - [Detect Device Type](#detect-device-type)
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

## Reference

- [Navigator](https://developer.mozilla.org/en-US/docs/Web/API/Navigator)
