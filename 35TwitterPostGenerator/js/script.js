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

let target = "";

$(".tweetimages").on("click", function (param) {
    console.log("tweetimage");
    target = "tweetimage";
    $("#imageupload").click();
});

$(".profileicon").on("click", function (param) {
    console.log("profileicon");
    target = "profileicon";
    $("#imageupload").click();
});

$("input#imageupload").change(function (e) {
    e.preventDefault();
    console.log(e);
    // $('#image')[0].files[0]
    readAndLoadImage($("#imageupload")[0].files[0], target);
    // Another way to do it
    // let img = $('#' + target)[0];
    // img.src = URL.createObjectURL($('#imageupload')[0].files[0]);

    // Below code is required as bug fix - (Bug: You can't upload same image twice. Analysis: given function only triggers when input change, but when you have selected that image previously, and select the same image again - there is no change. This the change event never gets triggered. So as a fix I am simply resetting the input value)
    $("input#imageupload")[0].value = "";
});

function readAndLoadImage(file, imgElemId) {
    // Check if the file is an image.
    if (file.type && !file.type.startsWith("image/")) {
        console.log("File is not an image.", file.type, file);
        return;
    }

    let img = $("#" + imgElemId)[0];

    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
        console.log(img);
        img.src = event.target.result;
        console.log("done");
    });
    reader.readAsDataURL(file);
}

// Code to export canvas as an image
$("#download").on("click", function (event) {
    $(".nav").hide();
    $(".help").hide();
    var moodcanvas = $(".postholder").get(0);
    html2canvas(moodcanvas).then(function (canvas) {
        let fileType = "png";
        let fileName = "TwitterPostGenerator";
        let width = canvas.width;
        let height = canvas.height;
        console.log(canvas);
        Canvas2Image.saveAsImage(canvas, width, height, fileType, fileName);
        // -- OR --
        // canvas.toBlob(function(blob) {
        //     saveAs(blob, "test.png");
        // });
    });
    $(".nav").show();
    $(".help").show();
});

// Handle Themes Button

$("#dark").on("click", function () {
    $(".postholder").css("background-color", "black");
    $(".handlename").css("color", "#d9d9d9");
    $(".handleverifiedicon").css("color", "#d9d9d9");
    $(".tweet").css("color", "#d9d9d9");
    $(".active").toggleClass("active");
    $("#dark").toggleClass("active");
});

$("#dim").on("click", function () {
    $(".postholder").css("background-color", "#15202b");
    $(".handlename").css("color", "#d9d9d9");
    $(".handleverifiedicon").css("color", "#d9d9d9");
    $(".tweet").css("color", "#d9d9d9");
    $(".active").toggleClass("active");
    $("#dim").toggleClass("active");
});

$("#light").on("click", function () {
    $(".postholder").css("background-color", "#ffffff");
    $(".handlename").css("color", "black");
    $(".handleverifiedicon").css("color", "#1da1f2");
    $(".tweet").css("color", "black");
    $(".active").toggleClass("active");
    $("#light").toggleClass("active");
});

// Adding a focusout event handler for when user is done editing the tweet. Below function will style all hashtags and mentions.
$('.tweet').on('focusout', function () {
    // Format the hashtags and mentions
    $('.tweet').html($('.tweet').html().replaceAll("<span class=\"tags\">", "").replaceAll("</span>", "").replace(/(^|\s|>|;)([#@][a-z\d-]+)/ig, "$1<span class='tags'>$2</span>"));
})

// Default the theme to dim
$("#dim").click();