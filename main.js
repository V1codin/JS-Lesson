var controls = {
  checkbox: document.querySelectorAll(".checkbox"),
};

controls.checkbox.forEach(
  (item) => ((item.check = false), (item.onclick = init))
);

function init() {
  if (!this.check) {
    this.classList.add("turnedOn");
    this.check = true;
  } else {
    this.classList.remove("turnedOn");
    this.check = false;
  }
}
