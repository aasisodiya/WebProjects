let debug = document.getElementById("debug");
let debugging = false;

let directionHelper = 0;
let truckicon = document.getElementById("itruck");
let truck = document.getElementById("truck");
let trucksize = truckicon.offsetWidth

document.onscroll = function (params) {
    let netScrollableHeight = document.body.scrollHeight - window.innerHeight;
    let scrollProgress = ((window.pageYOffset) / (netScrollableHeight)) * 100;

    if (debugging) {
        let debugdata = "Net Scrollable Height:" + netScrollableHeight + " Scroll Progress:" + scrollProgress;
        debug.innerHTML = debugdata;
    }

    // Relatively calculating Horizontal displacement of truck based on vertical scroll
    let roadLength = window.innerWidth - trucksize; //trucksize is used to stop truck before crashing :-P
    let displacement = roadLength * (scrollProgress / 100);

    // Setting Truck Direction
    if ((displacement - directionHelper) > 0) {
        truckicon.style.transform = "rotateY(180deg)";
    } else {
        truckicon.style.transform = "rotateY(0deg)";
    }

    // Setting Displacement
    truck.style.left = displacement + "px";
    directionHelper = displacement;
}