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
    // $(displayTemplate).insertBefore(".addColor");
    $(".colors").html(displayTemplate);
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
        console.log(linearGradient.replace("{deg}", angle).replace("{colors}", gradientColors.toString()));
        linearGradient = linearGradient.replace("{deg}", angle).replace("{colors}", gradientColors.toString());
        $('.output').css('background', linearGradient);
    } else if ($('.radial').hasClass('active')) {
        let radialGradient = "radial-gradient({type}, {colors})";
        // Array to store gradientColors
        let gradientColors = [];
        // first build colors for gradient
        colorDataArray.forEach(function (colordata) {
            let gradientColor = colordata.color + " " + colordata.stop + "%";
            gradientColors.push(gradientColor);
        });
        console.log(radialGradient.replace("{type}", radialType).replace("{colors}", gradientColors.toString()));
        radialGradient = radialGradient.replace("{type}", radialType).replace("{colors}", gradientColors.toString());
        $('.output').css('background', radialGradient);
    }
}

// Initally on load
displayColorSelectors();
displayGradient();

// Add Event Listener for adding color
$('.addColor').on('click', function () {
    let newColorData = {
        "color": lastColor,
        "stop": 100
    }
    colorDataArray.push(newColorData);
    displayColorSelectors();
});

// Add Event Listener for when color is changed or stop value is changed
$('.container').on('change', function (event) {
    if (event.target.type == "color") {
        let index = $('input[type="color"]').index(event.target);
        colorDataArray[index].color = event.target.value
    } else if (event.target.type == "number" && event.target.max == 100) {
        let index = $('input[type="number"]').index(event.target);
        if (event.target.value > 100) {
            event.target.value = 100;
        } else if (event.target.value < 0) {
            event.target.value = 0;
        }
        colorDataArray[index].stop = parseInt(event.target.value)
    } else if (event.target.type == "range" || (event.target.type == "number" && event.target.max == 360)) {
        if (event.target.value > 360) {
            event.target.value = 360;
        } else if (event.target.value < 0) {
            event.target.value = 0;
        }
        angle = event.target.value + "deg";
        $('#angle').val(event.target.value);
        $('input[type="range"]').val(event.target.value);
    }
    displayColorSelectors();
    displayGradient();
});

// Linear / radial selector
$('.linear').on('click', function (param) {
    $('.linear').toggleClass('active');
    $('.radial').toggleClass('active');
    $('.angle').toggle();
    displayGradient();
});

// Linear / radial selector
$('.radial').on('click', function (param) {
    $('.linear').toggleClass('active');
    $('.radial').toggleClass('active');
    $('.angle').toggle();
    displayGradient();
});

// Delete Color Function
$('.container').on('click', '.fa-trash', function (event) {
    if (colorDataArray.length <= 2) {
        return;
    }
    let index = $('.fa-trash').index(event.target);
    colorDataArray.splice(index, 1);
    displayColorSelectors();
    displayGradient();
});