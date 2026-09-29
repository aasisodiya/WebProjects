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

var fscore = 0;
//handle the enter key press
$(document).ready(function (params) {
    $(document).on("keypress", function (e) {
        if (e.which == 13) {
            var val1, val2, operation, answer;
            val1 = $("#val1").text();
            val2 = $("#val2").text();
            operation = encodeOperation($("#operation").text());
            answer = $("#answer").val();
            var ans = eval(val1 + operation + val2);
            var playHeight = $(".centerdiv").height();
            var playWidth = $(".centerdiv").width();
            if (ans == answer) {
                fscore = incr();
                $("body").css("background", "#9DC43A");
            } else {
                $("body").css("background", "#ED3A43");
            }
            $("#scorecard").text(fscore);
            var newVal = loadNewQuestion();
            console.log(newVal);
            $("#answer").val("");
            $("#val1").text(newVal[0]);
            $("#val2").text(newVal[1]);
            $("#operation").text(newVal[2]);
        }
    });
    $(document).on("click", function (params) {
        console.log("clicked!");
        $("#answer").focus();
    });
});
//encode the operation
function encodeOperation(operation) {
    switch (operation) {
        case "X":
            operation = "*";
            break;
        case "÷":
            operation = "/";
            break;
        default:
            break;
    }
    return operation;
}
//encode the operation
function decodeOperation(operation) {
    switch (operation) {
        case 0:
            operation = "+";
            break;
        case 1:
            operation = "-";
            break;
        case 2:
            operation = "X";
            break;
        case 3:
            operation = "÷";
            break;
        default:
            break;
    }
    return operation;
}
//increment the score
var incr = (function () {
    var score = 0;

    function increment() {
        score++;
        return score;
    }
    return increment;
})();
//load new question
function loadNewQuestion(params) {
    var type = Math.floor(Math.random() * 4);
    var val1, val2;
    switch (type) {
        case 0:
        case 1: //add and subtract
            val1 = Math.ceil(Math.random() * 100);
            val2 = Math.ceil(Math.random() * 100);
            break;
        case 2:
        case 3: //divide and multiply
            val1 = Math.ceil(Math.random() * 10);
            val2 = Math.ceil(Math.random() * 10);
            break;
        default:
            break;
    }
    switch (type) {
        case 0:
        case 2: //add and multiply
            break;
        case 1: //subtract
            if (val2 > val1) {
                //swap
                var temp = val2;
                val2 = val1;
                val1 = temp;
            }
            break;
        case 3: //divide
            var ans = val1 * val2;
            val1 = ans;
            break;
        default:
            break;
    }
    return [val1, val2, decodeOperation(type)];
}