# Survey Rating Reaction based on Input Range

## Personal Note

1. Code works specific to one smiley face
2. Code needs to be modified if you want to reuse the smile face multiple times
3. Avoid setting any width to SVG, it is being set in BG
4. Avoid changing any values inside SVG

## Q&A

### How to refresh document in some time interval

**Solution:** `<meta http-equiv="refresh" content="seconds">` Use this meta tag where you provide value in place of `seconds`. Then it will simply refresh the page in set time interval.

### Difference Between animVal & baseVal

**Answer:** As the name suggests animVal (animation value) referes to current value of the attribute (in case it is changed by any animation) and baseVal refers to the base value that doesn't change even after animation is applied. Both values remains the same until you are using any Animation Elements.

> **Reference:** [SVG: when to use animVal / baseVal](https://stackoverflow.com/questions/5887911/svg-when-to-use-animval-baseval)

### Scaling SVG with Code

**Solution:** I am simply using `ElementYouWantToScale.setAttribute("transform", "scale(1.5)");`

### How is this working `target2.innerText = value;` even when there is no target2 defined

Work on this
