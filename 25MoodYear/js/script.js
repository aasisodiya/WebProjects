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

function activeDays(selectedTime) {
    if (selectedTime < currentDate) {
        if (selectedTime.getMonth() != currentDate.getMonth()) {
            // since selected month is older than current month then all days will be active
            return -1;
        }
        return (currentDate.getDate() - selectedTime.getDate()) + 1;
    }
    if (selectedTime > currentDate) {
        // since selected time is greater than currentTime then all days will be disabled
        return 0;
    }
}

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
    // Calculate active days
    let activedays = activeDays(selectedTime);
    console.log(activedays);
    let monthDays = ''
    if (activedays == -1) {
        activedays = numberOfDays;
    }
    for (let index = 0; index < activedays; index++) {
        monthDays += template.replace("replacement", (index + 1)).replace("classname", "day");
    }
    for (let index = activedays; index < numberOfDays; index++) {
        monthDays += template.replace("replacement", (index + 1)).replace("classname", "disabledday");
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

$('.centerContent').on('click', '.day', function (event) {
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
    $(selectedDateBlock).find('span').html(selectedEmoji).css('display', 'block');
    // Set Mood Color
    selectedDateBlock.css('background-color', moodColor);
    // Save the Data
    let selectedDate = selectedDateBlock.find('div').text();
    selectedTime.setDate(selectedDate);
    let key = (selectedTime).toDateString();
    userdata[key] = moodColor + '/' + selectedEmoji;
    // save to localstorage
    localStorage.setItem("userdata", JSON.stringify(userdata));
});

// Function to populate emoji in calendar for saved data
function populateEmoji() {
    let numberOfDays = getDaysInMonth(selectedTime);
    for (let index = 0; index < numberOfDays; index++) {
        selectedTime.setDate(index + 1);
        let key = selectedTime.toDateString();
        if (userdata[key] != undefined) {
            let target = $($('.day')[index]);
            // Set selected emoji
            target.find('span').html(userdata[key].split("/")[1]).css('display', 'block');
            // Set Mood Color
            target.css('background-color', userdata[key].split("/")[0]);
        }
    }
}

// Code to export canvas as an image
$('#download').on('click', function (event) {
    // Calculate the statistics
    calculateAndShowStatistics();
    $('#statistics').show();
    $('.selected').removeClass('selected');
    selectedDateBlock = null;
    $('.transparent').show();
    // adjusting emoji spacing
    $('.month-calendar>div>span').css('top', '-0.3rem');
    var moodcanvas = $(".rightContainer").get(0);
    html2canvas(moodcanvas).then(function (canvas) {
        let fileType = "png";
        let fileName = $('#moodmonth').val() + "-mood-calendar";
        let width = canvas.width;
        let height = canvas.height;
        console.log(canvas);
        Canvas2Image.saveAsImage(canvas, width, height, fileType, fileName);
        // -- OR --
        // canvas.toBlob(function(blob) {
        //     saveAs(blob, "test.png");
        // });
    });
    $('.transparent').hide();
    $('#statistics').hide();
    $('.month-calendar>div>span').css('top', '-0.2rem');
});

// calculateAndShowStatistics to show count of each mood for given month
function calculateAndShowStatistics() {
    let emojidescription = [
        "Awesome Day",
        "Happy Day",
        "Normal Day",
        "Exhausted/Tired Day",
        "Frustrating Day",
        "Sad/Depressed Day",
        "Stressful Day",
        "Sick Day",
        "Weird Day"
    ];
    let emojilist = ["🤩", "😃", "🙂", "😫", "😡", "😔", "😓", "😷", "🤔"];
    let emojiCount = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let emojimap = $('#month-calendar>.day>span');
    let dayCount = emojimap.length;
    for (let index = 0; index < dayCount; index++) {
        switch (emojimap.get(index).innerHTML) {
            case emojilist[0]:
                emojiCount[0]++;
                break;
            case emojilist[1]:
                emojiCount[1]++;
                break;
            case emojilist[2]:
                emojiCount[2]++;
                break;
            case emojilist[3]:
                emojiCount[3]++;
                break;
            case emojilist[4]:
                emojiCount[4]++;
                break;
            case emojilist[5]:
                emojiCount[5]++;
                break;
            case emojilist[6]:
                emojiCount[6]++;
                break;
            case emojilist[7]:
                emojiCount[7]++;
                break;
            case emojilist[8]:
                emojiCount[8]++;
                break;
            default:
                break;
        }
    }
    // Now display the statistics on UI
    let statistics = "<div>";
    for (let index = 0; index < emojiCount.length; index++) {
        statistics = statistics + emojilist[index] + emojidescription[index] + ": " + emojiCount[index] + '<br>';
        // console.log((index+1)%3);
        if (index == 2 || index == 5) {
            statistics += "</div><div>";
        }
    }
    statistics += "</div>";
    $('#statistics')[0].innerHTML = statistics;
}

// calculateAndShowStatistics();

// Hide statistics using code (css not working)
$('#statistics').hide();