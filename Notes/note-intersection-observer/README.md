# Intersection Observer API

- [Intersection Observer API](#intersection-observer-api)
  - [Example of Need for Intersection information](#example-of-need-for-intersection-information)
  - [Intersection observer concepts and usage](#intersection-observer-concepts-and-usage)
  - [Steps to Follow](#steps-to-follow)
    - [Creating an Intersection Observer](#creating-an-intersection-observer)
    - [Targeting an element to be observed](#targeting-an-element-to-be-observed)
    - [Intersection change callbacks](#intersection-change-callbacks)
  - [Interfaces](#interfaces)
    - [IntersectionObserver](#intersectionobserver)
    - [IntersectionObserverEntry](#intersectionobserverentry)
  - [How intersection is calculated](#how-intersection-is-calculated)
  - [Thresholds](#thresholds)
  - [Reference](#reference)

The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.

## Example of Need for Intersection information

- Lazy-loading of images or other content as a page is scrolled.
- Implementing "infinite scrolling" web sites, where more and more content is loaded and rendered as you scroll, so that the user doesn't have to flip through pages.
- Reporting of visibility of advertisements in order to calculate ad revenues.
- Deciding whether or not to perform tasks or animation processes based on whether or not the user will see the result.

One thing the Intersection Observer API can't tell you: the exact number of pixels that overlap or specifically which ones they are; however, it covers the much more common use case of "If they intersect by somewhere around N%, I need to do something."

## Intersection observer concepts and usage

The Intersection Observer API allows you to configure a callback that is called when either of these circumstances occur:

- A target element intersects either the device's viewport or a specified element. That specified element is called the root element or root for the purposes of the Intersection Observer API.
- The first time the observer is initially asked to watch a target element.

The degree of intersection between the target element and its root is the `intersection ratio`. This is a representation of the percentage of the target element which is visible as a value between `0.0` and `1.0`.

## Steps to Follow

### Creating an Intersection Observer

Create the intersection observer by calling its constructor and passing it a callback function to be run whenever a threshold is crossed in one direction or the other:

```js
let options = {
  root: document.querySelector("#scrollArea"),
  rootMargin: "0px",
  threshold: 1.0,
};

let observer = new IntersectionObserver(callback, options);
```

A threshold of `1.0` means that when 100% of the target is visible within the element specified by the `root` option, the callback is invoked.

The `options` object passed into the `IntersectionObserver()` constructor let you control the circumstances under which the observer's `callback` is invoked. It has the following fields:

| Fields     | Description |
| ---------- | ----------- |
| root       | The element that is used as the viewport for checking visibility of the target. Must be the ancestor of the target. Defaults to the browser viewport if not specified or if null. |
| rootMargin | Margin around the root. |
| threshold  | Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. If you only want to detect `when visibility passes the 50% mark`, you can use a value of `0.5`. If you want the callback to run every time visibility passes another 25%, you would specify the array `[0, 0.25, 0.5, 0.75, 1]`. The default is 0 (meaning as soon as even one pixel is visible, the callback will be run). A value of `1.0` means that the threshold isn't considered passed until `every pixel is visible`. |

### Targeting an element to be observed

Once you have created the observer, you need to give it a target element to watch:

```js
let target = document.querySelector('#listItem');
observer.observe(target);
```

The callback we setup for the observer will be executed now for the first time. It waits until we assign a target to our observer (even if the target is currently not visible)

Whenever the target meets a threshold specified for the IntersectionObserver, the callback is invoked. The callback receives a list of IntersectionObserverEntry objects and the observer:

```js
let callback = (entries, observer) => {
  entries.forEach(entry => {
    // Each entry describes an intersection change for one observed
    // target element:
    //   entry.boundingClientRect
    //   entry.intersectionRatio
    //   entry.intersectionRect
    //   entry.isIntersecting
    //   entry.rootBounds
    //   entry.target
    //   entry.time
  });
};
```

Check the value of the `isIntersecting` property to see if the entry represents an element that currently intersects with the root.

### Intersection change callbacks

When the amount of a target element which is visible within the root element crosses one of the visibility thresholds, the `IntersectionObserver` object's callback is executed. The callback receives as input an array of all of `IntersectionObserverEntry` objects, one for each threshold which was crossed, and a reference to the `IntersectionObserver` object itself.

The code snippet below shows a callback which keeps a counter of how many times elements transition from not intersecting the root to intersecting by at least 75%. For a threshold value of 0.0 (default) the callback is called approximately upon transition of the boolean value of `isIntersecting`. The snippet thus first checks that the transition is a positive one, then determines whether `intersectionRatio` is above `75%`, in which case it increments the counter.

```js
intersectionCallback(entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      let elem = entry.target;

      if (entry.intersectionRatio >= 0.75) {
        intersectionCounter++;
      }
    }
  });
}
```

## Interfaces

### IntersectionObserver

The primary interface for the Intersection Observer API. Provides methods for creating and managing an observer which can watch any number of target elements for the same intersection configuration. Each observer can asynchronously observe changes in the intersection between one or more target elements and a shared ancestor element or with their top-level Document's viewport. The ancestor or viewport is referred to as the root.

### IntersectionObserverEntry

Describes the intersection between the target element and its root container at a specific moment of transition. Objects of this type can only be obtained in two ways: as an input to your `IntersectionObserver` callback, or by calling `IntersectionObserver.takeRecords()`.

## How intersection is calculated

All areas considered by the Intersection Observer API are rectangles

## Thresholds

Rather than reporting every infinitesimal change in how much a target element is visible, the Intersection Observer API uses thresholds. When you create an observer, you can provide one or more numeric values representing percentages of the target element which are visible. Then, the API only reports changes to visibility which cross these thresholds.

> Example [Link](./example/)

## Reference

- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
