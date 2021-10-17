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

let startTime = 0;

// Trackers for bar (showing the active number)
let barHourTen,
    barHourUnit,
    barMinuteTen,
    barMinuteUnit,
    barSecondTen,
    barSecondUnit;
barHourTen =
    barHourUnit =
    barMinuteTen =
    barMinuteUnit =
    barSecondTen =
    barSecondUnit =
    0;

let barUnitCount = 10;
let barMinAndSecTenCount = 6;
let hourTenCount = 3;

function getTen(number) {
    return ((number % 100) - (number % 10)) / 10;
}

function getUnit(number) {
    return number % 10;
}

let lh, lm, ls;

function start() {
    setInterval(() => {
        let date = new Date();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        // barHourTen
        let ht = getTen(hour);
        $(".bar:eq(0)").css(
            "transform",
            `translateY(calc(50% - ((2 * ${ht} + 1) * (100% / (2 * ${hourTenCount})))))`
        );
        // barHourUnit
        let hu = getUnit(hour);
        $(".bar:eq(1)").css(
            "transform",
            `translateY(calc(50% - ((2 * ${hu} + 1) * (100% / (2 * ${barUnitCount})))))`
        );
        // barMinuteTen
        let mt = getTen(minute);
        $(".bar:eq(2)").css(
            "transform",
            `translateY(calc(50% - ((2 * ${mt} + 1) * (100% / (2 * ${barMinAndSecTenCount})))))`
        );
        // barMinuteUnit
        let mu = getUnit(minute);
        $(".bar:eq(3)").css(
            "transform",
            `translateY(calc(50% - ((2 * ${mu} + 1) * (100% / (2 * ${barUnitCount})))))`
        );
        // barSecondTen
        let st = getTen(second);
        $(".bar:eq(4)").css(
            "transform",
            `translateY(calc(50% - ((2 * ${st} + 1) * (100% / (2 * ${barMinAndSecTenCount})))))`
        );
        // Bar updater for barSecondUnit
        let su = getUnit(second);
        $(".bar:eq(5)").css(
            "transform",
            `translateY(calc(50% - ((2 * ${su} + 1) * (100% / (2 * ${barUnitCount})))))`
        );
        // console.log(hour, minute, second);
        // console.log(ht, hu, mt, mu, st, su);

        $(".unitactive").toggleClass("unitactive");

        $(`.bar:eq(0) > .unit:nth-child(${ht + 1})`).toggleClass("unitactive");
        $(`.bar:eq(1) > .unit:nth-child(${hu + 1})`).toggleClass("unitactive");
        $(`.bar:eq(2) > .unit:nth-child(${mt + 1})`).toggleClass("unitactive");
        $(`.bar:eq(3) > .unit:nth-child(${mu + 1})`).toggleClass("unitactive");
        $(`.bar:eq(4) > .unit:nth-child(${st + 1})`).toggleClass("unitactive");
        $(`.bar:eq(5) > .unit:nth-child(${su + 1})`).toggleClass("unitactive");

    }, 1000);
}

start();