# Clean Code

- [Clean Code](#clean-code)
  - [Swapping Values In Two Variables](#swapping-values-in-two-variables)
  - [Convert String to Number](#convert-string-to-number)
  - [Substitute A Variable Inside A String](#substitute-a-variable-inside-a-string)

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
