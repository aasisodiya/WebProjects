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
    logo: "img/github.png",
    type: "",
    createdDate: "",
  },
  {
    id: 2,
    url: "https://www.createxion.com/",
    logo: "img/createxionlogo.svg",
    type: "",
    createdDate: "",
  },
  {
    id: 3,
    url: "https://ai.google/",
    logo: "img/google-ai.png",
    type: "",
    createdDate: "",
  },
  {
    id: 4,
    url: "https://applieddigitalskills.withgoogle.com/s/en/home",
    logo: "img/google-applied-digital-skills.png",
    type: "",
    createdDate: "",
  },
  {
    id: 5,
    url: "https://axiom.ai/",
    logo: "img/axiom-ai.png",
    type: "",
    createdDate: "",
  },
  {
    id: 6,
    url: "https://bgjar.com/",
    logo: "img/bgjar.png",
    type: "",
    createdDate: "",
  },
  {
    id: 7,
    url: "https://2050.earth/",
    logo: "img/earth2020.svg",
    type: "",
    createdDate: "",
  },
];

let imgurl, url;

function processWebsites(category) {
  let htmlCode = "";
  websites.forEach((website) => {
    imgurl = website.logo;
    url = website.url;
    let template = `
    <a class="card" href="${url}">
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
