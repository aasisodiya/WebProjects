# Canvas

- [Canvas](#canvas)
  - [Signature Pad](#signature-pad)
    - [Steps to Create/Use Basic Signature Pad](#steps-to-createuse-basic-signature-pad)
    - [Feature Code](#feature-code)
  - [Reference](#reference)

## Signature Pad

Signature Pad is a cool JavaScript library for drawing signatures created by [Szymon Nowak](https://github.com/szimek).

### Steps to Create/Use Basic Signature Pad

1. Import Signature Pad Library using below code

    ```html
    <script src="https://cdn.jsdelivr.net/npm/signature_pad@2.3.2/dist/signature_pad.min.js"></script>
    ```

2. Create a Canvas using below code

    ```html
    <canvas id="signature-pad" class="signature-pad" width=400 height=200></canvas>
    ```

3. Now the load the Library using JS with below code

    ```javascript
    var canvas = document.getElementById("signature-pad");
    var signaturePad = new SignaturePad(canvas);
    ```

Voila! and you are done, Simple signature pad is ready. But it doesn't have any features like - clear, color or download.

### Feature Code

Below code contains logic for Undo, Erase, Clear, Draw and Save

```javascript
var canvas = document.getElementById("signature-pad");
var signaturePad = new SignaturePad(canvas, {
    backgroundColor: "rgb(255, 255, 255)", // necessary for saving image as JPEG; can be removed is only saving as PNG or SVG
});

// Load Canvas In Given Size Based On Initial Website Load
function loadCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// If user resize the screen / rotate the phone then also resize the canvas
// window.onresize = loadCanvas;
// Load the canvas on initial load
loadCanvas();

// Code to save signature as PNG
$("#saveaspng").on("click", function () {
    if (signaturePad.isEmpty()) {
        return alert("Please provide a signature first.");
    }
    var data = signaturePad.toDataURL("image/png");
    let a = document.createElement("a");
    a.href = data;
    a.download = "signature.png";
    a.click();
});

// Code to save signature as JPEG
$("#saveasjpeg").on("click", function () {
    if (signaturePad.isEmpty()) {
        return alert("Please provide a signature first.");
    }
    var data = signaturePad.toDataURL("image/jpeg");
    let a = document.createElement("a");
    a.href = data;
    a.download = "signature.jpeg";
    a.click();
});

// Code to save signature as SVG
$("#saveassvg").on("click", function () {
    if (signaturePad.isEmpty()) {
        return alert("Please provide a signature first.");
    }
    var data = signaturePad.toDataURL("image/svg+xml");
    let a = document.createElement("a");
    a.href = data;
    a.download = "signature.svg";
    a.click();
});

// Code to clear the canvas
$("#clear").on("click", function () {
    signaturePad.clear();
});

// Code to draw on the canvas
$("#draw").on("click", function () {
    var ctx = canvas.getContext("2d");
    console.log(ctx.globalCompositeOperation);
    ctx.globalCompositeOperation = "source-over"; // default value
});

// Code to erase content on the canvas
$("#erase").on("click", function () {
    var ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "destination-out";
});

// Code to undo content on the canvas
$("#undo").on("click", function () {
    var data = signaturePad.toData();
    if (data) {
        data.pop(); // remove the last dot or line
        signaturePad.fromData(data);
    }
});

// Code to handle color change
$("#color").on("change", function (event) {
    signaturePad.penColor = this.value;
});
```

## Reference

- [Signature Pad](https://github.com/szimek/signature_pad)
