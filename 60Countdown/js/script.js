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

function formatNumberToTwoDigits(number) {
  if (number < 10) {
    return `0${number}`;
  } else {
    return number.toString();
  }
}

function getTargetDateTime() {
  let targetDateTime = new Date();
  targetDateTime = localStorage.getItem("targetDateTime");
  if (!targetDateTime) {
    let currentDateTime = new Date();
    let currentYear = currentDateTime.getFullYear();
    let newYear = currentYear + 1;
    let newYearDateTime = new Date(newYear, 0); // Here we use syntax: new Date(year, monthIndex)
    targetDateTime = newYearDateTime;
  }
  return new Date(targetDateTime);
}

function getTimeDifference(startTimestamp, endTimestamp) {
  const ONE_SECOND_MS = 1000;
  const ONE_MINUTE_MS = ONE_SECOND_MS * 60;
  const ONE_HOUR_MS = ONE_MINUTE_MS * 60;
  const ONE_DAY_MS = ONE_HOUR_MS * 24;
  const ONE_MONTH_MS = ONE_DAY_MS * 30.44; // Average month length
  const ONE_YEAR_MS = ONE_MONTH_MS * 12;

  let timeDifferenceMs = endTimestamp - startTimestamp;
  if (timeDifferenceMs < 0) {
    timeDifferenceMs = 0;
  }

  const years = Math.floor(timeDifferenceMs / ONE_YEAR_MS);
  const months = Math.floor((timeDifferenceMs % ONE_YEAR_MS) / ONE_MONTH_MS);
  const days = Math.floor((timeDifferenceMs % ONE_MONTH_MS) / ONE_DAY_MS);
  const hours = Math.floor((timeDifferenceMs % ONE_DAY_MS) / ONE_HOUR_MS);
  const minutes = Math.floor((timeDifferenceMs % ONE_HOUR_MS) / ONE_MINUTE_MS);
  const seconds = Math.floor(
    (timeDifferenceMs % ONE_MINUTE_MS) / ONE_SECOND_MS
  );

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
  };
}

let targetDateTime = new Date();
function startClock() {
  setInterval(() => {
    const timeDifference = getTimeDifference(
      new Date().getTime(),
      targetDateTime
    );
    console.debug(
      `Time remaining: ${timeDifference.years} years, ${timeDifference.months} months, ${timeDifference.days} days, ${timeDifference.hours} hours, ${timeDifference.minutes} minutes, ${timeDifference.seconds} seconds`
    );
    $("#years").text(formatNumberToTwoDigits(timeDifference.years));
    $("#months").text(formatNumberToTwoDigits(timeDifference.months));
    $("#days").text(formatNumberToTwoDigits(timeDifference.days));
    $("#hours").text(formatNumberToTwoDigits(timeDifference.hours));
    $("#minutes").text(formatNumberToTwoDigits(timeDifference.minutes));
    $("#seconds").text(formatNumberToTwoDigits(timeDifference.seconds));
  }, 1000);
}

// Function to convert time to format - YYYY-MM-DDTHH:MM:SS
function getTimeFormatForInput(dateTime) {
  dateTime = new Date(dateTime);
  // Convert the date and time to the format required by input type="datetime-local"
  const year = dateTime.getFullYear().toString().padStart(4, "0");
  const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
  const day = dateTime.getDate().toString().padStart(2, "0");
  const hours = dateTime.getHours().toString().padStart(2, "0");
  const minutes = dateTime.getMinutes().toString().padStart(2, "0");

  // Format the date and time as a string
  const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
  return formattedDateTime;
}

// Code to read targetDateTime from the local storage
targetDateTime = getTargetDateTime();
// Now init and start the clock
startClock(targetDateTime);

$("#targetDate").val(getTimeFormatForInput(targetDateTime));
$(".settings-panel").hide();
$("#settings").on("click", function () {
  $(".settings-panel").show();
});

$("#close-settings-panel").on("click", function () {
  $(".settings-panel").hide();
});

$("#update").on("click", function () {
  targetDateTime = new Date($("#targetDate").val());
  localStorage.setItem("targetDateTime", targetDateTime);
  $(".settings-panel").hide();
});
