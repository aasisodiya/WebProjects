// Template Code Start
"use strict"
// Just for Fun!
console.log('%c Stop Right There! ', 'background: #222; color: orange;font-size:20px');
console.log('%c You Shall Not Pass! ', 'background: #222; color: red; font-size:40px');
// Template Code End

// Below Handler controls the rotation of the timer screen
$('.fa-refresh').on('click', function (event) {
    let index = $('.fa-refresh').index(this)
    $('.timer:eq(' + index + ')>span').animate(
        { deg: "+=90" },
        {
            duration: 1200,
            step: function (now) {
                $(this).css({ transform: 'rotate(' + now + 'deg)' });
            }
        }
    );
});

// AllocatedTime
let allocatedTime = 10; //In Minutes
let clocktimer = [0, 0]; //In Seconds
let activeClockIndex = -1;
let timesUp = false;

// Increase Allocated Time Handler
$('.fa-plus').on('click', function () {
    allocatedTime++;
    let seconds = allocatedTime * 60;
    updateBothClock(seconds);
});

// Decrease Allocated Time Handler
$('.fa-minus').on('click', function () {
    if (allocatedTime < 2) {
        return
    }
    allocatedTime--;
    let seconds = allocatedTime * 60;
    updateBothClock(seconds);
});

// Function to update the clock time
function updateClock(clockIndex) {
    let time
    if (clocktimer[clockIndex] > 3600) {
        time = new Date(clocktimer[clockIndex] * 1000).toISOString().substr(11, 8);
    } else if (clocktimer[clockIndex] > 60) {
        time = new Date(clocktimer[clockIndex] * 1000).toISOString().substr(14, 5);
    } else if (clocktimer[clockIndex] == 60) {
        time = "60";
    } else if (clocktimer[clockIndex] == 0) {
        time = "Time's Up!";
    } else {
        time = new Date(clocktimer[clockIndex] * 1000).toISOString().substr(17, 2);
    }
    $('.timer:eq(' + clockIndex + ')>span').text(time);
}

// Function to update both the clocks
function updateBothClock(seconds) {
    let time
    if (seconds > 3600) {
        time = new Date(seconds * 1000).toISOString().substr(11, 8);
    } else if (seconds > 60) {
        time = new Date(seconds * 1000).toISOString().substr(14, 5);
    } else if (seconds == 60) {
        time = "60";
    }
    clocktimer = [seconds, seconds];
    $('.timer>span').text(time);
}

let workingClockInterval

// Function to start the clock for respective player
function startClock(clockIndex) {
    $('.stop').removeClass('show');
    $('.play').removeClass('show');
    $('.running').addClass('show');
    $('.pause').addClass('show');
    workingClockInterval = setInterval(() => {
        clocktimer[clockIndex]--;
        updateClock(clockIndex);
        if (clocktimer[clockIndex] < 10) {
            $('.active').addClass('danger');
        }
        if (clocktimer[clockIndex] == 0) {
            clearInterval(workingClockInterval);
            timesUp = true;
            $('.active').removeClass('active');
            $('.danger').removeClass('danger');
            $('.timer:eq(' + clockIndex + ')').addClass('timesUp');
            return
        }
    }, 1000);
}

// Event handler to trigger a Function to start the clock for respective player
$('.timer').on('click', function () {
    if (timesUp) {
        return;
    }
    clearInterval(workingClockInterval);
    let clickedClockIndex = $('.timer').index(this);
    if (clickedClockIndex == 0) {
        activeClockIndex = 1;
    } else {
        activeClockIndex = 0;
    }
    $('.active').removeClass('active');
    $('.danger').removeClass('danger');
    $('.timer:eq(' + activeClockIndex + ')').addClass('active');
    startClock(activeClockIndex);
});

// Function to pause the timer
$('.fa-pause').on('click', function () {
    $('.stop').removeClass('show');
    $('.play').addClass('show');
    $('.running').addClass('show');
    $('.pause').removeClass('show');
    $('.overlay').show();
    $('.question').hide();
    clearInterval(workingClockInterval);
});

// Function to resume the timer
$('.fa-play').on('click', function () {
    $('.stop').removeClass('show');
    $('.play').removeClass('show');
    $('.running').addClass('show');
    $('.pause').addClass('show');
    $('.overlay').hide();
    $('.question').show();
    startClock(activeClockIndex);
});

// Function to stop the timer
$('.fa-stop').on('click', function () {
    $('.stop').addClass('show');
    $('.play').removeClass('show');
    $('.overlay').hide();
    $('.running').removeClass('show');
    $('.pause').removeClass('show');
    $('.active').removeClass('active');
    $('.danger').removeClass('danger');
    $('.timesUp').removeClass('timesUp');
    $('.question').show();
    clearInterval(workingClockInterval);
    timesUp = false;
    updateBothClock(allocatedTime * 60);
});

// Function to show help
$('.fa-question').on('click', function () {
    $('.controls').hide();
    $('.overlay').show();
    $('.help').show();
});

// Function to show help
$('.fa-times').on('click', function (event) {
    $('.controls').show();
    $('.overlay').hide();
    $('.help').hide();
});

// Initially
updateBothClock(allocatedTime * 60);
