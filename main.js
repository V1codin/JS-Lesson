var out = document.getElementById("out");
var userText = prompt("Enter expression");

/**
 * Output alert with result
 * @param  {any variable}
 * @return {alert with result}
 */
function rESULT(res) {
  alert(`Your result: ${res}`);
}
/**
 * Output alert with error
 * @return {alert with error}
 */
function Error() {
  alert("Your data is incorrect");
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
 * Output converting decimal num to hex system
 * @param    {number}
 * @return   {string}
 */

function conDecToHex(userNum) {
  var res = {};

  var resStr = "";

  while (userNum >= 0) {
    res[userNum] = userNum % 16;
    userNum = Math.floor(userNum / 16);
    if (userNum === 0) {
      res[userNum] = 0;
      break;
    }
  }

  for (item in res) {
    if (
      res[item] !== 0 &&
      item !== "0" &&
      res[item] % 10 === 0 &&
      item !== "16"
    ) {
      res[item] = "A";
    } else if (
      res[item] !== 0 &&
      item !== "0" &&
      res[item] % 11 === 0 &&
      item !== "16"
    ) {
      res[item] = "B";
    } else if (
      res[item] !== 0 &&
      item !== "0" &&
      res[item] % 12 === 0 &&
      item !== "16"
    ) {
      res[item] = "C";
    } else if (
      res[item] !== 0 &&
      item !== "0" &&
      res[item] % 13 === 0 &&
      item !== "16"
    ) {
      res[item] = "D";
    } else if (
      res[item] !== 0 &&
      item !== "0" &&
      res[item] % 14 === 0 &&
      item !== "16"
    ) {
      res[item] = "E";
    } else if (
      res[item] !== 0 &&
      item !== "0" &&
      res[item] % 15 === 0 &&
      item !== "16"
    ) {
      res[item] = "F";
    }
  }

  for (item in res) {
    if (item === "0") {
      continue;
    }
    resStr += res[item];
  }
  return resStr;
}

/**
 * Output converting decimal num to octal system
 * @param    {number}
 * @return   {string}
 */

function conDecToOctal(userNum) {
  var res = {};

  while (userNum >= 0) {
    res[userNum] = userNum % 8;
    userNum = Math.floor(userNum / 8);
    if (userNum === 0) {
      res[userNum] = 0;
      break;
    }
  }

  var result = "";

  for (item in res) {
    if (item > 0) {
      result += res[item];
    }
  }
  return result;
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
      rESULT(resDecToBin);
    } else if (resSystem === 10 && curSystem === 2) {
      var resBinToDec = conBinToDec(userNum);
      rESULT(resBinToDec);
    } else if (resSystem === 8 && curSystem === 10) {
      var resDecToOctal = conDecToOctal(userNum);
      rESULT(resDecToOctal);
    } else if (resSystem === 16 && curSystem === 10 && userNum > 0) {
      var resDecToHex = conDecToHex(userNum);
      rESULT(resDecToHex);
    } else if (resSystem === 16 && curSystem === 10 && userNum === 0) {
      rESULT(0);
    } else {
      Error();
    }
  } else {
    Error();
  }
}

converting(userText);
