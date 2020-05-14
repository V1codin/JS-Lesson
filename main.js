var controls = {
  box: document.querySelector(".box"),
  select: document.querySelector(".select"),
  input: document.querySelector(".inp"),
  invalidPoint: [],
  newDiv: document.createElement("p"),

  // =============================
  /*
  comparing: function (str, arr) {
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
  },
  */
};

function renderWarning(parent, child, warningText) {
  child.innerText = warningText;
  child = parent.insertBefore(child, parent.firstElementChild);
}

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

function onlyNums(event) {
  if (event.data !== null) {
    if (event.data.charCodeAt() < 48 || event.data.charCodeAt() > 57) {
      renderWarning(
        controls.box,
        controls.newDiv,
        controls.select[controls.select.selectedIndex].innerText
      );
      controls.invalidPoint.push(event.data);
      controls.input.classList.add("error");
    }
    if (controls.invalidPoint.length) {
      var checker = comparing(controls.input.value, controls.invalidPoint);
      if (!checker) {
        controls.input.classList.remove("error");
        controls.invalidPoint.length = 0;
        controls.box.removeChild(controls.newDiv);
      }
    }
  }
}

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
        controls.select[controls.select.selectedIndex].innerText
      );
      controls.invalidPoint.push(event.data);
      controls.input.classList.add("error");
    }
    if (controls.invalidPoint.length) {
      var checker = comparing(controls.input.value, controls.invalidPoint);
      if (!checker) {
        controls.input.classList.remove("error");
        controls.invalidPoint.length = 0;
        controls.box.removeChild(controls.newDiv);
      }
    }
  }
}

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
        controls.select[controls.select.selectedIndex].innerText
      );
      controls.invalidPoint.push(event.data);
      controls.input.classList.add("error");
    }
    if (controls.invalidPoint.length) {
      var checker = comparing(controls.input.value, controls.invalidPoint);
      if (!checker) {
        controls.input.classList.remove("error");
        controls.invalidPoint.length = 0;
        controls.box.removeChild(controls.newDiv);
      }
    }
  }
}

controls.select.onchange = () => {
  console.log(controls.select.selectedIndex);

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
