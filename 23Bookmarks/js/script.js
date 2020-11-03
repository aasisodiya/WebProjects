"use strict"

// Edit Mode is set to false by default
let editMode = false;

// categoryHolderHTML is template for housing category
let categoryHolderHTML = '\
            <div class="card shadow-sm" id="card-id">\
                <div class="card-body bg-dark">\
                    <h5 class="card-title text-light">Category</h5>\
                    <div class="bookmarks">\
                        "Bookmarks"\
                    </div>\
                    <div class="m-1 text-center font-weight-bold rounded">\
                        <div class="row options">\
                            <div class="col-6 text-success">\
                                <i class="fa fa-plus" onclick="addLink()"></i>\
                            </div>\
                            <div class="col-6 text-warning">\
                                <i class="fa fa-pencil" onclick="editCategoryOpen()"></i>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div >\
        ';

// linkHolder is template for housing the link
let linkHolder = '\
            <div class="bg-danger p-1 m-1 rounded shadow-sm text-light link-holder">\
                <div class="row">\
                    <div class="col"><a href="Link" target="_blank" rel="noopener noreferrer">Name</a></div>\
                    <div class="col text-right"><i class="fa fa-trash deletelink" onclick="openDeleteLink()" id="link-id"></i></div>\
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
                "url": "https://www.createxion.com/"
            },
            {
                "name": "Youtube",
                "url": "https://www.youtube.com/channel/UCJVZT03z5fLJF5eO4PEbEUA"
            },
            {
                "name": "Github",
                "url": "http://github.com/aasisodiya"
            }
            ]
        }
        ]
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
        bookmarks.bookmarks.forEach((bookmark, bid) => {
            bookmarkHolder += linkHolder.replace('"Link"', bookmark.url).replace('Name', bookmark.name).replace('link-id', "l" + bid)
        });
        $('.card-columns')[0].innerHTML += categoryHolderHTML.replace("card-id",
            "c" + index).replace("Category", bookmarks.category).replace('"Bookmarks"', bookmarkHolder);
    });
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

// Calling it for first time to load UI
processBookmarks();

// Hiding Options and Delete Link Option initially
$('.options').css('display', 'none');
$('.deletelink').css('display', 'none');

// Function to Display Add Link Form
function addLink() {
    $('.hover').show();
    $('#link').show();
    $('#cat-id')[0].value = event.srcElement.parentNode.parentNode.parentNode.parentNode.parentNode.id;
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
        url: linkURL
    };
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
        bookmarks: []
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    $('#category').hide();
    $('.options').css('display', $('.options').css('display'));
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
    $('#category-id')[0].value = event.srcElement.parentNode.parentNode.parentNode.parentNode.parentNode.id;
    let catID = $('#category-id')[0].value.split("c")[1];
    $('.hover').show();
    $('#category-edit').show();
    $('#category-name-edit').val(bookmarks.bookmarks[catID].category);
    $('#category-name-current').val(bookmarks.bookmarks[catID].category);
}

// Function to Edit Category
function editCategory() {
    let catID = $('#category-id')[0].value.split("c")[1];
    bookmarks.bookmarks[catID].category = $('#category-name-edit').val();
    processBookmarks();
    $('#category-edit').hide();
    $('.hover').hide();
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
        $('.options').css('display', 'flex');
        $('.deletelink').css('display', 'inline');
        $('#toggle')[0].innerHTML = "Edit Mode On";
        $('#toggle').toggleClass('btn-danger');
        $('#toggle').toggleClass('btn-success');
        editMode = true;
    } else {
        $('.options').css('display', 'none');
        $('.deletelink').css('display', 'none');
        $('#toggle')[0].innerHTML = "Edit Mode Off";
        $('#toggle').toggleClass('btn-danger');
        $('#toggle').toggleClass('btn-success');
        editMode = false;
    }
}

// Function to display Menu
function openMenu(params) {
    $('.hover').show();
    $('#menu').show();
}

// Function to close Menu
function closeMenu(params) {
    $('#menu').hide();
    $('.hover').hide();
}

// Function to load Exported JSON Form
function exportJSON() {
    $('#menu').hide();
    $('#jsonOp')[0].value = JSON.stringify(bookmarks);
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
    $('#importjson').show();
}

// Function to Import JSON and load into Bookmarks
function importJSON() {
    $('#menu').hide();
    try {
        bookmarks = JSON.parse($('#jsonIn').val());
        console.log(bookmarks);
        processBookmarks();
    } catch (error) {
        $('#jsonIn').val("Invalid JSON Data");
        return;
    }
    $('.options').css('display', $('.options').css('display'));
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
function openDeleteLink(params) {
    console.log(event.srcElement.id);
    console.log(event.srcElement.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id);
    $('#cat-delete-id').val(event.srcElement.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id);
    $('#link-delete-id').val(event.srcElement.id);
    $('.hover').show();
    $('#link-delete').show();
}

// Function to delete link
function deleteLink(params) {
    let catId = $('#cat-delete-id').val().split("c")[1];
    let linkId = $('#link-delete-id').val().split("l")[1];
    bookmarks.bookmarks[catId].bookmarks.splice(linkId, 1);
    processBookmarks();
    $('#link-delete').hide();
    $('.hover').hide();
}

// Function to close delete confirmation for link
function closeDeleteLink(params) {
    $('#link-delete').hide();
    $('.hover').hide();
}

// Function to show Help
function showHelp() {
    $('#menu').hide();
    console.log("Help Show");
    $('#help').show();
}

// Function to hide Help
function hideHelp() {
    console.log("Help Hide");
    $('#help').hide();
    $('.hover').hide();
}
