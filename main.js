var controls = {
  select: document.querySelector(".select"),
  input: document.querySelector(".inp"),
};

var inpV = controls.input.value;

controls.select.onchange = () => {
  switch (controls.select.value) {
    case "every":
      console.log("check");
  }
};

controls.input.onkeypress = (event) => {
  console.log(event.key.charCodeAt());
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
