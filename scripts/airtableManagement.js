//airtable api created using nocodeapi. Airtable rest api unsuccessful
//Reference -> https://nocodeapi.com/airtable-api
//my nocodeapi -> https://app.nocodeapi.com/dashboard/api/airtable
let landingImg = document.querySelector("#landingImg");
let title = document.querySelector("#title");
let year = document.querySelector("#year");
let prjType = document.querySelector("#prjType");
let creators = document.querySelector("#creators");
let roles = document.querySelector("#roles");
let link = document.querySelector("#link");
let desc = document.querySelector("#desc");
let imgDivContainer = document.querySelector("#processImgContainer");
let vidDivContainer = document.querySelector("#vid");

let searchTitle = "Sheer Contact";
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
var requestOptions = {
  method: "get",
  headers: myHeaders,
  redirect: "follow",
};

fetch(
  "https://v1.nocodeapi.com/podi/airtable/KApjXHHcQbGEPwvu?tableName=test",
  requestOptions
)
  .then((response) => response.json())
  .then((result) => {
    console.log(result.records);
    result.records.forEach((element) => {
      if (searchTitle == element.fields.Title) {
        landingImg.setAttribute("src", element.fields.Feature[0].url);
        let titleText = element.fields.Title;
        let classifyText = element.fields.Classification;
        let yearText = element.fields.Year;
        let prjTypeText = element.fields.Type;
        let creatorsText = element.fields.Creators;
        let rolesText = element.fields.Roles;
        let linkText = element.fields.Link;
        let descText = element.fields.Description;
        title.innerHTML = titleText; //initial descpription
        year.innerHTML += classifyText + " | ";
        year.innerHTML += yearText;
        prjType.innerHTML = prjTypeText;
        creators.innerHTML += creatorsText;
        roles.innerHTML += rolesText;
        link.href = linkText;
        desc.innerHTML += descText;
        element.fields.Images.forEach((img) => {
          //image loop
          let imgDiv = document.createElement("img");
          imgDiv.setAttribute("class", "processImg");
          imgDiv.setAttribute("src", img.url);
          imgDivContainer.append(imgDiv);
        });
        element.fields.Video.forEach((vid) => {
          //video loop
          let vidDiv = document.createElement("VIDEO");
          vidDiv.setAttribute("class", "processVid");
          vidDiv.setAttribute("src", vid.url);
          vidDiv.setAttribute("width", "100%");
          vidDiv.setAttribute("height", "100%");
          vidDiv.setAttribute("controls", "controls");
          vidDivContainer.append(vidDiv);
        });
      }
    });
  })
  .catch((error) => console.log("error", error));
