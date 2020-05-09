var controls = {
  checkbox: document.querySelectorAll(".checkbox"),
};

controls.checkbox.forEach((item) => (item.check = false));

controls.checkbox.forEach(
  (item) =>
    (item.onclick = () => {
      var leftPart = document.createElement("div");
      var rightPart = document.createElement("div");
      if (!item.check) {
        item.check = true;
        leftPart.className = "left-part";
        checkbox = item.appendChild(leftPart);

        checkbox = item.appendChild(rightPart);
        rightPart.className = "right-part";
      } else {
        item.innerHTML = null;
        item.check = false;
      }
    })
);
