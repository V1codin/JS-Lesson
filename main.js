function ValidForm(formClass, typingInputs, nonTypingInputs, submitBtnClass) {
  this.form = document.querySelector(`.${formClass}`);

  this.inputTyping = document.querySelectorAll(`.${typingInputs}`);
  this.inputNonTyping = document.querySelectorAll(`.${nonTypingInputs}`);

  this.submitBtn = document.querySelector(`.${submitBtnClass}`);

  this.rules = {
    age: /^\d{1,2}$/,
    name: /^[A-Z][A-z]+$/,
    mail: /^([a-z]{1,})([a-z\.\_]{0,1}[a-z]{1,})([a-z\.\_]{0,1}[a-z]{1,})\@[a-z]+\.[a-z]{2,3}$/,
  };

  // getting values of inputs of the form
  // returning object
  this.gettingValues = function () {
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
  };

  // displaying a notification with data format
  this.displayWarning = function () {
    if (this.value[1]) {
      this.classList.add("error");
      var parent = this.parentElement;
      var warning = parent.lastElementChild;
      warning.style = "display: inline-block";
    }
  };

  // hiding notification with data format
  this.hideWarning = function () {
    var parent = this.parentElement;
    var warning = parent.lastElementChild;
    warning.style = "display: none";
  };

  // error notification
  this.error = function () {
    alert("Введите корректные данные");
  };

  // validation values via regular expressions
  // returning array with true/false results of the validation
  this.validation = function (valueObj, rulesObj) {
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
  };

  //clearing inputs of the form
  this.clear = function () {
    for (item of this.inputTyping) {
      item.value = "";
    }
    for (item of this.inputNonTyping) {
      item.checked = "";
    }
    this.inputTyping.forEach((item) => {
      item.classList.remove("successful");
    });
  };

  this.inputTyping.forEach((item) => {
    item.oninput = this.displayWarning.bind(item);
    item.onblur = this.hideWarning.bind(item);
  });

  this.submitBtn.onclick = (e) => {
    e.preventDefault();
    var valuesObj = this.gettingValues();
    var validationArr = this.validation(valuesObj, this.rules);

    // checking if every part of validation was succesful
    var checker = validationArr.every((item) => (item ? true : false));
    if (checker) {
      this.inputTyping.forEach((item) => {
        item.classList.remove("error");
        item.classList.add("successful");
      });
      alert(
        `Данные успешно отправленны. Вы выбрали метод оплаты ${valuesObj.pay}. Спасибо, что подписались на рассылку`
      );
      setTimeout(this.clear.bind(this), 3000);
    } else {
      this.inputTyping.forEach((item) => {
        item.classList.add("error");
        item.classList.remove("successful");
      });
      this.error();
    }
  };
}
new ValidForm("form", "typing", "nonTyping", "submit");
