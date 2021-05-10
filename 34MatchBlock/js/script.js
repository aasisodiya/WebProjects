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

// recorder
let lastSelectedImageId = -1;
let lastSelectedIndex = -1;
let reset;
let remaining = Infinity;

function createAndGetSet(pieces, inputSetSize) {
    let setSize = Math.floor(pieces / 2);
    remaining = setSize;
    let initSet = [];
    for (let index = 1; index <= inputSetSize; index++) {
        initSet.push(index);
    }
    let generatedSet = shuffle(initSet).slice(0, setSize);
    return shuffle([...generatedSet, ...generatedSet]);
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function populatePlayground(rows, columns) {
    let pieces = rows * columns;
    let inputSetSize = 33;
    let generatedSet = createAndGetSet(pieces, inputSetSize);
    console.log(generatedSet);
    for (let index = 0; index < pieces; index++) {
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
                populatePlayground(3, 4);
            }
        }, 1000);
    } else {
        // reset both
        console.log("Both are different");
        lastSelectedImageId = -1;
        lastSelectedIndex = -1;
        $("body").toggleClass("inactive");
        reset = setTimeout(function () {
            $(".blockcover").show();
            $("body").toggleClass("inactive");
        }, 1000);
    }
}

populatePlayground(3, 6);