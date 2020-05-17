var ctr = {
  form: document.querySelector(".form"),

  inputTyping: document.querySelectorAll(".typing"),
  inputNonTyping: document.querySelectorAll(".nonTyping"),

  wrappers: document.querySelectorAll(".wrapper"),
  submitBtn: document.querySelector(".submit"),
  warnings: {
    name: `Имя должно содержать только Буквы нижнего и верхнего регистра. Обязательное поле`,
    age: `Возраст должен быть от 7 до 99 лет`,
    mail: `Почта должна содержать только латинские символы, собачку, точку, нижнее подчёркивание. Обязательное поле`,
  },
};

ctr.inputTyping.forEach((item) => {
  item.oninput = displayWarning;
  item.onblur = hideWarning;
});

ctr.submitBtn.onclick = (event) => {
  event.preventDefault();
  var valuesObj = gettingValues();
  var validationArr = validation(valuesObj, rules);
  // console.log(valuesObj);
  console.log(validationArr);
  var checker = validationArr.every((item) => (item ? true : false));
  if (checker) {
    ctr.inputTyping.forEach((item) => {
      item.classList.remove("error");
      item.classList.add("successful");
    });
  } else {
    ctr.inputTyping.forEach((item) => {
      item.classList.add("error");
      item.classList.remove("successful");
    });
    error();
  }
};

function error() {
  alert("Введите корректные данные");
}

function validation(valueObj, rulesObj) {
  var checkArr = [];

  for (item in valueObj) {
    for (prop in rulesObj) {
      if (item === prop && typeof rulesObj[prop] !== "boolean") {
        checkArr.push(rulesObj[prop].test(valueObj[item]));
      } else if (item === prop && typeof rulesObj[prop] === "boolean") {
        checkArr.push(rulesObj[prop] === valueObj[prop]);
      }
    }
  }
  return checkArr;
}

var rules = {
  age: /^\d{1,2}$/,
  name: /^[A-Z][A-z]+$/,
  mail: /^([a-z]{1,})([a-z\.\_]{0,1}[a-z]{1,})([a-z\.\_]{0,1}[a-z]{1,})\@[a-z]+\.[a-z]{2,3}$/,
  pay: true,
  subscribe: true,
};

function gettingValues() {
  var valueObj = {};

  for (item of ctr.inputTyping) {
    valueObj[item.name] = item.value;
  }

  for (item of ctr.inputNonTyping) {
    valueObj[item.name] = item.checked;
  }

  if (valueObj.age < 7) {
    valueObj.age = false;
  }
  return valueObj;
}

function renderWarning(parent, child, warningText) {
  child = document.createElement("span");
  child.name = "warning";
  child.innerText = warningText;
  parent.appendChild(child);
  child.style = "display: none";
  return child;
}

function displayWarning() {
  if (this.value[1]) {
    this.classList.add("error");
    var parent = this.parentElement;
    var warning = parent.lastElementChild;
    warning.innerText = ctr.warnings[this.name];
    warning.style = "display: inline-block";
  }
}

function hideWarning() {
  var parent = this.parentElement;
  var warning = parent.lastElementChild;
  warning.style = "display: none";
}
