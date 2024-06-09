let key =
  "patEeZsSkvjGxhnVx.56107ba087170f893f8386c09cbdb56bac14a97b3cd8823ff8dd21fb11db6344";
let base = "appTswHNd33pu10tU";
let table = "Sketchbook";

let sketchbookSection = document.querySelector("#sketchbookSection");
sketchbookSection.style.display = "none";
let slider = sketchbookSection.querySelector(".slider");
let currentIndex = 0;

let sketchUrl = `https://api.airtable.com/v0/${base}/${table}`;

fetch(sketchUrl, {
  headers: {
    Authorization: `Bearer ${key}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data.records);
    data.records.sort(
      (a, b) => parseFloat(a.fields.Sr) - parseFloat(b.fields.Sr)
    );
    data.records.forEach((element) => {
      if (element.fields.Page) {
        sketchbookSection.style.display = "flex";
        element.fields.Page.forEach((img) => {
          //image loop
          let containDiv = document.createElement("div");
          let imgDiv = document.createElement("img");
          containDiv.setAttribute("class", "slide");
          imgDiv.setAttribute("src", img.url);
          imgDiv.setAttribute("class", "slideImg");
          imgDiv.setAttribute("alt", img.filename);
          containDiv.append(imgDiv);
          slider.append(containDiv);
          imgDiv.addEventListener("click", function () {
            //zoom function
            photoContainer.style.display = "flex";
            photoCloseup.setAttribute("src", img.url);
            photoCloseupCaption.innerHTML = img.filename;
          });
        });
      }
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
sketchbookSection.querySelector("#prev").addEventListener("click", function () {
  currentIndex = showSlide(currentIndex - 1);
});
sketchbookSection.querySelector("#next").addEventListener("click", function () {
  currentIndex = showSlide(currentIndex + 1);
});
function showSlide(index) {
  const slides = document.querySelectorAll(".slide");
  let newIndex;
  if (index > slides.length - 1) {
    newIndex = 0;
  } else if (index < 0) {
    newIndex = slides.length - 1;
  } else {
    newIndex = index;
  }
  console.log("Slide index", index, "newIndex", newIndex);
  // }

  const offset = -newIndex * 100; // Calculate the offset for the transform property
  slider.style.transform = `translateX(${offset}%)`;
  return newIndex;
}
