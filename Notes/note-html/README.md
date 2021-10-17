# HTML Notes

- [HTML Notes](#html-notes)
  - [`<meta>` tag: The metadata element](#meta-tag-the-metadata-element)
    - [Standard metadata names](#standard-metadata-names)
    - [Uncommon MetaData Names](#uncommon-metadata-names)
      - [Values for the content of `<meta name="robots">`](#values-for-the-content-of-meta-namerobots)
    - [Viewport](#viewport)
      - [Example](#example)
    - [Refresh A Page On Specific Interval](#refresh-a-page-on-specific-interval)
    - [Redirect To A Page After Specific Interval](#redirect-to-a-page-after-specific-interval)
    - [Prevent Zoom on Your Website](#prevent-zoom-on-your-website)
  - [Making Website Text Content Editable](#making-website-text-content-editable)
  - [`Robots.txt` File](#robotstxt-file)
  - [`spellcheck="true"` Attribute](#spellchecktrue-attribute)
  - [Data Attributes](#data-attributes)
    - [Ways To Read Data Attributes](#ways-to-read-data-attributes)
  - [Global Attributes](#global-attributes)
  - [Random Image Using `picsum.photos`](#random-image-using-picsumphotos)
  - [ARIA Attributes](#aria-attributes)
  - [`<fieldset>` The Field Set element](#fieldset-the-field-set-element)
  - [`<datalist>`: The HTML Data List element used with input list](#datalist-the-html-data-list-element-used-with-input-list)
  - [`<progress>`: The Progress Indicator element](#progress-the-progress-indicator-element)
  - [`<meter>`: The HTML Meter element](#meter-the-html-meter-element)
  - [`<template>`: The Content Template element](#template-the-content-template-element)
  - [Reference](#reference)

## `<meta>` tag: The metadata element

The HTML `<meta>` element represents metadata that cannot be represented by other HTML meta-related elements, like `<base>`, `<link>`, `<script>`, `<style>` or `<title>`.

|Attributes|Description|
|-|-|
|`name`|The `name` and `content` attributes can be used together to provide document metadata in terms of name-value pairs, with the `name` attribute giving the metadata name, and the `content` attribute giving the value.|
|`http-equiv`|Defines a pragma directive. The attribute is named http-equiv(alent) because all the allowed values are names of particular HTTP headers: `content-security-policy`, `content-type`, `default-style`, `x-ua-compatible`, `refresh`|
|`content`|This attribute contains the value for the http-equiv or name attribute, depending on which is used.|
|`charset`|This attribute declares the document's character encoding. `<meta>` elements which declare a character encoding must be located entirely within the first 1024 bytes of the document.|
|`itemprop`|If the itemprop attribute is set, the `<meta>` element provides user-defined metadata.|

> **Note**: the attribute name has a specific meaning for the `<meta>` element, and the itemprop attribute must not be set on the same `<meta>` element that has any existing name, http-equiv or charset attributes.

### Standard metadata names

|MetaData `name`|Description|
|-|-|
|`application-name`|The name of the application running in the web page|
|`author`|The name of the document's author|
|`description`|A short and accurate summary of the content of the page. Several browsers, like Firefox and Opera, use this as the default description of bookmarked pages|
|`generator`|The identifier of the software that generated the page|
|`keywords`|The words relevant to the page's content separated by commas|
|`theme-color`|It indicates a suggested color that user agents should use to customize the display of the page or of the surrounding user interface. The content attribute contains a valid CSS `<color>`|
|`color-scheme`|It specifies one or more color schemes with which the document is compatible. The value of the content property for color-scheme may be one of the following: `normal`, `[light | dark]+`, `only light`. For example, to indicate that a document prefers dark mode but does render functionally in light mode as well: `<meta name="color-scheme" content="dark light">`|
|`viewport`|It gives hints about the size of the initial size of the viewport. Used by mobile devices only.|

### Uncommon MetaData Names

|MetaData `name`|Description|
|-|-|
|`creator`|The name of the creator of the document, such as an organization or institution. If there are more than one, several `<meta>` elements should be used|
|`googlebot`|A synonym of robots, is only followed by Googlebot (the indexing crawler for Google)|
|`publisher`|The name of the document's publisher|
|`robots`|The behavior that cooperative crawlers, or "robots", should use with the page. It is a comma-separated list of the values|

#### Values for the content of `<meta name="robots">`

|Value|Description|Used by|
|-|-|-|
|`index`|Allows the robot to index the page (default).|All|
|`noindex`|Requests the robot to not index the page.|All|
|`follow`|Allows the robot to follow the links on the page (default).|All|
|`nofollow`|Requests the robot to not follow the links on the page.|All|
|`all`|Equivalent to index, follow|Google|
|`none`|Equivalent to noindex, nofollow|Google|
|`noarchive`|Requests the search engine not to cache the page content.|Google, Yahoo, Bing|
|`nosnippet`|Prevents displaying any description of the page in search engine results.|Google, Bing|
|`noimageindex`|Requests this page not to appear as the referring page of an indexed image.|Google|
|`nocache`|Synonym of noarchive.|Bing|

### Viewport

`viewport` gives hints about the size of the initial size of the viewport. Used by mobile devices only.

Values for the content of `<meta name="viewport">`

|Value|Possible subvalues|Description|
|-|-|-|
|`width`|A positive integer number, or the text device-width|Defines the pixel width of the viewport that you want the web site to be rendered at.|
|`height`|A positive integer, or the text device-height|Defines the height of the viewport. Not used by any browser.|
|`initial-scale`|A positive number between 0.0 and 10.0|Defines the ratio between the device width (device-width in portrait mode or device-height in landscape mode) and the viewport size.|
|`maximum-scale`|A positive number between 0.0 and 10.0|Defines the maximum amount to zoom in. It must be greater or equal to the minimum-scale or the behavior is undefined. Browser settings can ignore this rule and iOS10+ ignores it by default.|
|`minimum-scale`|A positive number between 0.0 and 10.0|Defines the minimum zoom level. It must be smaller or equal to the maximum-scale or the behavior is undefined. Browser settings can ignore this rule and iOS10+ ignores it by default.|
|`user-scalable`|`yes` or `no`|If set to no, the user is not able to zoom in the webpage. The default is yes. Browser settings can ignore this rule, and iOS10+ ignores it by default.|
|`viewport-fit`|`auto`, `contain` or `cover`|The `auto` value doesn’t affect the initial layout viewport, and the whole web page is viewable. The `contain` value means that the viewport is scaled to fit the largest rectangle inscribed within the display. The `cover` value means that the viewport is scaled to fill the device display. It is highly recommended to make use of the safe area inset variables to ensure that important content doesn't end up outside the display.|

> `maximum-scale`, `minimum-scale` & `user-scalable` iOS10+ ignores it by default.

#### Example

```html
<!-- A typical meta viewport tag -->
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- if your layout needs at least 500 pixels of width then you can use the following markup. When the screen is more than 500 pixels wide, the browser will expand the viewport (rather than zoom in) to fit the screen: -->
<meta name="viewport" content="width=500, initial-scale=1">

<!-- If web developers want their scale settings to remain consistent when switching orientations on the iPhone, they must add a maximum-scale value to prevent this zooming, which has the sometimes-unwanted side effect of preventing users from zooming in: -->
<meta name="viewport" content="initial-scale=1, maximum-scale=1">

<!-- Suppress the small zoom applied by many smartphones by setting the initial scale and minimum-scale values to 0.86. The result is horizontal scroll is suppressed in any orientation and the user can zoom in if they want to. -->
<meta name="viewport" content="width=device-width, initial-scale=0.86, maximum-scale=5.0, minimum-scale=0.86">
```

### Refresh A Page On Specific Interval

You can use below code to refresh a page on specific interval. Below code will refresh the page every 30 seconds

```html
<meta http-equiv="refresh" content="30">
```

### Redirect To A Page After Specific Interval

You can use below code to redirect to a page after specific interval of time. Below code will redirect you to my github page after 10 seconds

```html
<!-- Redirect page after 10 seconds -->
<meta http-equiv="refresh" content="10;url=https://www.github.com/aasisodiya">
```

### Prevent Zoom on Your Website

You can use below code to prevent zoom operation on your website

```html
<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' >
```

---

## Making Website Text Content Editable

Below code enables you to make any text element of your website editable. Which means you can simply select the element and it will turn into an input, which enables you to edit that content as you like. All you have to do is set the `contenteditable` attribute on nearly any HTML element to make it editable using `contenteditable="true"`.

```html
<div contenteditable="true">
  This text can be edited by the user.
</div>
```

---

## `Robots.txt` File

Robots.txt is a file which is usually placed in the root of any website. It decides whether crawlers are permitted or forbidden access to the web site. For example, the site admin can forbid crawlers to visit a certain folder (and all the files therein contained) or to crawl a specific file, usually to prevent those files being indexed by other search engines.

---

## `spellcheck="true"` Attribute

The `spellcheck` global attribute is an enumerated attribute defines whether the element may be checked for spelling errors. This attribute is merely a hint for the browser: browsers are not required to check for spelling errors. Typically non-editable elements are not checked for spelling errors, even if the `spellcheck` attribute is set to `true` and the browser supports spellchecking.

---

## Data Attributes

Data Attributes i.e. `data-*` attributes allow us to store extra information on standard, semantic HTML elements without other hacks such as non-standard attributes, or extra properties on DOM. Any attribute on any element whose attribute name starts with data- is a data attribute. Example:

```html
<div data-category="car" data-type="4WD" data-fuel-type="diesel" data-class="racing">
    ...
</div>
```

> Each property is a string and can be read and written

### Ways To Read Data Attributes

Data Attributes can be read using `element.getAttribute(attributeName);` or a better simpler way is via a `dataset` property. To get a `data` attribute through the `dataset` object, get the property by the part of the attribute name after `data-`. Also the property can be read in CSS with the `attr()` function or can also be used as the attribute selectors in CSS

> Note: dashes are converted to camelCase. Ex. `data-fuel-type` gets converted to `fuelType`

```js
const cardata = document.querySelector("#racecar1");
console.log(cardata.dataset.category); // Output: car
console.log(cardata.dataset.type); // Output: 4WD
console.log(cardata.dataset.fuelType); // Output: diesel
console.log(cardata.dataset.class); // Output: racing
// OR
const cardata = $("#racecar1");
console.log(cardata.data("category")); // Output: car
console.log(cardata.data("type")); // Output: 4WD
console.log(cardata.data("fuelType")); // Output: diesel
console.log(cardata.data("class")); // Output: racing
```

```css
div:before {
  content: attr(data-category);
}
div[data-fuel-type='diesel'] {
  background: brown;
}
```

> Using dataset is even slower than reading the data out with getAttribute().

---

## Global Attributes

|Global Attribute|Description|
|-|-|
|accesskey|Specifies a shortcut key to activate/focus an element. Ex. `accesskey="a"`|
|autocapitalize|Controls whether and how text input is automatically capitalized as it is entered/edited by the user. Ex. `autocapitalize=off|none|on|sentences|words|characters`|
|autofocus|Indicates that an element is to be focused on page load. Ex. `autofocus=true|false`|
|class|A space-separated list of the classes of the element.|
|contenteditable|An enumerated attribute indicating if the element should be editable by the user. Ex. `contenteditable=true|false`|
|data-*|Forms a class of attributes, called custom data attributes, that allow proprietary information to be exchanged|
|dir|An enumerated attribute indicating the directionality of the element's text. Ex. `dir=ltr|rtl|auto`|
|draggable|An enumerated attribute indicating whether the element can be dragged, using the Drag and Drop API. Ex. `draggable=true|false`|
|enterkeyhint|Hints what action label (or icon) to present for the enter key on virtual keyboards.|
|hidden|A Boolean attribute indicates that the element is not yet, or is no longer, relevant.|
|id|Defines a unique identifier (ID) which must be unique in the whole document.|
|inputmode|Provides a hint to browsers as to the type of virtual keyboard configuration to use when editing this element or its contents.|
|is|Allows you to specify that a standard HTML element should behave like a registered custom built-in element|
|lang|Helps define the language of an element: the language that non-editable elements are in, or the language that editable elements should be written in by the user.|
|nonce|A cryptographic nonce ("number used once") which can be used by Content Security Policy to determine whether or not a given fetch will be allowed to proceed. Ex. `<script nonce="edv22gsd3klasak4ljs5lds">…</script>`|
|part|A space-separated list of the part names of the element. Part names allows CSS to select and style specific elements in a shadow tree via the ::part pseudo-element.|
|slot|Assigns a slot in a shadow DOM shadow tree to an element: An element with a slot attribute is assigned to the slot created by the <slot> element whose name attribute's value matches that slot attribute's value.|
|spellcheck|An enumerated attribute defines whether the element may be checked for spelling errors|
|style|Contains CSS styling declarations to be applied to the element.|
|tabindex|An integer attribute indicating if the element can take input focus (is focusable), if it should participate to sequential keyboard navigation, and if so, at what position.|
|title|Contains a text representing advisory information related to the element it belongs to. Such information can typically, but not necessarily, be presented to the user as a tooltip.|
|translate|An enumerated attribute that is used to specify whether an element's attribute values and the values of its Text node children are to be translated when the page is localized, or whether to leave them unchanged.|

---

## Random Image Using `picsum.photos`

Sometimes its better to focus on code, then on finding images for UI so for such time I like to use `picsum.photos`. Code is just as simple, as given below

```html
<img src="https://picsum.photos/10/10">
```

So all you have to do is use syntax: `https://picsum.photos/<width>/<height>` where both `<width>` and `<height>` are replaced with numbers representing pixels. Ex. `https://picsum.photos/300/100` will give you an image (random) with width of `300px` and height of `100px`

---

## ARIA Attributes

Accessible Rich Internet Applications (ARIA) is a set of attributes that define ways to make web content and web applications (especially those developed with JavaScript) more accessible to people with disabilities.

Extension Recommended for Testing ARIA Attributes: [Screen Reader](https://chrome.google.com/webstore/detail/screen-reader/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en)

It helps you to setup a website that is user friendly for people who rely on assistive technology

[Youtube Tutorial: ARIA HTML Tutorial - What is ARIA & Why it's Important to Use!](https://www.youtube.com/watch?v=0hqhAIjE_8I)

---

## `<fieldset>` The Field Set element

The `<fieldset>` HTML element is used to group several controls as well as labels (`<label>`) within a web form. If a `<legend>` is present, it is placed over the block-start border.

> **Note**: The caption for the fieldset is given by the first `<legend>` element nested inside it.

```html
<form action="#">
  <fieldset>
    <legend>Simple fieldset</legend>
    <input type="radio" id="radio">
    <label for="radio">Spirit of radio</label>
  </fieldset>
</form>
```

|Attributes|Description|
|-|-|
|`disabled`|`<fieldset disabled>` will disable the fieldset and all form controls that are descendants of the `<fieldset>` meaning they are not editable and won't be submitted along with the `<form>`|
|`form`|This attribute takes the value of the id attribute of a `<form>` element you want the `<fieldset>` to be part of, even if it is not inside the form.|
|`name`|The name associated with the group.|

## `<datalist>`: The HTML Data List element used with input list

The `<datalist>` HTML element contains a set of `<option>` elements that represent the permissible or recommended options available to choose from within other controls.

> You get a search filter with datalist, unlike the `<select>` element

```html
<label for="myBrowser">Choose a browser from this list:</label>
<input list="browsers" id="myBrowser" name="myBrowser" />
<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Internet Explorer">
  <option value="Opera">
  <option value="Safari">
  <option value="Microsoft Edge">
</datalist>
```

> Reference: [Link](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist)

## `<progress>`: The Progress Indicator element

The `<progress>` HTML element displays an indicator showing the completion progress of a task, typically displayed as a progress bar.

```html
<label for="file">File progress:</label>

<progress id="file" max="100" value="70"> 70% </progress>
```

|Attributes|Description|
|-|-|
|`max`|This attribute describes how much work the task indicated by the progress element requires.|
|`value`|This attribute specifies how much of the task that has been completed.|

## `<meter>`: The HTML Meter element

The `<meter>` HTML element represents either a scalar value within a known range or a fractional value.

```html
<label for="fuel">Fuel level:</label>

<meter id="fuel"
       min="0" max="100"
       low="33" high="66" optimum="80"
       value="50">
    at 50/100
</meter>
```

|Attributes|Description|
|-|-|
|value|The current numeric value.|
|min|The lower numeric bound of the measured range.|
|max|The upper numeric bound of the measured range.|
|low|The upper numeric bound of the low end of the measured range.|
|high|The lower numeric bound of the high end of the measured range.|
|optimum|This attribute indicates the optimal numeric value.|
|form|The `<form>` element to associate the `<meter>` element with (its form owner). The value of this attribute must be the id of a <form> in the same document.|

## `<template>`: The Content Template element

The `<template>` HTML element is a mechanism for holding HTML that is not to be rendered immediately when a page is loaded but may be instantiated subsequently during runtime using JavaScript.

Think of a template as a content fragment that is being stored for subsequent use in the document. While the parser does process the contents of the `<template>` element while loading the page, it does so only to ensure that those contents are valid; the element's contents are not rendered, however.

```html
<template id="productrow">
  <tr>
    <td class="record"></td>
    <td></td>
  </tr>
</template>
```

> Reference: [Link](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)

## Reference

- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web)
- [Using data-* attributes in JavaScript and CSS](https://hacks.mozilla.org/2012/10/using-data-attributes-in-javascript-and-css/)
