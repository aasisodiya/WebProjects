var playerList = [];
var secretSanta = [];
var secretName = [];
var tcost = 0;
var canDisplay = false;

function add() {
    document.getElementById("message").style.display = "none";
    document.getElementById("message2").style.display = "none";
    var pname = document.getElementById("pname").value;
    var cost = document.getElementById("cost").value;
    var secret = document.getElementById("secret").value;
    if (pname.length > 0 && secret.length > 0 && cost > 0) {
        playerList[playerList.length] = pname;
        document.getElementById("pname").value = null;
        document.getElementById("cost").value = null;
        document.getElementById("secret").value = null;
        tcost += parseInt(cost);
        secretName[secretName.length] = secret;
    } else {
        document.getElementById("message2").style.display = "block";
    }
}

function play() {
    document.getElementById("message").style.display = "none";
    document.getElementById("message2").style.display = "none";
    secretSanta = [];
    if (playerList.length > 2) {
        for (var i = 0; i < playerList.length; i++) {
            findMeASanta(i);
        }
        canDisplay = true;
        display();
    } else {
        document.getElementById("message").style.display = "block";
    }
}

function findMeASanta(num) {
    try {
        if (doesNotClash()) {
            var randomChoice = Math.floor(Math.random() * playerList.length);
            while (randomChoice == num || !isSantaAvailable(playerList[randomChoice])) {
                randomChoice = Math.floor(Math.random() * playerList.length);
            }
            secretSanta[secretSanta.length] = playerList[randomChoice];
        } else {
            var randomChoice = Math.floor(Math.random() * secretSanta.length);
            secretSanta[num] = secretSanta[randomChoice];
            secretSanta[randomChoice] = playerList[num];
        }
    } catch (error) {
        console.log("Try Again!");
    }
}

function isSantaAvailable(santaChoosed) {
    for (var i = 0; i < secretSanta.length; i++) {
        if (santaChoosed == secretSanta[i]) {
            return false;
        }
    }
    return true;
}

function doesNotClash() {
    if (secretSanta.length == (playerList.length - 1) && isSantaAvailable(playerList[playerList.length - 1])) {
        return false;
    }
    return true;
}

function display() {
    if (canDisplay) {
        var htmlCode = "<table><tr><th>Secret Santa Name</th><th>Target</th>";
        document.getElementById("result").style.display = "block";
        for (var i = 0; i < playerList.length; i++) {
            htmlCode += "<tr><td>"+secretName[i] + "</td><td>" + secretSanta[i] + "</td></tr>"  ;
        }
    }
    htmlCode += "</table>";
    document.getElementById("result-body").innerHTML = htmlCode;
    var prize = tcost/playerList.length;
    document.getElementById("prize").innerHTML = prize + "<span>Rs</span>";
    canDisplay = false;
}

function closeIt() {
    document.getElementById("result").style.display = "none";
}