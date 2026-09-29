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

let borderColor = "orange",
    borderWidth = "10px",
    borderStyle = "solid",
    borderRadius = "0px";

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
    // Generate Output for user to copy
    generateOutput();
});

// Set Border Width
$("#border-width").on("input", function (event) {
    borderWidth = `${$(this).val()}px`;
    $("#result").css("border-width", borderWidth);
    // Generate Output for user to copy
    generateOutput();
});

// Set Border Radius
$("#border-radius").on("input", function (event) {
    borderRadius = `${$(this).val()}px`;
    $("#result").css("border-radius", borderRadius);
    // Generate Output for user to copy
    generateOutput();
});

// Function to Copy to ClipBoard
function copyToClipboard(contentToCopy) {
    var input = $("<textarea>");
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
    let cssCopy;
    cssCopy = `border: ${borderWidth} ${borderStyle} ${borderColor};`;
    if (borderRadius != "0px") {
        cssCopy += `\nborder-radius: ${borderRadius};`;
    }
    console.log(cssCopy);
    copyToClipboard(cssCopy);
    popup();
});

// Code to resize result div on changes with width/height input
$("#width, #height").on("change", function () {
    let height = $("#height").val();
    let width = $("#width").val();
    console.log(height, width);
    $("#result").css("width", `${width}`).css("height", `${height}`);
});

// BG Color Handler
$("#bgcolor").on("change", function () {
    $("#result").css("background-color", $(this).val());
});
// Border Color Handler
$("#bordercolor").on("change", function () {
    borderColor = $(this).val();
    $("#result").css("border-color", borderColor);
    // Generate Output for user to copy
    generateOutput();
});

// Generate Output
function generateOutput() {
    borderStyle = $("#result").css("border-style");
    $("#border-op-width").text(borderWidth);
    $("#border-op-type").text(borderStyle);
    $("#border-op-color").text(borderColor);
    $("#border-op-radius").text(borderRadius);
    if (borderRadius == "0px") {
        $(".border-radius-output").hide();
    } else {
        $(".border-radius-output").show();
    }
}

// Initially hide
$(".border-radius-output").hide();