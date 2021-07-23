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
    displayCopiedMessage();
}

// Function to display Copied Message
function displayCopiedMessage() {
    let template = `<div class="message">
        <h3>Copied</h3>
    </div>`;
    var copiedmessage = $("<div>");
    copiedmessage.html(template);
    $("body").append(copiedmessage);
    setTimeout(() => {
        copiedmessage.remove();
    }, 2000);
}

// Google Font Definition
class GoogleFont {
    constructor(fontname) {
        this.fontname = fontname;
        let encoded = fontname.replaceAll(" ", "+");
        this.link = `<link href="https://fonts.googleapis.com/css?family=${encoded}" rel="stylesheet">`;
        this.importcss = `@import url('https://fonts.googleapis.com/css2?family=${encoded}&display=swap');`;
        this.csstag = `font-family: '${fontname}';`;
    }
}

// Font Definition
class Font {
    constructor(fontname, link, importcss, csstag) {
        this.fontname = fontname;
        this.link = link;
        this.importcss = importcss;
        this.csstag = csstag;
    }
}

let fontsCollection = [];

// Push the fonts in array here
fontsCollection.push(new GoogleFont("Raleway"));
fontsCollection.push(new GoogleFont("Raleway Dots"));
fontsCollection.push(new GoogleFont("Exo 2"));
fontsCollection.push(new GoogleFont("Patua One"));
fontsCollection.push(new GoogleFont("Fugaz One"));
fontsCollection.push(new GoogleFont("Racing Sans One"));
fontsCollection.push(new GoogleFont("Bungee"));
fontsCollection.push(new GoogleFont("Righteous"));
fontsCollection.push(new GoogleFont("Roboto Slab"));
fontsCollection.push(new GoogleFont("Rubik"));
fontsCollection.push(new GoogleFont("Orbitron"));
fontsCollection.push(new GoogleFont("Electrolize"));
fontsCollection.push(new GoogleFont("Bungee Shade"));
fontsCollection.push(new GoogleFont("Lilita One"));
fontsCollection.push(new GoogleFont("Press Start 2P"));
fontsCollection.push(new GoogleFont("Space Mono"));
fontsCollection.push(new GoogleFont("Lato"));
fontsCollection.push(new GoogleFont("Audiowide"));
fontsCollection.push(new GoogleFont("Poiret One"));
fontsCollection.push(new GoogleFont("Special Elite"));
fontsCollection.push(
    new Font(
        "VCR OSD Mono",
        '<link href="https://fonts.cdnfonts.com/css/vcr-osd-mono" rel="stylesheet">',
        "@import url('https://fonts.cdnfonts.com/css/vcr-osd-mono');",
        "font-family: 'VCR OSD Mono';"
    )
);

// Process the fonts
fontsCollection.forEach((font) => {
    let link = font.link;
    let importcss = font.importcss;
    let csstag = font.csstag;
    let template = `
    <div class="font" style="${csstag}">
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

// Function to show help
$("#help").on("click", function (param) {
    $(".help").show();
});
// Function to hide help
$("#closehelp").on("click", function (param) {
    $(".help").hide();
});
