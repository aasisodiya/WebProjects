function calculate(params) {
    if (calc.txt.value == "") {
        calc.txt.value = 0;
    }
    try {
        let ans = eval(calc.txt.value);
        // console.log(ans)
        if (isNaN(ans) || !isFinite(ans)) {
            // console.log(ans);
            throw "Error"
        } else {
            document.calc.txt.value = ans;
        }
    } catch (error) {
        document.getElementById("warning").style.display = "grid";
        document.getElementById("warning").style.animation = "fadeout ease-in 3s";
        setTimeout(function () {
            document.getElementById("warning").style.display = "none";
        }, 3000);
    }
}

function deleteLast() {
    if(document.calc.txt.value.length > 0) {
        document.calc.txt.value = document.calc.txt.value.substring(0, document.calc.txt.value.length - 1)
    }
}