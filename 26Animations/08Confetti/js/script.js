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

// Function to get Random Number between 0 and Max i.e including zero and excluding max.
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Set of Animation time class defined in css file
let animationTimes = ["animation-slow", "animation-medium", "animation-fast"];

// Set of Animation name class defined in css file
let animationNames = [
    "confetti-animation-1",
    "confetti-animation-2",
    "confetti-animation-3",
    "confetti-animation-4",
];

// confettiIntervalId will be used to stop confetti
let confettiIntervalId;

// maxAnimationTime is the hightest time or bigger than all of the defined animations time in CSS.
let maxAnimationTime = 3000;

// confettiDensity is the density of the confetti. Lower the number higher the density. for better result keep this value less than 100
let confettiDensity = 50;

// maxBufferConfettiSize is the max size difference between 2 confetti
let maxBufferConfettiSize = 10;

// confettiColors is the set of all colors that a confetti can take
let confettiColors = ["red", "orange", "blue", "green", "purple"];

// shootConfetti function to start the confetti blowup
function shootConfetti(
    confettiDensity,
    animationNames,
    animationTimes,
    maxBufferConfettiSize,
    confettiColors
) {
    // Load options Button
    $("#shoot").hide();
    $("#stop").show();
    confettiIntervalId = setInterval(() => {
        // creating a confetti element
        let confettiElement = document.createElement("div");
        $(confettiElement).addClass("confetti");
        $(confettiElement).addClass(
            animationNames[getRandomInt(animationNames.length)]
        );
        $(confettiElement).addClass(
            animationTimes[getRandomInt(animationTimes.length)]
        );
        let left = Math.floor(Math.random() * $("body").width());
        // position the confetti randomly
        $(confettiElement).css("left", left);
        // set confettiSize randomly
        let minimumConfettiSize = 5;
        let confettiSize =
            minimumConfettiSize + getRandomInt(maxBufferConfettiSize) + "px";
        $(confettiElement).css("width", confettiSize);
        $(confettiElement).css("height", confettiSize);
        // set confetti colors randomly
        $(confettiElement).css(
            "background-color",
            confettiColors[getRandomInt(confettiColors.length)]
        );
        // Adding the new confetti element to the confetti-container
        $(".confetti-container").append(confettiElement);
        setTimeout(() => {
            // lets remove the confetti when its animation is over
            $(confettiElement).remove();
        }, maxAnimationTime);
    }, confettiDensity);
    return confettiIntervalId;
}

// Initially start the confetti shower
confettiIntervalId = shootConfetti(
    confettiDensity,
    animationNames,
    animationTimes,
    maxBufferConfettiSize,
    confettiColors
);

// stopConfetti function to stop confetti
function stopConfetti(confettiIntervalId) {
    clearInterval(confettiIntervalId);
    $("#shoot").show();
    $("#stop").hide();
}

// Event Listener for Button
$("#shoot").on("click", function () {
    shootConfetti(
        confettiDensity,
        animationNames,
        animationTimes,
        maxBufferConfettiSize,
        confettiColors
    );
});
$("#stop").on("click", function () {
    stopConfetti(confettiIntervalId);
});