// Template Code Start
"use strict"
// Just for Fun!
console.log('%c Stop Right There! ', 'background: #222; color: orange;font-size:20px');
console.log('%c You Shall Not Pass! ', 'background: #222; color: red; font-size:40px');
// Template Code End

let target = "";

$('.tweetimages').on('click', function (param) {
    console.log('tweetimage');
    target = "tweetimage";
    $('#imageupload').click();
});

$('.profileicon').on('click', function (param) {
    console.log('profileicon');
    target = "profileicon";
    $('#imageupload').click();
});

$('#imageupload').change(function (e) {
    e.preventDefault();
    console.log(e);
    // $('#image')[0].files[0]
    readAndLoadImage($('#imageupload')[0].files[0], target);
});

function readAndLoadImage(file, imgElemId) {
    // Check if the file is an image.
    if (file.type && !file.type.startsWith('image/')) {
        console.log('File is not an image.', file.type, file);
        return;
    }

    let img = $('#' + imgElemId)[0];

    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        console.log(img);
        img.src = event.target.result;
        console.log("done");
    });
    reader.readAsDataURL(file);
}

// Code to export canvas as an image
$('#download').on('click', function (event) {
    $('.nav').hide();
    $('.help').hide();
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
    $('.nav').show();
    $('.help').show();
});