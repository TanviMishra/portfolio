const screen = {
  small: 0,
  medium: 375,
  large: 768,
};
let meText2 = document.querySelector("#meText2");
// observe window resize
window.addEventListener("resize", resizeHandler);

// initial call
resizeHandler();

// calculate size
function resizeHandler() {
  // get window width
  const iw = window.innerWidth;

  // determine named size
  let size = null;
  for (let s in screen) {
    if (iw > screen[s]) size = s;
  }
  //call to fn
  responsiveChanges(size);
}
function responsiveChanges(size) {
  if (size == "small") {
    meText2.style.display = "none";
  }
}
