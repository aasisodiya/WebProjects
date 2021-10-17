# CSS Marquee

> You can easily create a marquee using `<marquee>` tag, but this feature is no longer recommended.

- [CSS Marquee](#css-marquee)
  - [Left Scrolling CSS Marquee Code](#left-scrolling-css-marquee-code)
  - [Reference](#reference)

## Left Scrolling CSS Marquee Code

```css
.marquee {
    overflow: hidden;
    height: 50px;
    position: relative;
    /* Below properties are optional */
    background: black;
    color: chartreuse;
    border: 1px solid cyan;
}
.marquee p {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    line-height: 50px;
    text-align: center;
    /* Starting position */
    -moz-transform: translateX(100%);
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
    /* Apply animation to this element */
    -moz-animation: scroll-left 10s linear infinite;
    -webkit-animation: scroll-left 10s linear infinite;
    animation: scroll-left 10s linear infinite;
}
/* Move it (define the animation) */
@-moz-keyframes scroll-left {
    0% {
        -moz-transform: translateX(100%);
    }
    100% {
        -moz-transform: translateX(-100%);
    }
}
@-webkit-keyframes scroll-left {
    0% {
        -webkit-transform: translateX(100%);
    }
    100% {
        -webkit-transform: translateX(-100%);
    }
}
@keyframes scroll-left {
    0% {
        -moz-transform: translateX(100%);
        /* Browser bug fix */
        -webkit-transform: translateX(100%);
        /* Browser bug fix */
        transform: translateX(100%);
    }
    100% {
        -moz-transform: translateX(-100%);
        /* Browser bug fix */
        -webkit-transform: translateX(-100%);
        /* Browser bug fix */
        transform: translateX(-100%);
    }
}
```

```html
<div class="marquee">
    <p>Left Scrolling Text...</p>
</div>
```

For Sample Output [Click Here](example/)

## Reference

- [Scrolling Text](https://www.html.am/html-codes/marquees/scrolling-text.cfm)
