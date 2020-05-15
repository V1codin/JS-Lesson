var ctr = {
  form: document.querySelector(".form"),
  inputTyping: document.querySelectorAll(".typing"),
  wrappers: document.querySelectorAll(".wrapper"),
};

var warnings = {
  name: `Имя должно содержать только Буквы нижнего и верхнего регистра. Обязательное поле`,
  age: `Возраст должен быть от 7 до 99 лет`,
  mail: `Почта должна содержать только латинские символы, собачку, точку, нижнее подчёркивание. Обязательное поле`,
};

function renderWarning(parent, child, warningText) {
  child = document.createElement("span");
  child.name = "warning";
  child.innerText = warningText;
  parent.appendChild(child);
  child.style = "display: inline-block";
}

ctr.inputTyping.forEach((item) => (item.onfocus = focusFN));
ctr.inputTyping.forEach((item) => (item.onblur = blurFN));

function focusFN() {
  var parent = this.parentElement;
  renderWarning(parent, "warning", warnings[this.name]);
}

function blurFN() {
  var parent = this.parentElement;
  parent.lastElementChild.remove();
}

function onlyLetters(event) {
  if (this.value) {
    for (char of this.value) {
      if (
        char.charCodeAt() < 65 ||
        (char.charCodeAt() > 122 && char.charCodeAt() < 1040) ||
        char.charCodeAt() > 1111
      ) {
        alert("Введите корректные данные");
      } else {
        return true;
      }
    }
  } else {
    alert("Введите корректные данные");
  }
}

function onlyNums(event) {
  if (this.value >= 7) {
    return true;
  } else {
    alert("Введите корректные данные");
  }
}
