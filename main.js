var controls = {
  select: document.querySelector(".select"),
  input: document.querySelector(".inp"),
};

controls.select.onchange = () => {
  console.dir(controls.select[controls.select.selectedIndex].innerText);
  console.log(controls.select.selectedIndex);
  switch (controls.select.value) {
    case "every":
      var s = "s";
  }
};

controls.input.oninput = (event) => {
  var invalidPoint = "";

  console.log(event.data);

  if (
    (event.data !== null && event.data.charCodeAt() < 65) ||
    (event.data.charCodeAt() > 122 && event.data.charCodeAt() < 1040) ||
    event.data.charCodeAt() > 1111
  ) {
    invalidPoint += event.data;
    alert(
      `You can input ${
        controls.select[controls.select.selectedIndex].innerText
      }`
    );
  }

  if (controls.input.value.includes(invalidPoint) && invalidPoint !== "") {
    controls.input.classList.add("error");
  } else {
    controls.input.classList.remove("error");
  }
  console.log("invalidPoint: ", invalidPoint);
  console.log("value", controls.input.value);
};

function onlyLetters(str) {
  var nStr = "";
  for (char of str) {
    if (
      (char.charCodeAt() >= 65 && char.charCodeAt() <= 122) ||
      (char.charCodeAt() >= 1040 && char.charCodeAt() <= 1100)
    ) {
      nStr += char;
    } else {
      continue;
    }
  }
  return nStr;
}
