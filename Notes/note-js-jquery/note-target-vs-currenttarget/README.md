# `Event.target` Property Vs `Event.currentTarget` Property

## Comparison Table

|Event.target|Event.currentTarget|
|-|-|
|The `target` property can be the element that registered for the event or a descendant of it. It is often useful to compare `event.target` to `this` in order to determine if the event is being handled due to event bubbling. This property is very useful in event delegation, when events bubble.|The `currentTarget` property will typically be equal to the `this` of the function. The `currentTarget` read-only property of the `Event` interface identifies the current target for the event, as the event traverses the DOM. It always refers to the element to which the event handler has been attached, as opposed to `Event.target`, which identifies the element on which the event occurred and which may be its descendant.|
|**Simplified**: `target` will point to the exact element the event occurs on. It can even be a descendant element of the selector|**Simplified**: `currentTarget` is the selector it self|

### Example To demonstrate the `target` and `currentTarget` property

```html
<div id="listener">Listener Div
    <div id="div1">Nested Div
        <div id="div2">Div on which click operation is performed</div>
    </div>
</div>
<script>
    $('#listener').on('click', function(event){
        console.log("event.target: ", event.target); // This will point to the div2
        console.log("event.currentTarget", event.currentTarget); // This will point to listener div
    });
</script>
```

In above example, when user clicks on the `div#div2` element it will trigger the function defined on click on `div#listener` element. Function is devised to print the log for `event.target` and `event.currentTarget`. In console log you will clearly see that console logger for `event.target` will print the data of `div#div2` element and for `event.currentTarget` will print data of `div#listener` element. In conclusion **`target` points to clicked element** (given that *element is descendant of the selector*) and `currentTarget` points to the selector element on which event handler function is attached.

> [Click here](./example/) to test out the live example of above code

## Reference

- <https://developer.mozilla.org/en-US/docs/Web/API/Event/target>
- <https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget>
- <https://api.jquery.com/event.target/>
- <https://api.jquery.com/event.currentTarget/>
- <https://api.jquery.com/on/>
