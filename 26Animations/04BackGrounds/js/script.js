// Template Code Start
'use strict'
// Just for Fun!
console.log('%c Stop Right There! ', 'background: #222; color: orange;font-size:20px');
console.log('%c You Shall Not Pass! ', 'background: #222; color: red; font-size:40px');
// Template Code End

let backgroundClasses = ["background1", "background2", "background3", "background4"]
let tracker = 3; //index of "background4" which is not hidden

$('.right').on('click', function (params) {
    $('.' + backgroundClasses[tracker]).addClass('hide');
    tracker = (tracker + 1) % backgroundClasses.length;
    console.log(tracker);
    $('.' + backgroundClasses[tracker]).removeClass('hide');
})
$('.left').on('click', function (params) {
    $('.' + backgroundClasses[tracker]).addClass('hide');
    tracker = (tracker - 1) % backgroundClasses.length;
    if (tracker < 0) {
        tracker = backgroundClasses.length + tracker;
    }
    console.log(tracker);
    $('.' + backgroundClasses[tracker]).removeClass('hide');
})