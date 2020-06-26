// Function to resize canvas
function resizeCanvas() {
    let width = $('#diagram').width();
    // console.log(width);
    $('#myCanvas')[0].attributes[1].nodeValue = width;
    $('#myCanvas')[0].attributes[2].nodeValue = width/2;
}

// Resizing the canvas on start
resizeCanvas();

// Resizing the canvas based on the window size
window.onresize = function () {
    resizeCanvas();
}

// Calculations
$('#calculate').on("click", function () {
    let angle = $('#angle').val()
    let velocity = $('#velocity').val()
    let precision = $('#precision').val()
    let gravity = $('#gravity').val()
    let time = $('#time').val()
    $('.timec')[0].innerHTML = time;
    $('.timec')[1].innerHTML = time;
    console.log("Calculating...", angle, velocity, precision, gravity, time);

    // Calculating Vx
    let vx = velocity * Math.cos(angle * Math.PI / 180);
    $('#vx').val(vx.toFixed(precision));
    // Calculating Vy
    let vy = velocity * Math.sin(angle * Math.PI / 180);
    $('#vy').val(vy.toFixed(precision));
    // Calculating Vxt
    $('#vxt').val(vx.toFixed(precision));
    // Calculating Vyt
    let vyt = vy - (gravity * time);
    $('#vyt').val(vyt.toFixed(precision));
    // Calculating Time of Flight
    let tof = 2 * vy / gravity;
    $('#timeofflight').val(tof.toFixed(precision));
    // Calculating Maximum Height Reached
    let maxHeight = ((velocity * velocity) * ((Math.sin(angle * Math.PI / 180)) * (Math.sin(angle * Math.PI / 180))) / (2 * gravity));
    $('#maxheight').val(maxHeight.toFixed(precision));
    // Calculating Range
    let range = vx * 2 * vy / gravity;
    $('#range').val(range.toFixed(precision));
    // Calculating Xt
    let xt = vx * time;
    $('#xt').val(xt.toFixed(precision));
    // Calculating Yt
    let yt = (vy * time) - (0.5 * gravity * time * time);
    $('#yt').val(yt.toFixed(precision));
    // Calculating Velocity @ t
    let vt = Math.pow(((vx * vx) + (vyt * vyt)), 0.5);
    $('#vt').val(vt.toFixed(precision));

    // Draw the projectile---
    // Not to scale but to ratio with respect to
    // max possible height and range as reference
    // and then calculating the value for curve

    let maxPossibleHeight = ((velocity * velocity) / (2 * gravity));
    let maxPossibleRange = ((velocity * velocity) / gravity);

    // Control point, to point
    let fx = $('#myCanvas')[0].attributes[1].nodeValue;
    let fy = $('#myCanvas')[0].attributes[2].nodeValue;
    console.log("MaxHeightPossible:", maxPossibleHeight, " height:", maxHeight);
    let cpy = parseInt(fy) - 2*(parseInt(fy) * (maxHeight/maxPossibleHeight));

    // To Point
    let tpx = parseInt(fx) * (range/maxPossibleRange);
    let cpx = (tpx/2);
    let tpy = fy;
    console.log(fx,fy,cpx, cpy, tpx, tpy);

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    // Lets keep this fixed here
    ctx.moveTo(0, fy);
    ctx.quadraticCurveTo(cpx, cpy, tpx, tpy);
    ctx.stroke();

});
