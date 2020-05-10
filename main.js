var controls = {
  checkbox: document.querySelectorAll(".checkbox"),
};

controls.checkbox.forEach(
  (item) => ((item.check = false), (item.onclick = init))
);

/**
 * Adding or removing class to checked/unchecked checkbox
 */
function init() {
  if (!this.check) {
    this.classList.add("turnedOn");
    this.check = true;
  } else {
    this.classList.remove("turnedOn");
    this.check = false;
  }
}
