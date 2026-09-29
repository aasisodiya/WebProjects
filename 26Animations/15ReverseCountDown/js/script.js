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

function initializeCounters() {
    $(".countdown").each((index, element) => {
        console.log(index, element);
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
    console.log(
        $(element).find("div.active").css("animation-iteration-count", `${timer}`)
    );
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

startCountdown($(".countdown").get(0));

$(".countdown").on("click", function (event) {
    startCountdown($(".countdown").get($(".countdown").index(this)));
});