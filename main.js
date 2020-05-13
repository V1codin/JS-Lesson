var controls = {
  box: document.querySelector(".box"),
  arrow: document.querySelectorAll(".arrow"),
};

controls.arrow.forEach((item) => {
  item.onclick = moving;
});

function moving() {
  var windowW = window.innerWidth;
  var windowH = window.innerHeight;

  if (this.id === "top") {
    controls.box.style.top = "0px";
  } else if (this.id === "bottom") {
    controls.box.style.top = `${windowH - controls.box.clientHeight}px`;
  } else if (this.id === "left") {
    controls.box.style.left = `${
      -(windowW / 2) + controls.box.clientHeight / 2
    }px`;
  } else if (this.id === "right") {
    controls.box.style.left = `${
      windowW / 2 - controls.box.clientHeight / 2
    }px`;
  }
}
