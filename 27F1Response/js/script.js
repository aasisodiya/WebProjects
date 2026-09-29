// Template Code Start
'use strict'
// Just for Fun!
console.log('%c Stop Right There! ', 'background: #222; color: orange;font-size:20px');
console.log('%c You Shall Not Pass! ', 'background: #222; color: red; font-size:40px');
// Template Code End

// Timer to record responseTime
let rtime
// Flag to track jumpstart
let jumpstart = false;
// Flag to track if event has started
let eventIsOngoing = false;
// Function to execute on said interval (both below intervals needs to be clearedout while restarting)
let lightInterval
let offLightInterval


// Function to switch off all lights
function switchOffLights() {
    $('.lightcase > .light:nth-last-child(-n+2)').css('background', 'var(--stop-light-off-color)');
}

// Function to start the race lights
function startRaceLights() {
    jumpstart = true;
    let count = 1;
    $('.lightcase:nth-child(' + count + ') > .light:nth-last-child(-n+2)').css('background', 'var(--stop-light-on-color)');
    lightInterval = setInterval(function () {
        count++;
        $('.lightcase:nth-child(' + count + ') > .light:nth-last-child(-n+2)').css('background', 'var(--stop-light-on-color)');
        if (count == 5) {
            console.log("Stopped");
            clearInterval(lightInterval);
            let randomTime = Math.random() * 4000 + 1000;
            offLightInterval = setTimeout(() => {
                switchOffLights();
                jumpstart = false;
                rtime = new Date();
            }, randomTime);
        }
    }, 1000);
}

// Function to startEvent
function startEvent() {
    clearInterval(lightInterval);
    clearInterval(offLightInterval);
    if (jumpstart) {
        $('#timerholder').hide();
        $('#message').show();
        eventIsOngoing = false;
        jumpstart = false;
        switchOffLights();
    } else if (!eventIsOngoing) {
        $('#timerholder').show();
        $('#message').hide();
        $('#timer').text("00.000");
        startRaceLights();
        eventIsOngoing = true;
    } else {
        // record time
        let ctime = new Date();
        let userResponseTime = (ctime - rtime)
        let userResponseTimeSec = userResponseTime / 1000
        $('#timer').text(userResponseTimeSec);
        jumpstart = false;
        eventIsOngoing = false;
        // update best time
        if (userResponseTime < bestTime) {
            bestTime = userResponseTime;
            $('#besttime').text(bestTime / 1000);
            localStorage.setItem('bestTime', bestTime);
        }
    }
}

// Add an event listener on body to start the race lights on click
$('body').on('mousedown', function () {
    startEvent();
});
// // Add an event listener on body to start the race lights on touch
// $('body').on('touchstart', function () {
//     startEvent();
// });
// Add an event listener on body to start the race lights on touch
$('body').on('keydown', function () {
    startEvent();
})

// ----------------------
// Initially swicthoff all lights
switchOffLights();

// Get bestTime from localStorage (if present)

let bestTime = localStorage.getItem('bestTime');
if (bestTime != null) {
    bestTime = parseInt(bestTime);
    $('#besttime').text(bestTime / 1000);
    console.log(bestTime);
} else {
    bestTime = Infinity;
    $('#besttime').text(bestTime);
}