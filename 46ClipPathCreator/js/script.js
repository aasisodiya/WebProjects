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

// Class Pos to store xPercentage and yPercentage
class Pos {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// Clip Path Co-ordinates Recorder
let positions = [];

// Function to generate clip-path polygon for given positions data
function generateClipPathPolygon(clipPathPositions) {
    let coordinate = [];
    clipPathPositions.forEach((clipPathPosition) => {
        coordinate.push(`${clipPathPosition.x}% ${clipPathPosition.y}%`);
    });
    let joinedValue = coordinate.join(",");
    // Update the same on UI output block
    $("#coord").text(joinedValue);
    return `polygon(${joinedValue})`;
}

// Function to apply clip-path for given positions
function applyClipPath(element, clipPathPositions) {
    let clipPathValue = generateClipPathPolygon(clipPathPositions);
    element.css("clip-path", clipPathValue);
}

$(".clipboard").on("click", function (event) {
    // Extract the click event co-ordinate
    var rect = event.target.getBoundingClientRect();
    // bottom: 400, height: 400, left: 265, right: 565, top: 0, width: 300, x: 265
    var x = event.clientX - rect.left; //x position within the element.
    var y = event.clientY - rect.top; //y position within the element.
    // Convert the co-ordinates to percentage in order to make it easily usable in clip-path
    let xPercentage = Math.abs(Math.round((x / rect.width) * 100));
    let yPercentage = Math.abs(Math.round((y / rect.height) * 100));
    // Create an object of position for given data
    let pos = new Pos(xPercentage, yPercentage);
    // Now add that object to our positions array
    positions.push(pos);
    // Update the clip-path with positions if we have more than 2 positional data for polygon to be generated
    if (positions.length > 2) {
        applyClipPath($(".board"), positions);
    }
    // Also add a visual pointer in order to make it interactive
    let pointer = $("<div class='pointer'><div></div></div>")
        .css("top", `${yPercentage}%`)
        .css("left", `${xPercentage}%`);
    $(".clippathgenerator").append(pointer);

    // Make pointer draggable
    $(".pointer").draggable({
        containment: "parent",
        start: function () {},
        drag: function () {
            let top = $(this).css("top");
            let left = $(this).css("left");
            top = top.substr(0, top.length - 2);
            left = left.substr(0, left.length - 2);
            let index = $(".pointer").index(this);
            let xPercentage = Math.abs(Math.round((left / rect.width) * 100));
            let yPercentage = Math.abs(Math.round((top / rect.height) * 100));
            positions[index].x = xPercentage;
            positions[index].y = yPercentage;
            applyClipPath($(".board"), positions);
        },
        stop: function () {},
    });
});

// Function to Copy to ClipBoard
function copyToClipboard(contentToCopy) {
    var input = $("<input>");
    $("body").append(input);
    input.val(contentToCopy).select();
    document.execCommand("copy");
    input.remove();
}

// Funtion to show copied message as popup
function popup() {
    $(".copied").show();
    $(".copied").animate();
}

// Event handlers for Copying code to clipboard
$("#copy").on("click", function () {
    $(".copied").hide();
    let clipPathCSS = $("#coord").text();
    let cssCopy = `clip-path: polygon(${clipPathCSS});`;
    copyToClipboard(cssCopy);
    popup();
});

$("#width, #height").on("change", function () {
    let height = $("#height").val();
    let width = $("#width").val();
    console.log(height, width);
    $(".clippathgenerator").css("width", `${width}`).css("height", `${height}`);
    // Reset the clip path
    $(".board").css("clip-path", "none");
    // Delete all pointers
    $(".pointer").remove();
    // Reset the pointers positions array
    positions = [];
});