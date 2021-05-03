# Animations

- [Animations](#animations)
  - [`animation-play-state` Property](#animation-play-state-property)
  - [`animation-delay` Property](#animation-delay-property)
  - [`animation-iteration-count` Property](#animation-iteration-count-property)
  - [`animation-fill-mode` Property](#animation-fill-mode-property)
  - [Scroll Based Animation](#scroll-based-animation)
    - [Rotation Animation on Scroll](#rotation-animation-on-scroll)
    - [Translation Animation on Scroll](#translation-animation-on-scroll)
  - [Reference](#reference)

---

## `animation-play-state` Property

`animation-play-state` CSS property sets whether an animation is running or paused.

|Value|Description|
|-|-|
|`animation-play-state: running;`|The animation is currently playing|
|`animation-play-state: paused;`|The animation is currently paused|

## `animation-delay` Property

`animation-delay` CSS property specifies the amount of time to wait from applying the animation to an element before beginning to perform the animation. The animation can start later, immediately from its beginning, or immediately and partway through the animation.

|Value|Description|
|-|-|
|`animation-delay: <time>`|Where `time` can be `ms` or `s` and unit is requried. It can be 0, +ve or -ve as well|

## `animation-iteration-count` Property

`animation-iteration-count` CSS property sets the number of times an animation sequence should be played before stopping.

|Value|Description|
|-|-|
|`animation-iteration-count: infinite`|The animation will repeat forever|
|`animation-iteration-count: <number>`|The number of times the animation will repeat; this is 1 by default. You may specify non-integer values to play part of an animation cycle: for example, 0.5 will play half of the animation cycle. ***Negative values are invalid.***|

## `animation-fill-mode` Property

`animation-fill-mode` CSS property sets how a CSS animation applies styles to its target before and after its execution.

|Value|Description|
|-|-|
|`animation-fill-mode: none;`|The animation will not apply any styles to the target when it's not executing. The element will instead be displayed using any other CSS rules applied to it. This is the default value|
|`animation-fill-mode: forwards;`|The target will retain the computed values set by the last keyframe encountered during execution. The last keyframe depends on the value of animation-direction and animation-iteration-count|
|`animation-fill-mode: backwards;`|The animation will apply the values defined in the first relevant keyframe as soon as it is applied to the target, and retain this during the animation-delay period. The first relevant keyframe depends on the value of animation-direction|
|`animation-fill-mode: both;`|The animation will follow the rules for both forwards and backwards, thus extending the animation properties in both directions|

---

## Scroll Based Animation

### Rotation Animation on Scroll

Below code will help you with rotating an element based on scroll

```css
.rotate-scroll {
    --animation-time: 10;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0px) rotate(0deg);
    animation: rotate calc(var(--animation-time) * 1s) linear infinite;
    animation-play-state: paused;
    animation-delay: calc(var(--scroll) * var(--animation-time) * -1s);
    animation-iteration-count: 1;
    animation-fill-mode: both;
}

@keyframes rotate {
    to {
        transform: translate3d(-50%, -50%, 0px) rotate(360deg);
    }
}

body {
    min-height: 500vh;
}
```

```js
window.addEventListener(
    "scroll",
    () => {
        document.body.style.setProperty(
            "--scroll",
            window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
        );
    },
    false
);
```

```html
<i class="fa fa-github rotate-scroll fa-4x"></i>
```

For Working Sample [Click Here](06ScrollBasedAnimation/)

### Translation Animation on Scroll

Below code will help you move/translate an element based on scroll

```css
.translate-scroll {
    --animation-time: 10;
    color: red;
    transform: translate3d(-50%, 0, 0px) rotateZ(45deg);
    position: fixed;
    animation: translate calc(var(--animation-time) * 1s) linear infinite;
    animation-play-state: paused;
    animation-delay: calc(var(--scroll) * var(--animation-time) * -1s);
    animation-iteration-count: 1;
    animation-fill-mode: both;
    right: 90vw;
}

@keyframes translate {
    to {
        right: 0vw;
    }
}


body {
    min-height: 500vh;
}
```

```js
window.addEventListener(
    "scroll",
    () => {
        document.body.style.setProperty(
            "--scroll",
            window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
        );
    },
    false
);
```

```html
<i class="fa fa-rocket translate-scroll fa-4x"></i>
```

For Working Sample [Click Here](06ScrollBasedAnimation/)

---

## Reference

- [animation-play-state](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state)
- [animation-delay](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay)
- [animation-iteration-count](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count)
- [animation-fill-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode)
