var expression = prompt("Что посчитать??");

var firstNum;
var secondNum;

var plus = "+";
var minus = "-";
var multiply = "*";
var divide = "/";

var action;

var result;

for (var i = 0; i < expression.length; i++) {
  if (
    expression[i] === plus ||
    expression[i] === minus ||
    expression[i] === multiply ||
    expression[i] === divide
  ) {
    action = expression[i];
    firstNum = +expression.slice(0, i);
    secondNum = +expression.slice(i + 1);
  }
}

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
