// const for number of days in december
const daysInDecember = 31;
// Get the current date
let currentDateTime = new Date();
// Get the current year
let currentYear = currentDateTime.getFullYear();
// Get the current year starting date
let currentYearStartDate = new Date(currentYear, 0, 1);
// Get Starting Day
let currentYearStartDay = currentYearStartDate.getDay();

// Function to get next date
let incrDate = currentYearStartDate;
function getNextDate() {
    incrDate.setDate(incrDate.getDate() + 1);
    return incrDate;
}

// Lets fill in the first column (if any, then populating the last days from previous years)
for (let index = 0; index < currentYearStartDay; index++) {
    let date = (daysInDecember - currentYearStartDay) + index + 1;
    $(".grid-container")[0].innerHTML += ('<div>' + date + '</div>');
}

// Now lets start populating the actual dates
while (incrDate.getFullYear() < (currentYear + 1)) {
    $(".grid-container")[0].innerHTML += ('<div>' + incrDate.getDate() + '</div>');
    getNextDate();
}

// Code to export canvas as an image
var moodcanvas = $("#moodcanvas2").get(0);
$('#moodcanvas2').on('click', function (event) {
    html2canvas(moodcanvas).then(function (canvas) {
        let fileType = "png";
        let fileName = "test"
        let width = canvas.width;
        let height = canvas.height;
        Canvas2Image.saveAsImage(canvas, width, height, fileType, fileName);
        // document.body.appendChild(canvas);
    });
});

function screenshot() {
    html2canvas(document.body).then(function (canvas) {
        document.body.appendChild(canvas);
    });
}