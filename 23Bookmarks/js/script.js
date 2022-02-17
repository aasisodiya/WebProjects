"use strict"

// just tracking the version for data model used for bookmarksData
let version = 3.1;

// Edit Mode is set to true by default
let editMode = true;

// Timeout for resetting edit mode
let resetEditModeTime = 60000; // reset period set to one minute
let resetEditMode; // function to reset
let collapseState = {};

// Tracking first loading
let firstLoad = true;

// categoryHolderHTML is template for housing category
let categoryHolderHTML = '\
            <div class="card shadow-sm" id="card-id">\
                <div class="card-body rounded">\
                <h5 class="card-title"><div class="d-inline ctitle"><i class="fa fa-chevron-circle-down" aria-hidden="true"></i> Category</div><div class="options"><i class="fa fa-pencil cursor-icon text-warning" onclick="editCategoryOpen()"></i></div></h5>\
                <div class="bookmarks">\
                        "Bookmarks"\
                    </div>\
                    <div class="bg-secondary p-1 m-1 rounded shadow-sm text-light link-holder addbookmark">\
                        <div class="row">\
                            <div class="col text-center addlink" onclick="addLink()"><i class="fa fa-plus cursor-icon"></i></div>\
                        </div>\
                    </div>\
                </div>\
            </div >\
        ';

// Reading Bookmarks data from LocalStorage
let bookmarksData = JSON.parse(localStorage.getItem("bookmarks"));

// If bookmarksData are null then initialize it with sample
if (bookmarksData == null || bookmarksData.bookmarks == null) {
    // Sample Data Format Being Used
    bookmarksData = {
        "bookmarks": [{
            "category": "Regulars",
            "bookmarks": [{
                    "name": "Createxion",
                    "url": "https://www.createxion.com/",
                    "created": ""
                },
                {
                    "name": "Youtube",
                    "url": "https://www.youtube.com/channel/UCJVZT03z5fLJF5eO4PEbEUA",
                    "created": ""
                },
                {
                    "name": "Github",
                    "url": "http://github.com/aasisodiya",
                    "created": ""
                }
            ],
            "created": "",
            "updated": "",
            "categoryColor": "#343a40",
            "categoryTextColor": "#f8f9fa",
            "bookmarkColor": "#dc3545",
            "bookmarkTextColor": "#f8f9fa"
        }],
        "backgroundUrl": "",
        "backgroundColor": "#212121",
        "collapseState": {
            "c0": "block"
        },
        "version": version,
        "modifications": 0,
        "clicks": 0
    };
}

// Keeping a backup of old version just in case if any issues occurs
if (bookmarksData.version == undefined) {
    console.log("Got a version 0 data");
    localStorage.setItem("bookmarksV0", JSON.stringify(bookmarksData));
} else if (bookmarksData.version != version) {
    console.log("Got an old version data");
    localStorage.setItem("bookmarksV" + bookmarksData.version, JSON.stringify(bookmarksData));
}

// Checking and assigning collapseState to each Category
if (bookmarksData.collapseState == undefined || Object.keys(bookmarksData.collapseState).length != bookmarksData.bookmarks.length) {
    // Fix for existing data
    bookmarksData.collapseState = {};
    bookmarksData.bookmarks.forEach((bookmark, index) => {
        bookmarksData.collapseState["c" + index] = "block";
    });
}

// Setting latest version
bookmarksData.version = version;

if (bookmarksData.modifications == undefined) {
    bookmarksData.modifications = 0;
}
if (bookmarksData.clicks == undefined) {
    bookmarksData.clicks = 0;
}

// Function to display Bookmarks on UI
function processBookmarks() {
    if (bookmarksData == null ||
        bookmarksData.bookmarks == null) {
        return;
    }
    //Clearing data
    $('.card-columns')[0].innerHTML = "";
    // Processing Data if Available
    bookmarksData.bookmarks.forEach((bookmarks, index) => {
        let bookmarkHolder = '';
        let categoryId = "c" + index;
        let bookmarkLinkClass = "b" + index;
        let bookmarkClass = "d" + index;
        bookmarks.bookmarks.forEach((bookmark, bid) => {
            let linkId = "l" + bid;
            bookmarkHolder += `
            <div class="p-1 m-1 rounded shadow-sm link-holder ${bookmarkClass}">
                <div class="row">
                    <div class="col"><a class="${bookmarkLinkClass} hexlink" href="${bookmark.url}" target="_blank" rel="noopener noreferrer">${bookmark.name}</a></div>
                    <div class="deletelink"><i class="fa fa-trash text-danger" onclick="openDeleteLink()" id="${linkId}"></i></div>
                </div>
            </div>`;
        });
        $('.card-columns')[0].innerHTML += categoryHolderHTML.replace("card-id",
            categoryId).replace("Category", bookmarks.category).replace('"Bookmarks"', bookmarkHolder);
        $('#' + categoryId).css('background', bookmarks.categoryColor);
        $('#' + categoryId).css('color', bookmarks.categoryTextColor);
        $('.' + bookmarkClass).css('background', bookmarks.bookmarkColor);
        $('.' + bookmarkLinkClass).css('color', bookmarks.bookmarkTextColor);
        // checking collapsed state
        if (bookmarksData.collapseState == null || bookmarksData.collapseState[categoryId] == "block" || bookmarksData.collapseState[categoryId] == null) {
            $('#' + categoryId).find('.bookmarks').show();
        } else {
            $('#' + categoryId).find('.bookmarks').hide();
            $('#' + categoryId).find('.ctitle').find('.fa').toggleClass('fa-chevron-circle-right').toggleClass('fa-chevron-circle-down');
        }
    });
    if (bookmarksData.backgroundUrl != null && bookmarksData.backgroundUrl != "") {
        $('body').css('background-image', 'url(' + bookmarksData.backgroundUrl + ')');
    } else {
        $('body').css('background-image', 'none');
        $('body').css('background-color', bookmarksData.backgroundColor);
    }
    $('#toggle')[0].innerHTML = "Edit Mode On";
    if ($('#toggle').hasClass('btn-danger')) {
        $('#toggle').toggleClass('btn-danger').toggleClass('btn-success');
    }
    editMode = true;
    if (!firstLoad) {
        bookmarksData.modifications += 1;
    }
    firstLoad = false;
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksData));
}

// Function to Validate Bookmarks - it returns true and empty message if everything is ok else returns false with given message
function validateBookmarks(bookmarksData) {
    if (bookmarksData == null || bookmarksData.bookmarks == null || bookmarksData.bookmarks.length == 0) {
        return {
            valid: false,
            message: "bookmarksData is empty"
        };
    }
    try {
        bookmarksData.bookmarks.forEach((bookmarks, cindex) => {
            if (bookmarks.category == undefined) {
                bookmarks.category = "";
            }
            bookmarks.bookmarks.forEach((bookmark, bindex) => {
                if (bookmark.name == undefined || bookmark.name.trim() == "") {
                    throw ("Bookmark Name is undefined/missing in Category index [" + cindex + "] " + bookmarks.category);
                }
                if (bookmark.url == undefined || bookmark.url.trim() == "") {
                    throw ("URL is undefined/missing in Category index [" + cindex + "] for Bookmark Name [" + bookmark.name + "]");
                }
                if (bookmark.created == undefined || bookmark.created.trim() == "") {
                    bookmark.created = new Date();
                }
            });
            if (bookmarks.created == undefined || bookmarks.created.trim() == "") {
                bookmarks.created = new Date();
            }
            if (bookmarks.updated == undefined || bookmarks.updated.trim() == "") {
                bookmarks.updated = new Date();
            }
            if (bookmarks.categoryColor == undefined || bookmarks.categoryColor.trim() == "") {
                bookmarks.categoryColor = "#343a40";
            }
            if (bookmarks.categoryTextColor == undefined || bookmarks.categoryTextColor.trim() == "") {
                bookmarks.categoryTextColor = "#f8f9fa";
            }
            if (bookmarks.bookmarkColor == undefined || bookmarks.bookmarkColor.trim() == "") {
                bookmarks.bookmarkColor = "#dc3545";
            }
            if (bookmarks.bookmarkTextColor == undefined || bookmarks.bookmarkTextColor.trim() == "") {
                bookmarks.bookmarkTextColor = "#f8f9fa";
            }
        });
    } catch (error) {
        return {
            valid: false,
            message: error
        };
    }
    return {
        valid: true,
        message: ""
    };
}

// Initially Validating bookmarksData
validateBookmarks(bookmarksData);

// Calling it for first time to load UI
processBookmarks();

// // Hiding Options, AddBookmark and Delete Link Option initially
// $('.options').css('display', 'none');
// $('.deletelink').css('display', 'none');
// $('.addbookmark').css('display', 'none');

// Function to Display Add Link Form
function addLink() {
    $('.hover').show();
    $('#link').show();
    $('#cat-id')[0].value = event.srcElement.parentNode.parentNode.parentNode.parentNode.id || event.srcElement.parentNode.parentNode.parentNode.parentNode.parentNode.id;
    $('#link-name')[0].value = "";
    $('#link-url')[0].value = "";
}

// Function to save a Link
function saveLink() {
    let linkName = $('#link-name')[0].value;
    let linkURL = $('#link-url')[0].value;
    if (linkName.trim() == "") {
        $('#link-name')[0].value = "";
        $('#link-name')[0].placeholder = "Please Enter Bookmark Name";
        return;
    }
    if (linkURL.trim() == "") {
        $('#link-url')[0].value = "";
        $('#link-url')[0].placeholder = "Please Enter Website URL"
        return;
    }
    let catID = $('#cat-id')[0].value.split("c")[1];
    let bookmarklist = bookmarksData.bookmarks[catID].bookmarks;
    bookmarklist[bookmarklist.length] = {
        name: linkName,
        url: linkURL,
        created: new Date()
    };
    bookmarksData.bookmarks[catID].updated = new Date();
    processBookmarks();
    $('#link').hide();
    $('.hover').hide();
}

// Function to Close Add Link Form
function closeSaveLink() {
    $('#link').hide();
    $('.hover').hide();
    $('#link-name')[0].value = "";
    $('#link-url')[0].value = "";
}

// Function to Add new Category
function saveCategory() {
    // Get Category Name
    let categoryName = $('#category-name').val();
    if (categoryName.trim() == "") {
        $('#category-name')[0].value = "";
        $('#category-name')[0].placeholder = "Please Enter Category Name"
        return;
    }
    $('.card-columns')[0].innerHTML += categoryHolderHTML.replace("card-id",
        "c" + bookmarksData.bookmarks.length).replace("Category", categoryName).replace('"Bookmarks"', "");
    bookmarksData.bookmarks[bookmarksData.bookmarks.length] = {
        category: categoryName,
        bookmarks: [],
        created: new Date(),
        updated: new Date(),
        categoryColor: $('#category-bg-color').val(),
        categoryTextColor: $('#category-text-color').val(),
        bookmarkColor: $('#bookmark-bg-color').val(),
        bookmarkTextColor: $('#bookmark-text-color').val()
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksData));
    $('#category').hide();
    processBookmarks();
    if ($('.options').css('display') == "none") {
        $('.options').css('display', 'none');
        $('.addbookmark').css('display', 'none');
    } else {
        $('.options').css('display', 'inline');
        $('.addbookmark').css('display', 'block');
    }
    $('.hover').hide();
}

// Function to show Add New Category Form
function addCategory() {
    $('#category-name').val("");
    $('#menu').hide();
    $('.hover').show();
    $('#category').show();
}

// Function to Close Add New Category Form
function closeCategory() {
    $('#category').hide();
    $('.hover').hide();
}

// Function to Open Edit Category Menu
function editCategoryOpen() {
    $('#category-id')[0].value = event.srcElement.parentNode.parentNode.parentNode.parentNode.id;
    let catID = $('#category-id')[0].value.split("c")[1];
    // Loading and setting the existing colors in color selectors
    $('#category-edit-bg-color').val(bookmarksData.bookmarks[catID].categoryColor);
    $('#category-edit-text-color').val(bookmarksData.bookmarks[catID].categoryTextColor);
    $('#bookmark-edit-bg-color').val(bookmarksData.bookmarks[catID].bookmarkColor);
    $('#bookmark-edit-text-color').val(bookmarksData.bookmarks[catID].bookmarkTextColor);
    $('.hover').show();
    $('#category-edit').show();
    $('#category-name-edit').val(bookmarksData.bookmarks[catID].category);
    $('#category-name-current').val(bookmarksData.bookmarks[catID].category);
}

// Function to Edit Category
function editCategory() {
    let catID = $('#category-id')[0].value.split("c")[1];
    bookmarksData.bookmarks[catID].category = $('#category-name-edit').val();
    bookmarksData.bookmarks[catID].updated = new Date();
    bookmarksData.bookmarks[catID].categoryColor = $('#category-edit-bg-color').val();
    bookmarksData.bookmarks[catID].categoryTextColor = $('#category-edit-text-color').val();
    bookmarksData.bookmarks[catID].bookmarkColor = $('#bookmark-edit-bg-color').val();
    bookmarksData.bookmarks[catID].bookmarkTextColor = $('#bookmark-edit-text-color').val();
    processBookmarks();
    closeEditCategory();
}

// Function to close Edit Category View Panel
function closeEditCategory() {
    $('#category-edit').hide();
    $('.hover').hide();
    $('#labelcheck').removeClass('text-warning');
    $('#labelcheck').addClass('text-light');
}

// Function to update collapseState
function updateCollapseState(catId) {
    catId = "c" + catId;
    let updatedCollapseState = {};
    if (bookmarksData.collapseState[catId] != undefined) {
        delete bookmarksData.collapseState[catId];
        Object.keys(bookmarksData.collapseState).forEach((element, index) => {
            updatedCollapseState["c" + index] = bookmarksData.collapseState[element];
        });
    }
    return updatedCollapseState;
}

// Function to delete a category
function deleteCategory() {
    if ($('#catCheck')[0].checked) {
        let catID = $('#category-id')[0].value.split("c")[1];
        bookmarksData.bookmarks.splice(catID, 1);
        bookmarksData.collapseState = updateCollapseState(catID);
        processBookmarks();
        $('#catCheck')[0].checked = false;
        $('#labelcheck').removeClass('text-warning');
        $('#labelcheck').addClass('text-light');
        $('#category-edit').hide();
        $('.hover').hide();
    } else {
        $('#labelcheck').addClass('text-warning');
        $('#labelcheck').removeClass('text-light');
    }
}

// Function to toggle Edit option
function toggleEdit() {
    //to handle multiple
    if (resetEditMode != undefined) {
        clearTimeout(resetEditMode);
    }
    if (!editMode) {
        $('.options,.deletelink').css('display', 'inline');
        $('.addbookmark').css('display', 'block');
        $('#toggle')[0].innerHTML = "Edit Mode On";
        if ($('#toggle').hasClass('btn-danger')) {
            $('#toggle').toggleClass('btn-danger').toggleClass('btn-success');
        }
        editMode = true;
        resetEditMode = setTimeout(function () {
            toggleEdit();
        }, resetEditModeTime);
    } else {
        $('.options,.deletelink,.addbookmark').css('display', 'none');
        $('#toggle')[0].innerHTML = "Edit Mode Off";
        if ($('#toggle').hasClass('btn-success')) {
            $('#toggle').toggleClass('btn-danger').toggleClass('btn-success');
        }
        editMode = false;
    }
    localStorage.setItem("isEditModeEnabled", JSON.stringify(editMode));
}

// Function to display Menu
function openMenu() {
    if ($('.card-columns').css('column-count') == "auto") {
        $('#col').val(1);
    } else {
        $('#col').val($('.card-columns').css('column-count'));
    }
    $('.hover').show();
    $('#menu').show();
}

// Function to close Menu
function closeMenu() {
    $('#menu').hide();
    $('.hover').hide();
    $('#colMsg').hide();
}

// Function to load Exported JSON Form
function exportJSON() {
    $('#menu').hide();
    $('#jsonOp')[0].value = JSON.stringify(bookmarksData, undefined, 4);
    $('#exportjson').show();
}

// Function to close Export JSON Form
function closeExportJSON() {
    $('#exportjson').hide();
    $('.hover').hide();
}

// Function to open Import JSON Form
function openImportJSON() {
    alert('Warning!!!! You are about to delete your existing data and replace it with your Imported Data. Proceed ahead with caution!');
    $('#menu').hide();
    $('#jsonIn').val("");
    // Re/Setting placeholder
    $('#jsonIn')[0].placeholder = "Warning!!!! You are about to delete your existing data and replace it with new Imported Data. Insert Bookmarks Compatible JSON";
    $('#importjson').show();
}

// Function to Import JSON and load into Bookmarks
function importJSON() {
    $('#menu').hide();
    try {
        let bookmarksJSON = JSON.parse($('#jsonIn').val());
        let validation = validateBookmarks(bookmarksJSON);
        if (!validation.valid) {
            throw validation.message;
        }
        bookmarksJSON.version = bookmarksData.version;
        bookmarksJSON.modifications = bookmarksData.modifications;
        bookmarksJSON.clicks = bookmarksData.clicks;
        bookmarksData = bookmarksJSON;
        processBookmarks();
    } catch (error) {
        $('#jsonIn').val("");
        $('#jsonIn')[0].placeholder = "Enter Valid Bookmarks Compatible JSON : " + error;
        return;
    }
    if ($('.options').css('display') == "none") {
        $('.options').css('display', 'none');
        $('.addbookmark').css('display', 'none');
    } else {
        $('.options').css('display', 'inline');
        $('.addbookmark').css('display', 'block');
    }
    $('#importjson').hide();
    $('.hover').hide();
    if (!editMode) {
        $('.options').css('display', 'none');
        $('.deletelink').css('display', 'none');
    }
}

// Function to close Import JSON Form
function closeImportJSON() {
    $('#importjson').hide();
    $('#jsonIn').val("");
    $('.hover').hide();
}

// Function to open delete confirmation for link
function openDeleteLink() {
    $('#cat-delete-id').val(event.srcElement.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id);
    $('#link-delete-id').val(event.srcElement.id);
    $('.hover').show();
    $('#link-delete').show();
}

// Function to delete link
function deleteLink() {
    let catId = $('#cat-delete-id').val().split("c")[1];
    let linkId = $('#link-delete-id').val().split("l")[1];
    bookmarksData.bookmarks[catId].bookmarks.splice(linkId, 1);
    processBookmarks();
    $('#link-delete').hide();
    $('.hover').hide();
}

// Function to close delete confirmation for link
function closeDeleteLink() {
    $('#link-delete').hide();
    $('.hover').hide();
}

// Function to show Help
function showHelp() {
    $('#menu').hide();
    $('#help').show();
}

// Function to hide Help
function hideHelp() {
    $('#help').hide();
    $('.hover').hide();
}

// Function to copy JSON
function copyJSON() {
    $('#jsonOp').select();
    document.execCommand("copy");
}

// Function to decrease number of columns
function decreaseColumn() {
    $('#colDec').prop('disabled', false)
    if ($('#col').val() <= 1) {
        $('#colDec').prop('disabled', true)
        return
    }
    if ($('#col').val() <= 2) {
        $('#colDec').prop('disabled', true)
    }
    $('.card-columns').css('column-count', (parseInt($('#col').val()) - 1));
    $('#col').val((parseInt($('#col').val()) - 1));
    if ($('#col').val() <= 4) {
        $('#colMsg').hide();
    } else {
        $('#colMsg').show();
    }
}

// Function to increase number of columns
function increaseColumn() {
    $('#colDec').prop('disabled', false)
    $('.card-columns').css('column-count', (parseInt($('#col').val()) + 1));
    $('#col').val((parseInt($('#col').val()) + 1));
    if ($('#col').val() > 4) {
        $('#colMsg').show();
    } else {
        $('#colMsg').hide();
    }
}

// Function to open edit background menu
function openEditBackground() {
    $('#menu').hide();
    $('#bgimage').val("");
    $('#background').show();
}

// Function to update background
function updateBackground() {
    let bgUrl = $('#bgimage').val();
    let bgColor = $('#bgcolor').val();
    if (bgUrl != "") {
        $('body').css('background-image', 'url(' + bgUrl + ')');
        bookmarksData.backgroundUrl = bgUrl;
    } else {
        $('body').css('background-image', 'none');
        $('body').css('background-color', bgColor);
        bookmarksData.backgroundColor = bgColor;
        bookmarksData.backgroundUrl = "";
    }
    processBookmarks();
    $('#background').hide();
    $('.hover').hide();
}

// Function to close edit background menu
function closeEditBackground() {
    $('#background').hide();
    $('.hover').hide();
}

// // Below function is not used because it simply complicates easy process
// // Function to show/hide bookmarks in given category
// function hideBookmarks(element) {
//     let selectedBookmarks = element.parentNode.parentNode.querySelector('.bookmarks');
//     if (selectedBookmarks.style.display == "" || selectedBookmarks.style.display == "block") {
//         selectedBookmarks.style.display = "none";
//     } else {
//         selectedBookmarks.style.display = "block";
//     }
// }

// Avoid using below code because it won't work for newly added bookmarks
// $('.ctitle').on('click', function(event) {
//     console.log(event);
// });

// To avoid above issue, we are instead applying the event listener on super-parent element under which changes are going to happen, This way when we click on any new created element it will check to see if the element is of class "ctitle" and then only fire callback.
$('.card-columns').on('click', '.ctitle', function (event) {
    let selectedBookmarks = event.currentTarget.parentElement.parentElement.querySelector('.bookmarks');
    $(selectedBookmarks).toggle();
    $(event.currentTarget.children[0]).toggleClass('fa-chevron-circle-right').toggleClass('fa-chevron-circle-down');
    // lets record the state
    let catId = $(event.currentTarget).parents('.card').attr('id');
    if ($(selectedBookmarks).css('display') == "none") {
        bookmarksData.collapseState[catId] = "none";
    } else {
        bookmarksData.collapseState[catId] = "block";
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksData));
});

// Reading isEditModeEnabled from LocalStorage
let isEditModeEnabled = JSON.parse(localStorage.getItem("isEditModeEnabled"));

// Setting editMode based on isEditModeEnabled Flag
if (isEditModeEnabled != null && isEditModeEnabled == false) {
    toggleEdit();
}

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
function download() {
    console.log('File Download Triggered');
    let content = $('#jsonOp').val();
    let filename = 'bookmarks-' + (new Date()).toJSON() + '.json';
    createAndDownloadFile(content, filename);
};

// Below function counts clicks on links
$('body').on('click','a', function () {
    bookmarksData.clicks += 1;
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksData));
});

// Just for Fun!
console.log('%c Stop Right There! ', 'background: #222; color: orange;font-size:20px');
console.log('%c You Shall Not Pass! ', 'background: #222; color: red; font-size:40px');