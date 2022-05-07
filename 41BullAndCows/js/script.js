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

// Function to a random integer number, where random value with range [0, max) i.e including 0 and excluding max
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Variable to store the secret code (Keeping it as array to make comparison easy)
// Just for example, initializing the value with Kaprekar's Constant
// i.e 6174 is known as Kaprekar's constant after the Indian mathematician D. R. Kaprekar.
let secretCode = [6, 1, 7, 4];
// Total Steps taken to guess the number
let totalSteps = 0;
// Flag to check if game is active
let isActive = true;

// Function to Get a new secretCode (No duplicates allowed in newly generated number ex. 1123 is not allowed as 1 is repeated)
function getNewSecretCode() {
    // sample set to choose from
    let set = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let newSecretCode = [0, 0, 0, 0];
    newSecretCode.forEach(function (element, index, array) {
        let start = getRandomInt(set.length);
        // below deleteCount is set to 1 as we just want one number to be removed from the set
        let deleteCount = 1;
        array[index] = set.splice(start, deleteCount)[0];
    });
    return newSecretCode;
}

// Function to initialize/reset everything and start the game
function startGame() {
    // Reset all user guess inputs to 0
    $(".number").each(function (index, value) {
        $(value).html(0);
    });
    // Reset bulls and cows count
    $("#bullscount").html(0);
    $("#cowscount").html(0);
    // Set new secret code
    secretCode = getNewSecretCode();
    // Reset total steps
    totalSteps = 0;
    // Update steps count
    $("#steps").html(totalSteps);
    // Reset User Inputs on UI
    $(".number").each((index) => {
        $(".number").eq(index).html(index);
    });
    // Disable the restart and giveup button
    $("#restart, #giveup").attr("disabled", true);
    $("#check").attr("disabled", false);
    // Clear logs
    $(".logs").html("");
    $("body").css("background", "unset");
    // Activate the flag
    isActive = true;
}

// Function to get the bulls count
function getBullsCount(secret, guess) {
    let bullsCount = 0;
    secret.forEach(function (element, index) {
        // Correct Number With Correct Position
        if (guess[index] == element) {
            bullsCount++;
        }
    });
    console.log(bullsCount);
    return bullsCount;
}

// Function to get the cows count
function getCowsCount(secret, guess) {
    let cowsCount = 0;
    secret.forEach(function (secretElement, secretIndex) {
        guess.forEach(function (guessElement, guessIndex) {
            // Correct Number, But With Wrong Position
            if (secretElement == guessElement && secretIndex != guessIndex) {
                cowsCount++;
            }
        });
    });
    return cowsCount;
}

// Function to get UserInput from UI
function getUserInput() {
    let userGuess = [0, 0, 0, 0];
    // Get the user inputs from UI
    $(".number").each(function (index, value) {
        userGuess[index] = parseInt($(value).html());
    });
    return userGuess;
}

// Function to get the bulls and cows count
function getBullsAndCowsCount(secret, guess) {
    // count the bulls
    let bullsCount = getBullsCount(secret, guess);
    // count the cows
    let cowsCount = getCowsCount(secret, guess);
    return [bullsCount, cowsCount];
}

// Function to get duplicates in user guesses (if any) and then return those index.
function getDuplicates(userguess) {
    // array to store duplicate positions index
    let duplicatePosIndex = [];
    // I have used loops here so that I can also find the index of duplicates
    userguess.forEach((guess1, index1) => {
        userguess.forEach((guess2, index2) => {
            if (index1 != index2 && guess1 == guess2) {
                duplicatePosIndex = duplicatePosIndex.concat(index1);
            }
        });
    });
    return duplicatePosIndex;
}

// Function to perform check and validate the user guess
function performChecks() {
    // Get the user guesses
    let userguess = getUserInput();
    // check for duplicates in guesses
    let duplciateIndex = getDuplicates(userguess);
    // reset the invalid class
    $(".invalid").toggleClass("invalid");
    if (duplciateIndex.length != 0) {
        // That means we have duplicates in user guess, which is not allowed. So display warnings for the same on UI
        duplciateIndex.forEach((duplicatePosIndex) => {
            $(".number").eq(duplicatePosIndex).addClass("invalid");
        });
        return;
    } else {
        // clear all warnings (if any)
        totalSteps++;
        // Update steps count
        $("#steps").html(totalSteps);
    }
    // get bullsCount and cowsCount
    let bullsCount, cowsCount, bullsAndcowsCount;
    bullsAndcowsCount = getBullsAndCowsCount(secretCode, userguess);
    bullsCount = bullsAndcowsCount[0];
    cowsCount = bullsAndcowsCount[1];
    // Update the count of cows and bulls
    $("#bullscount").html(bullsCount);
    $("#cowscount").html(cowsCount);
    // Check bullsCount to see if game is over
    if (bullsCount == 4) {
        // Then game is over and user has guessed right
        $("body").css("background", "greenyellow");
        $("#check, #giveup").attr("disabled", true);
        // deactivate the game
        isActive = false;
    } else {
        $("#restart, #giveup").attr("disabled", false);
        // Log the guess
        let guess = userguess.join("");
        let record = `<p>Step: ${totalSteps} | Guess: ${guess} | Bulls: ${bullsCount} | Cows: ${cowsCount}</p>`;
        $(".logs").prepend(record);
    }
}

function giveup() {
    // Display the answer on UI
    $(".number").each((index) => {
        $(".number").eq(index).html(secretCode[index]);
    });
}

// Change/Increment The Number of Touch/Click
$(".number").on("click", function (event) {
    if (!isActive) {
        return;
    }
    // Get The Current Number
    let currentNumber = parseInt(event.target.innerHTML);
    // Check if currentNumber is 9, if not then only increment by 1 or else set new number to 0
    let newNumber = currentNumber >= 9 ? 0 : currentNumber + 1;
    // Now assign back the new number to the selected element
    event.target.innerHTML = newNumber;
});

// Handle check button interaction
$("#check").on("click", function () {
    performChecks();
});

// Handle restart button interaction
$("#restart").on("click", function () {
    startGame();
});

// Handle giveup button interaction
$("#giveup").on("click", function () {
    giveup();
    // handle button state
    $("#restart").attr("disabled", false);
    $("#check, #giveup").attr("disabled", true);
    // deactivate the game
    isActive = false;
});

// Close help window
$("#closehelp").on("click", function () {
    $(".help-holder").hide();
    $(".helpbutton, .container").show();
    $("#closehelp")[0].innerHTML = 'Resume';
});

// Show help window
$(".helpbutton").on("click", function () {
    $(".help-holder").show();
    $(".helpbutton, .container").hide();
});