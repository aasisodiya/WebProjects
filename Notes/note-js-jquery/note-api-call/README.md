# API Call From Website

- [API Call From Website](#api-call-from-website)
  - [`fetch()`](#fetch)
    - [Syntax](#syntax)
    - [`init` Options](#init-options)
  - [Using `fetch()`](#using-fetch)
    - [The fetch specification differs from jQuery.ajax() in the following significant ways:](#the-fetch-specification-differs-from-jqueryajax-in-the-following-significant-ways)
    - [Basic Fetch Request](#basic-fetch-request)
    - [`no-cors` mode Allowed Headers](#no-cors-mode-allowed-headers)
  - [Using Request Option with `fetch()`](#using-request-option-with-fetch)
  - [Uploading JSON data using `fetch()`](#uploading-json-data-using-fetch)
  - [Uploading a File Using `fetch()`](#uploading-a-file-using-fetch)
  - [Uploading multiple files using `fetch()`](#uploading-multiple-files-using-fetch)
  - [Using Request Object with `fetch()`](#using-request-object-with-fetch)
  - [Headers](#headers)
  - [Simple Get API Call Logic](#simple-get-api-call-logic)
  - [`$.get()` Function](#get-function)
  - [Reference](#reference)

## `fetch()`

The global `fetch()` method starts the process of fetching a resource from the network, returning a promise which is fulfilled once the response is available.

### Syntax

```js
const fetchResponsePromise = fetch(resource [, init])
```

### `init` Options

An object containing any custom settings that you want to apply to the request. The possible options are:

| Option         | Details |
| -------------- | ------- |
| method         |The request method, e.g., GET, POST|
| headers        |Any headers you want to add to your request, contained within a Headers object or an object literal with ByteString values.|
| body           |Any body that you want to add to your request|
| mode           |The mode you want to use for the request, e.g., `cors`, `no-cors`, or `same-origin`.|
| credentials    |Controls what browsers do with credentials (cookies, HTTP authentication entries, and TLS client certificates). Must be one of the following strings: `omit`, `same-origin` & `include`|
| cache          |A string indicating how the request will interact with the browser’s HTTP cache. The possible values: `default`, `no-store`, `reload`, `no-cache`, `force-cache`, and `only-if-cached`|
| redirect       |How to handle a redirect response: `follow`, `error` & `manual`|
| referrer       |A USVString specifying the referrer of the request. This can be a same-origin URL, about:client, or an empty string.|
| referrerPolicy |Specifies the referrer policy to use for the request. May be one of `no-referrer`, `no-referrer-when-downgrade`, `same-origin`, `origin`, `strict-origin`, `origin-when-cross-origin`, `strict-origin-when-cross-origin`, or `unsafe-url`.|
| integrity      |Contains the subresource integrity value of the request (e.g., sha256-BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE=).|
| keepalive      |The keepalive option can be used to allow the request to outlive the page. Fetch with the keepalive flag is a replacement for the Navigator.sendBeacon() API.|
| signal         |An AbortSignal object instance; allows you to communicate with a fetch request and abort it if desired via an AbortController.|

## Using `fetch()`

The Fetch API provides a JavaScript interface for accessing and manipulating parts of the HTTP pipeline, such as requests and responses. It also provides a global `fetch()` method that provides an easy, logical way to fetch resources asynchronously across the network.

### The fetch specification differs from jQuery.ajax() in the following significant ways:

- The Promise returned from `fetch()` won’t reject on HTTP error status even if the response is an HTTP 404 or 500. Instead, as soon as the server responds with headers, the Promise will resolve normally (with the ok property of the response set to false if the response isn’t in the range 200–299), and it will only reject on network failure or if anything prevented the request from completing.
- `fetch()` won’t send cross-origin cookies unless you set the credentials init option. (Since April 2018. The spec changed the default credentials policy to same-origin. Firefox changed since 61.0b13.)

### Basic Fetch Request

```js
fetch("http://example.com/movies.json")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

Above code does not directly return the JSON response body but instead returns a promise that resolves with a Response object.

The **Response object**, in turn, does not directly contain the actual JSON response body but **is instead a representation of the entire HTTP response.** So, to extract the JSON body content from the Response object, we use the `json()` method, which returns a second promise that resolves with the result of parsing the response body text as JSON.

### `no-cors` mode Allowed Headers

mode: "no-cors" only allows a limited set of headers in the request:

- Accept
- Accept-Language
- Content-Language
- Content-Type with a value of application/x-www-form-urlencoded, multipart/form-data, or text/plain

## Using Request Option with `fetch()`

The fetch() method can optionally accept a second parameter, an init object that allows you to control a number of different settings:

```js
// Example POST method implementation:
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

postData("https://example.com/answer", { answer: 42 }).then((data) => {
  console.log(data); // JSON data parsed by `data.json()` call
});
```

## Uploading JSON data using `fetch()`

```js
const data = { username: "example" };

fetch("https://example.com/profile", {
  method: "POST", // or 'PUT'
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Success:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

## Uploading a File Using `fetch()`

Files can be uploaded using an HTML `<input type="file" />` input element, `FormData()` and `fetch()`.

```js
const formData = new FormData();
const fileField = document.querySelector('input[type="file"]');

formData.append("username", "abc123");
formData.append("avatar", fileField.files[0]);

fetch("https://example.com/profile/avatar", {
  method: "PUT",
  body: formData,
})
  .then((response) => response.json())
  .then((result) => {
    console.log("Success:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

## Uploading multiple files using `fetch()`

```js
const formData = new FormData();
const photos = document.querySelector('input[type="file"][multiple]');

formData.append("title", "My Vegas Vacation");
for (let i = 0; i < photos.files.length; i++) {
  formData.append("photos", photos.files[i]);
}

fetch("https://example.com/posts", {
  method: "POST",
  body: formData,
})
  .then((response) => response.json())
  .then((result) => {
    console.log("Success:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

## Using Request Object with `fetch()`

```js
const myHeaders = new Headers();

const myRequest = new Request("flowers.jpg", {
  method: "GET",
  headers: myHeaders,
  mode: "cors",
  cache: "default",
});

fetch(myRequest)
  .then((response) => response.blob())
  .then((myBlob) => {
    myImage.src = URL.createObjectURL(myBlob);
  });
```

## Headers

The `Headers` interface allows you to create your own headers object via the `Headers()` constructor. A headers object is a simple multi-map of names to values:

```js
const content = "Hello World";
const myHeaders = new Headers();
myHeaders.append("Content-Type", "text/plain");
myHeaders.append("Content-Length", content.length.toString());
myHeaders.append("X-Custom-Header", "ProcessThisImmediately");
// The same can be achieved by passing an array of arrays or an object literal to the constructor:
const myHeaders = new Headers({
  "Content-Type": "text/plain",
  "Content-Length": content.length.toString(),
  "X-Custom-Header": "ProcessThisImmediately",
});
// The contents can be queried and retrieved:
console.log(myHeaders.has("Content-Type")); // true
console.log(myHeaders.has("Set-Cookie")); // false
myHeaders.set("Content-Type", "text/html");
myHeaders.append("X-Custom-Header", "AnotherValue");

console.log(myHeaders.get("Content-Length")); // 11
console.log(myHeaders.get("X-Custom-Header")); // ['ProcessThisImmediately', 'AnotherValue']

myHeaders.delete("X-Custom-Header");
console.log(myHeaders.get("X-Custom-Header")); // null
```

## Simple Get API Call Logic

Below code is an example demonstrating PokeAPI's Get API Call

```js
const getPokemonDataById = async () => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokeNumber}`
  );
  pokeData = await response.json(); //extract JSON from the http response
};
getPokemonDataById();
```

so to handle the promise from function on return you can use below code

```js
const getPokemonDataById = async () => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNumber}`);
  pokeData = await response.json(); //extract JSON from the http response
  return pokeData;
};
let response = getPokemonDataById();
response.then((pokeData) => {
    console.log(pokeData);
});
```

> Returning data from above function `getPokemonDataById()` will give you promise pending [Reference](https://stackoverflow.com/questions/59394620/why-fetch-returns-promise-pending)

---

## `$.get()` Function

Way to get data using `$.get()`. Sample of the same is given below.

```js
let websiteUrl = "https://www.github.com/aasisodiya"
$.get(
    websiteUrl,
    function (data) {
        console.log(data)
    }
);
```

---

## Reference

- [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [How to Use Fetch with async/await](https://dmitripavlutin.com/javascript-fetch-async-await/)
