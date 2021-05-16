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
  - [`Robots.txt` File](#robotstxt-file)
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

## `Robots.txt` File

Robots.txt is a file which is usually placed in the root of any website. It decides whether crawlers are permitted or forbidden access to the web site. For example, the site admin can forbid crawlers to visit a certain folder (and all the files therein contained) or to crawl a specific file, usually to prevent those files being indexed by other search engines.

## Reference

- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web)
