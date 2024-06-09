//domain name linkage: https://www.youtube.com/watch?v=2K7asqt8wMw
let toggle = document.getElementById("theme-toggle");

let storedTheme =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches //set default to light but checks if someone's prefered theme is dark and changes
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
  toggle.style.marginTop = "-10px";
};
toggle.onmouseleave = function () {
  toggle.style.marginTop = "-35px";
};
