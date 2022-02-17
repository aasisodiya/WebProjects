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
// $(".res").hide();

let ph1 = 10;
let ph2 = 10;

// Function to reset Playground
function reset() {
    ph1 = 10;
    ph2 = 10;
    $(".player1").height(`${ph1}vh`);
    $(".player2").height(`${ph2}vh`);
}

// Begin screen handler
function begin() {
    $(".begin-holder").show();
    let countdown = 3;
    $("#begin").text(countdown);
    countdown--;
    let timmer = setInterval(() => {
        if (countdown == -1) {
            clearInterval(timmer);
            $(".begin-holder").hide();
        } else if (countdown == 0) {
            $("#begin").text("Go!");
        } else {
            $("#begin").text(countdown);
        }
        countdown--;
    }, 1000);
}

// Runner for Player 1
$(".player1t").on("touchstart", function (event) {
    let x, y;
    if (event.type == "touchstart") {
        x = event.changedTouches[0].clientX;
        y = event.changedTouches[0].clientY;
    } else {
        x = event.clientX;
        y = event.clientY;
    }
    ph1 += 1;
    if (ph1 > 100) {
        $("#result").text("Player 1 Won");
        $(".res").show();
        reset();
    }
    $(".player1").height(`${ph1}vh`);
});

// Runner for Player 2
$(".player2t").on("touchstart", function (event) {
    let x, y;
    if (event.type == "touchstart") {
        x = event.changedTouches[0].clientX;
        y = event.changedTouches[0].clientY;
    } else {
        x = event.clientX;
        y = event.clientY;
    }
    ph2 += 1;
    if (ph2 > 100) {
        $("#result").text("Player 2 Won");
        $(".res").show();
        reset();
    }
    $(".player2").height(`${ph2}vh`);
});

// Reset the playground on reset button click
$("#restart").on("click", function () {
    $("#restart").text("Play Again!");
    $(".res").hide();
    begin();
});

function getDeviceType() {
    let deviceData = navigator.userAgent.toLocaleLowerCase().toString();
    // deviceData has all the userAgent data in lowercase string format
    // Now we can check for keywords like - android, iphone and ipad
    let deviceType;
    deviceData.indexOf("android") != -1 ? (deviceType = "Android") : deviceType;
    deviceData.indexOf("iphone") != -1 ? (deviceType = "iPhone") : deviceType;
    deviceData.indexOf("ipad") != -1 ? (deviceType = "iPad") : deviceType;
    deviceData.indexOf("windows") != -1 ? (deviceType = "Windows") : deviceType;
    return deviceType;
}
let deviceType = getDeviceType();
if (deviceType != "Android" && deviceType != "iPhone" && deviceType != "iPad") {
    $(".orientation-warning").hide();
}