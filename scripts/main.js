//domain name linkage: https://www.youtube.com/watch?v=2K7asqt8wMw
let toggle = document.getElementById("theme-toggle");
let svg = document.getElementById("theme-svg");

let storedTheme =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark");
if (storedTheme)
  document.documentElement.setAttribute("data-theme", storedTheme);

toggle.onclick = function () {
  let currentTheme = document.documentElement.getAttribute("data-theme");
  let targetTheme = "dark";
  if (currentTheme === "dark") {
    targetTheme = "light";
  }

  document.documentElement.setAttribute("data-theme", targetTheme);
  localStorage.setItem("theme", targetTheme);
};
toggle.onmouseover = function () {
  toggle.style.marginTop = "-30px";
};
toggle.onmouseleave = function () {
  toggle.style.marginTop = "-65px";
};
