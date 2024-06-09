let classificationSection = document.querySelector("#classificationSection");
// let jumpToLinks = jumpMenu.querySelectorAll(".jump-to");
let thumbnailSection = document.querySelector("#thumbnailSection");
let projectPopUp = document.querySelector("#projectPopUp");
let grid = document.querySelector("#grid");
let photoContainer = document.querySelector("#photoCloseupContainer"); // for zooming in photo
let photoCloseupCaption = document.querySelector("#photoCloseupCaption");
let photoCloseup = document.querySelector("#photoCloseup");
// let currentIndex = 0;
let allProjectsString = "All_projects";

let apiKey =
  "patEeZsSkvjGxhnVx.56107ba087170f893f8386c09cbdb56bac14a97b3cd8823ff8dd21fb11db6344"; // Replace with your Airtable API key
let baseId = "appTswHNd33pu10tU"; // Replace with your Airtable base ID
let tableName = "Sandbox"; // Replace with your table name

let url = `https://api.airtable.com/v0/${baseId}/${tableName}`;

fetch(url, {
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    // console.log(data.records);
    data.records.sort(
      (a, b) => parseFloat(a.fields.Sr) - parseFloat(b.fields.Sr)
    );
    let classificationArr = [allProjectsString];
    classificationArr.push(...getUniqueClassifications(data.records));
    classificationArr.forEach((category) => {
      classifier = document.createElement("a");
      classifier.setAttribute("id", category);
      classifier.innerHTML = category.replaceAll("_", " ");
      classifier.addEventListener("click", function () {
        filterBasedOnCategory(category);
        showActive(category);
      });
      classificationSection.append(classifier);
    });
    let classifierArr = classificationSection.querySelectorAll("a");
    classifierArr[0].setAttribute("class", "active"); //Setting active to "ALL"
    function showActive(category) {
      classifierArr.forEach((classifier) => {
        if (classifier.getAttribute("id") == category) {
          classifier.setAttribute("class", "active");
        } else {
          classifier.setAttribute("class", "");
        }
      });
    }
    data.records.forEach((project) => {
      if (project.fields.Title) {
        //check if project exists
        if (project.fields.Thumbnail) {
          let thumbnail = document.createElement("div");
          let img = document.createElement("img");
          let p = document.createElement("p");
          p.innerHTML = project.fields.Title.replaceAll("_", " ");
          img.setAttribute("src", project.fields.Thumbnail[0].url);
          thumbnail.className = `${project.fields.Classification} thumbnail`;
          thumbnail.append(img);
          thumbnail.append(p);
          img.addEventListener("mouseover", function () {
            const randomRotate = (Math.random() - 0.5) * 20; // Random value between -10 and 10
            img.style.transform = `rotate(${randomRotate}deg)`;
          });

          img.addEventListener("mouseout", function () {
            img.style.transform = "rotate(0deg)"; // Reset rotation on mouse out
          });
          thumbnail.addEventListener("click", () => {
            projectPopUp.style.display = "flex";
            addProjectToPopUp(project, projectPopUp);
            document
              .querySelector("#content")
              .addEventListener("click", function (e) {
                if (e.target.tagName == "IMG" || e.target.tagName == "A") {
                  return;
                }
                projectPopUp.style.display = "none";
                // sketchbookSection.style.display = "block";
                thumbnailSection.style.display = "grid";
                classificationSection.style.display = "flex";
              });

            document
              .querySelector("#close")
              .addEventListener("click", function (e) {
                console.log("clicko");
                projectPopUp.style.display = "none";
                // sketchbookSection.style.display = "block";
                thumbnailSection.style.display = "grid";
                classificationSection.style.display = "flex";
              });
          });
          thumbnailSection.append(thumbnail);
        }
      }
    });
    allThumbnails = document.querySelectorAll(".thumbnail");
  })
  .catch((error) => {
    console.error("Error:", error);
  });

function getUniqueClassifications(data) {
  const classifications = data.map((item) => item.fields.Classification);
  const uniqueClassifications = [...new Set(classifications)];
  return uniqueClassifications;
}

function filterBasedOnCategory(category) {
  if (category == allProjectsString) {
    allThumbnails.forEach((thumbnail) => {
      thumbnail.style.display = "block";
    });
  } else {
    allThumbnails.forEach((thumbnail) => {
      if (thumbnail.classList.contains(category)) {
        thumbnail.style.display = "block";
      } else {
        thumbnail.style.display = "none";
      }
    });
  }
}

function addProjectToPopUp(project, projectPopUp) {
  // sketchbookSection.style.display = "none";
  thumbnailSection.style.display = "none";
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  projectPopUp.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  // projectPopUp.scrollIntoView({ top: 0, behavior: "smooth" }); //scroll to top

  //Classification + year
  let categ = projectPopUp.querySelector("#category");
  let year = projectPopUp.querySelector("#year");
  category.innerHTML = project.fields.Classification.replaceAll("_", " ");
  year.innerHTML = project.fields.Year;

  //Title
  projectPopUp.querySelector("#title").innerHTML = project.fields.Title;

  //Collaborators
  let collaboratorDiv = projectPopUp.querySelector("#collaborators");
  showCollaborators(project, collaboratorDiv);

  //Links
  let linkDiv = projectPopUp.querySelector("#linkDiv");
  showLinks(project.fields.Links, linkDiv);

  //Biref --- used to make description full lenght ---
  project.fields.Links || project.fields.Collaborators
    ? (projectPopUp.querySelector("#brief").style.display = "flex")
    : (projectPopUp.querySelector("#brief").style.display = "none");

  //Description
  projectPopUp.querySelector("#projectText").innerHTML =
    project.fields.Description;

  //Images
  showImgs(project);

  //Resources
  let resourceDiv = projectPopUp.querySelector("#resourcesDiv");
  let checker = showLinks(project.fields.Resources, resourceDiv);
  showTitle(projectPopUp.querySelector("#resourceTitle"), checker);
}

function showCollaborators(project, div) {
  // div.replaceChildren();
  let tempDiv = div.querySelector("div");
  if (tempDiv) tempDiv.remove();
  if (project.fields.Collaborators) {
    div.style.display = "flex";
    childDiv = document.createElement("div");
    collabArray = JSON.parse(project.fields.Collaborators);
    collabArray.forEach((element) => {
      a = document.createElement("a");
      h4 = document.createElement("h4"); //to maintain styling of text
      a.innerHTML += element.name;
      h4.append(a);
      if (element.url) {
        a.href = element.url;
      }
      childDiv.append(h4);
    });
    div.append(childDiv);
  } else div.style.display = "none";
}

function showImgs(project) {
  if (project.fields.Images) {
    grid.replaceChildren();
    project.fields.Images.forEach((img, index) => {
      //image loop
      let containDiv = document.createElement("div");
      let imgDiv = document.createElement("img");
      let textDiv = document.createElement("h5");
      containDiv.setAttribute("class", "gridContainer");
      imgDiv.setAttribute("src", img.url);
      imgDiv.setAttribute("class", "gridImg");
      textDiv.innerHTML = img.filename;
      imgDiv.setAttribute("alt", textDiv.innerHTML);
      textDiv.setAttribute("class", "gridCaption");
      containDiv.append(imgDiv, textDiv);
      if (index === 0) {
        containDiv.classList.add("firstImg");
      }
      grid.append(containDiv);
      containDiv.addEventListener("click", function () {
        //zoom function
        photoContainer.style.display = "flex";
        photoCloseup.setAttribute("src", img.url);
        photoCloseupCaption.innerHTML = img.filename;
      });
    });
  } else grid.style.display = "none";
}

//when zoomed in
photoContainer.addEventListener("click", function () {
  photoContainer.style.display = "none";
});

//Showing a series of links
function showLinks(projectType, linkDiv) {
  linkDiv.replaceChildren();
  if (projectType) {
    linkDiv.style.display = "flex";
    linkArray = JSON.parse(projectType);
    linkArray.forEach((element) => {
      a = document.createElement("a");
      a.innerHTML += element.display_name;
      a.innerHTML += " &#8599";
      if (element.url) {
        a.href = element.url;
      }
      linkDiv.append(a);
    });
    return true;
  } else {
    linkDiv.style.display = "none";
    return false;
  }
}

function showTitle(title, value) {
  value ? (title.style.display = "block") : (title.style.display = "none");
}

//JUMP TO

// for (const link of jumpToLinks) {
//   link.addEventListener("click", function (event) {
//     event.preventDefault();

//     const targetId = this.getAttribute("href").substring(1);
//     const targetElement = document.getElementById(targetId);

//     if (targetElement) {
//       window.scrollTo({
//         top: targetElement.offsetTop - 100,
//         behavior: "smooth",
//       });
//     }
//   });
// }
