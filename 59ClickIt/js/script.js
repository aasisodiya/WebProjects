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
$(document).ready(function (params) {
    var begin = true;
    var highscore = 0;
    var htimeout = 1;
    var timeout = -1;
    var score = 0;

    function getscore() {
        return score;
    }

    function gethighscore() {
        return highscore;
    }

    function gettimeout() {
        return timeout;
    }

    function gethtimeout() {
        return htimeout;
    }
    while (timeout < 10 || !Number.isInteger(timeout)) {
        var timeout = parseInt(
            prompt("For how many sec do you want to play (minimum: 10 sec)?", 10)
        );
    }
    if (localStorage.getItem("highscore") != null) {
        console.log("Played Before!");
        highscore = localStorage.getItem("highscore");
        htimeout = localStorage.getItem("timeout");
        $("#highscore").text(highscore + " (" + htimeout + " sec)");
    }
    $(".targets").click(function (params) {
        score = parseInt($("#score").text()) + 10;
        if (begin) {
            console.log("Start! Timeout is : " + timeout + " sec");
            var t = setTimeout(function () {
                $(".targets").unbind();
                var s, hs, t, ht;
                s = getscore();
                hs = gethighscore();
                t = gettimeout();
                ht = gethtimeout();
                if (s / t > hs / ht) {
                    localStorage.setItem("highscore", s);
                    localStorage.setItem("timeout", t);
                    $("#highscore").text(s + " (" + t + " sec)");
                }
                $("#message").text("Game Over! Refresh to restart!");
                $("#message").show();
                $("#danger").show();
            }, timeout * 1000);
            begin = false;
            $("#message").hide();
        }
        $("#score").text(score + " (" + timeout + " sec)");
        var height = window.innerHeight - 50;
        var width = window.innerWidth - 50;
        params.target.style.left = Math.floor(Math.random() * width) + "px";
        params.target.style.top = Math.floor(Math.random() * height) + "px";
        params.target.style.background = getRandomColor();
    });

    function getRandomColor() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    $("#danger").click(function () {
        localStorage.setItem("highscore", 0);
        localStorage.setItem("timeout", 10);
        $("#highscore").text(0 + " (" + 10 + " sec)");
        $("#score").text(0 + " (" + 10 + " sec)");
    });
});