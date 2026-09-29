// Template Code Start
"use strict"
// Just for Fun!
console.log('%c Stop Right There! ', 'background: #222; color: orange;font-size:20px');
console.log('%c You Shall Not Pass! ', 'background: #222; color: red; font-size:40px');
// Template Code End

// Below flow add a bg class to div with parallax class alternatingly
$('.parallax').each(function (index, element) {
    console.log(index, element);
    if (index % 2 == 0) {
        $(element).addClass('bg1');
    } else {
        $(element).addClass('bg3');
    }
});