var controls = {
  initBtn: document.querySelector("#arrow"),
  ulContainer: document.querySelector(".list-container"),
  checker: false,
};

controls.initBtn.onclick = function () {
  if (!controls.checker) {
    controls.ulContainer.classList.remove("reverseAnimation");
    controls.ulContainer.classList.add("animated");
    this.classList.add("rotated");
    this.classList.remove("rotatedBack");
    this.style.marginTop = "calc(var(--margin-top) / 2)";
    controls.checker = true;
  } else {
    controls.ulContainer.classList.remove("animated");
    controls.ulContainer.classList.add("reverseAnimation");
    controls.checker = false;
    this.classList.remove("rotated");
    this.classList.add("rotatedBack");
    this.style.marginTop = "calc(var(--margin-top) * 2)";
  }
};
