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

// lastSelectedImageId helps to record the last selected imageId
let lastSelectedImageId = -1;
// lastSelectedIndex helps to record the index of last selected Image
let lastSelectedIndex = -1;
// reset here helps to manipulate timeouts
let reset;
// remaining helps to record the number of remaining pairs to match (if there are 20 images then there has to be 10 remaining pairs so remaining = 10)
let remaining = Infinity;

// createAndGetPlaySet function will first of all create a set of all images using inputSetSize (Note: images are represented by id i.e number, because I have named our images as 1.png and so on) so basically set is like [1,2,3]. Now this generated set has all the image ids that are in our inputSetSize. Then function shuffles the set i.e basically re-arranging the ids randomly. Then it creates a slice of setSize (i.e half of gameSetSize, so that we can just double the setSize knowing that we need 2 of the given ids). Then it adds the slice of setSize and we get our playable set of image ids. Then again we shuffle the same to make it random. At the end the set is returned for processing.
function createAndGetPlaySet(gameSetSize, inputSetSize) {
    let setSize = Math.floor(gameSetSize / 2);
    remaining = setSize;
    let initSet = [];
    for (let index = 1; index <= inputSetSize; index++) {
        initSet.push(index);
    }
    let generatedSet = shuffle(initSet).slice(0, setSize);
    return shuffle([...generatedSet, ...generatedSet]);
}

// shuffle function to shuffle the input array
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// populatePlayground function will populate the playground with the images and display the same on UI
function populatePlayground(rows, columns) {
    // Set Columns in css
    let templateColumns = "";
    for (let index = 0; index < columns; index++) {
        templateColumns += "auto ";
    }
    $("#playground").css("grid-template-columns", templateColumns);

    let gameSetSize = rows * columns;
    let inputSetSize = 33;
    let generatedSet = createAndGetPlaySet(gameSetSize, inputSetSize);
    console.log(generatedSet);
    // Reset Playground
    $("#playground").html("");
    // Populate Playground
    for (let index = 0; index < gameSetSize; index++) {
        let imgid = generatedSet[index];
        let template = `
        <div class="holder"><div class="block">
            <div class="blockimage">
                <img class="playimage" src="./img/${imgid}.png" alt="">
            </div>
            <div class="blockcover">
                <img class="coverimage" src="./img/favicon.png" alt="">
            </div>
        </div></div>`;
        $("#playground").append(template);
    }
}

// Below code handles the click and touch events in the image block and triggers processSelection function to handle the currently selected block w.r.t user previous selection (if any)
$("body").on("touch click", ".block", function (event) {
    let selectedIndex = $(".block").index(this);
    $(`.blockcover:eq(${selectedIndex})`).hide();
    // Extract the selected Image Id
    let imageId = $(`.playimage:eq(${selectedIndex})`)
        .attr("src")
        .split("/img/")[1]
        .split(".")[0];
    processSelection(selectedIndex, imageId);
});

// processSelection function helps to process the user selection - i.e it checks if the newly selected image is only the active one, if yes then it simply goes ahead revealing the image to user. But if selected image is second active image in playground then it compares both the image, if they match then they disappear after set period of time, else they reset to their original state after set period of time.
function processSelection(selectedIndex, imageId) {
    console.log(lastSelectedIndex, lastSelectedImageId, selectedIndex, imageId);
    if (selectedIndex == lastSelectedIndex) {
        // do nothing
        console.log("Do Nothing!");
    } else if (lastSelectedIndex == -1 || lastSelectedImageId == -1) {
        console.log("Record Selected Index");
        lastSelectedIndex = selectedIndex;
        lastSelectedImageId = imageId;
    } else if (lastSelectedImageId == imageId) {
        // Hide both
        hideBoth(selectedIndex);
    } else {
        // reset both
        resetBoth();
    }
}

// hideBoth function will hide correctly selected pair
function hideBoth(selectedIndex) {
    console.log("Both are same");
    $("body").toggleClass("inactive");
    reset = setTimeout(function () {
        $("body").toggleClass("inactive");
        $(`.block:eq(${selectedIndex})`).hide();
        $(`.block:eq(${lastSelectedIndex})`).hide();
        lastSelectedImageId = -1;
        lastSelectedIndex = -1;
        remaining--;
        console.log(remaining);
        if (remaining == 0) {
            // Reset The Game
            analyzeAndPopulateThePlayground();
        }
    }, 1000);
}

// resetBoth function will just reset the view of wrongly selected non matching pair
function resetBoth() {
    console.log("Both are different");
    lastSelectedImageId = -1;
    lastSelectedIndex = -1;
    $("body").toggleClass("inactive");
    reset = setTimeout(function () {
        $(".blockcover").show();
        $("body").toggleClass("inactive");
    }, 1000);
}

// Initial Call

function analyzeAndPopulateThePlayground() {
    let width = $(window).innerWidth();
    let height = $(window).innerHeight();
    // cardSize is the size of card in px (same is set in css)
    let cardSize = 100;
    let gap = 10;
    let padding = 10;

    // calculating rows and columns
    let columns = Math.floor((width + gap - 2 * padding) / (cardSize + gap));
    let rows = Math.floor((height + gap - 2 * padding) / (cardSize + gap));
    console.log(columns, rows);

    // Now lets decide usable rows and columns (why 66? because we have 33 images so total images on pairing will be 66)
    if (columns * rows > 66) {
        if (columns > 8) {
            columns = 8;
        }
        if (columns * rows > 66) {
            rows = Math.floor(66 / columns);
        }
    }
    if ((rows * columns) % 2 == 0) {
        // Just go ahead
        console.log("Ideal Scenario");
    } else if (columns <= rows) {
        rows = rows - 1;
    } else {
        columns = columns - 1;
    }
    console.log(columns, rows);
    populatePlayground(rows, columns);
}
analyzeAndPopulateThePlayground();

// n = (width + gap - 2*padding) / (cardSize + gap)