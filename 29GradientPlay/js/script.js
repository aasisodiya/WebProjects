// Template Code Start
`use strict`
// Just for Fun!
console.log('%c Stop Right There! ', 'background: #222; color: orange;font-size:20px');
console.log('%c You Shall Not Pass! ', 'background: #222; color: red; font-size:40px');
// Template Code End

// Template Code for Color Selector
let colorselectorTemplate = `
<div class="colorselector">
<div class="colordisplayholder">
    <div class="colordisplay">
        <input type="color" value="{color}">
    </div>
</div>
<div class="stopinputholder">
    <div class="stopinput">
        <div class="label">
            <span>Stop</span>
        </div>
        <div>
            <input type="number" max="100" min="0" value="{stop}">
        </div>
        <div>
            <i class="fa fa-trash"></i>
        </div>
    </div>
</div>
</div>
`;

// Color Data Array
let colorDataArray = [{
    "color": "#002aff",
    "stop": 0
}, {
    "color": "#ff0034",
    "stop": 100
}
];

let lastColor = "#ffa500";
let angle = "45deg";
let radialType = "circle";
let exportGradient = "";
let isLinearGradient = true;

// Function to load and display color swatches
function displayColorSelectors() {
    // First Sort the colors based on stop value
    colorDataArray = colorDataArray.sort(function (a, b) {
        return a.stop - b.stop;
    });
    let displayTemplate = '';
    colorDataArray.forEach(function (element) {
        displayTemplate += colorselectorTemplate.replace("{color}", element.color).replace("{stop}", element.stop);
        lastColor = element.color;
    });
    $(".colors").html(displayTemplate);
    if (colorDataArray.length < 10) {
        $('.addColor').show();
    } else {
        $('.addColor').hide();
    }
    if (colorDataArray.length <= 2) {
        $('.fa-trash').hide();
    } else {
        $('.fa-trash').show();
    }
}

function displayGradient() {
    if ($('.linear').hasClass('active')) {
        let linearGradient = "linear-gradient({deg}, {colors})";
        // Array to store gradientColors
        let gradientColors = [];
        // first build colors for gradient
        colorDataArray.forEach(function (colordata) {
            let gradientColor = colordata.color + " " + colordata.stop + "%";
            gradientColors.push(gradientColor);
        });
        linearGradient = linearGradient.replace("{deg}", angle).replace("{colors}", gradientColors.toString());
        $('.output').css('background', linearGradient);
        exportGradient = linearGradient;
    } else if ($('.radial').hasClass('active')) {
        let radialGradient = "radial-gradient({type}, {colors})";
        // Array to store gradientColors
        let gradientColors = [];
        // first build colors for gradient
        colorDataArray.forEach(function (colordata) {
            let gradientColor = colordata.color + " " + colordata.stop + "%";
            gradientColors.push(gradientColor);
        });
        radialGradient = radialGradient.replace("{type}", radialType).replace("{colors}", gradientColors.toString());
        $('.output').css('background', radialGradient);
        exportGradient = radialGradient;
    }
    console.log(exportGradient);
}

// Update stop value for all colors equally
function updateStopValue() {
    // Update stop value for all colors equally
    let eqStop = Math.round(100 / (colorDataArray.length - 1));
    colorDataArray.forEach(function (colorData, index) {
        if (index == (colorDataArray.length - 1)) {
            colorData.stop = 100;
        } else {
            colorData.stop = index * eqStop;
        }
    });
}

// Initally on load
displayColorSelectors();
displayGradient();

// Add Event Listener for adding color
$('.addColor').on('click', function () {
    if (colorDataArray.length >= 10) {
        return;
    }
    let newColorData = {
        "color": lastColor,
        "stop": 100
    }
    colorDataArray.push(newColorData);
    updateStopValue();
    displayColorSelectors();
    displayGradient();
});

// Add Event Listener for when color is changed or stop value is changed
$('body').on('change', function (event) {
    let index, activeColor, isIncr
    if (event.target.type == "color") {
        index = $('input[type="color"]').index(event.target);
        colorDataArray[index].color = event.target.value;
    } else if (event.target.type == "number" && event.target.max == 100) {
        index = $('input[type="number"]').index(event.target);
        if (event.target.value > 100) {
            event.target.value = 100;
        } else if (event.target.value < 0 || event.target.value == "") {
            event.target.value = 0;
        }
        if (colorDataArray[index].stop < parseInt(event.target.value)) {
            isIncr = true;
        } else {
            isIncr = false;
        }
        colorDataArray[index].stop = parseInt(event.target.value);
        activeColor = $('input[type="color"]')[index].value;
    } else if (event.target.type == "range" || event.target.id == "angle") {
        if (event.target.value > 360) {
            event.target.value = 360;
        } else if (event.target.value < 0 || event.target.value == "") {
            event.target.value = 0;
        }
        angle = event.target.value + "deg";
        $('#angle').val(event.target.value);
        $('input[type="range"]').val(event.target.value);
    }
    displayColorSelectors();
    displayGradient();
    if (event.target.type == "number" && event.target.id != "angle") {
        if (activeColor != $('input[type="color"]')[index].value) {
            if (isIncr) {
                index += 1;
            } else {
                index -= 1;
            }
        }
        $('input[type="number"]')[index].select();
    }
});

// Add Event Listener for when color is changed or stop value is changed
$('body').on('input', function (event) {
    if (event.target.type == "range") {
        if (event.target.value > 360) {
            event.target.value = 360;
        } else if (event.target.value < 0 || event.target.value == "") {
            event.target.value = 0;
        }
        angle = event.target.value + "deg";
        $('#angle').val(event.target.value);
        $('input[type="range"]').val(event.target.value);
        displayGradient();
        displayColorSelectors();
    }
});

// Linear / radial selector
$('.linear').on('click', function (param) {
    if (!isLinearGradient) {
        $('.linear').toggleClass('active');
        $('.radial').toggleClass('active');
        $('.angle').toggle();
        displayGradient();
        isLinearGradient = true;
    }
});

// Linear / radial selector
$('.radial').on('click', function (param) {
    if (isLinearGradient) {
        $('.linear').toggleClass('active');
        $('.radial').toggleClass('active');
        $('.angle').toggle();
        displayGradient();
        isLinearGradient = false;
    }
});

// Delete Color Function
$('.container').on('click', '.fa-trash', function (event) {
    if (colorDataArray.length <= 2) {
        return;
    }
    let index = $('.fa-trash').index(event.target);
    colorDataArray.splice(index, 1);
    updateStopValue();
    displayColorSelectors();
    displayGradient();
});

function hideOrShowEverything() {
    $('.container').toggle();
    $('.footer').toggle();
    $('.holder').toggle();
}

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

let isFullScreen = false;
// Toggle gradient view in fullscreen
$('.eye').on('click', function (params) {
    if (isFullScreen) {
        closeFullscreen();
        isFullScreen = false;
        hideOrShowEverything();
    } else {
        openFullscreen();
        isFullScreen = true;
        hideOrShowEverything();
    }
})

// Function to Copy to ClipBoard
function copyToClipboard(contentToCopy) {
    var input = $("<input>");
    $("body").append(input);
    input.val(contentToCopy).select();
    document.execCommand("copy");
    input.remove();
}

// Function to copy gradient code for user
let copiedMessageTimeout
$('.copyCode').on('click', function () {
    let exportGradientCSS = "background: " + exportGradient + ";";
    copyToClipboard(exportGradientCSS);
    clearTimeout(copiedMessageTimeout);
    $('.copied').removeClass('copied-success');
    $('.copied').toggleClass('copied-success');
    copiedMessageTimeout = setTimeout(function (param) {
        $('.copied').toggleClass('copied-success');
    }, 1000);
})