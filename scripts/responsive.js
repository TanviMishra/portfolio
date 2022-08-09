const screen = {
  small: 0,
  medium: 500,
  large: 768,
};
let meText2 = document.querySelector("#meText2");
let hamburgerOpen = document.querySelector("#hamburgerIcon");
let hamburgerClose = document.querySelector("#hamburgerCloseIcon");
let light = document.querySelector("#theme-toggle");
let menu = document.querySelector("#menu");
let menubar = document.querySelector("#menuContent");
let menuOpen = 0;
let content = document.querySelector("#content");
let thumbnailSize = document.querySelector("#thumbnails");
let resumeContent1 = document.querySelector("#resumeHeadFoot");
let resumeContent2 = document.querySelector("#resume");
let size = null;
// observe window resize
window.addEventListener("resize", resizeHandler);

// initial call
resizeHandler();

// calculate size
function resizeHandler() {
  // get window width
  const iw = window.innerWidth;

  // determine named size
  for (let s in screen) {
    if (iw > screen[s]) size = s;
  }
  //call to fn
  responsiveChanges(size);
}
function responsiveChanges(size) {
  if (size == "small") {
    // meText2.style.display = "none";
    hamburgerOpen.style.display = "block";
    hamburgerClose.style.display = "block";
    content.style.width = "80%"; //beginning making the content margins align across pages
    content.style.marginLeft = "auto";
    content.style.marginRight = "auto";
    if (thumbnailSize) thumbnailSize.style.width = "100%";
    if (resumeContent1) resumeContent1.style.width = "100%";
    if (resumeContent2) resumeContent2.style.width = "100%"; //ending making the content margins align across pages
  } else if (size == "medium") {
    hamburgerOpen.style.display = "none";
    hamburgerClose.style.display = "none";
  } else if (size == "large") {
    hamburgerOpen.style.display = "none";
    hamburgerClose.style.display = "none";
  }
}
hamburgerOpen.addEventListener("click", function () {
  if (menuOpen == 0 && size == "small") {
    menu.style.display = "block";
    // menubar.style.marginLeft = "0px !important";
    hamburgerOpen.style.display = "none";
    light.style.display = "none";
  }
});
hamburgerClose.addEventListener("click", function () {
  if (size == "small") {
    menu.style.display = "none";
    // menubar.style.marginLeft = "-500px !important";
    hamburgerOpen.style.display = "block";
    light.style.display = "block";
  }
});
