# CSS Notes

## Background Backdrop Filter

```css
.blur {
    backdrop-filter: blur(2px);
}

.brightness {
    backdrop-filter: brightness(60%);
}

.contrast {
    backdrop-filter: contrast(40%);
}

.grayscale {
    backdrop-filter: grayscale(90%);
}

.hue {
    backdrop-filter: hue-rotate(120deg);
}

.invert {
    backdrop-filter: invert(70%);
}

.sepia {
    backdrop-filter: sepia(90%);
}

.saturate {
    backdrop-filter: saturate(80%);
}

.opacity {
    backdrop-filter: opacity(20%);
}

.drop-shadow {
    backdrop-filter: drop-shadow(4px 4px 10px blue);
}
```

| backdrop-filter | Description                                             |
| --------------- | ------------------------------------------------------- |
| `blur(px)`      | `blur()` will add blur effect                           |
| `brightness(%)` | `brightness()` will set the brightness                  |
| `contrast(%)`   | `contrast()` will change the contrast                   |
| `grayscale()`   | `grayscale()` will add black & white (grayscale) effect |
| `hue()`         | `hue()` will apply a hue rotation                       |
| `invert()`      | `invert()` will invert the colors                       |
| `sepia()`       | `sepia()` will show sepia effect                        |
| `saturate()`    | `saturate()` will saturate the colors                   |
| `opacity()`     | `opacity()` sets transparency                           |
| `drop-shadow()` | `drop-shadow()` applies a drop shadow effect            |

> Example : [Backdrop-Filter](backdrop-example/)

## Background-Size Property

| Value                       | Description                                                                                                            |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `background-size: contain;` | It will resize the image inside given element in such a way that nothing is cropped (so there can be negative space)   |
| `background-size: cover;`   | It will resize the image inside given element to fit it completely irrespective if it gets cropped (no negative space) |
