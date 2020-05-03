var out = document.getElementById("out");
var userExpression = prompt("Enter expression");

/**
 * Returning index of input sigh
 * @param  {string}
 * @return {object of number and systems}
 */
function extractNumsAndBases(str) {
  var numsAndBases = {};

  for (item of str) {
    numsAndBases.number = str.slice(0, checkingIndex(str, "/"));
    numsAndBases.curSystem = +str.slice(
      checkingIndex(str, "/") + 1,
      checkingIndex(str, ">")
    );
    numsAndBases.resSystem = +str.slice(checkingIndex(str, ">") + 1);
  }
  return numsAndBases;
}

/**
 * Returning index of input sigh
 * @param  {string}
 * @param  {sign}
 * @return {index of sign}
 */

function checkingIndex(str, sign) {
  var indexOfSign;
  for (var i = 0; i < str.length; i++) {
    if (str[i] === sign) {
      indexOfSign = i;
      break;
    }
  }
  return indexOfSign;
}
/*
var replace = {
  "10": "A",
  "11": "B",
  "12": "C",
  "13": "D",
  "14": "E",
  "15": "F",
};
*/

/**
 * Returning index of input sigh
 * @param  {string}
 * @return {reversed string}
 */
function reverse(str) {
  var arr = str.split("");
  arr = arr.reverse();
  var nStr = arr.join("");
  return nStr;
}
/**
 * Returning index of input sigh
 * @param  {string}
 * @param  {string}
 * @return {converted number of base system to dec system}
 */
function baseToDec(strNum, base) {
  var res = 0;

  var str = reverse(strNum);

  for (i = 0; i < str.length; i++) {
    var n = str[i];
    res += n * base ** i;
  }
  return res;
}

/**
 * Returning index of input sigh
 * @param  {string}
 * @param  {string}
 * @return {converted number of dec system to base system}
 */

function decToBase(strNum, base) {
  var res = "";

  while (strNum) {
    if (strNum % base !== 0 && strNum >= 1) {
      res += strNum % base;
      strNum = Math.floor(strNum / base);
    } else if (strNum !== base && strNum % base === 0) {
      res += "0";
      strNum = strNum / base;
    } else if (strNum < base) {
      res += "0";
      strNum = Math.floor(strNum / base);
    }
    if (strNum === 1 || strNum === base) {
      res += Math.floor(strNum % base);
      strNum = Math.floor(strNum / base);
    } else if (strNum === 0) {
      break;
    }
  }
  res = reverse(res);
  return res;
}

function init() {
  var num = extractNumsAndBases(userExpression);
  out.innerHTML = decToBase(
    baseToDec(num.number, num.curSystem),
    num.resSystem
  );
}
init();
