"use strict"

// Edit Mode is set to true by default
let editMode = true;

// categoryHolderHTML is template for housing category
let categoryHolderHTML = '\
            <div class="card shadow-sm" id="card-id">\
                <div class="card-body rounded">\
                    <h5 class="card-title">Category<div class="options"><i class="fa fa-pencil cursor-icon text-warning" onclick="editCategoryOpen()"></i></div></h5>\
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

// linkHolder is template for housing the link
let linkHolder = '\
            <div class="p-1 m-1 rounded shadow-sm link-holder bclass">\
                <div class="row">\
                    <div class="col"><a class="aclass" href="Link" target="_blank" rel="noopener noreferrer">Name</a></div>\
                    <div class="deletelink"><i class="fa fa-trash text-danger" onclick="openDeleteLink()" id="link-id"></i></div>\
                </div>\
            </div>\
        ';

// Reading Bookmarks from LocalStorage
let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

// If bookmarks are null then initialize it with sample
if (bookmarks == null || bookmarks.bookmarks == null) {
    // Sample Data Format Being Used
    bookmarks = {
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
        }
        ],
        "backgroundUrl": "",
        "backgroundColor": "#212121"
    };
}

// Function to display Bookmarks on UI
function processBookmarks() {
    if (bookmarks == null ||
        bookmarks.bookmarks == null) {
        return;
    }
    //Clearing data
    $('.card-columns')[0].innerHTML = "";
    // Processing Data if Available
    bookmarks.bookmarks.forEach((bookmarks, index) => {
        let bookmarkHolder = '';
        let categoryId = "c" + index;
        let bookmarkLinkClass = "b" + index;
        let bookmarkClass = "d" + index;
        bookmarks.bookmarks.forEach((bookmark, bid) => {
            let linkId = "l" + bid
            bookmarkHolder += linkHolder
                .replace('aclass', bookmarkLinkClass)
                .replace('bclass', bookmarkClass)
                .replace('"Link"', bookmark.url)
                .replace('Name', bookmark.name)
                .replace('link-id', linkId)
        });
        $('.card-columns')[0].innerHTML += categoryHolderHTML.replace("card-id",
            categoryId).replace("Category", bookmarks.category).replace('"Bookmarks"', bookmarkHolder);
        $('#' + categoryId).css('background', bookmarks.categoryColor);
        $('#' + categoryId).css('color', bookmarks.categoryTextColor);
        $('.' + bookmarkClass).css('background', bookmarks.bookmarkColor);
        $('.' + bookmarkLinkClass).css('color', bookmarks.bookmarkTextColor);
    });
    if (bookmarks.backgroundUrl != "") {
        $('body').css('background-image', 'url(' + bookmarks.backgroundUrl + ')');
    } else {
        $('body').css('background-image', 'none');
        $('body').css('background-color', bookmarks.backgroundColor);
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

// Function to Validate Bookmarks - it returns true and empty message if everything is ok else returns false with given message
function validateBookmarks(bookmarks) {
    if (bookmarks == null || bookmarks.bookmarks == null || bookmarks.bookmarks.length == 0) {
        return { valid: false, message: "Bookmarks are empty" };
    }
    try {
        bookmarks.bookmarks.forEach((bookmarks, cindex) => {
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
        });
    } catch (error) {
        return { valid: false, message: error };
    }
    return { valid: true, message: "" };
}

// Initially Validating Bookmarks
validateBookmarks(bookmarks);

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
    let bookmarklist = bookmarks.bookmarks[catID].bookmarks;
    bookmarklist[bookmarklist.length] = {
        name: linkName,
        url: linkURL,
        created: new Date()
    };
    bookmarks.bookmarks[catID].updated = new Date();
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
        "c" + bookmarks.bookmarks.length).replace("Category", categoryName).replace('"Bookmarks"', "");
    bookmarks.bookmarks[bookmarks.bookmarks.length] = {
        category: categoryName,
        bookmarks: [],
        created: new Date(),
        updated: new Date(),
        categoryColor: $('#category-bg-color').val(),
        categoryTextColor: $('#category-text-color').val(),
        bookmarkColor: $('#bookmark-bg-color').val(),
        bookmarkTextColor: $('#bookmark-text-color').val()
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
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
    $('#category-edit-bg-color').val(bookmarks.bookmarks[catID].categoryColor);
    $('#category-edit-text-color').val(bookmarks.bookmarks[catID].categoryTextColor);
    $('#bookmark-edit-bg-color').val(bookmarks.bookmarks[catID].bookmarkColor);
    $('#bookmark-edit-text-color').val(bookmarks.bookmarks[catID].bookmarkTextColor);
    $('.hover').show();
    $('#category-edit').show();
    $('#category-name-edit').val(bookmarks.bookmarks[catID].category);
    $('#category-name-current').val(bookmarks.bookmarks[catID].category);
}

// Function to Edit Category
function editCategory() {
    let catID = $('#category-id')[0].value.split("c")[1];
    bookmarks.bookmarks[catID].category = $('#category-name-edit').val();
    bookmarks.bookmarks[catID].updated = new Date();
    bookmarks.bookmarks[catID].categoryColor = $('#category-edit-bg-color').val();
    bookmarks.bookmarks[catID].categoryTextColor = $('#category-edit-text-color').val();
    bookmarks.bookmarks[catID].bookmarkColor = $('#bookmark-edit-bg-color').val();
    bookmarks.bookmarks[catID].bookmarkTextColor = $('#bookmark-edit-text-color').val();
    processBookmarks();
    closeEditCategory();
}

function closeEditCategory() {
    $('#category-edit').hide();
    $('.hover').hide();
    $('#labelcheck').removeClass('text-warning');
    $('#labelcheck').addClass('text-light');
}

// Function to delete a category
function deleteCategory() {
    if ($('#catCheck')[0].checked) {
        let catID = $('#category-id')[0].value.split("c")[1];
        bookmarks.bookmarks.splice(catID, 1);
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
    if (!editMode) {
        $('.options').css('display', 'inline');
        $('.deletelink').css('display', 'inline');
        $('.addbookmark').css('display', 'block');
        $('#toggle')[0].innerHTML = "Edit Mode On";
        $('#toggle').toggleClass('btn-danger');
        $('#toggle').toggleClass('btn-success');
        editMode = true;
    } else {
        $('.options').css('display', 'none');
        $('.deletelink').css('display', 'none');
        $('.addbookmark').css('display', 'none');
        $('#toggle')[0].innerHTML = "Edit Mode Off";
        $('#toggle').toggleClass('btn-danger');
        $('#toggle').toggleClass('btn-success');
        editMode = false;
    }
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
    $('#jsonOp')[0].value = JSON.stringify(bookmarks, undefined, 4);
    $('#exportjson').show();
}

// Function to close Export JSON Form
function closeExportJSON() {
    $('#exportjson').hide();
    $('.hover').hide();
}

// Function to open Import JSON Form
function openImportJSON() {
    $('#menu').hide();
    $('#jsonIn').val("");
    // Re/Setting placeholder
    $('#jsonIn')[0].placeholder = "Insert Bookmarks Compatible JSON";
    $('#importjson').show();
}

// Function to Import JSON and load into Bookmarks
function importJSON() {
    $('#menu').hide();
    try {
        bookmarks = JSON.parse($('#jsonIn').val());
        let validation = validateBookmarks(bookmarks);
        if (!validation.valid) {
            throw validation.message;
        }
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
    bookmarks.bookmarks[catId].bookmarks.splice(linkId, 1);
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
        bookmarks.backgroundUrl = bgUrl;
    } else {
        $('body').css('background-image', 'none');
        $('body').css('background-color', bgColor);
        bookmarks.backgroundColor = bgColor;
        bookmarks.backgroundUrl = "";
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

// Just for Fun!
console.log('%c Stop Right There! ', 'background: #222; color: orange;font-size:20px');
console.log('%c You Shall Not Pass! ', 'background: #222; color: red; font-size:40px');