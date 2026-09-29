# CSS Layouts

- [CSS Layouts](#css-layouts)
  - [Columns in CSS](#columns-in-css)
  - [Reference](#reference)

---

- [Vertically Divided Element](https://aasisodiya.github.io/WebProjects/Notes/note-css-layout/note-vertically-divided-element/)
- [Vertically & Horizontally Center Element](https://aasisodiya.github.io/WebProjects/Notes/note-css-layout/note-vertically-center-element/)

---

## Columns in CSS

We can simply make multiple columns using css property `columns`. The `columns` CSS shorthand property sets the number of columns to use when drawing an element's contents, as well as those columns' widths. `columns` is a shorthand for the following CSS properties:

- `column-count`
- `column-width`

```css
.columns {
    color: white;
    padding: 2rem 1rem;
    columns: 250px auto;
    text-align: justify;
}
```

Above code will give you columns with `250px` as width, with number of columns adjusting to the screen size w.r.t the column's size.

> Example [Link](./note-columns/)

---

## Reference

- [Columns in CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/columns)
- [Positioning](https://thoughtbot.com/blog/positioning)
