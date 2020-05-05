var out = document.getElementById("out");
var newBlock = document.getElementById("newBlock");

var select = document.getElementById("select");

var blocks = {
  privat: document.getElementById("privat"),
  mono: document.getElementById("mono"),
  pump: document.getElementById("pumb"),
};
var textBlock = document.querySelector(".textBlock");

select.onchange = function () {
  if (select.value === "none") {
    out.style = "display: none";
    out.innerHTML = null;
  } else {
    out.style = "display: block";
    out.innerHTML = blocks[select.value].innerHTML;
  }
};
