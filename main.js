var plus = "+";
var minus = "-";
var multiply = "*";
var divide = "/";

var alternatePlus = "Складываем";
var alternateMinus = "Отнимаем";
var alternateMultiply = "Умножаем";
var alternateDivide = "Делим";

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

if (action === plus || action === alternatePlus) {
  result = firstNum + secondNum;
  alert("Ваш результат " + result);
} else if (action === minus || action === alternateMinus) {
  result = firstNum - secondNum;
  alert("Ваш результат " + result);
} else if (action === multiply || action === alternateMultiply) {
  result = firstNum * secondNum;
  alert("Ваш результат " + result);
} else if (action === divide || action === alternateDivide) {
  result = firstNum / secondNum;
  alert("Ваш результат " + result);
} else {
  alert("Ну теперь всё с начала. Поздравляю");
}
