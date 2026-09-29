# RegExp

- [RegExp](#regexp)
  - [Defining RegExp](#defining-regexp)
  - [RegExp methods](#regexp-methods)
  - [String methods](#string-methods)
  - [Example for `exec()` and `match()`](#example-for-exec-and-match)
  - [Reference](#reference)

The RegExp object is used for matching text with a pattern

## Defining RegExp

```js
const re = /pattern/flags;
// Example
const re = /\w+\s/g;
```

or

```js
const re = new RegExp("pattern", "flags");
// Example
const re = new RegExp("\\w+\\s", "g");
```

> Note: flags are an integral part of a regular expression. They cannot be added or removed later.

| Flag | Description                                                                                               |
| ---- | --------------------------------------------------------------------------------------------------------- |
| d    | Generate indices for substring matches.                                                                   |
| g    | Global search.                                                                                            |
| i    | Case-insensitive search.                                                                                  |
| m    | Multi-line search.                                                                                        |
| s    | Allows . to match newline characters.                                                                     |
| u    | "unicode"; treat a pattern as a sequence of unicode code points.                                          |
| y    | Perform a "sticky" search that matches starting at the current position in the target string. See sticky. |

RegExp can be used with RegExp Methods and String Methods

## RegExp methods

| Method   | Description                                                                                                                                  |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `exec()` | Executes a search for a match in a string. It returns an array of information or null on a mismatch. more information (but slower execution) |
| `test()` | Tests for a match in a string. It returns true or false. Use this when you want to know whether a pattern is found in a string               |

## String methods

| Method         | Description                                                                                                                                          |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `match()`      | Returns an array containing all of the matches, including capturing groups, or null if no match is found. more information (but slower execution)    |
| `matchAll()`   | Returns an iterator containing all of the matches, including capturing groups.                                                                       |
| `search()`     | Tests for a match in a string and returns the index of the match, or -1 if the search fails. Use this to know whether a pattern is found in a string |
| `replace()`    | Executes a search for a match in a string, and replaces the matched substring with a replacement substring.                                          |
| `replaceAll()` | Executes a search for all matches in a string, and replaces the matched substrings with a replacement substring.                                     |
| `split()`      | Uses a regular expression or a fixed string to break a string into an array of substrings.                                                           |

## Example for `exec()` and `match()`

```javascript
const myRe = /d(b+)d/g;
const myArray = myRe.exec("cdbbdbdbddbbbbddbbbbbbdsbz");
// Output: ['dbbd', 'bb', index: 1, input: 'cdbbdbdbddbbbbddbbbbbbdsbz', groups: undefined]
// OR
const myArray = /d(b+)d/g.exec("cdbbdbdbddbbbbddbbbbbbdsbz");
// Output: ['dbbd', 'bb', index: 1, input: 'cdbbdbdbddbbbbddbbbbbbdsbz', groups: undefined]
// OR
"cdbbdbdbddbbbbddbbbbbbdsbz".match(/d(b+)d/g);
// Output: ['dbbd', 'dbd', 'dbbbbd', 'dbbbbbbd']
```

Now in above example `exec` returns `'dbbd' and 'bb'` only as it only checks for a match, whereas `match` returns all the combinations hence it's slower in execution

```javascript
let myRegExp = /d(b+)d/g;
let myString = "0dbdbd";
let myArray = myRegExp.exec(myString);
console.log(`The value of lastIndex is ${myRegExp.lastIndex}`); // The value of lastIndex is 4
myArray = myRegExp.exec(myString);
console.log(`The value of lastIndex is ${myRegExp.lastIndex}`); // The value of lastIndex is 0
myArray = myRegExp.exec(myString);
console.log(`The value of lastIndex is ${myRegExp.lastIndex}`); // The value of lastIndex is 4
```

```javascript
let myRegExp = /d(b+)d/g;
let myString = "0dbddbd";
let myArray = myRegExp.exec(myString);
myArray = myRegExp.exec(myString);
console.log(`The value of lastIndex is ${myRegExp.lastIndex}`); // The value of lastIndex is 4
myArray = myRegExp.exec(myString);
console.log(`The value of lastIndex is ${myRegExp.lastIndex}`); // The value of lastIndex is 7
myArray = myRegExp.exec(myString);
console.log(`The value of lastIndex is ${myRegExp.lastIndex}`); // The value of lastIndex is 0
```

```javascript
const str = "fee fi fo fum";
const re = /\w+\s/g;

console.log(re.exec(str)); // ["fee ", index: 0, input: "fee fi fo fum"]
console.log(re.exec(str)); // ["fi ", index: 4, input: "fee fi fo fum"]
console.log(re.exec(str)); // ["fo ", index: 7, input: "fee fi fo fum"]
console.log(re.exec(str)); // null
```

## Reference

- [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
- [Regular Expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
