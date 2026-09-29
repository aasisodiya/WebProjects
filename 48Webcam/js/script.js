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

let toggle = true;

$("#camicon").on("click", function () {
    if (toggle) {
        console.log("Start");
        let video = $("#video");
        let vendorURL = window.URL || window.webkitURL;
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({
                    video: true,
                })
                .then(function (stream) {
                    video[0].srcObject = stream;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    } else {
        console.log("Stop");
        let video = $("#video");
        var stream = video[0].srcObject;
        var tracks = stream.getTracks();
        for (var i = 0; i < tracks.length; i++) {
            var track = tracks[i];
            track.stop();
        }
        video.srcObject = null;
    }
    toggle = !toggle;
});