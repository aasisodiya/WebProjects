var target = $('span#target')[0];
console.log(target);

var lefteye = $('svg#reactionface')[0].childNodes[3].attributes
// console.log(lefteye);
lefteyeInitialPosX = lefteye[0].value;
lefteyeInitialPosY = lefteye[1].value;
var righteye = $('svg#reactionface')[0].childNodes[5].attributes
// console.log(righteye);
righteyeInitialPosX = righteye[0].value;
righteyeInitialPosY = righteye[1].value;

var lips = $('svg#reactionface')[0].childNodes[9].attributes[0];
// console.log(lips);
lipsInitialPosX = lips.value.split(" ")[1];
console.log(lipsInitialPosX);

const eyedeviation = 10;
const lipdeviation = 20;
const lipPosdeviation = 10;

$('input[type=range]#reaction').on('input', function (params) {
    let value = params.currentTarget.value;
    // console.log(value);
    target.innerText = value;
    changeEyePosition(value);
    manipulateLips(value);
});

function changeEyePosition(value) {
    let relativeDeviation = ((value / 20) * 2 * eyedeviation) - eyedeviation;
    // console.log(relativeDeviation, lefteyeInitialPosX);
    lefteye[0].value = parseInt(lefteyeInitialPosX) + (relativeDeviation);
    righteye[0].value = parseInt(righteyeInitialPosX) + (relativeDeviation);
}

$('input[type=range]#reaction').on('mouseenter', function (params) {
    let value = params.currentTarget.value;
    // console.log(value);
    changeEyePosition(value);
    manipulateLips(value);
    let relativeDeviationY = 10;
    lefteye[1].value = parseInt(lefteyeInitialPosY) + (relativeDeviationY);
    righteye[1].value = parseInt(righteyeInitialPosY) + (relativeDeviationY);
});

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

function manipulateLips(value) {
    let properties = lips.value.split(" ");

    let relativeLipDeviation = ((value / 20) * 2 * lipdeviation) - lipdeviation;
    properties[5] = relativeLipDeviation;
    // console.log(relativeLipDeviation, properties);
    let relativeLipPosDeviation = ((value / 20) * 2 * lipPosdeviation) - lipPosdeviation;
    properties[1] = parseInt(lipsInitialPosX) + relativeLipPosDeviation;
    console.log(relativeLipPosDeviation, properties);
    propertiesString = properties.join(" ");
    console.log(propertiesString);
    lips.value = propertiesString;
}