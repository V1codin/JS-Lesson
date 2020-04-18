var out = document.getElementById("out");
// var userText = prompt("Enter expression");

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
/**
 * Returning reversed of input string
 * @param  {string}
 * @return {reversed string}
 */
function reverseString(nStr) {
  var reverseArr = [];
  var splitString = nStr.split("");

  reverseArr = splitString.reverse();

  var res = reverseArr.join("");

  return res;
}
/**
 * Output converting binary num to decimal
 * @param    {number}
 * @return   {number}
 */
function conBinToDec(userNum) {
  var tempStr = "";
  tempStr += userNum;
  var dataOb = {};

  var res = 0;

  var lMinusOne = tempStr.length - 1;

  for (var i = 0; i <= lMinusOne; i++) {
    if (tempStr[i] === "1") {
      dataOb[i] = Math.pow(2, lMinusOne - i);
    } else {
      continue;
    }
  }
  for (item in dataOb) {
    res += dataOb[item];
  }
  return res;
}

/**
 * Output converting decimal num to binary
 *   @param  {number}
 *   @return {string}
 */
function conDecToBin(userNum) {
  var strRest = "";
  var num = userNum;
  for (i = num; i >= 0; i--) {
    if (num > 0) {
      if (num % 2 === 0) {
        num = num / 2;
        strRest += "0";
      } else if (num === 1) {
        strRest += "1";
        break;
      } else if (num % 2 !== 0) {
        num = Math.floor(num / 2);

        strRest += "1";
      }
    } else if (num === 0) {
      strRest += "0";
    } else {
      break;
    }
  }

  var resStr = reverseString(strRest);

  return resStr;
}

function converting(str) {
  if (str) {
    var userNum;

    var curSystem;

    var resSystem;

    for (item of str) {
      userNum = +str.slice(0, checkingIndex(str, "/"));
      curSystem = +str.slice(
        checkingIndex(str, "/") + 1,
        checkingIndex(str, ">")
      );
      resSystem = +str.slice(checkingIndex(str, ">") + 1);
    }

    if (resSystem === 2 && curSystem === 10) {
      var resDecToBin = conDecToBin(userNum);
      alert(`Your result: ${resDecToBin}`);
    } else if (resSystem === 10 && curSystem === 2) {
      var resBinToDec = conBinToDec(userNum);
      alert(`Your result: ${resBinToDec}`);
    } else {
      alert("Your data is incorrect");
    }
  } else {
    alert("Your data is incorrect");
  }
}

converting(userText);
