// Resize / Normalize the Smiley size
let height = $('svg#reactionface')[0].attributes.height.value;

// Setting width according to height
$('svg#reactionface')[0].setAttribute("width", height);
let width = $('svg#reactionface')[0].attributes.width.value;

// Calculating scale
let scale = height / 100;
console.log("scale:", scale, "height:", height, "width:", width);

// Now set the scale of g (group) of svg
$('g#facegroup')[0].setAttribute("transform", "scale(" + scale + ")");

// Displaying the value of input range selected by user
let target = $('span#target')[0];
// console.log(target);

// LeftEye Properties
let lefteye = $('svg#reactionface')[0].childNodes[1].childNodes[3].attributes
// console.log(lefteye);
lefteyeInitialPosX = lefteye[0].value;
lefteyeInitialPosY = lefteye[1].value;

// RightEye Properties
let righteye = $('svg#reactionface')[0].childNodes[1].childNodes[5].attributes
// console.log(righteye);
righteyeInitialPosX = righteye[0].value;
righteyeInitialPosY = righteye[1].value;

// Lips Properties
let lips = $('svg#reactionface')[0].childNodes[1].childNodes[9].attributes[0];
// console.log(lips);
// lips.value => M 30 70 q 20 0 40 0
lipsInitialPosX = lips.value.split(" ")[1]; // i.e basically selecting 30
// console.log(lipsInitialPosX);

// eyedeviation is value for max movement of eyes from its initial position
const eyedeviation = 10;
// lipdeviation is value for max movement of lips tip (basically the curve) from its initial position
const lipdeviation = 20;
// lipPosdeviation is value for max movement of lips from its initial position
const lipPosdeviation = 5;
// Max Value for slider
const maxSlider = $('input[type=range]#reaction')[0].max;

// Event Listener on Input Range that monitor for change in value of input range (basically monitors the slider) and then changes the eyes and lips position (x-axis) and reaction of lips (y-axis)
$('input[type=range]#reaction').on('input', function (params) {
    let value = params.currentTarget.value;
    // console.log(value);
    target.innerText = value;
    changeEyePosition(value);
    manipulateLips(value);
});

// Function to change eye position (x-axis) relatively based on the position of slider
function changeEyePosition(value) {
    let relativeDeviation = ((value / maxSlider) * 2 * eyedeviation) - eyedeviation;
    // console.log(relativeDeviation, lefteyeInitialPosX);
    lefteye[0].value = parseInt(lefteyeInitialPosX) + (relativeDeviation);
    righteye[0].value = parseInt(righteyeInitialPosX) + (relativeDeviation);
}

// Event Listener to change the eyes position (y-axis) making the eyes look down on slider and move lips, eyes in that direction (x-axis)
$('input[type=range]#reaction').on('mouseenter', function (params) {
    let value = params.currentTarget.value;
    // console.log(value);
    changeEyePosition(value);
    manipulateLips(value);
    let relativeDeviationY = 10;
    lefteye[1].value = parseInt(lefteyeInitialPosY) + (relativeDeviationY);
    righteye[1].value = parseInt(righteyeInitialPosY) + (relativeDeviationY);
});

// Event Listener to reset eyes and lips position back to looking at you
$('input[type=range]#reaction').on('mouseleave', function (params) {
    lefteye[1].value = parseInt(lefteyeInitialPosY);
    righteye[1].value = parseInt(righteyeInitialPosY);
    lefteye[0].value = parseInt(lefteyeInitialPosX);
    righteye[0].value = parseInt(righteyeInitialPosX);

    let properties = lips.value.split(" ");
    properties[1] = lipsInitialPosX;
    propertiesString = properties.join(" ");
    lips.value = propertiesString;
});

// Function to change lips position (x-axis) relatively based on the position of slider
function manipulateLips(value) {
    let properties = lips.value.split(" ");

    let relativeLipDeviation = ((value / maxSlider) * 2 * lipdeviation) - lipdeviation;
    // below property changes x-axis position of lips
    properties[5] = relativeLipDeviation;
    // console.log(relativeLipDeviation, properties);

    let relativeLipPosDeviation = ((value / maxSlider) * 2 * lipPosdeviation) - lipPosdeviation;
    // below property changes the curve of lips
    properties[1] = parseInt(lipsInitialPosX) + relativeLipPosDeviation;
    // console.log(relativeLipPosDeviation, properties);
    propertiesString = properties.join(" ");
    // console.log(propertiesString);
    lips.value = propertiesString;
}