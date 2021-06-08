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

let ph1 = 10;
let ph2 = 10;
$(".player1t").on("touchstart", function (event) {
    let x, y;
    if (event.type == "touchstart") {
        x = event.changedTouches[0].clientX;
        y = event.changedTouches[0].clientY;
    } else {
        x = event.clientX;
        y = event.clientY;
    }
    ph1 += 1
    if (ph1 > 100) {
        alert("Player 1 Won");
        ph1 = 10;
        ph2 = 10;
        $('.player1').height(`${ph1}vh`);
        $('.player2').height(`${ph2}vh`);
    }
    $('.player1').height(`${ph1}vh`);
});
$(".player2t").on("touchstart", function (event) {
    let x, y;
    if (event.type == "touchstart") {
        x = event.changedTouches[0].clientX;
        y = event.changedTouches[0].clientY;
    } else {
        x = event.clientX;
        y = event.clientY;
    }
    ph2 += 1
    if (ph2 > 100) {
        alert("Player 2 Won");
        ph1 = 10;
        ph2 = 10;
        $('.player1').height(`${ph1}vh`);
        $('.player2').height(`${ph2}vh`);
    }
    $('.player2').height(`${ph2}vh`);
});
