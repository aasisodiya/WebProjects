// Template Code Start
"use strict"
// Just for Fun!
console.log('%c Stop Right There! ', 'background: #222; color: orange;font-size:20px');
console.log('%c You Shall Not Pass! ', 'background: #222; color: red; font-size:40px');
// Template Code End

// // shuffle function to shuffle the input array
// function shuffle(array) {
//     return array.sort(() => Math.random() - 0.5);
// }
// let sample = [0, 1, 2];
// let newGame;

// function startGame() {
//     newGame = shuffle(sample);
//     console.log(newGame);
//     let door1 = newGame[0] + 1;
//     let door2 = newGame[1] + 1;
//     let door3 = newGame[2] + 1;
//     $(`.holder:nth-child(${door1}) > .object`).addClass('car');
//     $(`.holder:nth-child(${door2}) > .object`).addClass('donkey');
//     $(`.holder:nth-child(${door3}) > .object`).addClass('donkey');
//     // $(`.door`).addClass('dooropen');
// }

let carIndex;
let doorClickCounts = 0;

function startGame() {
    $('.donkey').removeClass('donkey');
    $('.car').removeClass('car');
    $('.dooropen').removeClass('dooropen');
    $('.object').addClass('donkey');
    carIndex = Math.floor((Math.random() * 3));
    $(`.holder:eq(${carIndex}) > .object`).addClass('car').removeClass('donkey');
    doorClickCounts = 0;
}

$('.door').on('click', function (event) {
    // first click
    if (doorClickCounts == 0) {
        let donkeyIndex;
        if ($(this).siblings().attr("class").includes("donkey")) {
            donkeyIndex = $('.donkey').index($(this).siblings());
            if (donkeyIndex == 0) {
                donkeyIndex = 1;
            } else {
                donkeyIndex = 0;
            }
        } else {
            donkeyIndex = Math.floor((Math.random() * 2));
        }
        $(`.donkey:eq(${donkeyIndex})`).parent().find('.door').addClass('dooropen');
        doorClickCounts++;
    } else {
        // open all doors
        $('.door').addClass('dooropen');
        setTimeout(function () {
            startGame();
        }, 2000);
    }
})


startGame();