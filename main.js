function ValidationData(selectClass, warningClass, inputClass) {
  this.select = document.querySelector(`.${selectClass}`);
  this.warning = document.querySelector(`.${warningClass}`);

  this.warningText = "Выберите тип ввода";

  this.input = document.querySelector(`.${inputClass}`);
  this.invalidPoint = [];

  this.everySign = `Разрешены только буквы, цифры, запятая и точка`;
  this.letters = `Разрешены только буквы`;
  this.numbers = `Разрешены только цифры`;

  // comparing every char of string with every element of array
  // {param} string;
  // {param} array;
  this.comparing = function (str, arr) {
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
  };

  // changing style of input of the object, erasing array with invalid chars and hidding warning notificaiton
  // {param} object;
  // {param} string;
  this.checking = function (value) {
    var checker = this.comparing(value, this.invalidPoint);
    if (!checker) {
      this.input.classList.remove("error");
      this.invalidPoint.length = 0;
      this.warning.style = "display: none";
    }
  };

  // creating new HTML element with warning notification
  // {param} object (HTML element);
  // {param} object (HTML element);
  // {param} string;
  this.renderWarning = function () {
    this.warning.style = "display: inline-block";
    this.warning.innerText = this[this.select.value];
  };

  // validation for numbers
  // {param} object;
  this.onlyNums = function (event) {
    if (event.data !== null) {
      if (event.data.charCodeAt() < 48 || event.data.charCodeAt() > 57) {
        this.renderWarning();
        this.invalidPoint.push(event.data);
        this.input.classList.add("error");
      }
      // checking if user corrected his data properly
      if (this.invalidPoint.length) {
        this.input.onkeyup = (event) => {
          if (event.key === "Backspace") {
            this.checking(this.input.value);
          }
        };
      }
    }
  };

  // validation for letters
  // {param} object;
  this.onlyLetters = function (event) {
    if (event.data !== null) {
      if (
        event.data.charCodeAt() < 65 ||
        (event.data.charCodeAt() > 122 && event.data.charCodeAt() < 1040) ||
        event.data.charCodeAt() > 1111 ||
        event.data.charCodeAt() === 96 ||
        event.data.charCodeAt() === 95
      ) {
        this.renderWarning();
        this.invalidPoint.push(event.data);
        this.input.classList.add("error");
      }
      // checking if user corrected his data properly
      if (this.invalidPoint.length) {
        this.input.onkeyup = (event) => {
          if (event.key === "Backspace") {
            this.checking(this.input.value);
          }
        };
      }
    }
  };

  // validation for letters, numbers, comma, dot
  // {param} object;
  this.every = function (event) {
    if (event.data !== null) {
      if (
        (event.data.charCodeAt() < 48 &&
          event.data.charCodeAt() !== 44 &&
          event.data.charCodeAt() !== 46) ||
        (event.data.charCodeAt() > 57 && event.data.charCodeAt() < 65) ||
        (event.data.charCodeAt() > 122 && event.data.charCodeAt() < 1040) ||
        event.data.charCodeAt() > 1111 ||
        event.data.charCodeAt() === 96 ||
        event.data.charCodeAt() === 95
      ) {
        this.renderWarning();
        this.invalidPoint.push(event.data);
        this.input.classList.add("error");
      }
      // checking if user corrected his data properly
      if (this.invalidPoint.length) {
        this.input.onkeyup = (event) => {
          if (event.key === "Backspace") {
            this.checking(this.input.value);
          }
        };
      }
    }
  };

  this.input.onblur = () => {
    this.warning.style = "display: none";
    this.input.classList.remove("error");
  };
  this.input.onfocus = () => {
    if (this.select.value === "disabled") {
      this.warning.innerText = this.warningText;
      this.warning.style = "display: inline-block";
      this.input.classList.add("error");
    }
  };

  // clearing innerTEXT of the warning
  this.clear = function () {
    this.warning.innerText = null;
  };

  this.select.onchange = () => {
    this.clear();
    switch (this.select.selectedIndex) {
      case 1:
        this.input.value = null;
        this.input.oninput = this.every.bind(this);
        break;
      case 2:
        this.input.value = null;
        this.input.oninput = this.onlyLetters.bind(this);
        break;
      case 3:
        this.input.value = null;
        this.input.oninput = this.onlyNums.bind(this);
        break;
    }
  };
}

new ValidationData("select", "warning", "inp");
