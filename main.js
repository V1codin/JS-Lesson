var controls = {
  box: document.querySelector(".box"),
  select: document.querySelector(".select"),
  input: document.querySelector(".inp"),
  invalidPoint: [],
  newDiv: document.createElement("p"),
  every: `Разрешены только буквы, цифры, запятая и точка`,
  letters: `Разрешены только буквы`,
  numbers: `Разрешены только цифры`,
};

// comparing every char of string with every element of array
// {param} string;
// {param} array;

function comparing(str, arr) {
  var check = 0;

  for (char of str) {
    for (item of arr) {
      if (char === item) {
        check++;
      }
    }
  }
  if (check > 0) {
    return true;
  } else {
    return false;
  }
}

// changing style of input of the object, erasing array with invalid chars and hidding warning notificaiton
// {param} object;
// {param} string;

function checking(obj, value) {
  var checker = comparing(value, obj.invalidPoint);
  if (!checker) {
    obj.input.classList.remove("error");
    obj.invalidPoint.length = 0;
    obj.newDiv.style = "display: none";
  }
}
// creating new HTML element with warning notification
// {param} object (HTML element);
// {param} object (HTML element);
// {param} string;

function renderWarning(parent, child, warningText) {
  child = parent.insertBefore(child, parent.firstElementChild);
  child.innerText = warningText;
  child.style = "display: inline-block";
}

// validation for numbers
// {param} object;

function onlyNums(event) {
  if (event.data !== null) {
    if (event.data.charCodeAt() < 48 || event.data.charCodeAt() > 57) {
      renderWarning(
        controls.box,
        controls.newDiv,
        controls[controls.select.value]
      );
      controls.invalidPoint.push(event.data);
      controls.input.classList.add("error");
    }
    if (controls.invalidPoint.length) {
      this.onkeyup = (event) => {
        if (event.key === "Backspace") {
          checking(controls, this.value);
        }
      };
    }
  }
}

// validation for letters
// {param} object;

function onlyLetters(event) {
  if (event.data !== null) {
    if (
      event.data.charCodeAt() < 65 ||
      (event.data.charCodeAt() > 122 && event.data.charCodeAt() < 1040) ||
      event.data.charCodeAt() > 1111
    ) {
      renderWarning(
        controls.box,
        controls.newDiv,
        controls[controls.select.value]
      );
      controls.invalidPoint.push(event.data);
      controls.input.classList.add("error");
    }
    if (controls.invalidPoint.length) {
      this.onkeyup = (event) => {
        if (event.key === "Backspace") {
          checking(controls, this.value);
        }
      };
    }
  }
}

// validation for letters, numbers, comma, dot
// {param} object;

function every(event) {
  if (event.data !== null) {
    if (
      (event.data.charCodeAt() < 48 &&
        event.data.charCodeAt() !== 44 &&
        event.data.charCodeAt() !== 46) ||
      (event.data.charCodeAt() > 57 && event.data.charCodeAt() < 65) ||
      (event.data.charCodeAt() > 122 && event.data.charCodeAt() < 1040) ||
      event.data.charCodeAt() > 1111
    ) {
      renderWarning(
        controls.box,
        controls.newDiv,
        controls[controls.select.value]
      );
      controls.invalidPoint.push(event.data);
      controls.input.classList.add("error");
    }
    if (controls.invalidPoint.length) {
      this.onkeyup = (event) => {
        if (event.key === "Backspace") {
          checking(controls, this.value);
        }
      };
    }
  }
}

controls.select.onchange = () => {
  switch (controls.select.selectedIndex) {
    case 1:
      controls.input.value = null;
      controls.input.oninput = every;
      break;
    case 2:
      controls.input.value = null;
      controls.input.oninput = onlyLetters;
      break;
    case 3:
      controls.input.value = null;
      controls.input.oninput = onlyNums;
      break;
  }
};
