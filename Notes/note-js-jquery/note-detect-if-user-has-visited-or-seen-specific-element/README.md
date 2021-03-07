# Detect If User Has Visited/Seen Specific Element of Website

Came across this Problem Statement while developing a code that checks if user has read the whole set of instructions defined for an online quiz. Though the core principal of detection remains the same but there is one issue i missed to incorporate while developing the same logic for an image inside a div. Before coming to the issue, lets discuss what I did for developing a code that checks if user has read the long instructions.

## Old Approach which I used to Detect If User visited/viewed the Instructions of The Quiz

I inserted an empty-ish div with id at the end of the div containing Instructions. Then I tracked the position of the element from top. While tracking I handled a check to make sure that my div came inside viewport using logic that `positionFromTop < viewportHeight`. You can clearly see the issue which will occur if we use the same logic for image, issues are as follows :

- Above Logic totally neglects the height of div/element that we want user to see
- It returns true (i.e element is in viewport) even for partially viewed div/element
- Though we can use the same logic of inserting an empty-ish div at the end of target element, but still it isn't the right way but instead is just a workaround.

## Better Approach to Detect If User visited/viewed the Element

Correct/Better approach is:

- To track the element directly
- Use its bounding rectangle's property to determine if the element:
  - was viewed till the end
  - is in viewport

### Checking if Element is in Viewport

Use this approach when you want to check if an element is in viewport or *element was viewed till the end** (* condition being that element height is less than that of the viewport).

> **Warning**: Below solution will work only for elements that have height less than that of the viewport.

**Solution** Code

```javascript
// Get the element
var element = $('#elementId');

// Function to check if element is in Viewport (returns true if present else returns false)
function isElementInViewport (element) {
    // Get its position & geometric data
    let elementData = element.getBoundingClientRect();
    return (
        elementData.top >= 0 &&
        elementData.left >= 0 &&
        elementData.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        elementData.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};
```

### Checking if Element was viewed till end (applicable for elements having height greater than viewport)

If the element height is less than that of viewport then previous method will also work for you, but if the element height is greater than that of the viewport then follow this approach.

> **Warning**: Below solution will work properly only for elements that have height greater than that of viewport.

**Solution** Code

```javascript
// Get the element
var longElement = $('#longElementId');

// Function to check if element is in Viewport (returns true if present else returns false)
function isElementViewedTillEnd(element) {
    console.log(typeof(element));
    console.log(typeof(element[0]));
    // Get its position & geometric data
    let elementData = element[0].getBoundingClientRect();
    return (
        elementData.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
};
```

> Visit this [link](./example/index.html) for Sample demonstration of above code

**Code** for Event Listener

```javascript
// Now will have to add an event listener in order to check if the element comes in viewport / element is viewed till end
$(document).on('scroll', function (event) {
    if (isElementInViewport(element)) {
        console.log("Red Element is in viewport!");
    }
    // Below code will never return true because of height issue
    if (isElementInViewport(element1)) {
        console.log("Magenta Element is in viewport!");
    }
    if (isElementViewedTillEnd(longElement)) {
        console.log("BlueViolet Element was viewed till end!");
    }
});
```

## Reference

- [How to test if an element is in the viewport with vanilla JavaScript](https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/)
