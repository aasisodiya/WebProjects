# Date in JavaScript

- [Date in JavaScript](#date-in-javascript)
  - [Constructor, Static and Instance Method](#constructor-static-and-instance-method)
  - [Code](#code)
  - [Convert Seconds To hh:mm:ss Format](#convert-seconds-to-hhmmss-format)
  - [Reference](#reference)

## Constructor, Static and Instance Method

> Note: Data below is specific to time when I wrote this code

|Code|Output|
|-|-|
|Date()|Sat Feb 27 2021 19:41:07 GMT+0530 (India Standard Time)|
|new Date()|Sat Feb 27 2021 19:41:07 GMT+0530 (India Standard Time)|
|Date.now()|1614435067319|
|Date.parse('Sat Feb 27 2021 19:41:07 GMT+0530 (India Standard Time)')|1614435067000|
|Date.UTC(2021, 01, 01)|1612137600000|
|date.getDate()|27|
|date.getDay()|6|
|date.getFullYear()|2021|
|date.getHours()|19|
|date.getMilliseconds()|320|
|date.getMinutes()|41|
|date.getMonth()|1|
|date.getSeconds()|7|
|date.getTime()|1614435067320|
|date.getTimezoneOffset()|-330|
|date.getUTCDate()|27|
|date.getUTCDay()|6|
|date.getUTCFullYear()|2021|
|date.getUTCHours()|14|
|date.getUTCMilliseconds()|320|
|date.getUTCMinutes()|11|
|date.getUTCMonth()|1|
|date.getUTCSeconds()|7|
|date.getYear()|121|
|date.toDateString()|Sat Feb 27 2021|
|date.toISOString()|2021-02-27T14:11:07.320Z|
|date.toJSON()|2021-02-27T14:11:07.320Z|
|date.toGMTString()|Sat, 27 Feb 2021 14:11:07 GMT|
|date.toLocaleDateString()|2/27/2021|
|date.toLocaleString("en-GB")|27/02/2021, 19:41:07|
|date.toLocaleTimeString()|7:41:07 PM|
|date.toString()|Sat Feb 27 2021 19:41:07 GMT+0530 (India Standard Time)|
|date.toTimeString()|19:41:07 GMT+0530 (India Standard Time)|
|date.toUTCString()|Sat, 27 Feb 2021 14:11:07 GMT|
|date.valueOf()|1614435067320|

> [Click here](./example/) to test out the live example of above code

## Code

```javascript
console.log("Date():",Date());
// Output: Date(): Sat Feb 27 2021 19:41:07 GMT+0530 (India Standard Time)
console.log("new Date():",new Date());
// Output: new Date(): Sat Feb 27 2021 19:41:07 GMT+0530 (India Standard Time)
console.log("Date.now() Returns the numeric value corresponding to the current time—the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC, with leap seconds ignored. Date.now():",Date.now());
// Output: Date.now() Returns the numeric value corresponding to the current time—the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC, with leap seconds ignored. Date.now(): 1614435067319
console.log("Date.parse('Sat Feb 27 2021 19:41:07 GMT+0530 (India Standard Time)'):",Date.parse("Sat Feb 27 2021 19:41:07 GMT+0530 (India Standard Time)"));
// Output: Date.parse('Sat Feb 27 2021 19:41:07 GMT+0530 (India Standard Time)'): 1614435067000
console.log("Date.UTC(year[, month[, day[, hour[, minute[, second[, millisecond]]]]]]) : Date.UTC(2021, 01, 01):",Date.UTC(2021, 01, 01));
// Output: Date.UTC(year[, month[, day[, hour[, minute[, second[, millisecond]]]]]]) : Date.UTC(2021, 01, 01): 1612137600000
let date = new Date();
console.log("date.getDate():", date.getDate());
// Output: date.getDate(): 27
console.log("date.getDay():", date.getDay());
// Output: date.getDay(): 6
console.log("date.getFullYear():", date.getFullYear());
// Output: date.getFullYear(): 2021
console.log("date.getHours():", date.getHours());
// Output: date.getHours(): 19
console.log("date.getMilliseconds():", date.getMilliseconds());
// Output: date.getMilliseconds(): 320
console.log("date.getMinutes():", date.getMinutes());
// Output: date.getMinutes(): 41
console.log("date.getMonth():", date.getMonth());
// Output: date.getMonth(): 1
console.log("date.getSeconds():", date.getSeconds());
// Output: date.getSeconds(): 7
console.log("date.getTime():", date.getTime());
// Output: date.getTime(): 1614435067320
console.log("date.getTimezoneOffset():", date.getTimezoneOffset());
// Output: date.getTimezoneOffset(): -330
console.log("date.getUTCDate():", date.getUTCDate());
// Output: date.getUTCDate(): 27
console.log("date.getUTCDay():", date.getUTCDay());
// Output: date.getUTCDay(): 6
console.log("date.getUTCFullYear():", date.getUTCFullYear());
// Output: date.getUTCFullYear(): 2021
console.log("date.getUTCHours():", date.getUTCHours());
// Output: date.getUTCHours(): 14
console.log("date.getUTCMilliseconds():", date.getUTCMilliseconds());
// Output: date.getUTCMilliseconds(): 320
console.log("date.getUTCMinutes():", date.getUTCMinutes());
// Output: date.getUTCMinutes(): 11
console.log("date.getUTCMonth():", date.getUTCMonth());
// Output: date.getUTCMonth(): 1
console.log("date.getUTCSeconds():", date.getUTCSeconds());
// Output: date.getUTCSeconds(): 7
console.log("date.getYear():", date.getYear());
// Output: date.getYear(): 121
console.log("%c Date in String", 'color: red; font-size:1rem');
// Output:  Date in String
console.log("date.toDateString():",date.toDateString());
// Output: date.toDateString(): Sat Feb 27 2021
console.log("date.toISOString():",date.toISOString());
// Output: date.toISOString(): 2021-02-27T14:11:07.320Z
console.log("date.toJSON():",date.toJSON());
// Output: date.toJSON(): 2021-02-27T14:11:07.320Z
console.log("date.toGMTString():",date.toGMTString());
// Output: date.toGMTString(): Sat, 27 Feb 2021 14:11:07 GMT
console.log("date.toLocaleDateString():",date.toLocaleDateString());
// Output: date.toLocaleDateString(): 2/27/2021
// console.log("date.toLocaleFormat():",date.toLocaleFormat("en-US"));
console.log("date.toLocaleString():",date.toLocaleString("en-GB"));
// Output: date.toLocaleString(): 27/02/2021, 19:41:07
console.log("date.toLocaleTimeString():",date.toLocaleTimeString());
// Output: date.toLocaleTimeString(): 7:41:07 PM
console.log("date.toString():",date.toString());
// Output: date.toString(): Sat Feb 27 2021 19:41:07 GMT+0530 (India Standard Time)
console.log("date.toTimeString():",date.toTimeString());
// Output: date.toTimeString(): 19:41:07 GMT+0530 (India Standard Time)
console.log("date.toUTCString():",date.toUTCString());
// Output: date.toUTCString(): Sat, 27 Feb 2021 14:11:07 GMT
console.log("The number of milliseconds between 1 January 1970 00:00:00 UTC and the given date. date.valueOf():",date.valueOf());
// Output: The number of milliseconds between 1 January 1970 00:00:00 UTC and the given date. date.valueOf(): 1614435067320
```

---

## Convert Seconds To hh:mm:ss Format

```js
let SECONDS = 3500;
let hhmmss = new Date(SECONDS * 1000).toISOString().substr(11, 8);
console.log(hhmmss);
// Output : 00:58:20
```

> [Click here](./example/) to test out the live example of above code

---

## Reference

- <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date>
