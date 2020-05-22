let sun = document.getElementById("sun");
console.log(sun);
let moon = document.getElementById("moon");
console.log(moon);

window.addEventListener("orientationchange", function() {
    console.log("the orientation of the device is now " + screen.orientation.angle);
    console.log(screen.orientation.angle);
    console.log(window.orientation);
    document.getElementById("debug").innerHTML = "Screen Orientation:" + screen.orientation.angle + " Window Orientation:" + window.orientation + " InnerWidth:" + (window.innerWidth);
    let deg = screen.orientation.angle;
    if (deg >= 90) {
        sun.style.left = "-100%";
        moon.style.right = "25%";
    }
    if (deg < 90) {
        sun.style.left = "15%";
        moon.style.right = "-100%";
    }
});