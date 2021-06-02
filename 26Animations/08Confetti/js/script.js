// Template Code Start
"use strict"
// Just for Fun!
console.log('%c Stop Right There! ', 'background: #222; color: orange;font-size:20px');
console.log('%c You Shall Not Pass! ', 'background: #222; color: red; font-size:40px');
// Template Code End
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
let animationTime = ["animation-slow", "animation-medium", "animation-fast"];
let animationName = ["confetti-animation-1", "confetti-animation-2", "confetti-animation-3", "confetti-animation-4"]

function shootConfetti() {
    // settimeout / setinterval
    setInterval(() => {
        // creating a confetti element
        let confettiElement = document.createElement("div");
        $(confettiElement).addClass("confetti");
        $(confettiElement).addClass(animationName[getRandomInt(animationName.length)]);
        $(confettiElement).addClass(animationTime[getRandomInt(animationTime.length)]);
        let left = Math.floor(Math.random() * $('body').width());
        $(confettiElement).css('left', left);
        // Adding the new confetti element to the confetti-container
        $('.confetti-container').append(confettiElement);
        setTimeout(() => {
            // lets remove the confetti
            $(confettiElement).remove();
        }, 3000);
    }, 50);
}

shootConfetti();