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

// BG
let bg = ["batman.png", "flash.png", "greenlantern.png", "martianmanhunter.png", "superman.png"];

// Below Function Dynamically Arranges Cars of MGR
// Get all carholders
let carholders = $('.carholder');
// Calculate the degree
let deg = 360 / carholders.length;
// Load the cars
for (let index = 0; index < carholders.length; index++) {
    let calcDeg = index * deg;
    console.log(`.carholder:eq(${index})`);
    $(`.carholder:eq(${index})`).css('transform', `rotateZ(${calcDeg}deg)`);
    $(`.car:eq(${index})`).css('--rotate', `-${calcDeg}deg`);
    let url = '../img/' + bg[index];
    $(`.content:eq(${index})`).css('--url', `url(${url})`);
    // 
}