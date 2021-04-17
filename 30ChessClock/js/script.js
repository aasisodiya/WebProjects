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

// Increase Allocated Time Handler
$('.fa-plus').on('click', function () {
    allocatedTime++;
    let seconds = allocatedTime * 60;
    updateBothClock(seconds);
});

// Decrease Allocated Time Handler
$('.fa-minus').on('click', function () {
    allocatedTime--;
    let seconds = allocatedTime * 60;
    updateBothClock(seconds);
});

function updateClock(activeClockIndex) {
    let time = new Date(clocktimer[activeClockIndex] * 1000).toISOString().substr(14, 5);
    $('.timer:eq(' + activeClockIndex + ')>span').text(time);
}

function updateBothClock(seconds) {
    let time = new Date(seconds * 1000).toISOString().substr(14, 5);
    clocktimer = [seconds, seconds];
    $('.timer>span').text(time);
}

let workingClockInterval

function startClock(activeClockIndex) {
    $('.stop').removeClass('show');
    $('.play').removeClass('show');
    $('.running').addClass('show');
    $('.pause').addClass('show');
    workingClockInterval = setInterval(() => {
        clocktimer[activeClockIndex]--;
        updateClock(activeClockIndex);
    }, 1000);
}

$('.timer').on('click', function (event) {
    console.log(event.target)
    clearInterval(workingClockInterval);
    activeClockIndex = $('.timer').index(this);
    console.log(activeClockIndex);
    $('.active').removeClass('active');
    $('.timer:eq('+activeClockIndex+')').addClass('active');
    startClock(activeClockIndex);
});

// Function to pause the timer
$('.fa-pause').on('click', function (event) {
    $('.stop').removeClass('show');
    $('.play').addClass('show');
    $('.running').addClass('show');
    $('.pause').removeClass('show');
    $('.overlay').show();
    clearInterval(workingClockInterval);
});

// Function to resume the timer
$('.fa-play').on('click', function (event) {
    $('.stop').removeClass('show');
    $('.play').removeClass('show');
    $('.running').addClass('show');
    $('.pause').addClass('show');
    $('.overlay').hide();
    startClock(activeClockIndex);
});

// Function to stop the timer
$('.fa-stop').on('click', function (event) {
    $('.stop').addClass('show');
    $('.play').removeClass('show');
    $('.overlay').hide();
    $('.running').removeClass('show');
    $('.pause').removeClass('show');
    $('.active').removeClass('active');
    clearInterval(workingClockInterval);
    updateBothClock(allocatedTime * 60);
});

// Function to show help
$('.fa-question').on('click', function (event) {
    // $('.stop').removeClass('show');
    // $('.play').removeClass('show');
    // $('.running').removeClass('show');
    // $('.pause').removeClass('show');
    // $('.active').removeClass('active');

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

// new Date(SECONDS * 1000).toISOString().substr(11, 8)