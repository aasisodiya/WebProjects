// Template Code Start
"use strict";
// Just for Fun!
console.log(
  "%c Stop Right There! ",
  "background: #222; color: orange;font-size:20px"
);
console.log(
  "%c You Shall Not Passaas",
  "background: #222; color: red; font-size:40px"
);
// Template Code End

let currentWidth = window.innerWidth;

$(window).resize(function (event) {
  // record current width
  let newWidth = window.innerWidth;
  if (currentWidth != newWidth) {
    currentWidth = newWidth;
    console.log(event);
  }
});

// Can add 3d effect on hover
// Add search on url

let websites = [
  {
    id: 1,
    url: "https://github.com/aasisodiya",
    logo: "img/logos/githubcolor.png",
    type: "",
    createdDate: "",
  },
  {
    id: 2,
    url: "https://www.createxion.com/",
    logo: "img/logos/createxionlogo.svg",
    type: "",
    createdDate: "",
  },
  {
    id: 3,
    url: "https://ai.google/",
    logo: "img/logos/google-ai.png",
    type: "",
    createdDate: "",
  },
  {
    id: 4,
    url: "https://applieddigitalskills.withgoogle.com/s/en/home",
    logo: "img/logos/google-applied-digital-skills.png",
    type: "",
    createdDate: "",
  },
  {
    id: 5,
    url: "https://axiom.ai/",
    logo: "img/logos/axiom-ai.png",
    type: "",
    createdDate: "",
  },
  {
    id: 6,
    url: "https://bgjar.com/",
    logo: "img/logos/bgjarlogo.png",
    type: "",
    createdDate: "",
  },
  {
    id: 7,
    url: "https://2050.earth/",
    logo: "img/logos/earth2020.svg",
    type: "",
    createdDate: "",
  },
  {
    id: 8,
    url: "https://unstop.com/",
    logo: "img/logos/unstop.svg",
    type: "",
    createdDate: "",
  },
  {
    id: 9,
    url: "https://digitaldefynd.com/",
    logo: "img/logos/digitaldefynd.png",
    type: "",
    createdDate: "",
  },
  {
    id: 10,
    url: "https://ed.ted.com/",
    logo: "img/logos/teded.svg",
    type: "",
    createdDate: "",
  },
  {
    id: 11,
    url: "https://emupedia.net/beta/emuos/",
    logo: "img/logos/emupedia.png",
    type: "",
    createdDate: "",
  },
  {
    id: 12,
    url: "https://filecr.com/",
    logo: "img/logos/filecr.png",
    type: "",
    createdDate: "",
  },
  {
    id: 13,
    url: "https://getwaves.io/",
    logo: "img/logos/getwaves-io.svg",
    type: "",
    createdDate: "",
  },
  {
    id: 14,
    url: "https://glitch.com/",
    logo: "img/logos/glitch.svg",
    type: "",
    createdDate: "",
  },
  {
    id: 15,
    url: "https://edu.google.com/intl/ALL_in/",
    logo: "img/logos/google-education.png",
    type: "",
    createdDate: "",
  },
  {
    id: 16,
    url: "https://gohighbrow.com/",
    logo: "img/logos/gohighbrow.png",
    type: "",
    createdDate: "",
  },
  {
    id: 17,
    url: "https://javascript.info/",
    logo: "img/logos/javascriptinfo.svg",
    type: "",
    createdDate: "",
  },
  {
    id: 18,
    url: "https://jsoncrack.com/",
    logo: "img/logos/jsoncrack.png",
    type: "",
    createdDate: "",
  },
  // {
  //   id: 0,
  //   url: "https://listenable.io/",
  //   logo: "img/logos/",
  //   type: "",
  //   createdDate: "",
  // },
  {
    id: 19,
    url: "https://modelviewer.dev/",
    logo: "img/logos/modelviewer.png",
    type: "",
    createdDate: "",
  },
  {
    id: 20,
    url: "https://mycolor.space/",
    logo: "img/logos/colorspace.png",
    type: "",
    createdDate: "",
  },
  {
    id: 21,
    url: "https://neumorphism.io/",
    logo: "img/logos/neumorphismio.png",
    type: "",
    createdDate: "",
  },
  // {
  //   id: 0,
  //   url: "https://www.geeksforgeeks.org/",
  //   logo: "img/logos/",
  //   type: "",
  //   createdDate: "",
  // },
  {
    id: 22,
    url: "https://leetcode.com/",
    logo: "img/logos/leetcode.png",
    type: "",
    createdDate: "",
  },
  {
    id: 23,
    url: "https://www.hackerrank.com/aasisodiya",
    logo: "img/logos/hackerrank.png",
    type: "",
    createdDate: "",
  },
  {
    id: 24,
    url: "https://www.freecodecamp.org/",
    logo: "img/logos/freecodecamp.png",
    type: "",
    createdDate: "",
  },
  {
    id: 25,
    url: "https://openai.com/",
    logo: "img/logos/openai.png",
    type: "",
    createdDate: "",
  },
  {
    id: 26,
    url: "https://www.remove.bg/",
    logo: "img/logos/removebg.png",
    type: "",
    createdDate: "",
  },
  {
    id: 27,
    url: "https://www.flaticon.com/",
    logo: "img/logos/flaticon.png",
    type: "",
    createdDate: "",
  },
  {
    id: 28,
    url: "https://builtwith.com/",
    logo: "img/logos/builtwith.png",
    type: "",
    createdDate: "",
  },
  {
    id: 29,
    url: "https://www.webnode.com/",
    logo: "img/logos/webnode.png",
    type: "",
    createdDate: "",
  },
  {
    id: 30,
    url: "https://github.com/TencentARC/GFPGAN",
    logo: "img/logos/gfpgan_logo.png",
    type: "",
    createdDate: "",
  },
  {
    id: 31,
    url: "https://dribbble.com/aasisodiya",
    logo: "img/logos/dribble.png",
    type: "",
    createdDate: "",
  },
  {
    id: 32,
    url: "https://answersocrates.com/",
    logo: "img/logos/answersocrates.png",
    type: "",
    createdDate: "",
  },
  // {
  //   id: 0,
  //   url: "https://pictory.ai/",
  //   logo: "img/logos/",
  //   type: "",
  //   createdDate: "",
  // },
  // {
  //   id: 0,
  //   url: "https://www.tubebuddy.com/",
  //   logo: "img/logos/",
  //   type: "",
  //   createdDate: "",
  // },
  {
    id: 33,
    url: "https://coolors.co/",
    logo: "img/logos/coolorsco.png",
    type: "",
    createdDate: "",
  },
  {
    id: 34,
    url: "https://fontsinuse.com/",
    logo: "img/logos/fontsinuse.png",
    type: "",
    createdDate: "",
  },
  {
    id: 35,
    url: "https://undraw.co/illustrations",
    logo: "img/logos/undraw.png",
    type: "",
    createdDate: "",
  },
  {
    id: 36,
    url: "https://www.photopea.com/",
    logo: "img/logos/photopea.svg",
    type: "",
    createdDate: "",
  },
  {
    id: 37,
    url: "https://www.virustotal.com/gui/home/upload",
    logo: "img/logos/virustotal.svg",
    type: "",
    createdDate: "",
  },
  {
    id: 38,
    url: "https://edit.photo/",
    logo: "img/logos/editphoto.png",
    type: "",
    createdDate: "",
  },
  // {
  //   id: 0,
  //   url: "https://www.screely.com/",
  //   logo: "img/logos/",
  //   type: "",
  //   createdDate: "",
  // },
  {
    id: 39,
    url: "https://pfpmaker.com/",
    logo: "img/logos/pfpmaker.svg",
    type: "",
    createdDate: "",
  },
  {
    id: 40,
    url: "https://scribehow.com/",
    logo: "img/logos/scribehow.svg",
    type: "",
    createdDate: "",
  },
  {
    id: 41,
    url: "https://academy.hubspot.com/",
    logo: "img/logos/hubspot-academy.svg",
    type: "",
    createdDate: "",
  },
  {
    id: 42,
    url: "https://gmail.com/",
    logo: "img/logos/gmail.png",
    type: "",
    createdDate: "",
  },
  {
    id: 43,
    url: "https://outlook.live.com/owa/",
    logo: "img/logos/outlook.png",
    type: "",
    createdDate: "",
  },
  {
    id: 44,
    url: "https://facebook.com/aasisodiya",
    logo: "img/logos/facebook.png",
    type: "",
    createdDate: "",
  },
  {
    id: 45,
    url: "https://twitter.com/aassiodiya",
    logo: "img/logos/twitter.png",
    type: "",
    createdDate: "",
  },
  {
    id: 46,
    url: "https://www.linkedin.com/in/aasisodiya",
    logo: "img/logos/linkedin.svg",
    type: "",
    createdDate: "",
  },
  {
    id: 47,
    url: "https://vimeo.com/aasisodiya",
    logo: "img/logos/vimeo.svg",
    type: "",
    createdDate: "",
  },
  {
    id: 48,
    url: "https://www.flickr.com/photos/aasisodiya",
    logo: "img/logos/flickr.png",
    type: "",
    createdDate: "",
  },
  {
    id: 49,
    url: "https://www.youtube.com/channel/UCJVZT03z5fLJF5eO4PEbEUA",
    logo: "img/logos/youtube.svg",
    type: "",
    createdDate: "",
  },
  {
    id: 50,
    url: "https://www.pinterest.com/aasisodiya/",
    logo: "img/logos/pinterest.png",
    type: "",
    createdDate: "",
  },
  {
    id: 51,
    url: "https://www.tumblr.com/aasisodiya",
    logo: "img/logos/tumblr.svg",
    type: "",
    createdDate: "",
  },
  {
    id: 52,
    url: "https://medium.com/@aasisodiya",
    logo: "img/logos/medium.png",
    type: "",
    createdDate: "",
  },
  {
    id: 53,
    url: "https://www.imdb.com/user/ur32343409/",
    logo: "img/logos/imdb.png",
    type: "",
    createdDate: "",
  },
  {
    id: 54,
    url: "https://sketchfab.com/aasisodiya",
    logo: "img/logos/sketchfab.svg",
    type: "",
    createdDate: "",
  },
  {
    id: 55,
    url: "https://soundcloud.com/aasisodiya",
    logo: "img/logos/soundcloud.png",
    type: "",
    createdDate: "",
  },
  {
    id: 56,
    url: "https://www.twitch.tv/aasisodiya",
    logo: "img/logos/twitch.png",
    type: "",
    createdDate: "",
  },
  {
    id: 57,
    url: "https://www.behance.net/aasisodiya",
    logo: "img/logos/behance.png",
    type: "",
    createdDate: "",
  },
  {
    id: 58,
    url: "https://www.thingiverse.com/",
    logo: "img/logos/thingiverse.svg",
    type: "",
    createdDate: "",
  },
  {
    id: 59,
    url: "https://console.aws.amazon.com/console/home?nc2=h_ct&src=header-signin",
    logo: "img/logos/aws.svg",
    type: "",
    createdDate: "",
  },
  {
    id: 60,
    url: "https://drive.google.com/",
    logo: "img/logos/drive.png",
    type: "",
    createdDate: "",
  },
  {
    id: 61,
    url: "https://www.google.com/finance/?hl=en",
    logo: "img/logos/googlefinance.png",
    type: "",
    createdDate: "",
  },
  {
    id: 62,
    url: "https://photos.google.com/",
    logo: "img/logos/googlephotos.svg",
    type: "",
    createdDate: "",
  },
  {
    id: 63,
    url: "https://contacts.google.com/",
    logo: "img/logos/googlecontacts.png",
    type: "",
    createdDate: "",
  },
  {
    id: 64,
    url: "https://www.google.com/maps",
    logo: "img/logos/googlemaps.png",
    type: "",
    createdDate: "",
  },
  {
    id: 65,
    url: "https://hangouts.google.com/",
    logo: "img/logos/googlehangout.png",
    type: "",
    createdDate: "",
  },
  {
    id: 66,
    url: "https://messages.google.com/web/",
    logo: "img/logos/googlemessages.png",
    type: "",
    createdDate: "",
  },
  {
    id: 67,
    url: "https://firebase.google.com/",
    logo: "img/logos/firebase.png",
    type: "",
    createdDate: "",
  },
  {
    id: 68,
    url: "https://experiments.withgoogle.com/collection/chrome",
    logo: "img/logos/chromeexperiments.jpg",
    type: "",
    createdDate: "",
  },
  {
    id: 69,
    url: "https://fonts.google.com/",
    logo: "img/logos/googlefonts.png",
    type: "",
    createdDate: "",
  },
  {
    id: 70,
    url: "https://web.whatsapp.com/",
    logo: "img/logos/whatsapp.png",
    type: "",
    createdDate: "",
  },
  {
    id: 71,
    url: "https://store.steampowered.com/",
    logo: "img/logos/steam.png",
    type: "",
    createdDate: "",
  },
  {
    id: 72,
    url: "https://www.messenger.com/",
    logo: "img/logos/messenger.png",
    type: "",
    createdDate: "",
  },
  {
    id: 73,
    url: "https://www.blender.org/",
    logo: "img/logos/blender.png",
    type: "",
    createdDate: "",
  },
  {
    id: 74,
    url: "https://ephtracy.github.io/",
    logo: "img/logos/magicavoxel.png",
    type: "",
    createdDate: "",
  },
  {
    id: 75,
    url: "https://free3d.com/",
    logo: "img/logos/free3d.png",
    type: "",
    createdDate: "",
  },
  {
    id: 76,
    url: "https://www.orbolt.com/",
    logo: "img/logos/orbolt.png",
    type: "",
    createdDate: "",
  },
  {
    id: 77,
    url: "https://ifttt.com/",
    logo: "img/logos/ifttt.png",
    type: "",
    createdDate: "",
  },
  {
    id: 78,
    url: "https://previewed.app/",
    logo: "img/logos/previewed.svg",
    type: "",
    createdDate: "",
  },
  {
    id: 79,
    url: "https://www.hostinger.in/",
    logo: "img/logos/hostinger.png",
    type: "",
    createdDate: "",
  },
  {
    id: 80,
    url: "https://10minutemail.com/",
    logo: "img/logos/10minutemail.png",
    type: "",
    createdDate: "",
  },
  {
    id: 81,
    url: "https://www.flipkart.com/",
    logo: "img/logos/flipkart.png",
    type: "",
    createdDate: "",
  },
  {
    id: 82,
    url: "https://www.dropbox.com/",
    logo: "img/logos/dropbox.png",
    type: "",
    createdDate: "",
  },
  {
    id: 83,
    url: "https://www.tunefind.com/",
    logo: "img/logos/tunefind.png",
    type: "",
    createdDate: "",
  },
  {
    id: 84,
    url: "https://www.unitag.io/qrcode",
    logo: "img/logos/unitag.png",
    type: "",
    createdDate: "",
  },
  {
    id: 85,
    url: "https://www.coursera.org/",
    logo: "img/logos/coursera.png",
    type: "",
    createdDate: "",
  },
  {
    id: 86,
    url: "https://www.edx.org/",
    logo: "img/logos/edx.png",
    type: "",
    createdDate: "",
  },
  {
    id: 87,
    url: "https://www.hackerearth.com/",
    logo: "img/logos/hackerearth.png",
    type: "",
    createdDate: "",
  },
  {
    id: 88,
    url: "https://www.quora.com/",
    logo: "img/logos/quora.png",
    type: "",
    createdDate: "",
  },
  {
    id: 89,
    url: "https://teamtreehouse.com/",
    logo: "img/logos/treehouse.png",
    type: "",
    createdDate: "",
  },
  {
    id: 90,
    url: "https://www.udacity.com/",
    logo: "img/logos/udacity.png",
    type: "",
    createdDate: "",
  },
  {
    id: 91,
    url: "https://scikit-learn.org/",
    logo: "img/logos/scikitlearn.png",
    type: "",
    createdDate: "",
  },
  {
    id: 92,
    url: "https://www.udemy.com/",
    logo: "img/logos/udemy.png",
    type: "",
    createdDate: "",
  },
  {
    id: 93,
    url: "https://www.unrealengine.com/",
    logo: "img/logos/unrealengine.png",
    type: "",
    createdDate: "",
  },
  {
    id: 94,
    url: "https://tutorialzine.com/",
    logo: "img/logos/tutorialzine.png",
    type: "",
    createdDate: "",
  },
  {
    id: 95,
    url: "https://h5bp.org/Front-end-Developer-Interview-Questions/",
    logo: "img/logos/h5bp.png",
    type: "",
    createdDate: "",
  },
  {
    id: 96,
    url: "https://www.deeplearning.ai/courses/deep-learning-specialization/",
    logo: "img/logos/deeplearningai.png",
    type: "",
    createdDate: "",
  },
  {
    id: 97,
    url: "https://www.amazon.in/",
    logo: "img/logos/amazon.png",
    type: "",
    createdDate: "",
  },
  {
    id: 98,
    url: "https://www.valmiki.iitk.ac.in/",
    logo: "img/logos/valmiki.png",
    type: "",
    createdDate: "",
  },
  {
    id: 99,
    url: "https://mixkit.co/",
    logo: "img/logos/mixkit.png",
    type: "",
    createdDate: "",
  },
  {
    id: 100,
    url: "https://www.goodbooks.io/",
    logo: "img/logos/goodbooks.svg",
    type: "",
    createdDate: "",
  },
  {
    id: 101,
    url: "https://www.diffchecker.com/",
    logo: "img/logos/diffchecker.png",
    type: "",
    createdDate: "",
  },
  {
    id: 102,
    url: "https://copypastecharacter.com/",
    logo: "img/logos/copypastecharacter.png",
    type: "",
    createdDate: "",
  },
  {
    id: 103,
    url: "https://www.copy.ai/",
    logo: "img/logos/copyai.svg",
    type: "",
    createdDate: "",
  },
  {
    id: 104,
    url: "https://witeboard.com/",
    logo: "img/logos/witeboard.png",
    type: "",
    createdDate: "",
  },
  {
    id: 105,
    url: "https://blush.design/",
    logo: "img/logos/blush.svg",
    type: "",
    createdDate: "",
  },
  {
    id: 106,
    url: "https://www.whatruns.com/",
    logo: "img/logos/whatruns.svg",
    type: "",
    createdDate: "",
  },
  {
    id: 107,
    url: "https://coverr.co/",
    logo: "img/logos/coverr.svg",
    type: "",
    createdDate: "",
  },
  {
    id: 108,
    url: "https://untools.co/",
    logo: "img/logos/untools.png",
    type: "",
    createdDate: "",
  },
  {
    id: 109,
    url: "https://lumen5.com/",
    logo: "img/logos/lumen5.svg",
    type: "",
    createdDate: "",
  },
  {
    id: 110,
    url: "https://fakeyou.com/",
    logo: "img/logos/fakeyou.png",
    type: "",
    createdDate: "",
  },
  {
    id: 111,
    url: "https://www.cutout.pro/",
    logo: "img/logos/cutoutpro.png",
    type: "",
    createdDate: "",
  },
  {
    id: 112,
    url: "https://cleanup.pictures/",
    logo: "img/logos/cleanuppictures.svg",
    type: "",
    createdDate: "",
  },
  {
    id: 113,
    url: "https://freeforstudents.org/",
    logo: "img/logos/freeforstudent.svg",
    type: "",
    createdDate: "",
  },
  {
    id: 114,
    url: "https://shortcutworld.com/",
    logo: "img/logos/shortcutworld.png",
    type: "",
    createdDate: "",
  },
  // {
  //   id: 9,
  //   url: "",
  //   logo: "img/logos/",
  //   type: "",
  //   createdDate: "",
  // },
];

let imgurl, url;

function processWebsites(category) {
  let htmlCode = "";
  websites.forEach((website) => {
    imgurl = website.logo;
    url = website.url;
    let template = `
    <a class="card" href="${url}" target="_blank" rel="noopener noreferrer">
        <div class="cardbg"></div>
        <div class="websiteholder flexcenter">
            <div class="websitedata flexcenter">
                <img src="${imgurl}" alt="">
            </div>
        </div>
    </a>`;
    htmlCode += template;
  });
  $(".showcase")[0].innerHTML = htmlCode;
}
processWebsites();

$("#showprogress").on("click", function () {
  $("#under-development-banner").hide();
});
