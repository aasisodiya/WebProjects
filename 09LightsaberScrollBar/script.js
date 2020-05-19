let progress = document.getElementById("plasma");
let totalHeight = document.body.scrollHeight - window.innerHeight;
window.onscroll = function() {
    let progressHeight = (window.pageYOffset / totalHeight) * 100;
    let actualHeight = (200/window.innerHeight) * 100;
    progress.style.height = actualHeight +  progressHeight * (100 - actualHeight)/100 + "%";
}