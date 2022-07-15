// airtable api created using curl
// reference: https://reqbin.com/req/c-1n4ljxb9/curl-get-request-example
let indexContainer = document.querySelector("#projectIndex");
let previousArrow = document.querySelector("#previous");
let nextArrow = document.querySelector("#next");
let landingImg = document.querySelector("#landingImg");
let title = document.querySelector("#title");
let year = document.querySelector("#year");
let prjType = document.querySelector("#prjType");
let creatorsContainer = document.querySelector("#creatorsContainer");
let creators = document.querySelector("#creators");
let rolesContainer = document.querySelector("#rolesContainer");
let roles = document.querySelector("#roles");
let link = document.querySelector("#link");
let desc = document.querySelector("#desc");
let imgDivContainer = document.querySelector("#processImgContainer");
let vidDivSection = document.querySelector("#processVidContainer");
let vidDivContainer = document.querySelector("#vid");

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
    result = JSON.parse(xhr.responseText);
    console.log(result);
    result.records.forEach((element) => {
      displayData(result.records[result.records.length - 1].fields.Title); //Initial display
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
      function displayData(searchTitle) {
        if (searchTitle == element.fields.Title) {
          if (element.fields.Feature) {
            landingImg.style.display = "block";
            landingImg.setAttribute("src", element.fields.Feature[0].url);
          } else landingImg.style.display = "none";
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

          imgDivContainer.replaceChildren(); //clear div
          if (element.fields.Images) {
            element.fields.Images.forEach((img) => {
              //image loop
              imgDivContainer.style.display = "flex";
              let imgDiv = document.createElement("img");
              imgDiv.setAttribute("class", "processImg");
              imgDiv.setAttribute("src", img.url);
              imgDivContainer.append(imgDiv);
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
// //click arrow keys to change content
// previousArrow.addEventListener("click", function () {
//   console.log(projectTitleArray, searchTitle);
//   for (let index = 0; index < projectTitleArray.length; index++) {
//     if (projectTitleArray[index] == searchTitle) {
//       if ((index = 0)) searchIndex = projectTitleArray.length - 1;
//       else searchIndex = index--;
//       searchTitle = projectTitleArray[searchIndex];
//       console.log(searchTitle);
//     }
//   }
//   // console.log(searchTitle);
//   // display()
// });

xhr.send();
