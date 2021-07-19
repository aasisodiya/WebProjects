# File Operations on UI

- [File Operations on UI](#file-operations-on-ui)
  - [Create And Download A File on UI](#create-and-download-a-file-on-ui)
  - [Reading a File on UI](#reading-a-file-on-ui)
  - [Implementing Drag and Drop](#implementing-drag-and-drop)
  - [QnA](#qna)

## Create And Download A File on UI

Even though you can download a file from server by providing a link to user for download, sometime you might come across a use-case where you might have to create/download a file from UI itself. So below code will help you do the same.

```javascript
// Function to download file
function createAndDownloadFile(content, filename) {
    let encodedContent = encodeURIComponent(content);
    let downloadButton =
        `<a id="createAndDownloadFile" href="data:text/plain;charset=utf-8,${encodedContent}" download="${filename}">Test</a>`;
    $("body").append(downloadButton);
    // $("#createAndDownloadFile").trigger('click'); // Won't work for download
    $("#createAndDownloadFile")[0].click(); // Use this or below code
    // document.getElementById("createAndDownloadFile").click();
    $("#createAndDownloadFile").remove();
}
// Download button event listener
$('#download').on('click', function () {
    console.log('File Download Triggered');
    let content = $('#content').val();
    let filename = $('#filename').val();
    createAndDownloadFile(content, filename);
});
```

In above code, `createAndDownloadFile()` function can be used directly, but for it to work you will have to configure a download flow. For which `content` is the content you want to download and `filename` is the name of the file you want the content in to be downloaded.

For Sample Working Code [Click Here](example/)

## Reading a File on UI

In order to read a file on UI you need to first take input file from user for which you can use the `input` tag. You can also specify the valid type of files you want to accept by using `accept` attribute. Sample for the same will look like given below code, which only accepts files with `.txt` extension i.e text files. Using `multiple` attribute you can allow user to select multiple files.

```html
<input type="file" name="readfile" id="readfile" accept=".txt" multiple>
```

Now you will have to listen for user action when the file is selected from input. For which we can use `change` event which is fired when user select a file/s. This file/s can be accessed in `event.target.files` which consists of list of files (it is `FileList` object, containing list of `File` object)

Sample Code

```js

// File reader
const reader = new FileReader();
reader.addEventListener("load", (event) => {
    // This gets executed 2nd
    // Log the content of txt file
    console.log(event.target.result);
    $("#content").text(event.target.result);
});
// Progress Tracker
reader.addEventListener("progress", (event) => {
    // This gets executed 1st
    if (event.loaded && event.total) {
        const percent = (event.loaded / event.total) * 100;
        console.log(`Progress: ${Math.round(percent)}`);
    }
});

// Function to read file
$("#readfile").change(function (event) {
    const fileList = event.target.files;
    console.log(fileList);
    let inputFile = fileList[0];
    // FileList {0: File, length: 1}
    console.log(inputFile.name);
    // test-2020-03-10.csv
    console.log(inputFile.type);
    // text/plain
    console.log(inputFile.size);
    // 112
    // after below func call only above 2 handlers get triggered
    reader.readAsText(inputFile);
    // reader.readAsDataURL(inputFile);
});
```

## Implementing Drag and Drop

To use drag and drop, add listener for two events - `dragover` and `drop`. The `drop` event is triggered when user drops the file on UI

We also need to add `event.stopPropagation()` and `event.preventDefault()` in order to prevent the browser from redirecting and downloading the dropped file.

Sample Code

```js
$("body").on("dragover", (event) => {
    event.stopPropagation();
    event.preventDefault();
    event.originalEvent.dataTransfer.dropEffect = "copy";
});

$("body").on("drop", (event) => {
    event.stopPropagation();
    event.preventDefault();
    const fileList = event.originalEvent.dataTransfer.files;
    console.log(fileList);
    let inputFile = fileList[0];
    reader.readAsText(inputFile);
    // reader.readAsDataURL(inputFile);
});
```

For Sample Working Code [Click Here](example/)

## QnA

- Why doesn't download on `click()` works in JQuery?

  `click()` works as expected but, it prevent the native click event of the browser. [Reference](https://stackoverflow.com/questions/25507314/click-on-download-link-using-jquery-doesnt-download-file)
