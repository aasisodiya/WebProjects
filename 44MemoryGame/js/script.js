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

// Countdown Code Start

function initializeCounters() {
    $(".countdown").each((index, element) => {
        // console.log(index, element);
        let counterDiv = $(element).find("div.counter");
        let timer = counterDiv.attr("data-counter");
        counterDiv.text(timer);
    });
}

initializeCounters();

function startCountdown(element) {
    let counterDiv = $(element).find("div.counter");
    let timer = counterDiv.attr("data-counter");
    counterDiv.text(timer);
    // activate animation
    $(element).find("div.border").toggleClass("active");
    $(element).find("div.active").css("animation-iteration-count", `${timer}`);
    // decrease the count
    let countdown = setInterval(() => {
        timer--;
        counterDiv.text(timer);
    }, 1000);
    // stop the count down after set interval of counter
    setTimeout(() => {
        clearInterval(countdown);
        $(element).find("div.border").toggleClass("active");
    }, timer * 1000);
}

// Countdown Code End

// Game Logic Code Start

// Level is the length of numbers to be displayed
let level = 1;
// numbers store the record of generated numbers for given level
let numbers = [];
// user input attempts tracker
let attempt = 0;
// Function to get Random Number between 0 and Max i.e including zero and excluding 10.
function getRandomInt() {
    return Math.floor(Math.random() * 10);
}
// function to start game level
function startGame(level) {
    // First hide the start screen
    $("#startscreen").hide();
    // Also hide game over screen
    $("#gameover").hide();
    // reset the set
    numbers = [];
    // reset the attempt
    attempt = 0;
    // Display the number showcase
    displayShowcase(level);
}
// function to display showcase for given level
function displayShowcase(level) {
    // reset the showcase before displaying
    $("#displaynumber").text("");
    $("#showcase").show();
    // Now start displaying number on showcase
    let tracker = 0;
    // also start animation
    $("#displaynumber").addClass("animate");
    let interval = setInterval(() => {
        // get new number at random
        let newNumber = getRandomInt();
        // add number to our array as a record
        numbers.push(newNumber);
        // display the number
        $("#displaynumber").text(newNumber);
        // now increment tracker until it reaches level
        tracker++;
        // console.log(tracker, newNumber);
        if (tracker == level) {
            // Now as all numbers are displayed we can now take inputs from player and stop displaying anymore numbers
            clearInterval(interval);
            // also hide the showcase
            setTimeout(() => {
                $("#showcase").hide();
                $("#displaynumber").removeClass("animate");
            }, 1000);
        }
    }, 1000);
}
// Function to validate user Input
function validateUserInput(input) {
    // check if input matches the tracker
    // console.log(input, attempt, numbers);
    if (numbers[attempt] == input) {
        // console.log("Correct number order");
        // increase the attempt
        attempt++;
        // now if attempt is equal to level then that level has finished and user can proceed to next level
        if (attempt == level) {
            // level has finished and user can proceed to next level
            console.log("Level Up!");
            level++;
            startGame(level);
        }
    } else {
        // console.log("Game is over");
        // Show game over screen
        $("#gameover").show();
        setTimeout(() => {
            // Show start screen after 3 seconds
            $("#startscreen").show();
        }, 3000);
    }
}

// Playground Logic

// Start the game on start button click

$("#start").on("click", function () {
    // reset the level
    level = 1;
    startGame(level);
});

// Listener for user input

$("#playground div").on("click", function (event) {
    let index = $("#playground div").index(event.target);
    let numberClicked = index == 9 ? 0 : index + 1;
    // console.log(numberClicked);
    validateUserInput(numberClicked);
});