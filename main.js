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
  item.onfocus = focusFN;
  item.onblur = blurFN;
});

ctr.submitBtn.onclick = (event) => {
  event.preventDefault();
  var check = gettingValues(ctr.form);
  var test = validation(check, rules);
  // console.log(check);
  console.log(test);
};

function error() {
  alert("Введите корректные данные");
}

function validation(valueObj, rulesObj) {
  var checkArr = [];

  for (item in valueObj) {
    for (prop in rulesObj) {
      if (item === prop) {
        console.log(item);
        checkArr.push(rulesObj[prop].test(valueObj[item]));
      }
    }
  }
  if (valueObj.age < 7) {
    return error();
  }

  for (check of checkArr) {
    if (!check) {
      return error();
    }
  }
  return checkArr;
}

var rules = {
  age: /^\d{1,2}$/,
  name: /^[A-Z][a-z]+$/,

  mail: /^[a-z]+(\.{1}|\_|[a-z]+)[a-z]+(\.{1}|\_|[a-z]+)[a-z]+$/,
  // mail: /^[a-z]{1,}(\.{1}|\_|[a-z]{1,})[a-z]{1,}(\.{1}|\_|[a-z]{1,})[a-z]+$/,
  checker: [],
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
  return valueObj;
}

function renderWarning(parent, child, warningText) {
  child = document.createElement("span");
  child.name = "warning";
  child.innerText = warningText;
  parent.appendChild(child);
  child.style = "display: inline-block";
}

function focusFN() {
  var parent = this.parentElement;
  renderWarning(parent, "warning", ctr.warnings[this.name]);
}

function blurFN(obj) {
  obj[this.value] = this.value;
  var parent = this.parentElement;
  parent.lastElementChild.remove();
}

/*

function onlyLetters() {
  if (this.value) {
    for (char of this.value) {
      if (
        char.charCodeAt() < 65 ||
        (char.charCodeAt() > 122 && char.charCodeAt() < 1040) ||
        char.charCodeAt() > 1111
      ) {
        rules.checker.push(false);
      } else {
        rules.checker.push(true);
      }
    }
  } else {
    rules.checker.push(false);
  }
}

function onlyNums(validation = rules.age) {
  if (this.value) {
    var validator = this.value.match(validation);
    console.log(validator);

    if (this.value >= 7 && this.value == validator) {
      rules.checker.push(true);
    } else {
      rules.checker.push(false);
    }
  }
}
*/

/*
var validator = /^\w/;

var test = "s";

var test2 = test.match(validator);
*/
