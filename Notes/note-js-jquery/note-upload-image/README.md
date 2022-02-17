# Upload Image To Static Website

- [Upload Image To Static Website](#upload-image-to-static-website)
  - [1. Create an Input for Image File](#1-create-an-input-for-image-file)
  - [2. Add an event listener for when user has selected an Image For Uploading](#2-add-an-event-listener-for-when-user-has-selected-an-image-for-uploading)
  - [3. Main Function to Load the Image on Website](#3-main-function-to-load-the-image-on-website)
  - [Another way using `URL.createObjectURL()`](#another-way-using-urlcreateobjecturl)
  - [Reference](#reference)

Conditions for the scenarios are listed below:

1. Image only needs to be uploaded
2. Image is saved in cache
3. Image is not send to the server
4. Image is only available as long as website is not refreshed
5. User will upload an image and it should load on website

So basically the image stays as long as the webpage is open and not refreshed. Follow the below steps to do the same.

## 1. Create an Input for Image File

Below code is for an `input` tag of `type="file"` that enables user to select an Image file of format `.jpg`, `.jpeg`, `.png` only using `accept` attribute.

```html
<input type="file" name="Image" id="imageupload" accept=".jpg, .jpeg, .png" />
```

## 2. Add an event listener for when user has selected an Image For Uploading

Below code will add an event Listener for when user has selected and Image for Uploading. Here we have applied an event listener on `input#imageupload` i.e `input` tag with id `#imageupload` for any `change` event. Considering that user uploads only one image file then the image is accessible by `$('#imageupload')[0].files[0]`. Then we are calling a function to read that file and load it into `img` tag with id `imgElemId`.

```javascript
$("input#imageupload").change(function (e) {
  e.preventDefault();
  readAndLoadImage($("#imageupload")[0].files[0], imgElemId);
  // imgElemId will have to be changed based on your need
});
```

## 3. Main Function to Load the Image on Website

Below code will load the image file onto `img` tag with id `imgElemId`. The Function `readAndLoadImage(file, imgElemId)` will first check if the file type is valid, then only it will load the image using `FileReader()`. First we have created an object of `FileReader()` then we have added an event listener on `load` event i.e when image file has loaded then it will change the `img` tag's `src` attribute to given image's DataURL. At last we are reading and loading the image onto `reader` which is our `FileReader()` object.

```javascript
function readAndLoadImage(file, imgElemId) {
  // Check if the file is an image.
  if (file.type && !file.type.startsWith("image/")) {
    console.log("File is not an image.", file.type, file);
    return;
  }

  let img = $("#" + imgElemId)[0];

  const reader = new FileReader();
  reader.addEventListener("load", (event) => {
    console.log(img);
    img.src = event.target.result;
    console.log("done");
  });
  reader.readAsDataURL(file);
}
```

> Example where I have used above code [Link](https://aasisodiya.github.io/WebProjects/35TwitterPostGenerator)

## Another way using `URL.createObjectURL()`

You can achieve the same thing as above using `URL.createObjectURL()` as well. So basically step 3 can be discarded and only step 2 needs to be modified

```javascript
let img = $("#imgElemId")[0];
img.src = URL.createObjectURL($("#imageupload")[0].files[0]);
```

So modified step 2 code looks like below

```javascript
$("input#imageupload").change(function (e) {
  e.preventDefault();
  // imgElemId will have to be changed based on your need
  let img = $("#imgElemId")[0];
  img.src = URL.createObjectURL($("#imageupload")[0].files[0]);
});
```

## Reference

- [Read files in JavaScript](https://web.dev/read-files/)
- [Example](https://aasisodiya.github.io/WebProjects/35TwitterPostGenerator)
