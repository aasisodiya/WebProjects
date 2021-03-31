// Template Code Start
`use strict`
// Just for Fun!
console.log('%c Stop Right There! ', 'background: #222; color: orange;font-size:20px');
console.log('%c You Shall Not Pass! ', 'background: #222; color: red; font-size:40px');
// Template Code End

// List of Colors
let colorsOrderedByName = {
    AliceBlue: "#F0F8FF",
    AntiqueWhite: "#FAEBD7",
    Aqua: "#00FFFF",
    Aquamarine: "#7FFFD4",
    Azure: "#F0FFFF",
    Beige: "#F5F5DC",
    Bisque: "#FFE4C4",
    Black: "#000000",
    BlanchedAlmond: "#FFEBCD",
    Blue: "#0000FF",
    BlueViolet: "#8A2BE2",
    Brown: "#A52A2A",
    BurlyWood: "#DEB887",
    CadetBlue: "#5F9EA0",
    Chartreuse: "#7FFF00",
    Chocolate: "#D2691E",
    Coral: "#FF7F50",
    CornflowerBlue: "#6495ED",
    Cornsilk: "#FFF8DC",
    Crimson: "#DC143C",
    Cyan: "#00FFFF",
    DarkBlue: "#00008B",
    DarkCyan: "#008B8B",
    DarkGoldenRod: "#B8860B",
    DarkGray: "#A9A9A9",
    DarkGrey: "#A9A9A9",
    DarkGreen: "#006400",
    DarkKhaki: "#BDB76B",
    DarkMagenta: "#8B008B",
    DarkOliveGreen: "#556B2F",
    Darkorange: "#FF8C00",
    DarkOrchid: "#9932CC",
    DarkRed: "#8B0000",
    DarkSalmon: "#E9967A",
    DarkSeaGreen: "#8FBC8F",
    DarkSlateBlue: "#483D8B",
    DarkSlateGray: "#2F4F4F",
    DarkSlateGrey: "#2F4F4F",
    DarkTurquoise: "#00CED1",
    DarkViolet: "#9400D3",
    DeepPink: "#FF1493",
    DeepSkyBlue: "#00BFFF",
    DimGray: "#696969",
    DimGrey: "#696969",
    DodgerBlue: "#1E90FF",
    FireBrick: "#B22222",
    FloralWhite: "#FFFAF0",
    ForestGreen: "#228B22",
    Fuchsia: "#FF00FF",
    Gainsboro: "#DCDCDC",
    GhostWhite: "#F8F8FF",
    Gold: "#FFD700",
    GoldenRod: "#DAA520",
    Gray: "#808080",
    Grey: "#808080",
    Green: "#008000",
    GreenYellow: "#ADFF2F",
    HoneyDew: "#F0FFF0",
    HotPink: "#FF69B4",
    IndianRed: "#CD5C5C",
    Indigo: "#4B0082",
    Ivory: "#FFFFF0",
    Khaki: "#F0E68C",
    Lavender: "#E6E6FA",
    LavenderBlush: "#FFF0F5",
    LawnGreen: "#7CFC00",
    LemonChiffon: "#FFFACD",
    LightBlue: "#ADD8E6",
    LightCoral: "#F08080",
    LightCyan: "#E0FFFF",
    LightGoldenRodYellow: "#FAFAD2",
    LightGray: "#D3D3D3",
    LightGrey: "#D3D3D3",
    LightGreen: "#90EE90",
    LightPink: "#FFB6C1",
    LightSalmon: "#FFA07A",
    LightSeaGreen: "#20B2AA",
    LightSkyBlue: "#87CEFA",
    LightSlateGray: "#778899",
    LightSlateGrey: "#778899",
    LightSteelBlue: "#B0C4DE",
    LightYellow: "#FFFFE0",
    Lime: "#00FF00",
    LimeGreen: "#32CD32",
    Linen: "#FAF0E6",
    Magenta: "#FF00FF",
    Maroon: "#800000",
    MediumAquaMarine: "#66CDAA",
    MediumBlue: "#0000CD",
    MediumOrchid: "#BA55D3",
    MediumPurple: "#9370D8",
    MediumSeaGreen: "#3CB371",
    MediumSlateBlue: "#7B68EE",
    MediumSpringGreen: "#00FA9A",
    MediumTurquoise: "#48D1CC",
    MediumVioletRed: "#C71585",
    MidnightBlue: "#191970",
    MintCream: "#F5FFFA",
    MistyRose: "#FFE4E1",
    Moccasin: "#FFE4B5",
    NavajoWhite: "#FFDEAD",
    Navy: "#000080",
    OldLace: "#FDF5E6",
    Olive: "#808000",
    OliveDrab: "#6B8E23",
    Orange: "#FFA500",
    OrangeRed: "#FF4500",
    Orchid: "#DA70D6",
    PaleGoldenRod: "#EEE8AA",
    PaleGreen: "#98FB98",
    PaleTurquoise: "#AFEEEE",
    PaleVioletRed: "#D87093",
    PapayaWhip: "#FFEFD5",
    PeachPuff: "#FFDAB9",
    Peru: "#CD853F",
    Pink: "#FFC0CB",
    Plum: "#DDA0DD",
    PowderBlue: "#B0E0E6",
    Purple: "#800080",
    RebeccaPurple: "#663399",
    Red: "#FF0000",
    RosyBrown: "#BC8F8F",
    RoyalBlue: "#4169E1",
    SaddleBrown: "#8B4513",
    Salmon: "#FA8072",
    SandyBrown: "#F4A460",
    SeaGreen: "#2E8B57",
    SeaShell: "#FFF5EE",
    Sienna: "#A0522D",
    Silver: "#C0C0C0",
    SkyBlue: "#87CEEB",
    SlateBlue: "#6A5ACD",
    SlateGray: "#708090",
    SlateGrey: "#708090",
    Snow: "#FFFAFA",
    SpringGreen: "#00FF7F",
    SteelBlue: "#4682B4",
    Tan: "#D2B48C",
    Teal: "#008080",
    Thistle: "#D8BFD8",
    Tomato: "#FF6347",
    Turquoise: "#40E0D0",
    Violet: "#EE82EE",
    Wheat: "#F5DEB3",
    White: "#FFFFFF",
    WhiteSmoke: "#F5F5F5",
    Yellow: "#FFFF00",
    YellowGreen: "#9ACD32"
}

function sortObjectByKeys(o) {
    return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}

// Extract and Sort Color Codes from Colors
let colorsOrderedByCode = Object.assign({}, ...Object.entries(colorsOrderedByName).map(([colorName, colorCode]) => ({ [colorCode]: colorName })))
colorsOrderedByCode = sortObjectByKeys(colorsOrderedByCode);

let colorTemplate = `
<div class="colortab">
    <div class="colordetails">
        <div class="colordesc">
            <div class="colorname">{colorName}</div>
            <div class="colorcode">{colorCode}</div>
        </div>
        <div class="copyCode"><span class="icon icon-copy"></span> Code</div>
        <div class="copyName"><span class="icon icon-copy"></span> Name</div>
    </div>
</div>`

let colorNames = Object.keys(colorsOrderedByName);
let colorCodes = Object.keys(colorsOrderedByCode);

// Event handlers for Copying code to clipboard
$('body').on('click', 'div.copyCode', function (event) {
    let colorCode = $(event.currentTarget).closest('div.colordetails').find('div.colorcode').text();
    $('.copied').hide();
    $('.copied').css('color', colorCode);
    copyToClipboard(colorCode);
    popup();
});

// Event handlers for Copying name to clipboard
$('body').on('click', 'div.copyName', function (event) {
    let colorName = $(event.currentTarget).closest('div.colordetails').find('div.colorname').text();
    $('.copied').hide();
    $('.copied').css('color', colorName);
    copyToClipboard(colorName);
    popup();
});

var sorted3rdParty = ["#000000", "#A52A2A", "#A9A9A9", "#A9A9A9", "#8B0000", "#696969", "#696969", "#B22222", "#DCDCDC", "#808080", "#808080", "#CD5C5C", "#F08080", "#D3D3D3", "#D3D3D3", "#800000", "#FF0000", "#BC8F8F", "#C0C0C0", "#FFFAFA", "#FFFFFF", "#F5F5F5", "#FFE4E1", "#FA8072", "#FF6347", "#E9967A", "#FF7F50", "#FF4500", "#FFA07A", "#A0522D", "#FFF5EE", "#D2691E", "#8B4513", "#F4A460", "#FFDAB9", "#CD853F", "#FAF0E6", "#FFE4C4", "#FF8C00", "#DEB887", "#FAEBD7", "#D2B48C", "#FFDEAD", "#FFEBCD", "#FFEFD5", "#FFE4B5", "#FFA500", "#F5DEB3", "#FDF5E6", "#FFFAF0", "#B8860B", "#DAA520", "#FFF8DC", "#FFD700", "#FFFACD", "#F0E68C", "#EEE8AA", "#BDB76B", "#F5F5DC", "#FFFFF0", "#FAFAD2", "#FFFFE0", "#808000", "#FFFF00", "#6B8E23", "#9ACD32", "#556B2F", "#ADFF2F", "#7FFF00", "#7CFC00", "#006400", "#8FBC8F", "#228B22", "#008000", "#F0FFF0", "#90EE90", "#00FF00", "#32CD32", "#98FB98", "#2E8B57", "#3CB371", "#00FF7F", "#F5FFFA", "#00FA9A", "#66CDAA", "#7FFFD4", "#40E0D0", "#20B2AA", "#48D1CC", "#00FFFF", "#F0FFFF", "#00FFFF", "#008B8B", "#2F4F4F", "#2F4F4F", "#E0FFFF", "#AFEEEE", "#008080", "#00CED1", "#5F9EA0", "#B0E0E6", "#ADD8E6", "#00BFFF", "#87CEEB", "#87CEFA", "#4682B4", "#F0F8FF", "#1E90FF", "#778899", "#778899", "#708090", "#708090", "#B0C4DE", "#6495ED", "#4169E1", "#0000FF", "#00008B", "#F8F8FF", "#E6E6FA", "#0000CD", "#191970", "#000080", "#6A5ACD", "#483D8B", "#7B68EE", "#9370D8", "#663399", "#8A2BE2", "#4B0082", "#9932CC", "#9400D3", "#BA55D3", "#8B008B", "#FF00FF", "#FF00FF", "#DDA0DD", "#800080", "#D8BFD8", "#EE82EE", "#DA70D6", "#C71585", "#FF1493", "#FF69B4", "#D87093", "#FFF0F5", "#DC143C", "#FFC0CB", "#FFB6C1"];

// viewSortedColors will display the sorted colors
function viewSortedColors(type) {
    if (type == "name") {
        let allColorTemplates = ""
        colorNames.forEach(function (color) {
            allColorTemplates += colorTemplate.replace("{colorName}", color).replace("{colorCode}", colorsOrderedByName[color]);
        });

        $('.container').html(allColorTemplates);
    } else if (type == "code") {
        let allColorTemplates = ""
        colorCodes.forEach(function (color) {
            allColorTemplates += colorTemplate.replace("{colorName}", colorsOrderedByCode[color.toUpperCase()]).replace("{colorCode}", color);
        });

        $('.container').html(allColorTemplates);
    } else if (type == "relevance") {
        let allColorTemplates = ""
        sorted3rdParty.forEach(function (color) {
            allColorTemplates += colorTemplate.replace("{colorName}", colorsOrderedByCode[color.toUpperCase()]).replace("{colorCode}", color);
        });

        $('.container').html(allColorTemplates);
    }

    $('.colortab').each(function (index, element) {
        let color = $(element).find('div.colorname').text() + ' !important';
        if ($(element).find('div.colorname').text() == "Black") {
            $(element).attr('style', 'background: ' + color + ';color: white !important');
        } else {
            $(element).attr('style', 'background: ' + color + ';color: black !important');
        }
    });
}

// Initially sort and display by name
viewSortedColors("name");

// Function to Copy to ClipBoard
function copyToClipboard(contentToCopy) {
    var input = $("<input>");
    $("body").append(input);
    input.val(contentToCopy).select();
    document.execCommand("copy");
    input.remove();
}

// Funtion to show copied message as popup
function popup() {
    $('.copied').show();
    $('.copied').animate();
}

// Sort by color
$('#sort-color').on('click', function () {
    viewSortedColors("code")
});
// Sort by name
$('#sort-alphabetically').on('click', function () {
    viewSortedColors("name")
});
// Sort by relevance
$('#sort-relevance').on('click', function () {
    viewSortedColors("relevance")
});