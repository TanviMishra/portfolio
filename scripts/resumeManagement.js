let bioInfo = document.querySelector("#bioInfo");
let bioContact = document.querySelector("#bioContact");
let bioPortfolioLink = document.querySelector("#bioPortfolioLink");
let skillsDiv = document.querySelector("#skills");
let honoursDiv = document.querySelector("#honours");
let linksDiv = document.querySelector("#links");
let expSection = document.querySelector("#expSection");
let eduSection = document.querySelector("#eduSection");
let skillCount = 0;
let langCount = 0;
var url = "https://api.airtable.com/v0/appLyBqfz6jajKyYp/Resume";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("Authorization", "Bearer keyOlZZOM1rKlBM3I");
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    result = JSON.parse(xhr.responseText); //formatting as json
    result.records.sort(
      (a, b) => parseFloat(a.fields.Sr) - parseFloat(b.fields.Sr)
    ); //sorting the array in ascending order according to sr. no
    result.records.forEach((element) => {
      //bio information
      if (element.fields.Category == "Bio" && element.fields.Sr > 0) {
        bioInfo.innerHTML = element.fields.Description;
        let contactArray = element.fields.Contact.split("\n"); //splitting all the sentences
        // console.log(contactArray);
        contactArray.forEach((line) => {
          let bioLines = document.createElement("h4");
          // bioLines.setAttribute("class", "centerText");
          bioLines.innerHTML = line;
          bioContact.append(bioLines);
        });
        bioPortfolioLink.innerHTML = element.fields.Portfolio;
        bioPortfolioLink.setAttribute("src", element.fields.Portfolio);
        // bioPortfolioLink.setAttribute("src", "https://www.netflix.com/browse"); //just a test
      }
      //software skills section
      if (element.fields.Category == "Skills" && element.fields.Sr > 0) {
        let skill = document.createElement("h4");
        skillCount % 2 == 0 //aligning to left or right
          ? (skill.style.textAlign = "left")
          : (skill.style.textAlign = "right");
        skillCount++;
        skill.innerHTML = element.fields.JobTitle;
        skillsDiv.append(skill);
      }
      // //programming skills section
      // if (
      //   element.fields.Category == "ProgrammingLanguage" &&
      //   element.fields.Sr > 0
      // ) {
      //   let language = document.createElement("h4");
      //   language.innerHTML = element.fields.JobTitle;
      //   langCount % 2 == 0 //aligning to left or right
      //     ? (language.style.textAlign = "left")
      //     : (language.style.textAlign = "right");
      //   langCount++;
      //   programmingDiv.append(language);
      // }
      //honours section
      if (element.fields.Category == "Honours" && element.fields.Sr > 0) {
        let honours = document.createElement("li");
        honours.innerHTML = element.fields.Description;
        honours.innerHTML += "|\xa0";
        honours.innerHTML += element.fields.Time;
        honoursDiv.append(honours);
      }
      //links section
      if (element.fields.Category == "Links" && element.fields.Sr > 0) {
        // console.log(element.fields);
        let logoDiv = document.createElement("div");
        logoDiv.setAttribute("class", "linkContain");
        let link = document.createElement("a");
        link.setAttribute("class", "linksText");
        // let linkImg = document.createElement("img");
        // linkImg.setAttribute("class", "linkImg");
        // linkImg.setAttribute("src", element.fields.Logo[0].url);
        link.href = element.fields.Description;
        link.innerHTML = element.fields.Description;
        logoDiv.append(link); //if you want to include img, uncomment linkImg lines and change this line to logoDiv.append(linkImg, link) + change .linksText in CSS
        linksDiv.append(logoDiv);
      }
      //experience section
      if (element.fields.Category == "Experience" && element.fields.Sr > 0) {
        expectationFill(
          element.fields.JobTitle,
          element.fields.Location,
          element.fields.Time,
          element.fields.Role,
          element.fields.Description
        );
      }
      //education section
      if (element.fields.Category == "Education" && element.fields.Sr > 0) {
        educationFill(
          element.fields.JobTitle,
          element.fields.Location,
          element.fields.Degree,
          element.fields.GPA,
          element.fields.Time
        );
      }
    });
  }
  function expectationFill(titleText, locText, timeText, roleText, descText) {
    let container = document.createElement("div");
    container.setAttribute("class", "expContainer");

    let title = document.createElement("h2");
    title.setAttribute("class", "expTitle");
    title.innerHTML = titleText;

    let smolContain = document.createElement("div");
    smolContain.setAttribute("class", "smolContainer");

    let info = document.createElement("h5");
    info.setAttribute("class", "expInfo");
    info.innerHTML = locText;
    info.innerHTML += "\xa0|\xa0";
    info.innerHTML += timeText;

    let role = document.createElement("h3");
    role.setAttribute("class", "expRole");
    role.innerHTML = roleText;

    let desc = document.createElement("ul");
    let descArray = descText.split("-");
    descArray.forEach((lines) => {
      if (lines) {
        let descLines = document.createElement("li");
        descLines.innerHTML = lines;
        desc.append(descLines);
      }
    });
    // console.log(descArray);
    desc.setAttribute("class", "expDescription");

    smolContain.append(info, role, desc);
    container.append(title, smolContain);
    expSection.append(container);
  }
  function educationFill(titleText, locText, degreeText, GPA, timeText) {
    let container = document.createElement("div");
    container.setAttribute("class", "eduContainer");

    let title = document.createElement("h2");
    title.setAttribute("class", "eduTitle");
    title.innerHTML = titleText;

    let smolContain = document.createElement("div");
    smolContain.setAttribute("class", "smolContainer");

    let loc = document.createElement("h5");
    loc.setAttribute("class", "eduInfo");
    loc.innerHTML = locText;

    let degree = document.createElement("h3");
    degree.setAttribute("class", "eduDegree");
    degree.innerHTML = degreeText;

    let gpa = document.createElement("h4");
    gpa.setAttribute("class", "eduGPA");
    gpa.innerHTML = GPA;

    let time = document.createElement("h4");
    time.setAttribute("class", "timeText");
    time.innerHTML = timeText;

    smolContain.append(loc, degree, gpa, time);
    container.append(title, smolContain);
    eduSection.append(container);
  }
};
xhr.send();
