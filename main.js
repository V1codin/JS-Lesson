var plus = "+";
var minus = "-";
var multiply = "*";
var divide = "/";
var checker = true;
var result;

var firstNum = +prompt("Введите первое число");

while (checker) {
  if (isNaN(firstNum) || firstNum === "" || firstNum == false) {
    alert("Нужно число");
    firstNum = +prompt("Введите первое число");
  } else {
    var secondNum = +prompt("Введите второе число");
    if (isNaN(secondNum) || secondNum === "" || secondNum == false) {
      alert("Нужно число");
    } else {
      var action = prompt("Что с ними делаем?");
      checker = false;
      break;
    }
  }
}

if (action === plus) {
  result = firstNum + secondNum;
  alert("Ваш результат " + result);
} else if (action === minus) {
  result = firstNum - secondNum;
  alert("Ваш результат " + result);
} else if (action === multiply) {
  result = firstNum * secondNum;
  alert("Ваш результат " + result);
} else if (action === divide) {
  result = firstNum / secondNum;
  alert("Ваш результат " + result);
} else {
  alert("Ну теперь всё с начала. Поздравляю");
}
