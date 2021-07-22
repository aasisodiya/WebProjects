// Template Code Start
"use strict";
// Just for Fun!
console.log(
    "%c Stop Right There! ",
    "background: #222; color: orange;font-size:20px"
);
console.log(
    "%c You Shall Not Pass! ",
    "background: #222; color: red; font-size:40px"
);
// Template Code End

// Function to Copy to ClipBoard
function copyToClipboard(contentToCopy) {
    console.log(contentToCopy);
    var input = $("<input>");
    $("body").append(input);
    input.val(contentToCopy).select();
    document.execCommand("copy");
    input.remove();
}

// Font Definition
class Font {
    constructor(fontname) {
        this.fontname = fontname;
        let encoded = fontname.replaceAll(" ", "+");
        this.link = `<link href="https://fonts.googleapis.com/css?family=${encoded}" rel="stylesheet">`;
        this.importcss = `@import url('https://fonts.googleapis.com/css2?family=${encoded}&display=swap');`;
        this.csstag = `font-family: '${fontname}';`;
    }
}

let fontsCollection = [];

// Push the fonts in array here
fontsCollection.push(new Font("Raleway"));
fontsCollection.push(new Font("Raleway Dots"));

// Process the fonts
fontsCollection.forEach((font) => {
    let link = font.link;
    let importcss = font.importcss;
    let csstag = font.csstag;
    let template = `
    <div class="font">
        <div class="fontname">${font.fontname}</div>
        <div class="fontexample">ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@$#%^&*()_+-={}:"<>[];',.?/</div>
        <div class="fontcss">
            <div onclick='copyToClipboard(\`${link}\`)'>link</div>
            <div onclick="copyToClipboard(\`${importcss}\`)">import</div>
            <div onclick="copyToClipboard(\`${csstag}\`)">css</div>
        </div>
    </div>`;
    $("#myfonts").append(template);
});
