# Draggable Content

- [Draggable Content](#draggable-content)
  - [Draggable using Jquery](#draggable-using-jquery)
    - [First Import JS](#first-import-js)
    - [Define The Element](#define-the-element)
    - [Define Script](#define-script)
  - [Reference](#reference)

In order to make an element draggable, you can apply The `draggable` global attribute. The `draggable` global attribute is an enumerated attribute that indicates whether the element can be dragged, either with native browser behavior or the [HTML Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API).

- This attribute is enumerated and not Boolean. A value of true or false is mandatory, and shorthand like `<img draggable>` is forbidden. The correct usage is `<img draggable="false">`.
- Links and images are draggable by default.

> Note: When an element is made draggable, text or other elements within it can no longer be selected in the normal way by clicking and dragging with the mouse. Instead, the user must hold down the Alt key to select text with the mouse, or use the keyboard.

## Draggable using Jquery

Its easier to make element draggable using Jquery as compared to above approach.

### First Import JS

```html
<!-- Jquery Definition is a must -->
<script
  src="https://code.jquery.com/jquery-3.6.0.min.js"
  integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
  crossorigin="anonymous"
></script>
<!-- Jquery UI helps to implement draggable -->
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<!-- Jquery UI Touch Punch helps to implement draggable on touch -->
<script src="//cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js"></script>
```

### Define The Element

```html
<div id="draggable">
  <p>Draggable Block</p>
</div>
```

### Define Script

```js
// Below code make the element draggable (with no boundary limit)
$("#draggable").draggable();
// OR
// Below code make the element draggable (within boundary limit of its parent)
$("#draggable").draggable({
  containment: "parent",
});
// Below code can help you detect the event of drag start, dragging and drag stop
$("#draggable2").draggable({
  start: function () {
    console.log("Start");
  },
  drag: function () {
    console.log("dragging");
  },
  stop: function () {
    console.log("Stop");
  },
});
```

> Example [link](./example/)

Sample Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>jQuery UI Draggable - Default functionality</title>
    <link
      rel="stylesheet"
      href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css"
    />
    <link rel="stylesheet" href="/resources/demos/style.css" />
    <style>
      #draggable {
        width: 150px;
        height: 150px;
        padding: 0.5em;
      }
    </style>
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script>
      $(function () {
        $("#draggable").draggable();
      });
    </script>
  </head>
  <body>
    <div id="draggable" class="ui-widget-content">
      <p>Drag me around</p>
    </div>
  </body>
</html>
```

## Reference

- [Draggable - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/draggable)
- [Drag Operations - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations)
