var controls = {
  initBtn: document.querySelector("#arrow"),
  ul: document.querySelector("ul"),
};

controls.initBtn.onclick = function () {
  controls.initBtn.style = "transition: 1.5s; transform: rotate(180deg);";
  controls.ul.style = "display: block";
};
