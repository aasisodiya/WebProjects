# CSS Interaction Media Queries

- [CSS Interaction Media Queries](#css-interaction-media-queries)
  - [`pointer` Feature](#pointer-feature)
  - [`hover` Feature](#hover-feature)
  - [Device Notes](#device-notes)
  - [Reference](#reference)

## `pointer` Feature

The `pointer` CSS media feature tests whether the user has a pointing device (such as a mouse), and if so, how accurate the primary pointing device is.

|Value|Description|
|-|-|
|`none`|The primary input mechanism does not include a pointing device.|
|`coarse`|The primary input mechanism includes a pointing device of limited accuracy.|
|`fine`|The primary input mechanism includes an accurate pointing device.|

## `hover` Feature

The `hover` CSS media feature can be used to test whether the user's primary input mechanism can hover over elements.

|Value|Description|
|-|-|
|`none`|The primary input mechanism cannot hover at all or cannot conveniently hover (e.g., many mobile devices emulate hovering when the user performs an inconvenient long tap), or there is no primary pointing input mechanism.|
|`hover`|The primary input mechanism can conveniently hover over elements.|

## Device Notes

Below data is my personal observation - Tested on my Desktop & Mobile only

|Feature|Device Notes|
|-|-|
|`pointer:none`||
|`pointer:coarse`|Touchscreens Only|
|`pointer:fine`|Desktops Only|
|`hover:none`|Touchscreens Only|
|`hover:hover`|Desktops Only|
|`any-pointer:coarse`|Has Touchscreen|
|`any-pointer:fine`|Has Mouse Pointer|
|`any-hover:none`|Touchscreens Only|
|`any-hover:hover`|Has Mouse Pointer|

## Reference

- [`hover` Feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover)
- [`pointer` Feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer)
