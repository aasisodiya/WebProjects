# Create a copy of an Object

- [Create a copy of an Object](#create-a-copy-of-an-object)
  - [Noob's Approach](#noobs-approach)
  - [Better Approach](#better-approach)
  - [Reference](#reference)

## Noob's Approach

Below is the approach I used for a very long time, until I came across an article regarding better way to create a copy of an object in JavaScript. First of all using `let objectCopy = object;` will not create a copy, instead objectCopy and object will still point to the same object data (meaning of which, if you make changes to object variable will also be reflected on objectCopy). Ok so the very basic/noob approach to create a copy of an object is to simply stringify and parse the same data into new variable. Sample code is given below

```javascript
let initialObject = {
    key1: "value1",
    key2: "value2"
}

// Create copy using direct assignment (wrong way - this won't create a copy)
let directObjectAssignment = initialObject;

// Create copy using JSON parse and stringify (will actually create a copy)
let objectCopy = JSON.parse(JSON.stringify(initialObject));

// Lets alter the data for initial object
initialObject.key1 = "key3";

// Printing initialObject
console.log(initialObject);
// {key1: "key3", key2: "value2"}

// Printing objectCopy
console.log(objectCopy);
// {key1: "value1", key2: "value2"} // Data remained the same as before the alteration, meaning an actual copy was created

// Printing directObjectAssignment
console.log(directObjectAssignment);
// {key1: "key3", key2: "value2"} // Data is same as initialObject because direct assignment doesn't create a copy
```

## Better Approach

Better approach to create a copy of an object in JavaScript are:

- `let objectCopy = Object.assign({}, initialObject);`
- `let objectCopy = {...initialObject}`

> The Object. assign() method only copies enumerable and own properties from a source object to a target object

Sample Code Example

```javascript
let initialObject = {
    key1: "value1",
    key2: "value2"
}

// Create copy using {...Object}
let objectCopy1 = {...initialObject};

// Create copy using direct Object.assign()
let objectCopy2 = Object.assign({}, initialObject);

// Initial Values of all objects are given below
console.log(initialObject);
// {key1: "value1", key2: "value2"}
console.log(objectCopy1);
// {key1: "value1", key2: "value2"}
console.log(objectCopy2)
// {key1: "value1", key2: "value2"}

// Lets alter the data for initial object
initialObject.key1 = "value3";

// Checking values of all object after changes
console.log(initialObject);
// {key1: "value3", key2: "value2"}

// Values for both copies are unchanged as expected
console.log(objectCopy1);
// {key1: "value1", key2: "value2"}
console.log(objectCopy2)
// {key1: "value1", key2: "value2"}
```

## Reference

- [Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
