var ctr = {
  form: document.querySelector(".form"),

  inputTyping: document.querySelectorAll(".typing"),
  inputNonTyping: document.querySelectorAll(".nonTyping"),

  submitBtn: document.querySelector(".submit"),
  warnings: {
    name: `Имя должно содержать только латинские буквы нижнего и верхнего регистра. Обязательное поле`,
    age: `Ваш возраст должен быть от 7 до 99 лет. Обязательное поле`,
    mail: `Почта должна содержать только латинские символы, собачку, точку, нижнее подчёркивание. Обязательное поле`,
  },

  rules: {
    age: /^\d{1,2}$/,
    name: /^[A-Z][A-z]+$/,
    mail: /^([a-z]{1,})([a-z\.\_]{0,1}[a-z]{1,})([a-z\.\_]{0,1}[a-z]{1,})\@[a-z]+\.[a-z]{2,3}$/,
  },

  gettingValues: function () {
    var valueObj = {};

    for (item of this.inputTyping) {
      valueObj[item.name] = item.value;
    }

    for (item of this.inputNonTyping) {
      if (item.checked && item.name !== "subscribe") {
        valueObj[item.name] = item.value;
      } else if (item.name === "subscribe") {
        valueObj[item.name] = item.checked;
      }
    }

    if (valueObj.age < 7) {
      valueObj.age = false;
    }

    return valueObj;
  },
  displayWarning: function () {
    if (this.value[1]) {
      this.classList.add("error");
      var parent = this.parentElement;
      var warning = parent.lastElementChild;
      warning.innerText = ctr.warnings[this.name];
      warning.style = "display: inline-block";
    }
  },
  hideWarning: function () {
    var parent = this.parentElement;
    var warning = parent.lastElementChild;
    warning.style = "display: none";
  },
  error: function () {
    alert("Введите корректные данные");
  },
  validation: function (valueObj, rulesObj) {
    var checkArr = [];

    checkArr.push(valueObj.subscribe);
    checkArr.push(valueObj.pay);

    for (item in valueObj) {
      for (prop in rulesObj) {
        if (item === prop && typeof rulesObj[prop] !== "boolean") {
          checkArr.push(rulesObj[prop].test(valueObj[item]));
        }
      }
    }
    return checkArr;
  },
};

ctr.submitBtn.onclick = (e) => {
  e.preventDefault();
  var valuesObj = ctr.gettingValues();
  var validationArr = ctr.validation(valuesObj, ctr.rules);

  var checker = validationArr.every((item) => (item ? true : false));
  if (checker) {
    ctr.inputTyping.forEach((item) => {
      item.classList.remove("error");
      item.classList.add("successful");
    });
    alert(
      `Данные успешно отправленны. Вы выбрали метод оплаты ${valuesObj.pay}. Спасибо, что подписались на рассылку`
    );
  } else {
    ctr.inputTyping.forEach((item) => {
      item.classList.add("error");
      item.classList.remove("successful");
    });
    ctr.error();
  }
};

ctr.inputTyping.forEach((item) => {
  item.oninput = ctr.displayWarning;
  item.onblur = ctr.hideWarning;
});
