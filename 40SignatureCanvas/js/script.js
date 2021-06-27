// Template Code Start
"use strict";
// Just for Fun!
console.log(
    "%c Stop Right There! ",
    "background: #222; color: orange;font-size:20px"
);
console.log(
    "%c You Shall Not Pass! ",
    "background: #222; color: red; font-size:40px"
);
// Template Code End

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