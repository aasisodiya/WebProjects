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


// import jquery from "https://cdn.skypack.dev/jquery@~3.5.1";

// function updateCurvedText($curvedText, radius) {
//     $curvedText.css("min-width", "initial");
//     $curvedText.css("min-height", "initial");
//     var w = $curvedText.width(),
//         h = $curvedText.height();
//     console.log(w, h);
//     $curvedText.css("min-width", w + "px");
//     $curvedText.css("min-height", h + "px");
//     var text = $curvedText.text();
//     var html = "";

//     Array.from(text).forEach(function (letter) {
//         html += `<span>${letter}</span>`;
//     });
//     $curvedText.html(html);

//     var $letters = $curvedText.find("span");
//     $letters.css({
//         position: "absolute",
//         height: `${radius}px`,
//         // backgroundColor:"orange",
//         transformOrigin: "bottom center"
//     });

//     var circleLength = 2 * Math.PI * radius;
//     var angleRad = w / (2 * radius);
//     var angle = 2 * angleRad * 180 / (Math.PI * text.length);
//     console.log(angle);

//     $letters.each(function (idx, el) {
//         $(el).css({
//             transform: `rotate(${idx * angle - text.length*angle/2}deg)`
//         })
//     });
// }


function generatedCurvedText(target) {
    // target.css("min-width", "initial");
    // target.css("min-height", "initial");
    var w = target.width(),
        h = target.height();
    var text = target.text();
    var htmlContent = "";

    // Extract individual letter from the text and add it to a span
    Array.from(text).forEach(function (letter) {
        htmlContent += `<span>${letter}</span>`;
    });
    target.html(htmlContent);

    let radius = $('.curvedtext').data('radius');
    $('.curvedtext span').css({
        height: `${radius}px`
    });


    let angle = (360 * w / (2 * Math.PI * radius)) / text.length;
    // let buffer = 0.5
    // angle += buffer;
    console.log(angle);
    $('.curvedtext span').each(function (index, element) {
        let calculatedRotation = index * angle - text.length * angle / 2 + angle / 2;
        console.log(calculatedRotation, index, angle);
        $(element).css({
            transform: `rotate(${calculatedRotation}deg)`
        })
    });
    let calculatedSize = (w / (2 * Math.PI * radius)) * (2 * radius);
    // Need to set height since elements are absolute
    target.css("min-width", w + "px");
    target.css("min-height", calculatedSize + "px");
}

var $curvedText = $(".curvedtext");
generatedCurvedText($curvedText, 500);