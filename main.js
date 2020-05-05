var out = document.getElementById("out");

var select = document.getElementById("select");

var blocks = {
  privat: document.getElementById("privat"),
  mono: document.getElementById("mono"),
  pump: document.getElementById("pumb"),
};

select.onchange = function () {
  if (select.value === "none") {
    out.style = "display: none";
    out.innerHTML = null;
  } else {
    out.style = "display: block";
    out.innerHTML = blocks[select.value].innerHTML;
  }
};
