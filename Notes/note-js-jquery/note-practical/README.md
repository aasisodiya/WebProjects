# JS/jQuery Practical Examples

- [JS/jQuery Practical Examples](#jsjquery-practical-examples)
  - [Sort Object By Keys](#sort-object-by-keys)
    - [Example Code For Sort Object By Keys](#example-code-for-sort-object-by-keys)
  - [Sort By Numeric Property](#sort-by-numeric-property)
    - [Example Code For Sort By Numeric Property](#example-code-for-sort-by-numeric-property)
  - [Swap Key-Value in JSON](#swap-key-value-in-json)
    - [Example Code For Swapping Key-Value in JSON](#example-code-for-swapping-key-value-in-json)
  - [Copy Content To Clipboard](#copy-content-to-clipboard)
  - [Change Event Vs Input Event](#change-event-vs-input-event)
  - [FullScreen Function](#fullscreen-function)
  - [Popup Message](#popup-message)
  - [Formatted JSON](#formatted-json)
  - [Detect Hashtags and Mentions(@) In `input` or `textarea`](#detect-hashtags-and-mentions-in-input-or-textarea)
  - [Using `html2canvas` and `canvas2image` to Export Web Element as an Image](#using-html2canvas-and-canvas2image-to-export-web-element-as-an-image)
    - [Points to Note](#points-to-note)
    - [`html2canvas` Script](#html2canvas-script)
    - [`Canvas2Image` Script](#canvas2image-script)
    - [Canvas Limitations](#canvas-limitations)
  - [White Gap Issue Related To `html2canvas` or `canvas2image`](#white-gap-issue-related-to-html2canvas-or-canvas2image)
    - [Observations](#observations)
    - [Possible Fixes / Workarounds That Worked For Me](#possible-fixes--workarounds-that-worked-for-me)
    - [Other Solutions](#other-solutions)
  - [How to import Jquery directly into your `script.js` file?](#how-to-import-jquery-directly-into-your-scriptjs-file)
  - [Copy To Clipboard](#copy-to-clipboard)
  - [Random Number Within a Range](#random-number-within-a-range)
  - [Covert RGB To Hex](#covert-rgb-to-hex)
  - [Scroll To Top](#scroll-to-top)
  - [Check User Device is Apple](#check-user-device-is-apple)
  - [Strip HTML From Text](#strip-html-from-text)
  - [Detect Dark Mode](#detect-dark-mode)
  - [Check if the current user has touch events supported](#check-if-the-current-user-has-touch-events-supported)
  - [Clear All browser Cookies](#clear-all-browser-cookies)
  - [Fuzzing](#fuzzing)

## Sort Object By Keys

```javascript
function sortObjectByKeys(o) {
  return Object.keys(o)
    .sort()
    .reduce((r, k) => ((r[k] = o[k]), r), {});
}
```

### Example Code For Sort Object By Keys

```javascript
function sortObjectByKeys(o) {
  return Object.keys(o)
    .sort()
    .reduce((r, k) => ((r[k] = o[k]), r), {});
}
let test = {
  ok: "ok",
  ak: "ak",
  zk: "zk",
  bk: "bk",
  0: "0",
  10: "10",
  2: "2",
};
let sorted = sortObjectByKeys(test);
console.log(sorted);
// Output : {0: "0", 2: "2", 10: "10", ak: "ak", bk: "bk", ok: "ok", zk: "zk"}
```

---

## Sort By Numeric Property

```javascript
let sortedArray = unsortedArray.sort(function (a, b) {
  return a.property - b.property;
});
```

### Example Code For Sort By Numeric Property

```javascript
let colorDataArray = [
  {
    color: "#002aff",
    stop: 0,
  },
  {
    color: "#ff0034",
    stop: 100,
  },
  {
    color: "#ffa500",
    stop: 40,
  },
];
colorDataArray = colorDataArray.sort(function (a, b) {
  return a.stop - b.stop;
});
// "[{"color":"#002aff","stop":0},{"color":"#ffa500","stop":40},{"color":"#ff0034","stop":100}]"
```

---

## Swap Key-Value in JSON

```javascript
let swappedKeyValue = Object.assign(
  {},
  ...Object.entries(keyValue).map(([key, value]) => ({ [value]: key }))
);
```

### Example Code For Swapping Key-Value in JSON

```javascript
let keyValue = {
  key1: "value1",
  key2: "value2",
};
let swappedKeyValue = Object.assign(
  {},
  ...Object.entries(keyValue).map(([key, value]) => ({ [value]: key }))
);
console.log(swappedKeyValue);
// Output: {value1: "key1", value2: "key2"}
```

---

## Copy Content To Clipboard

```javascript
// Function to Copy to ClipBoard
function copyToClipboard(contentToCopy) {
  var input = $("<input>");
  $("body").append(input);
  input.val(contentToCopy).select();
  document.execCommand("copy");
  input.remove();
}
```

---

## Change Event Vs Input Event

|`change` Event|`input` event|
|-|-|
| The change event is fired for `<input>`, `<select>`, and `<textarea>` elements when an alteration to the element's value is committed by the user. Unlike the input event, the change event is not necessarily fired for each alteration to an element's value. | The input event fires when the value of an `<input>`, `<select>`, or `<textarea>` element has been changed. This is unlike the change event, which only fires when the value is committed, such as by pressing the enter key, selecting a value from a list of options, and the like. |

## FullScreen Function

```javascript
// Function to open fullscreen
var elem = document.getElementsByTagName("body")[0];
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}
```

---

## Popup Message

Use below code when you want to display a popup message just above an element. For Example, when you click on a copy button to copy some content, then below code can help you display a copied message

```css
.testclick,
.testhover {
  position: relative;
  /*Needed*/
  width: fit-content;
  /*Needed*/
}

.testhover:hover > .popupmessage {
  display: inline-block;
}
.testhover:hover > {
  display: inline-block;
}

.popupmessage {
  display: none;
  width: 120px;
  background-color: rgba(34, 34, 34, 0.7);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  /*Might have to change this based on the parent element size*/
  left: 50%;
  margin-left: -60px;
}

.arrow-down {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid rgba(34, 34, 34, 0.7);
  position: absolute;
  bottom: -10px;
  left: calc(50% - 10px);
}
```

```html
<span class="testclick">
  <button id="clickbutton">Click Me To Show/Hide PopUp</button>
  <span class="popupmessage"
    >Clicked
    <span class="arrow-down"></span>
  </span>
</span>
<span class="testhover">
  <button>Hover Me</button>
  <span class="popupmessage"
    >Hovering
    <span class="arrow-down"></span>
  </span>
</span>
```

```javascript
// Function to show message as popup
$("#clickbutton").on("click", function () {
  // below code is specific to popup message for click span
  $(".testclick > .popupmessage").toggle();
});
```

---

## Formatted JSON

```javascript
let formattedJson = JSON.stringify({ a: "A", b: "B" }, null, "\t");
console.log(formattedJson);
// "{
//   "a": "A",
//   "b": "B"
// }"
```

---

## Detect Hashtags and Mentions(@) In `input` or `textarea`

Below code uses regex to detect Hashtags and Mentions(@) in user specified `input` and `textarea` tags. Below code is same as the one I used in my project [Twitter Post Generator](https://aasisodiya.github.io/WebProjects/35TwitterPostGenerator). What below code does is - it detects text beginning with `@` or `#` i.e HashTags and Mentions same as the ones used in Twitter and Facebook. After detecting my code simply encloses them inside `span.tags` tag. Which in result applies styling that I have specified for call `tags`.

**Regex Used**: `/(^|\s|>|;)([#@][a-z\d-]+)/ig` which identifies the match with 2 group. First group specified by `(^|\s|>|;)` which states that group 1 is `^` Beginning or `\s` has white-space, tabs or line breaks or `>` an ending character `>` for html tags or `;` semi-colon (for encoded values). Second group is specified by `([#@][a-z\d-]+)` as a set of characters starting with wither `#` or `@` then followed by combination of alphabets, numbers or hyphen `-`. Play with regex [here](https://regexr.com/)

```javascript
$(".tweet").html(
  $(".tweet")
    .html()
    .replaceAll('<span class="tags">', "")
    .replaceAll("</span>", "")
    .replace(/(^|\s|>|;)([#@][a-z\d-]+)/gi, "$1<span class='tags'>$2</span>")
);
```

Below `css` file highlights the Hashtags and Mentions with color after being enclosed by `span.tags` by above regex function

```css
.tags {
  color: rgb(27, 149, 224);
}
```

**Note**: In above sample code `.tweet` class in my code is a div and not `textarea` or `input` and the div is made editable using `contenteditable` attribute set to true.

---

## Using `html2canvas` and `canvas2image` to Export Web Element as an Image

You can use `html2canvas` and `canvas2image` to export any element of you website as an Image. You can refer below template code for the same

```javascript
// Code to export canvas as an image on click of a download button with id download
$("#download").on("click", function (event) {
  // If you face any issues with exported image try to hide all (if any) elements
  // above your exported element. Later make them visible at last.
  // also scroll to the top left (in case you face any issues)
  // window.scrollTo(0, 0);

  // myCanvas below is the element that you want to export
  // below here we are exporting a div with class name 'classtoexport'
  var myCanvas = $(".classtoexport").get(0);
  html2canvas(myCanvas).then(function (canvas) {
    let fileType = "png";
    let fileName = "ExportedFileName";
    let width = canvas.width;
    let height = canvas.height;
    // console.log(canvas);
    Canvas2Image.saveAsImage(canvas, width, height, fileType, fileName);
    // -- OR --
    // canvas.toBlob(function(blob) {
    //     saveAs(blob, "test.png");
    // });
  });
  // Now you can restore all element that were set to hidden in top of the code
});
```

### Points to Note

- `fileType` in above code can be `png`, `jpeg`, `gif` and `bmp`
- `fileName` is to be specified without any extensions i.e simply just the name for the file
- `width` and `height` are set to the target canvas itself in-order to avoid any cropping of image

### `html2canvas` Script

The script allows you to take "screenshots" of webpages or parts of it, directly on the users browser. The screenshot is based on the DOM and as such may not be 100% accurate to the real representation as it does not make an actual screenshot, but builds the screenshot based on the information available on the page. To render an element with `html2canvas` with some (optional) options, simply call `html2canvas(element, options);` where element is your target element you want to screenshot and options are basically the configuration. For Details [Click Here](https://html2canvas.hertzen.com/configuration)

> If you wish to exclude certain `Elements` from getting rendered, you can add a `data-html2canvas-ignore` attribute to those elements and html2canvas will exclude them from the rendering.

### `Canvas2Image` Script

Canvas2Image is A tool of saving or converting canvas to images. You can either save the canvas as an image or covert the canvas to an image and load it inside your website. [Reference](https://github.com/hongru/canvas2image)

```javascript
Canvas2Image.saveAsImage(canvasObj, width, height, fileType, fileName);
Canvas2Image.convertToImage(canvasObj, width, height, fileType, fileName);
```

### Canvas Limitations

The window limitations vary by browser, operating system and system hardware.
|Browser|Limitations|
|-|-|
|Chrome|Maximum height/width: 32,767 pixels </br> Maximum area: 268,435,456 pixels (e.g., 16,384 x 16,384)|
|Firefox|Maximum height/width: 32,767 pixels</br>Maximum area: 472,907,776 pixels (e.g., 22,528 x 20,992)|
|Internet Explorer|Maximum height/width: 8,192 pixels</br>Maximum area: N/A|
|iOS|The maximum size for a canvas element is 3 megapixels for devices with less than 256 MB RAM and 5 megapixels for devices with greater or equal than 256 MB RAM|

---

## White Gap Issue Related To `html2canvas` or `canvas2image`

### Observations

- There is a white gap at left side / top side mostly
- This is not specific but in my case they were mostly on left side.

### Possible Fixes / Workarounds That Worked For Me

- Try building the target to export in viewport itself. In simple words I tried keeping the div always visible in viewport and avoided for it to overflow outside viewport.
- Try keeping the target div always on start / top of the webpage (this helps avoid the top white space when exporting)
- Try to hide all useless elements which are not needed (In my cases I usually hide the navbar / any div above my target div thus bringing my div to top of the page)

### Other Solutions

- Hide the Scroll Bar using below code

  ```css
  ::-webkit-scrollbar {
    display: none;
    /*Removed Default Scroll Bar*/
    width: 0;
  }
  ```

- Before your call to `html2canvas` you need to scroll to the top left of the page using `window.scrollTo(0, 0);`

---

## How to import Jquery directly into your `script.js` file?

Step 1: In your `script.js` file add a single line of code given below

```js
import "https://code.jquery.com/jquery-3.6.0.min.js";
```

Step 2: Update the script tag in your HTML, which may look like one given below

```html
<script src="js/script.js" defer></script>
```

This will be updated to below code, i.e `type="module"` is necessary else you will get following error on browser - `Uncaught SyntaxError: Cannot use import statement outside a module`

```html
<script src="js/script.js" type="module" defer></script>
```

Voilà! and you are done!

> [How to import jQuery using ES6 Syntax](https://stackoverflow.com/questions/34338411/how-to-import-jquery-using-es6-syntax)

---

## Copy To Clipboard

```js
const copyToClipboard = (text) => navigator.clipboard.writeText(text);
copyToClipboard("content to copy");
```

---

## Random Number Within a Range

```js
const randomNumberInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
randomNumberInRange(10, 20);
```

---

## Covert RGB To Hex

```js
const rgbToHex = (r, g, b) =>
  "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
```

---

## Scroll To Top

```js
const goToTop = () => window.scrollTo(0, 0);
```

---

## Check User Device is Apple

```js
const isAppleDevice = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
```

---

## Strip HTML From Text

```js
const stripHtml = (html) =>
  new DOMParser().parseFromString(html, "text/html").body.textContent || "";

stripHtml("<h1>Hello <strong>World</strong>!!!</h1>");
```

---

## Detect Dark Mode

```js
const isDarkMode =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
console.log(isDarkMode); // Result: True or False
```

---

## Check if the current user has touch events supported

```js
const touchSupported = () => {
  "ontouchstart" in window ||
    (window.DocumentTouch && document instanceof window.DocumentTouch);
};

console.log(touchSupported());
// Result: will return true if touch events are supported, false if not
```

---

## Clear All browser Cookies

```js
const clearCookies = document.cookie
  .split(";")
  .forEach(
    (cookie) =>
      (document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`))
  );
```

---

## Fuzzing

Fuzzing or fuzz testing is an automated software testing technique that involves providing invalid, unexpected, or random data as inputs to a computer program. The program is then monitored for exceptions such as crashes, failing built-in code assertions, or potential memory leaks. The URL Fuzzer can be used in finding hidden directories and files on a web server.

[ffuf](https://github.com/ffuf/ffuf) - A fast web fuzzer written in Go.

[feroxbuster](https://github.com/epi052/feroxbuster) - A simple, fast, recursive content discovery tool written in Rust. feroxbuster is a tool designed to perform Forced Browsing. Forced browsing is an attack where the aim is to enumerate and access resources that are not referenced by the web application, but are still accessible by an attacker.
