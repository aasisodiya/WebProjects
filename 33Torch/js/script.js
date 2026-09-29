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

// Below code handles the mouse movement event
$("body").on("mousemove touchmove", function (event) {
    let positionaldata;
    if (event.type == "touchmove") {
        let x = event.changedTouches[0].clientX - 30;
        let y = event.changedTouches[0].clientY - 30;
        positionaldata = `translate3d(${x}px, ${y}px, 0)`;
    } else {
        positionaldata = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    }
    $(".cursor").css("transform", positionaldata);
    $('.overlay').hide();
});

$("body").on("touchcancel touchleave touchend mouseout", function (event) {
    $('.overlay').show();
});

let elem = document.getElementsByTagName("body")[0];

function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
    }
    $('#fullscreenopen').hide();
    $('#fullscreenclose').show();
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
    }
    $('#fullscreenopen').show();
    $('#fullscreenclose').hide();
}

let content = $(".content").html();
for (let index = 0; index < 5; index++) {
    $(".content").append(content);
}