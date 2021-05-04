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
$("body").on('mousemove click touch touchmove', function (event) {
    let positionaldata = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    $(".cursor").css("transform", positionaldata);
});