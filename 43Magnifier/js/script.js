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

// function to implement magnify effect on div with class magnify
function magnify(zoomlevel) {
    if (zoomlevel == null || typeof zoomlevel != "number" || zoomlevel <= 1) {
        console.error("Invalid Zoom Level");
        return;
    }

    // Create Copy Of The Element Itself For Magnification Effect
    $(".magnify").each(function (index, element) {
        // $(element).append(`<div class="magnifier"></div>`);
        $(element)
            .clone()
            .removeClass("magnify")
            .addClass("magnified")
            .appendTo(
                $(element).append(`<div class="magnifier"></div>`).find(".magnifier")[0]
            );
    });

    // Now that DOM Elements are populated we can
    // Set Zoom Level
    $(".magnifier").css("--zoom-level", zoomlevel);

    function getCursorPos(event, index) {
        let targetElementProperties,
            x = 0,
            y = 0;
        event = event || window.event;
        targetElementProperties = $(".magnify").get(index).getBoundingClientRect();
        // calculate the cursor's x and y coordinates, relative to the image
        if (event.type == "touchmove") {
            x = event.changedTouches[0].pageX - targetElementProperties.left;
            y = event.changedTouches[0].pageY - targetElementProperties.top;
        } else {
            x = event.pageX - targetElementProperties.left;
            y = event.pageY - targetElementProperties.top;
        }
        // consider any page scrolling
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return {
            x: x,
            y: y,
        };
    }
    $(".magnify").on("mousemove touchmove", function (event) {
        let index = $(".magnify").index(this);
        console.log(index);
        let targetElement = $(`.magnify:eq(${index})`);
        console.log(targetElement);
        let targetElementProperties = targetElement.get(0).getBoundingClientRect();
        let pointerPos = getCursorPos(event, index);
        console.log(pointerPos);
        $(`.magnifier:eq(${index})`).show();
        $(`.magnifier:eq(${index})`)
            .css("top", `${pointerPos.y}px`)
            .css("left", `${pointerPos.x}px`);
        // magnified
        let calculatedY =
            (-1 * (targetElementProperties.height - 100) * pointerPos.y) /
            targetElementProperties.height;
        let calculatedX =
            (-1 * (targetElementProperties.width - 100) * pointerPos.x) /
            targetElementProperties.width;
        console.log(calculatedX);
        $(`.magnified:eq(${index})`)
            .css("top", `${calculatedY}px`)
            .css("left", `${calculatedX}px`);
    });

    $(".magnify").on("touchend", function (param) {
        $(".magnifier").hide();
    });
}

magnify(1.5);