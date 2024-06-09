// airtable api created using curl

// const { profileEnd } = require("console");

// reference: https://reqbin.com/req/c-1n4ljxb9/curl-get-request-example
let indexContainer = document.querySelector("#projectIndex");
let thumbnails = document.querySelector("#thumbnails"); //all thumbnails for project menu
let previousArrow = document.querySelector("#previous");
let nextArrow = document.querySelector("#next");
// let landingImg = document.querySelector("#landingImg");
let title = document.querySelector("#title");
let year = document.querySelector("#year");
let creatorsContainer = document.querySelector("#creatorsContainer");
let collaborators = document.querySelector("#collaborators");
let rolesContainer = document.querySelector("#rolesContainer");
let roles = document.querySelector("#roles");
let linkDiv = document.querySelector("#linkDiv");
let desc = document.querySelector("#desc");
let workingSection = document.querySelector("#workingContainerSection");
let finalImgSection = document.querySelector("#finalImgSection");
let finalImgSectionSlider = finalImgSection.querySelector(".slider");
let imgDivContainer = document.querySelector("#processImgContainer");
let mainImgContainer = document.querySelector("#mainImgContainer");
let vidDivSection = document.querySelector("#processVidContainer");
let vidDivContainer = document.querySelector("#vid");
let photoContainer = document.querySelector("#photoCloseupContainer"); // for zooming in photo
let photoCloseupCaption = document.querySelector("#photoCloseupCaption");
let photoCloseup = document.querySelector("#photoCloseup");
let blocks = document.querySelector("section.shapes"); //blocks container //to display on menu and hide during project page
let searchTitle = "Sheer Contact";
let projectTitleArray = [];
let currentIndex = 0;
let jumpMenu = document.querySelector("#jumpMenu");
let jumpToLinks = jumpMenu.querySelectorAll(".jump-to");

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
var requestOptions = {
  method: "get",
  headers: myHeaders,
  redirect: "follow",
};

// var url = "https://api.airtable.com/v0/appLyBqfz6jajKyYp/test";
var url = "https://api.airtable.com/v0/appTswHNd33pu10tU/Projects";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

//xhr.setRequestHeader("Authorization", "Bearer keyOlZZOM1rKlBM3I"); //OLD KEY

xhr.setRequestHeader(
  "Authorization",
  "Bearer patEeZsSkvjGxhnVx.56107ba087170f893f8386c09cbdb56bac14a97b3cd8823ff8dd21fb11db6344"
);

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      result = JSON.parse(xhr.responseText); //formatting as json
      // console.log(result.records);
      result.records.sort(
        (a, b) => parseFloat(a.fields.Sr) - parseFloat(b.fields.Sr)
      ); //sorting the array in ascending order according to sr. no //check URL and display appropriate project

      result.records.forEach((element) => {
        if (window.location.href.split("#")[1]) {
          let projectURL = window.location.href.split("#")[1];
          let projectTitle = projectURL.replace(/_/g, " "); //reformatting URL by removing underscores
          if (projectTitle == element.fields.Title) {
            displayProject(projectTitle, element);
            //   console.log(document.querySelectorAll(".fakeLink"));
          }
        } else {
          displayProject(result.records[0].fields.Title, element);
          // displayMenu(element); //Initial display of the thumbnails
        }
        //project index
        let indexText = document.createElement("p");
        projectTitleArray.push(element.fields.Title);
        indexText.innerHTML = element.fields.Title;
        indexText.classList.add("fakeLink");
        //click index text to change page content
        indexText.addEventListener("click", function () {
          displayProject(indexText.innerHTML, element);
        });
        // let indexBreak = document.createElement("p"); //just creating a " | ""
        // indexBreak.innerHTML = "\xa0|\xa0"; //\xa0 is court mandated blank space
        indexContainer.append(indexText);
        // indexContainer.append(indexBreak);
      });
    }
  };
});
xhr.send();
//when zoomed in
photoContainer.addEventListener("click", function () {
  photoContainer.style.display = "none";
});
//function to display everything in content side
//content side - main menu
function displayMenu(element) {
  thumbnails.style.display = "flex";
  projectPage.style.display = "none";
  if (element.fields.Feature) {
    let containerDiv = document.createElement("div");
    containerDiv.setAttribute("class", "thumbnail-wrapper");
    let imgDiv = document.createElement("div");
    imgDiv.setAttribute("class", "thumbnail-img-wrapper");
    let img = document.createElement("img");
    img.setAttribute("class", "thumbnail-img");
    img.setAttribute("src", element.fields.Feature[0].url);
    let textDiv = document.createElement("div");
    textDiv.setAttribute("class", "thumbnail-text");
    let title = document.createElement("h3");
    title.innerHTML = element.fields.Title;
    title.style.textTransform = "uppercase";
    let classify = document.createElement("h4");
    classify.innerHTML = element.fields.Classification + " | ";
    classify.innerHTML += element.fields.Year;
    textDiv.append(title, classify); //layer 1
    imgDiv.append(img); //layer 1
    containerDiv.append(imgDiv, textDiv); //layer 2
    thumbnails.append(containerDiv); //layer 3
    containerDiv.addEventListener("click", function () {
      displayProject(element.fields.Title, element); //click to go to project
    });
  }
}
//content side - display project
function displayProject(searchTitle, element) {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  thumbnails.style.display = "none";
  currentIndex = 0;
  showSlide(currentIndex);
  // console.log(searchTitle, " restart index: " + currentIndex);
  projectPage.style.display = "flex";

  if (searchTitle == element.fields.Title) {
    //Compulsory feilds
    let titleText = element.fields.Title;
    let classifyText = element.fields.Classification;
    let yearText = element.fields.Year;
    let descText = element.fields.Description;
    title.innerHTML = titleText; //initial descpription
    year.innerHTML = classifyText + " | "; //combines two feilds [classifyText & yearText]
    year.innerHTML += yearText;
    desc.innerHTML = descText;

    //Optional feilds
    //LINK
    linkDiv.replaceChildren();
    if (element.fields.Links) {
      linkDiv.style.display = "flex";
      linkArray = JSON.parse(element.fields.Links);
      linkArray.forEach((element) => {
        a = document.createElement("a");
        // h4 = document.createElement("h4"); //to maintain styling of text
        a.innerHTML += element.display_name;
        a.innerHTML += " &#8599";
        // h4.append(a);
        if (element.url) {
          a.href = element.url;
        }
        linkDiv.append(a);
      });
    } else linkDiv.style.display = "none";

    collaborators.replaceChildren();
    if (element.fields.Collaborators) {
      creatorsContainer.style.display = "flex";
      collabArray = JSON.parse(element.fields.Collaborators);
      collabArray.forEach((element) => {
        a = document.createElement("a");
        h4 = document.createElement("h4"); //to maintain styling of text
        a.innerHTML += element.name;
        h4.append(a);
        if (element.url) {
          a.href = element.url;
        }
        collaborators.append(h4);
      });
    } else creatorsContainer.style.display = "none";

    if (element.fields.Roles) {
      rolesContainer.style.display = "flex";
      let rolesText = element.fields.Roles;
      roles.innerHTML = rolesText;
    } else rolesContainer.style.display = "none";

    workingSection.replaceChildren(); //clear div
    if (element.fields.SplashImages) {
      workingSection.style.display = "block";
      element.fields.SplashImages.forEach((img) => {
        //image loop
        let containDiv = document.createElement("div");
        let imgDiv = document.createElement("img");
        let textDiv = document.createElement("h4");
        containDiv.setAttribute("class", "workingContainer");
        imgDiv.setAttribute("src", img.url);
        imgDiv.setAttribute("class", "workingImg");
        textDiv.innerHTML = img.filename;
        imgDiv.setAttribute("alt", textDiv.innerHTML);
        textDiv.setAttribute("class", "workingCaption");
        containDiv.append(imgDiv, textDiv);
        workingSection.append(containDiv);
        imgDiv.addEventListener("click", function () {
          //zoom function
          photoContainer.style.display = "flex";
          photoCloseup.setAttribute("src", img.url);
          photoCloseupCaption.innerHTML = img.filename;
        });
      });
    } else workingSection.style.display = "none";

    finalImgSectionSlider.replaceChildren(); //clear div
    if (element.fields.FinalImages) {
      jumpMenu.querySelector("#final").style.display = "block";
      finalImgSection.style.display = "flex";
      // currentIndex = 0;
      element.fields.FinalImages.forEach((img) => {
        //image loop
        let containDiv = document.createElement("div");
        let imgDiv = document.createElement("img");
        let textDiv = document.createElement("h5");
        containDiv.setAttribute("class", "slide");
        imgDiv.setAttribute("src", img.url);
        imgDiv.setAttribute("class", "slideImg");
        textDiv.innerHTML = img.filename;
        imgDiv.setAttribute("alt", textDiv.innerHTML);
        textDiv.setAttribute("class", "slideCaption");
        containDiv.append(imgDiv, textDiv);
        finalImgSectionSlider.append(containDiv);
        imgDiv.addEventListener("click", function () {
          //zoom function
          photoContainer.style.display = "flex";
          photoCloseup.setAttribute("src", img.url);
          photoCloseupCaption.innerHTML = img.filename;
        });
      });
      finalImgSection
        .querySelector("#prev")
        .addEventListener("click", function () {
          console.log("currentIndex: ", currentIndex);
          currentIndex = showSlide(currentIndex - 1);
          console.log("currentIndex: ", currentIndex);
        });
      finalImgSection
        .querySelector("#next")
        .addEventListener("click", function () {
          console.log("currentIndex: ", currentIndex);
          currentIndex = showSlide(currentIndex + 1);
          console.log("currentIndex: ", currentIndex);
        });

      //in case of single final image
      if (element.fields.FinalImages.length == 1) {
        finalImgSection.querySelector(".arrowContainer").style.display = "none";
        finalImgSection.querySelector("h3").innerText = "Final Image";
      } else {
        finalImgSection.querySelector(".arrowContainer").style.display = "flex";
        finalImgSection.querySelector("h3").innerText = "Final Images";
      }
    } else {
      jumpMenu.querySelector("#final").style.display = "none";
      finalImgSection.style.display = "none";
    }

    document.querySelector("#img_desc").innerHTML = ""; //clear p

    mainImgContainer.replaceChildren(); //clear div
    if (element.fields.WorkingImages1 || element.fields.WorkingImages2) {
      if (element.fields.WorkingGallery) {
        document.querySelector("#img_desc").innerHTML =
          element.fields.WorkingGallery;
      }
      jumpMenu.querySelector("#imgs").style.display = "inline";
    } else jumpMenu.querySelector("#imgs").style.display = "inline";
    if (element.fields.WorkingImages1) {
      element.fields.WorkingImages1.forEach((img) => {
        //image loop
        mainImgContainer.style.display = "flex";
        let imgDiv = document.createElement("img");
        imgDiv.setAttribute("class", "mainImg");
        imgDiv.setAttribute("src", img.url);
        let textDiv = document.createElement("h5");
        textDiv.setAttribute("class", "mainImgCaption");
        textDiv.innerHTML = img.filename;
        imgDiv.setAttribute("alt", textDiv.innerHTML);
        mainImgContainer.append(imgDiv, textDiv);
        imgDiv.addEventListener("click", function () {
          //zoom function
          photoContainer.style.display = "flex";
          photoCloseup.setAttribute("src", img.url);
          photoCloseupCaption.innerHTML = img.filename;
        });
      });
    } else mainImgContainer.style.display = "none";

    imgDivContainer.replaceChildren(); //clear div
    if (element.fields.WorkingImages2) {
      element.fields.WorkingImages2.forEach((img) => {
        //image loop
        imgDivContainer.style.display = "flex";
        let imgDivWrapper = document.createElement("div");
        imgDivWrapper.setAttribute("class", "processImgWrapper");
        let imgDiv = document.createElement("img");
        imgDiv.setAttribute("class", "processImg");
        imgDiv.setAttribute("src", img.url);
        let textDiv = document.createElement("h5");
        textDiv.setAttribute("class", "processImgCaption");
        textDiv.innerHTML = img.filename;
        imgDiv.setAttribute("alt", textDiv.innerHTML);
        imgDivWrapper.append(imgDiv, textDiv);
        imgDivContainer.append(imgDivWrapper);
        imgDiv.addEventListener("click", function () {
          //zoom function
          photoContainer.style.display = "flex";
          photoCloseup.setAttribute("src", img.url);
          photoCloseupCaption.innerHTML = img.filename;
        });
      });
    } else imgDivContainer.style.display = "none";

    vidDivContainer.replaceChildren(); //clear div
    document.querySelector("#video_desc").innerHTML = ""; //clear p
    if (element.fields.Video) {
      if (element.fields.VideoDesc) {
        document.querySelector("#video_desc").innerHTML =
          element.fields.VideoDesc;
      }
      element.fields.Video.forEach((vid) => {
        jumpMenu.querySelector("#video").style.display = "inline";
        //video loop
        vidDivSection.style.display = "flex";
        let vidDiv = document.createElement("VIDEO");
        vidDiv.setAttribute("class", "processVid");
        vidDiv.setAttribute("src", vid.url);
        vidDiv.setAttribute("width", "100%");
        vidDiv.setAttribute("height", "100%");
        vidDiv.setAttribute("controls", "controls");
        vidDivContainer.append(vidDiv);
      });
    } else {
      jumpMenu.querySelector("#video").style.display = "none";
      vidDivSection.style.display = "none";
    }
  }
  // console.log(document.querySelectorAll(".fakeLink"));
  document.querySelectorAll(".fakeLink").forEach((div) => {
    div.classList.remove("fakeLinkActive"); // make sure the previous div does not have the active tag
    if (div.innerHTML == element.fields.Title) {
      div.classList.add("fakeLinkActive");
      // console.log("link found");
    }
  });
  updateURL(searchTitle);
}
//Add project title to the url
function updateURL(projectTitle) {
  let projectURL = projectTitle.replace(/ /g, "_"); //formatting URL by adding underscores
  let newUrl = window.location.href.split("#")[0] + "#" + projectURL;
  history.pushState(null, "", newUrl);
}

//SLIDE WORKING HERE
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
  finalImgSectionSlider.style.transform = `translateX(${offset}%)`;
  return newIndex;
}

//JUMP TO

for (const link of jumpToLinks) {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: "smooth",
      });
    }
  });
}
