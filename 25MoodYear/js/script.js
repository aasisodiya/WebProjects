`use strict`

// Saved user data in cache
let userdata = localStorage.getItem("userdata");
// LoadData from localstorage
if (userdata != null) {
    console.log("Found data to work with");
    userdata = JSON.parse(userdata);
} else {
    userdata = {};
}

// Get current time data
let currentDate = new Date();
let currentMonth = currentDate.getMonth(); // Month starts from 0
let currentYear = currentDate.getFullYear();

// Set current month and year in drop down
let realMonth;
if (currentMonth.toString().length < 2) {
    realMonth = '0' + (currentMonth + 1);
} else {
    realMonth = currentMonth;
}
let yyyyMM = currentYear + "-" + realMonth;
$('#moodmonth').val(yyyyMM);

// Functiont to get number of days in month
function getDaysInMonth(datetime) {
    return (new Date(datetime.getFullYear(), datetime.getMonth() + 1, 0)).getDate();
}

// Init
let selectedTime = new Date();
// selectedDateBlock stores the object of the date block of calendar you have selected
let selectedDateBlock = null;

// Function to create calendar for the selected month
function generateCalendar(yyyyMM) {
    // extract year and month from yyyyMM
    selectedTime = new Date(yyyyMM);
    // Lets update the title of the calendar
    let month = selectedTime.toLocaleString('default', { month: 'long' });
    $('#selectedMonthYear').html(month + " " + selectedTime.getFullYear());
    // lets start building calendar
    // First lets clear our calendar
    $('#month-calendar').html('');
    // Now lets insert Initials of weekdays
    let weekdayInitials = ["S", "M", "T", "W", "T", "F", "S"];
    let template = "<div class='classname'><div>replacement</div><span><!-- emoji --></span></div>";
    let titleRow = '';
    weekdayInitials.forEach(weekday => {
        titleRow += template.replace("replacement", weekday).replace("classname", "weekdayInitials");
    });
    $('#month-calendar').append(titleRow);
    // Now lets insert blanks till the month start date
    let blanksToInsert = selectedTime.getDay();
    let blanks = '';
    for (let index = 0; index < blanksToInsert; index++) {
        blanks += template.replace("replacement", "").replace("classname", "deadcell");
    }
    $('#month-calendar').append(blanks);
    // Now Lets insert days now
    let numberOfDays = getDaysInMonth(selectedTime);
    let monthDays = ''
    for (let index = 0; index < numberOfDays; index++) {
        monthDays += template.replace("replacement", (index + 1)).replace("classname", "day");
    }
    $('#month-calendar').append(monthDays);
    // Now Lets insert blanks again to fill the grid
    let blanksToInsertAtEnd = (7 - ((blanksToInsert + numberOfDays) % 7)) % 7;
    let blanksAtEnd = '';
    for (let index = 0; index < blanksToInsertAtEnd; index++) {
        blanksAtEnd += template.replace("replacement", "").replace("classname", "deadcell");
    }
    $('#month-calendar').append(blanksAtEnd);
    populateEmoji();
}

// Loading Calendar on Website Load
generateCalendar($('#moodmonth').val());

// Event Listener on change of MonthYear input
$('#moodmonth').change(function (event) {
    generateCalendar($(event.target).val());
});

$('.centerContent').on('click','.day', function (event) {
    console.log("added");
    // remove selection if any
    $('.day').removeClass('selected');
    // Apply selection class to new target
    $(event.currentTarget).addClass('selected');
    // get selected date
    selectedDateBlock = $(event.currentTarget);
});

$('.emoji').on('click', function (event) {
    // Check if calendar date has been selected or not
    if (selectedDateBlock == null) {
        alert('Please select a date from the calendar');
        return;
    }
    // Get mood Color
    let moodColor = $(event.currentTarget).css('background-color');
    // Get selected Emoji
    let selectedEmoji = $(event.currentTarget).find('.emoji-span').text();
    // Set selected emoji
    $(selectedDateBlock).find('span').html(selectedEmoji).css('display','block');
    // Set Mood Color
    selectedDateBlock.css('background-color', moodColor);
    // Save the Data
    let selectedDate = selectedDateBlock.find('div').text();
    selectedTime.setDate(selectedDate);
    let key = (selectedTime).toDateString();
    userdata[key] = moodColor+'/'+selectedEmoji;
    // save to localstorage
    localStorage.setItem("userdata", JSON.stringify(userdata));
});

// Function to populate emoji in calendar for saved data
function populateEmoji() {
    let numberOfDays = getDaysInMonth(selectedTime);
    for (let index = 0; index < numberOfDays; index++) {
        selectedTime.setDate(index+1);
        let key = selectedTime.toDateString();
        if (userdata[key] != undefined) {
            let target = $($('.day')[index]);
            // Set selected emoji
            target.find('span').html(userdata[key].split("/")[1]).css('display','block');
            // Set Mood Color
            target.css('background-color', userdata[key].split("/")[0]);
        }
    }
}

// To hide dates number from calendar set font size to zero

// // const for number of days in december
// const daysInDecember = 31;
// // Get the current date
// let currentDateTime = new Date();
// // Get the current year
// let currentYear = currentDateTime.getFullYear();
// // Get the current year starting date
// let currentYearStartDate = new Date(currentYear, 0, 1);
// // Get Starting Day
// let currentYearStartDay = currentYearStartDate.getDay();

// // Function to get next date
// let incrDate = currentYearStartDate;
// function getNextDate() {
//     incrDate.setDate(incrDate.getDate() + 1);
//     return incrDate;
// }

// // Lets fill in the first column (if any, then populating the last days from previous years)
// for (let index = 0; index < currentYearStartDay; index++) {
//     let date = (daysInDecember - currentYearStartDay) + index + 1;
//     $(".grid-container")[0].innerHTML += ('<div>' + date + '</div>');
// }

// // Now lets start populating the actual dates
// while (incrDate.getFullYear() < (currentYear + 1)) {
//     $(".grid-container")[0].innerHTML += ('<div>' + incrDate.getDate() + '</div>');
//     getNextDate();
// }



// // // Function to Generate Calendar
// // function generateCalendar() {
// //     for (let day = 1; day <= 31; day++) {
// //         for (let month = 0; month < 12; month++) {
// //             if (day < 28) {
// //                 $(".grid-container")[0].innerHTML += ('<div>' + day + '</div>');
// //             } else {
// //                 let lastDay = new Date(currentYear, (month + 1), 0);
// //                 if (day <= lastDay.getDate()) {
// //                     $(".grid-container")[0].innerHTML += ('<div>' + day + '</div>');
// //                 } else {
// //                     $(".grid-container")[0].innerHTML += ('<div class="transparent-bg"></div>');
// //                 }
// //             }
// //         }
// //     }
// // }

// // generateCalendar();

// $('.grid-container>div').on('click', function (event) {
//     console.log($('.grid-container>div').index(this));
// })

// // Code to export canvas as an image
// $('#downloadcanvas').on('click', function (event) {
//     var moodcanvas = $("#holder").get(0);
//     html2canvas(moodcanvas).then(function (canvas) {
//         let fileType = "png";
//         let fileName = "test"
//         let width = canvas.width;
//         let height = canvas.height;
//         console.log(canvas);
//         Canvas2Image.saveAsImage(canvas, width, height, fileType, fileName);
//         // -- OR --
//         // canvas.toBlob(function(blob) {
//         //     saveAs(blob, "test.png");
//         // });
//     });
// });

// function screenshot() {
//     html2canvas(document.body).then(function (canvas) {
//         document.body.appendChild(canvas);
//     });
// }