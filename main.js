var ctr = {
  form: document.querySelector(".form"),
  inputTyping: document.querySelectorAll(".typing"),
  wrappers: document.querySelectorAll(".wrapper"),
  submitBtn: document.querySelector(".submit"),
  warnings: {
    name: `Имя должно содержать только Буквы нижнего и верхнего регистра. Обязательное поле`,
    age: `Возраст должен быть от 7 до 99 лет`,
    mail: `Почта должна содержать только латинские символы, собачку, точку, нижнее подчёркивание. Обязательное поле`,
  },
};

ctr.inputTyping.forEach((item) => {
  item.onfocus = displayWarning;
  item.onblur = hideWarning;
});

ctr.submitBtn.onclick = (event) => {
  event.preventDefault();
  var check = gettingValues(ctr.form);
  var validationArr = validation(check, rules);
  // console.log(check);
  console.log(validationArr);
};

function error() {
  alert("Введите корректные данные");
}

function validation(valueObj, rulesObj) {
  var checkArr = [];

  for (item in valueObj) {
    for (prop in rulesObj) {
      if (item === prop) {
        checkArr.push(rulesObj[prop].test(valueObj[item]));
      }
    }
  }

  for (check of checkArr) {
    if (!check) {
      error();
    }
  }
  return checkArr;
}

var rules = {
  age: /^\d{1,2}$/,
  name: /^[A-Z][A-z]+$/,
  mail: /^([a-z]{1,})([a-z\.\_]{0,1}[a-z]{1,})([a-z\.\_]{0,1}[a-z]{1,})\@[a-z]+\.[a-z]{2,3}$/,
};

function gettingValues(form) {
  var valueObj = {};

  for (i = 0; i < form.length; i++) {
    if (form[i].tagName !== "BUTTON" && form[i].value !== "subscribe") {
      valueObj[form[i].name] = form[i].value;
    } else if (form[i].value === "subscribe") {
      valueObj["subscribe-checkbox"] = form[i].checked;
    }
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
  var parent = this.parentElement;
  var warning = parent.lastElementChild;
  warning.innerText = ctr.warnings[this.name];
  warning.style = "display: inline-block";
}

function hideWarning() {
  var parent = this.parentElement;
  var warning = parent.lastElementChild;
  warning.style = "display: none";
}
