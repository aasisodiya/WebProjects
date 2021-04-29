// Template Code Start
"use strict"
// Just for Fun!
console.log('%c Stop Right There! ', 'background: #222; color: orange;font-size:20px');
console.log('%c You Shall Not Pass! ', 'background: #222; color: red; font-size:40px');
// Template Code End

// Password Character Set
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "1234567890";
const symbols = "!@#$%^&*_-=+?";
const compsymbols = "`~,.<>;:{}[]|";

// Flags
let hasLowercase = false;
let hasUppercase = false;
let hasNumbers = false;
let hasSymbols = false;
let hasCompSymbols = false;

// Password Length
let passwordLength = 0;
let generatedPassword = '';

function GeneratePassword() {
    // Checking password length
    if (passwordLength == 0) {
        return "Password Size Can't Be Zero"
    }
    // Creating preferred characters set
    let preferredCharacters = '';
    if (hasLowercase) {
        preferredCharacters += lowercase;
    }
    if (hasUppercase) {
        preferredCharacters += uppercase;
    }
    if (hasNumbers) {
        preferredCharacters += numbers;
    }
    if (hasSymbols) {
        preferredCharacters += symbols;
    }
    if (hasCompSymbols) {
        preferredCharacters += compsymbols;
    }
    if (preferredCharacters == '') {
        return "Select At Least One Set of Characters As Preference";
    }
    // Generating Password
    generatedPassword = '';
    let preferredCharactersLength = preferredCharacters.length;
    for (let index = 0; index < passwordLength; index++) {
        var randomPoisition = Math.floor(Math.random() * preferredCharactersLength);
        generatedPassword += preferredCharacters.substring(randomPoisition, randomPoisition + 1);
    }
    // Validating Password
    if (generatedPassword.length != passwordLength) {
        // regenerate / error
        console.log("Something went wrong!");
    }
    return generatedPassword;
}

function contains(password, characterSet) {
    for (const index in password) {
        if (characterSet.includes(password[index])) {
            return true
        }
    }
    return false;
}

function ValidatePassword(password) {
    if (password.length == 0) {
        return "Please Enter Some Values to Validate"
    }
    // Check for lowercase
    let containsLowercase = contains(password, lowercase);
    console.log("containsLowercase: ", containsLowercase);
    // Check for uppercase
    let containsUppercase = contains(password, uppercase);
    console.log("containsUppercase: ", containsUppercase);
    // Check for numbers
    let containsNumbers = contains(password, numbers);
    console.log("containsNumbers: ", containsNumbers);
    // Check for symbols
    let containsSymbols = contains(password, symbols);
    console.log("containsSymbols: ", containsSymbols);
    // Check for compsymbols
    let containsCompsymbols = contains(password, compsymbols);
    console.log("containsCompsymbols: ", containsCompsymbols);
}

// Add Event Listener for generate button
$('#generate').on('click', function () {
    hasNumbers = $('#numbers').prop('checked');
    hasLowercase = $('#lowercase').prop('checked');
    hasUppercase = $('#uppercase').prop('checked');
    hasSymbols = $('#character').prop('checked');
    hasCompSymbols = $('#character2').prop('checked');
    passwordLength = $('#passwordlength').val();
    let newPassword = GeneratePassword();
    $('#password').val(newPassword);
    $('#copy').show();
});

// Function to Copy to ClipBoard
function copyToClipboard(contentToCopy) {
    var input = $("<input>");
    $("body").append(input);
    console.log(contentToCopy);
    input.val(contentToCopy).select();
    document.execCommand("copy");
    input.remove();
}

// Add Event Listener for copy button
let copymessage;
$('#copy').on('click', function () {
    $('#copymessage').hide();
    clearInterval(copymessage);
    copyToClipboard(generatedPassword);
    $('#copymessage').show();
    // Function to hide copymessage after some time
    copymessage = setTimeout(() => {
        $('#copymessage').hide();
    }, 2000);
    // 2000 above matches the copymessage animation time
});

// Test Cases Below

// Password Length 0
console.log(GeneratePassword());
console.log("Generating password with length zero:", GeneratePassword());

// Password Length > 0
passwordLength = 5;
console.log("Generating password with no selected set of characters:", GeneratePassword());

// lowercase password
hasLowercase = true;
hasUppercase = false;
hasNumbers = false;
hasSymbols = false;
hasCompSymbols = false;
passwordLength = 10;
console.log("Generating password with lowercase:", GeneratePassword());

// uppercase password
hasLowercase = false;
hasUppercase = true;
hasNumbers = false;
hasSymbols = false;
hasCompSymbols = false;
passwordLength = 10;
console.log("Generating password with uppercase:", GeneratePassword());

// numbers password
hasLowercase = false;
hasUppercase = false;
hasNumbers = true;
hasSymbols = false;
hasCompSymbols = false;
passwordLength = 10;
console.log("Generating password with numbers:", GeneratePassword());

// lowercase and uppercase password
hasLowercase = true;
hasUppercase = true;
hasNumbers = false;
hasSymbols = false;
hasCompSymbols = false;
passwordLength = 10;
console.log("Generating password with lowercase and uppercase:", GeneratePassword());

// lowercase, uppercase and numbers password
hasLowercase = true;
hasUppercase = true;
hasNumbers = true;
hasSymbols = false;
hasCompSymbols = false;
passwordLength = 10;
console.log("Generating password with lowercase, uppercase and numbers:", GeneratePassword());

// lowercase, uppercase, numbers and symbols password
hasLowercase = true;
hasUppercase = true;
hasNumbers = true;
hasSymbols = true;
hasCompSymbols = false;
passwordLength = 10;
console.log("Generating password with lowercase, uppercase, numbers and symbols:", GeneratePassword());

// lowercase, uppercase, numbers and symbols password
hasLowercase = true;
hasUppercase = true;
hasNumbers = true;
hasSymbols = true;
hasCompSymbols = true;
passwordLength = 10;
console.log("Generating password with lowercase, uppercase, numbers and comp symbols:", GeneratePassword());