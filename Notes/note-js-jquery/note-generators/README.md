# Generators In JS

Generator function are defined with keyword `function*`

Let's take below example

```javascript
function createCounter() {
    let count = 0;
    // console.log("Counter Init");
    return function() {
        count++;
        // console.log("Return Count:", count);
        return count;
    }
}
let counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

Now there is another way to do the same using generator

```javascript
function* createCounter() {
    let count = 0;
    while(true) {
        yield ++count;
    }
}
let counter = createCounter();
console.log(counter.next().value); //1
console.log(counter.next().value); //2
console.log(counter.next().value); //3
```

## Reference

- [Generator Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*#simple_example)
- [Iterators and generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)
