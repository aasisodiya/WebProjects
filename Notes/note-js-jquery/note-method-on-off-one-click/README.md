# `on()`, `off()`, `one()` and `click()`

- [`on()`, `off()`, `one()` and `click()`](#on-off-one-and-click)
  - [Comparison of `.on()` method vs `.click()` method](#comparison-of-on-method-vs-click-method)
  - [`on()` Method](#on-method)
    - [Using eventsMap in `on()`](#using-eventsmap-in-on)
    - [Using `on()` with event, data and handler](#using-on-with-event-data-and-handler)
    - [Using `on()` with event, selector and handler](#using-on-with-event-selector-and-handler)
  - [`off()` Method](#off-method)
  - [`one()` Method](#one-method)
  - [Reference](#reference)

## Comparison of `.on()` method vs `.click()` method

1. `.on()` uses less memory and works for dynamically added elements

    **Supporting Statement**

    ```javascript
    $("button.alert").click(function() {
        alert("we are using click method");
    });
    ```

    When we use `.click()` as shown above, a separate handler gets created for every single element that matches the selector `$("button.alert")`.

    That means

    - Many matching elements would create many identical handlers and thus increase memory footprint
    - Dynamically added items won't have the handler - i.e, in the above html the newly added "Alert!" buttons won't work unless you rebind the handler.

2. While using `.on()` we have a single handler for all elements that match our selector, including the ones created dynamically.

3. Another reason to use `.on()` is namespaced events.

    If you add a handler with `.on()`("click", handler) you normally remove it with .off("click", handler) which will remove that very handler. Obviously this works only if you have a reference to the function, so what if you don't ? You use namespaces:

    ```javascript
    $("#element").on("click.someNamespace", function() { console.log("anonymous!"); });
    ```

    with unbinding via

    ```javascript
    $("#element").off("click.someNamespace");
    ```

> **What is namespaced events?** Looks like we are naming the events in order to distinguish them easily. This will likely be used primarily by plugin authors who wish to handle tasks differently depending on the event namespace used

## `on()` Method

**Description**: Attach an event handler function for one or more events to the selected elements.

**Syntax** for `on()` Method

```javascript
$(elements).on(events [, selector] [, data], handler);
```

Where:

- `events` is the event type(s). It can be one or more space-separated event types, e.g. ‘click’ or ‘click keydown’. It can include an optional namespaces, e.g. “click.myPlugin”.
- `selector` specifies the decendants of the elements that trigger the event. It is optional, and if it is not included the event will always trigger when the element event occurs.
- `data` is any data you want to pass to the handler when the event is triggered. This is also optional, and if used is normally an object.
- `handler` is the function to execute when the event is triggered.

### Using eventsMap in `on()`

You can also use an eventsMap to specify multiple events attached to one element.

```javascript
$(elements).on(eventsMap [, selector] [, data]);
```

For example:

```javascript
$('#container a').on({
  click: function(e) {
    e.preventDefault();
    console.log('item anchor clicked');
  },
  mouseenter: function(e) {
    console.log('enter!');
  }
});
```

### Using `on()` with event, data and handler

Example: Pass data to the event handler, which is specified here by name

```javascript
function myHandler( event ) {
  alert( event.data.foo );
}
$( "p" ).on( "click", { foo: "bar" }, myHandler );
```

### Using `on()` with event, selector and handler

An event-delegation approach attaches an event handler to only one element, the tbody, and the event only needs to bubble up one level (from the clicked tr to tbody):

```javascript
$( "#dataTable tbody" ).on( "click", "tr", function() {
  console.log( $( this ).text() );
});
```

## `off()` Method

**Description**: Remove an event handler.

**Syntax** for `off()` Method

```javascript
$(elements).off( [ events ] [, selector] [, handler] );
```

With `.off()` all parameters are optional - using the parameters will allow you to be more specific in what event handling you wish to turn off. Specifying `$(elements).off()` will remove all event handlers from the element.

## `one()` Method

**Syntax**:

```javascript
.one( events [,selector] [, data ], handler )
```

**Description**: Attach a handler to an event for the elements. The handler is executed at most once per element per event type. In simple words lets consider below given code for a list. No matter which list item you click on the alert will be shown only once.

```javascript
$( "#list" ).one( "click", 'li', function() {
  alert( "This will be displayed only once." );
});
```

## Reference

- <https://api.jquery.com/on/>
- <https://api.jquery.com/off/>
- <https://api.jquery.com/click/>
- <https://api.jquery.com/one/>
- <https://api.jquery.com/event.namespace/>
- <https://stackoverflow.com/questions/9122078/difference-between-onclick-vs-click>
- <https://www.andismith.com/blogs/2011/11/on-and-off/>
