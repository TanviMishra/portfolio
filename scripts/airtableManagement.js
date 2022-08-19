// airtable api created using curl
// reference: https://reqbin.com/req/c-1n4ljxb9/curl-get-request-example
let indexContainer = document.querySelector("#projectIndex");
let thumbnails = document.querySelector("#thumbnails"); //all thumbnails for project menu
let previousArrow = document.querySelector("#previous");
let nextArrow = document.querySelector("#next");
// let landingImg = document.querySelector("#landingImg");
let title = document.querySelector("#title");
let year = document.querySelector("#year");
let prjType = document.querySelector("#prjType");
let creatorsContainer = document.querySelector("#creatorsContainer");
let creators = document.querySelector("#creators");
let rolesContainer = document.querySelector("#rolesContainer");
let roles = document.querySelector("#roles");
let link = document.querySelector("#link");
let desc = document.querySelector("#desc");
let workingSection = document.querySelector("#workingContainerSection");
// let workingContainer = document.querySelector(".workingContainer");
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
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
var requestOptions = {
  method: "get",
  headers: myHeaders,
  redirect: "follow",
};

var url = "https://api.airtable.com/v0/appLyBqfz6jajKyYp/test";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("Authorization", "Bearer keyOlZZOM1rKlBM3I");

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    result = JSON.parse(xhr.responseText); //formatting as json
    // console.log(result.records);
    result.records.sort(
      (a, b) => parseFloat(a.fields.Sr) - parseFloat(b.fields.Sr)
    ); //sorting the array in ascending order according to sr. no
    result.records.forEach((element) => {
      displayMenu(); //Initial display of the thumbnails
      //project index
      let indexText = document.createElement("h4");
      projectTitleArray.push(element.fields.Title);
      indexText.innerHTML = element.fields.Title;
      indexText.classList.add("fakeLink");
      //click index text to change page content
      indexText.addEventListener("click", function () {
        document.querySelectorAll(".fakeLink").forEach((div) => {
          div.classList.remove("fakeLinkActive"); // make sure the previous div does not have the active tag
        });
        indexText.classList.add("fakeLinkActive"); //selected div made active
        searchTitle = indexText.innerHTML;
        displayData(searchTitle);
      });
      let indexBreak = document.createElement("h4"); //just creating a " | ""
      indexBreak.innerHTML = "\xa0|\xa0"; //\xa0 is court mandated blank space
      indexContainer.append(indexText);
      indexContainer.append(indexBreak);

      //function to display everything in content side
      //content side - main menu
      function displayMenu() {
        thumbnails.style.display = "flex";
        projectPage.style.display = "none";
        blocks.style.display = "block";
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
            //click to go to project
            displayData(element.fields.Title);
            document.querySelectorAll(".fakeLink").forEach((div) => {
              div.classList.remove("fakeLinkActive"); // make sure the previous div does not have the active tag
              if (div.innerHTML == element.fields.Title) {
                div.classList.add("fakeLinkActive");
              }
            });
          });
        }
      }
      //content side - display project
      function displayData(searchTitle) {
        thumbnails.style.display = "none";
        projectPage.style.display = "block";
        blocks.style.display = "none";
        // landingImg.setAttribute("src", "#");
        if (searchTitle == element.fields.Title) {
          // if (element.fields.Feature) {
          //   landingImg.style.display = "block";
          //   landingImg.setAttribute("src", element.fields.Feature[0].url);
          // } else landingImg.style.display = "none";
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
          if (element.fields.Type) {
            prjType.style.display = "block";
            let prjTypeText = element.fields.Type;
            prjType.innerHTML = prjTypeText;
          } else prjType.style.display = "none";
          if (element.fields.Creators) {
            creatorsContainer.style.display = "flex";
            let creatorsText = element.fields.Creators; //To do: make them linkable
            creators.innerHTML = creatorsText;
          } else creatorsContainer.style.display = "none";
          if (element.fields.Creators) {
            rolesContainer.style.display = "flex";
            let rolesText = element.fields.Roles;
            roles.innerHTML = rolesText;
          } else rolesContainer.style.display = "none";
          if (element.fields.Link) {
            let linkText = element.fields.Link;
            link.style.display = "block";
            link.href = linkText;
          } else link.style.display = "none";

          workingSection.replaceChildren(); //clear div
          if (element.fields.GiantImages) {
            workingSection.style.display = "block";
            element.fields.GiantImages.forEach((img) => {
              //image loop
              console.log(img.url);
              let containDiv = document.createElement("div");
              let imgDiv = document.createElement("img");
              let textDiv = document.createElement("h4");
              containDiv.setAttribute("class", "workingContainer");
              imgDiv.setAttribute("src", img.url);
              imgDiv.setAttribute("class", "workingImg");
              textDiv.innerHTML = img.filename;
              textDiv.setAttribute("class", "workingCaption");
              containDiv.append(imgDiv, textDiv);
              workingSection.append(containDiv);
            });
          } else workingSection.style.display = "none";

          mainImgContainer.replaceChildren(); //clear div
          if (element.fields.BigImages) {
            element.fields.BigImages.forEach((img) => {
              //image loop
              mainImgContainer.style.display = "flex";
              let imgDiv = document.createElement("img");
              imgDiv.setAttribute("class", "mainImg");
              imgDiv.setAttribute("src", img.url);
              let textDiv = document.createElement("h5");
              textDiv.setAttribute("class", "mainImgCaption");
              textDiv.innerHTML = img.filename;
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
          if (element.fields.Images) {
            element.fields.Images.forEach((img) => {
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
          if (element.fields.Video) {
            element.fields.Video.forEach((vid) => {
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
          } else vidDivSection.style.display = "none";
        }
      }
    });
  }
};
xhr.send();
//when zoomed in
photoContainer.addEventListener("click", function () {
  photoContainer.style.display = "none";
});
