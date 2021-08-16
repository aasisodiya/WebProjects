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

// Set Border Type
$(".bordertype>button").on("click", function (event) {
    // Removed Active Border Marker from all buttons
    $(".active-border").toggleClass("active-border");
    // Reset Result Div's Border in order to allow new border class to be set
    $("#result").toggleClass();
    // Add the selected border type to the result div
    $("#result").toggleClass($(event.target).attr("class"));
    // Add active border marker to clicked button
    $(event.target).toggleClass("active-border");
});

// Set Border Width
$("#border-width").on("input", function (event) {
    let width = $(this).val();
    $("#result").css("border-width", `${width}px`);
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

// Code to resize result div on changes with width/height input
$("#width, #height").on("change", function () {
    let height = $("#height").val();
    let width = $("#width").val();
    console.log(height, width);
    $("#result").css("width", `${width}`).css("height", `${height}`);
    // Reset the clip path
    $(".board").css("clip-path", "none");
    // Delete all pointers
    $(".pointer").remove();
    // Reset the pointers positions array
    positions = [];
});