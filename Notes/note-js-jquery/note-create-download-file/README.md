# Create And Download A File on UI

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

## QnA

- Why doesn't download on `click()` works in JQuery?

  `click()` works as expected but, it prevent the native click event of the browser. [Reference](https://stackoverflow.com/questions/25507314/click-on-download-link-using-jquery-doesnt-download-file)
