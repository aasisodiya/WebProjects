# Clean Code

- [Clean Code](#clean-code)
  - [Swapping Values In Two Variables](#swapping-values-in-two-variables)
  - [Convert String to Number](#convert-string-to-number)
  - [Substitute A Variable Inside A String](#substitute-a-variable-inside-a-string)
  - [Optional Chaining](#optional-chaining)
  - [Creating Copy Of An Array](#creating-copy-of-an-array)
    - [Split A String Into An Array](#split-a-string-into-an-array)
    - [Remove Duplicate Values From An Array](#remove-duplicate-values-from-an-array)
  - [Single Line If-Else Condition Check](#single-line-if-else-condition-check)
  - [Check If Object Is Empty using `jQuery.isEmptyObject()`](#check-if-object-is-empty-using-jqueryisemptyobject)
  - [Shuffle an Array / Randomize an Array](#shuffle-an-array--randomize-an-array)

## Swapping Values In Two Variables

The basic way for Swapping value in two variable can be

```javascript
let a = 10;
let b = 20;
console.log(a, b);
// Output: 10 20
// Now lets swap value for a with b
let temp = a;
a = b;
b = temp;
console.log(a, b);
// Output: 20 10
```

But there is another one liner code to do the same

```javascript
let a = 10;
let b = 20;
console.log(a, b);
// Output: 10 20
// Now lets swap value for a with b
[a,b]=[b,a];
console.log(a, b);
// Output: 20 10
```

---

## Convert String to Number

Basic Way

```javascript
let str = "90";
let num = parseInt(str)
console.log(typeof num);
// Output: number
console.log(num);
// Output: 90
```

Short Code Way

```javascript
let str = "90";
let num = +str
console.log(typeof num);
// Output: number
console.log(num);
// Output: 90
```

---

## Substitute A Variable Inside A String

Basic Way

```javascript
let score = 100;
let subject = "Physics"
let message = "I scored " + score + " marks in " + subject + " in my exam";
console.log(message);
// Output: I scored 100 marks in Physics in my exam
```

Better Way is to use ` backticks to define a string and insert the variable name between ${}

```javascript
let score = 100;
let subject = "Physics"
let message = `I scored ${score} marks in ${subject} in my exam`;
console.log(message);
// Output: I scored 100 marks in Physics in my exam
```

---

## Optional Chaining

Lets consider an example: You have a data with nested properties i.e `data` has `prop1` which has `subprop1` which has `subsubprop1`. Now if you want to access `subsubprop1` you can do it like this `data.prop1.subprop1.subsubprop1`. But there is one issue, if left unchecked, you might get an error `somegivenproperty is not defined`. So to avoid this we have to check for undefined data. Basic way to do so is as follows

```javascript
let extractedData
if (data && data.prop1 && data.prop1.subprop1 && data.prop1.subprop1.subsubprop1) {
  extractedData = data.prop1.subprop1.subsubprop1;
}
```

Now above same can be done in simpler way - Using `?.` you can read the value of a property located deep within a chain of connected objects without having to expressly validate that each reference in the chain is valid

```javascript
let extractedData = data?.prop1?.subprop1?.subsubprop1;
```

---

## Creating Copy Of An Array

`arr1 = arr2` will never create a copy. They still point to the same values. So if you change value in one array it will get reflected in another array. So better way is to use `[...]`. For Example

```javascript
let arr1 = [1,2,3];
let arr2 = [...arr1];
let notacopy = arr1;

// Lets change value of arr1
arr1[1] = 90;

// Lets print all arrays
console.log(arr1);
// Output: [1, 90, 3]
console.log(arr2);
// Output: [1, 2, 3]
console.log(notacopy);
// Output: [1, 90, 3]
```

### Split A String Into An Array

You can also use `[...]` to Split A String Into An Array

```javascript
let string = "ABCDA";
let arr = [...string];
console.log(arr);
// Output: ["A", "B", "C", "D", "A"]
```

### Remove Duplicate Values From An Array

You can also use `[...]` and `new Set()` to Remove Duplicate Values From An Array

```javascript
let duparr = [1,1,1,1,2,2,2,3,3,3,3,4,5];
let uniquearr = [...new Set(duparr)];
console.log(uniquearr);
// Output: [1, 2, 3, 4, 5]
```

---

## Single Line If-Else Condition Check

Basic Code Example

```javascript
let age = 25
if (age > 18) {
  console.log("Can Play Cyberpunk");
} else {
  console.log("Not Suitable To Play Cyberpunk");
}
// Output: Can Play Cyberpunk
```

Short Code Example For Above Example

```javascript
let age = 25
age > 18 ? console.log("Can Play Cyberpunk") : console.log("Not Suitable To Play Cyberpunk");
// Output: Can Play Cyberpunk
```

## Check If Object Is Empty using `jQuery.isEmptyObject()`

You can use `jQuery.isEmptyObject()` to Check to see if an object is empty (contains no enumerable properties).

```javascript
jQuery.isEmptyObject({}); // true
jQuery.isEmptyObject({ foo: "bar" }); // false
jQuery.isEmptyObject(""); // true
jQuery.isEmptyObject("Akash"); // false
```

## Shuffle an Array / Randomize an Array

Below `shuffle()` function can help you randomize/shuffle the array.

```javascript
// shuffle function to shuffle the input array
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}
let sample = [1,2,3,4,5];
console.log(shuffle(sample));
// Output: [3, 2, 1, 4, 5]
```
