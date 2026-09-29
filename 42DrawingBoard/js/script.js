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

// Code From https://developer.mozilla.org/en-US/docs/Web/API/Touch_events

// var to track the touches in-progress.
var ongoingTouches = [];

// function to handle the touchstart event
function handleStart(event) {
    event.preventDefault();
    var el = document.getElementById("canvas");
    var ctx = el.getContext("2d");
    var touches = event.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        ongoingTouches.push(copyTouch(touches[i]));
        var color = colorForTouch(touches[i]);
        ctx.beginPath();
        // Changing radius to 2 from 4 from original code, this helps to resolve odd looking circle at start
        ctx.arc(touches[i].pageX, touches[i].pageY, 2, 0, 2 * Math.PI, false); // a circle at the start
        ctx.fillStyle = color;
        ctx.fill();
    }
}

// function for Drawing as the touches move
function handleMove(event) {
    event.preventDefault();
    var el = document.getElementById("canvas");
    var ctx = el.getContext("2d");
    var touches = event.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        var color = colorForTouch(touches[i]);
        var idx = ongoingTouchIndexById(touches[i].identifier);

        if (idx >= 0) {
            ctx.beginPath();
            ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
            ctx.lineTo(touches[i].pageX, touches[i].pageY);
            ctx.lineWidth = 4;
            ctx.strokeStyle = color;
            ctx.stroke();

            ongoingTouches.splice(idx, 1, copyTouch(touches[i])); // swap in the new touch record
        } else {
            console.log("can't figure out which touch to continue");
        }
    }
}

// function to handle touchend event
function handleEnd(event) {
    event.preventDefault();
    var el = document.getElementById("canvas");
    var ctx = el.getContext("2d");
    var touches = event.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        var color = colorForTouch(touches[i]);
        var idx = ongoingTouchIndexById(touches[i].identifier);

        if (idx >= 0) {
            ctx.beginPath();
            // Changing radius to 2 from 4 from original code, this helps to resolve odd looking circle at start
            ctx.arc(touches[i].pageX, touches[i].pageY, 2, 0, 2 * Math.PI, false); // a circle at the start
            ctx.fillStyle = color;
            ctx.fill();
            // Removed the code for square at the end
            ongoingTouches.splice(idx, 1); // remove it; we're done
        } else {
            console.log("can't figure out which touch to end");
        }
    }
}

// function to handle touchcancel events
function handleCancel(event) {
    event.preventDefault();
    var touches = event.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        var idx = ongoingTouchIndexById(touches[i].identifier);
        ongoingTouches.splice(idx, 1); // remove it; we're done
    }
}

let colors = [
    "black",
    "orange",
    "red",
    "purple",
    "violet",
    "blue",
    "cyan",
    "green",
    "lime",
    "yellow",
    "magenta",
    "deeppink",
    "fuchsia",
    "gold",
    "salmon",
];

// To make each touch's drawing look different, the colorForTouch() function is used to pick a color based on the touch's unique identifier. This identifier is an opaque number, but we can at least rely on it differing between the currently-active touches.
function colorForTouch(touch) {
    var color = touch.identifier % 16;
    return colors[color];
}

function copyTouch({
    identifier,
    pageX,
    pageY
}) {
    return {
        identifier,
        pageX,
        pageY,
    };
}

function ongoingTouchIndexById(idToFind) {
    for (var i = 0; i < ongoingTouches.length; i++) {
        var id = ongoingTouches[i].identifier;
        if (id == idToFind) {
            return i;
        }
    }
    return -1; // not found
}

// Load Canvas In Given Size Based On Initial Website Load
function loadCanvas() {
    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

loadCanvas();

// Function to initialize all event listeners for our canvas with id - canvas.
function startup() {
    $("#canvas").on("touchstart", handleStart);
    $("#canvas").on("touchend", handleEnd);
    $("#canvas").on("touchcancel", handleCancel);
    $("#canvas").on("touchmove", handleMove);
}

document.addEventListener("DOMContentLoaded", startup);