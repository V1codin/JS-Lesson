var expression = prompt("Что посчитать??");

var num1;
var num2;

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

num1 = +expression.slice(0, indexOfAction);
num2 = +expression.slice(indexOfAction + 1);

action = expression.slice(indexOfAction, indexOfAction + 1);

if (action === plus) {
  result = num1 + num2;
  alert("Ваш результат: " + result);
} else if (action === minus) {
  result = num1 - num2;
  alert("Ваш результат: " + result);
}
if (action === multiply) {
  result = num1 * num2;
  alert("Ваш результат: " + result);
}
if (action === divide) {
  result = num1 / num2;
  alert("Ваш результат: " + result);
}

console.log(expression + " " + "=" + " " + result);
