var controls = {
  checkbox: document.querySelectorAll(".checkbox"),
};

controls.checkbox.forEach(
  (item) => ((item.check = false), (item.onclick = init))
);

function init() {
  var leftPart = document.createElement("div");
  var rightPart = document.createElement("div");
  if (!this.check) {
    this.check = true;
    leftPart.className = "left-part";
    checkbox = this.appendChild(leftPart);

    checkbox = this.appendChild(rightPart);
    rightPart.className = "right-part";
  } else {
    this.innerHTML = null;
    this.check = false;
  }
}
