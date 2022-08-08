// let resumeDownloadBtn = document.querySelector("#resumeDownload");
// resumeDownloadBtn.addEventListener("click", function () {
//   console.log("clicked");
//   getPDF();
// });
const options = {
  margin: 0,
  filename: "resume.pdf",
  // image: {
  //   type: "png",
  //   quality: 1000,
  // },
  html2canvas: {
    scale: 1,
  },
  jsPDF: {
    unit: "in",
    format: "letter",
    orientation: "portrait",
  },
};
$("#resumeDownload").click(function (e) {
  e.preventDefault();
  const element = document.querySelector("#divToDownload");
  html2pdf().from(element).set(options).save();
});
function printDiv(divName) {
  var printContents = document.getElementById(divName).innerHTML;
  var originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;

  window.print();

  document.body.innerHTML = originalContents;
}
