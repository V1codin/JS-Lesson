var controls = {
  userInput: document.querySelector("#usertext"),
  blockedInp: document.querySelector("#blockedInp"),
  readOnly: document.querySelector("#read"),
  numbers: document.querySelector("#numbers"),
  pass: document.querySelector("#pass"),
  checkers: document.querySelectorAll(".check"),
};

controls.blockedInp.onchange = () => {
  if (controls.blockedInp.checked) {
    controls.checkers.forEach((item) => (item.checked = false));
    controls.blockedInp.checked = true;
    controls.userInput.disabled = true;
  } else {
    controls.userInput.disabled = false;
  }
};

controls.readOnly.onchange = () => {
  if (controls.readOnly.checked) {
    controls.checkers.forEach((item) => (item.checked = false));
    controls.readOnly.checked = true;
    controls.userInput.readOnly = true;
  } else {
    controls.userInput.readOnly = false;
  }
};

controls.numbers.onchange = () => {
  if (controls.numbers.checked) {
    controls.checkers.forEach((item) => (item.checked = false));
    controls.numbers.checked = true;
    controls.userInput.type = "number";
  } else {
    controls.userInput.type = "text";
  }
};

controls.pass.onchange = () => {
  if (controls.pass.checked) {
    controls.checkers.forEach((item) => (item.checked = false));
    controls.pass.checked = true;
    controls.userInput.type = "password";
  } else {
    controls.userInput.type = "text";
  }
};
