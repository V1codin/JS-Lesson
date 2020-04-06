var expression = prompt("Что посчитать??");

var firstNum;
var secondNum;

var indexOfAction;

var action;

var result;

var plus = "+";
var minus = "-";
var multiply = "*";
var divide = "/";

if (expression.includes("+")) {
  indexOfAction = expression.indexOf("+");
} else if (expression.includes("-")) {
  indexOfAction = expression.indexOf("-");
} else if (expression.includes("*")) {
  indexOfAction = expression.indexOf("*");
} else if (expression.includes("/")) {
  indexOfAction = expression.indexOf("/");
}

firstNum = +expression.slice(0, indexOfAction);
secondNum = +expression.slice(indexOfAction + 1);

action = expression.slice(indexOfAction, indexOfAction + 1);

if (action === plus) {
  result = firstNum + secondNum;
  alert("Ваш результат: " + result);
} else if (action === minus) {
  result = firstNum - secondNum;
  alert("Ваш результат: " + result);
}
if (action === multiply) {
  result = firstNum * secondNum;
  alert("Ваш результат: " + result);
}
if (action === divide) {
  result = firstNum / secondNum;
  alert("Ваш результат: " + result);
}

console.log(expression + " " + "=" + " " + result);
