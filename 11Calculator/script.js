function calculate(params) {
    if (calc.txt.value == "") {
        calc.txt.value = 0;
    }
    try {
        document.calc.txt.value = eval(calc.txt.value);
    } catch (error) {
        document.getElementById("warning").style.display = "grid";
        document.getElementById("warning").style.animation = "fadeout ease-in 3s";
        setTimeout(function () {
            document.getElementById("warning").style.display = "none";
        }, 3000);
    }
}