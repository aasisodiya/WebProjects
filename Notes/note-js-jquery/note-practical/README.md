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

## Sort Object By Keys

```javascript
function sortObjectByKeys(o) {
    return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}
```

### Example Code For Sort Object By Keys

```javascript
function sortObjectByKeys(o) {
    return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}
let test = {
    "ok":"ok",
    "ak":"ak",
    "zk":"zk",
    "bk":"bk",
    "0":"0",
    "10":"10",
    "2":"2"
}
let sorted = sortObjectByKeys(test);
console.log(sorted);
// Output : {0: "0", 2: "2", 10: "10", ak: "ak", bk: "bk", ok: "ok", zk: "zk"}
```

---

## Sort By Numeric Property

```javascript
let sortedArray = unsortedArray.sort(function(a,b){
    return a.property - b.property;
});
```

### Example Code For Sort By Numeric Property

```javascript
let colorDataArray = [{
    "color": "#002aff",
    "stop": 0
}, {
    "color": "#ff0034",
    "stop": 100
}, {
    "color": "#ffa500",
    "stop": 40
}
];
colorDataArray = colorDataArray.sort(function (a, b) {
    return a.stop - b.stop;
});
// "[{"color":"#002aff","stop":0},{"color":"#ffa500","stop":40},{"color":"#ff0034","stop":100}]"
```

---

## Swap Key-Value in JSON

```javascript
let swappedKeyValue = Object.assign({}, ...Object.entries(keyValue).map(([key, value]) => ({ [value]: key })))
```

### Example Code For Swapping Key-Value in JSON

```javascript
let keyValue = {
    "key1":"value1",
    "key2":"value2"
}
let swappedKeyValue = Object.assign({}, ...Object.entries(keyValue).map(([key, value]) => ({ [value]: key })))
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
|The change event is fired for `<input>`, `<select>`, and `<textarea>` elements when an alteration to the element's value is committed by the user. Unlike the input event, the change event is not necessarily fired for each alteration to an element's value.|The input event fires when the value of an `<input>`, `<select>`, or `<textarea>` element has been changed. This is unlike the change event, which only fires when the value is committed, such as by pressing the enter key, selecting a value from a list of options, and the like.|

## FullScreen Function

```javascript
// Function to open fullscreen
var elem = document.getElementsByTagName('body')[0];
function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}
```

## Popup Message

Use below code when you want to display a popup message just above an element. For Example, when you click on a copy button to copy some content, then below code can help you display a copied message

```css
.testclick, .testhover {
    position: relative;
    /*Needed*/
    width: fit-content;
    /*Needed*/
}

.testhover:hover > .popupmessage {
    display: inline-block;
}
.testhover:hover >  {
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
    <span class="popupmessage">Clicked
        <span class="arrow-down"></span>
    </span>
</span>
<span class="testhover">
    <button>Hover Me</button>
    <span class="popupmessage">Hovering
        <span class="arrow-down"></span>
    </span>
</span>
```

```javascript
// Funtion to show message as popup
$('#clickbutton').on('click', function () {
    // below code is specific to popup message for click span
    $('.testclick > .popupmessage').toggle();
});
```
