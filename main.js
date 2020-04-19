var out = document.getElementById("out");
var userExpression = prompt("Enter expression");

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
 * @param    {string}
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
 * Output converting hex num to decimal system
 * @param    {string}
 * @return   {alert with res}
 */

function conHexToDec(userNum) {
  var str = "";
  str += userNum;

  var res = 0;

  if (str === "0") {
    return alert(`Your result: ${res}`);
  } else {
    var tempOb = {};

    for (i = 0; i < str.length; i++) {
      tempOb[i] = str[i];
    }

    for (item in tempOb) {
      if (tempOb[item] === "A" || tempOb[item] === "a") {
        tempOb[item] = "10";
      } else if (tempOb[item] === "B" || tempOb[item] === "b") {
        tempOb[item] = "11";
      } else if (tempOb[item] === "C" || tempOb[item] === "c") {
        tempOb[item] = "12";
      } else if (tempOb[item] === "D" || tempOb[item] === "d") {
        tempOb[item] = "13";
      } else if (tempOb[item] === "E" || tempOb[item] === "e") {
        tempOb[item] = "14";
      } else if (tempOb[item] === "F" || tempOb[item] === "f") {
        tempOb[item] = "15";
      }
    }

    var lMinusOne = str.length - 1;

    for (R in tempOb) {
      res += Math.pow(16, R) * tempOb[lMinusOne - R];
    }
    return res;
  }
}

/**
 * Output converting decimal num to octal system
 * @param    {string}
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
 * Output converting octal num to decimal system
 * @param    {string}
 * @return   {alert with res}
 */

function conOctalToDec(userNum) {
  var str = "";
  str += userNum;

  var resO = {};

  var res = 0;

  var lMinusOne = str.length - 1;

  if (userNum > 0) {
    for (var i = lMinusOne; i >= 0; i--) {
      resO[i] = Math.pow(8, i) * str[lMinusOne - i];
    }
    for (item in resO) {
      res += resO[item];
    }
  } else if (userNum === 0) {
    return res;
  }

  if (str.includes(8) || str.includes(9)) {
    return alert("Number should consist only of 0-7 numbers");
  } else if (str === 0) {
    resO[0] = 0;
  }
  return res;
}

/**
 * Output converting binary num to decimal
 * @param    {string}
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
 *   @param  {string}
 *   @return {string}
 */
function conDecToBin(userNum) {
  var strRest = "";
  var num = userNum;

  var resStr;

  if (num === "1") {
    return (resStr = "1");
  } else if (num === "0") {
    return (resStr = "0");
  } else {
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

    resStr = reverseString(strRest);

    return resStr;
  }
}

function converting(str) {
  if (str) {
    var userNum;

    var curSystem;

    var resSystem;

    for (item of str) {
      userNum = str.slice(0, checkingIndex(str, "/"));
      curSystem = +str.slice(
        checkingIndex(str, "/") + 1,
        checkingIndex(str, ">")
      );
      resSystem = +str.slice(checkingIndex(str, ">") + 1);
    }

    var tempRes;
    var outRes;

    if (userNum && curSystem && resSystem) {
      if (resSystem === 2 && curSystem === 10) {
        var outRes = conDecToBin(userNum);
        rESULT(outRes);
      } else if (resSystem === 2 && curSystem === 8) {
        tempRes = conOctalToDec(userNum);
        outRes = conDecToBin(tempRes);
        rESULT(outRes);
      } else if (resSystem === 2 && curSystem === 16) {
        tempRes = conHexToDec(userNum);
        outRes = conDecToBin(tempRes);
        rESULT(outRes);
      }

      if (resSystem === 10 && curSystem === 2) {
        var resBinToDec = conBinToDec(userNum);
        rESULT(resBinToDec);
      } else if (resSystem === 10 && curSystem === 8) {
        outRes = conOctalToDec(userNum);
        rESULT(outRes);
      } else if (resSystem === 10 && curSystem === 16) {
        outRes = conHexToDec(userNum);
        rESULT(outRes);
      }

      if (resSystem === 8 && curSystem === 2) {
        tempRes = conBinToDec(userNum);
        outRes = conDecToOctal(tempRes);
        rESULT(outRes);
      } else if (resSystem === 8 && curSystem === 10) {
        outRes = conDecToOctal(userNum);
        rESULT(outRes);
      } else if (resSystem === 8 && curSystem === 16) {
        tempRes = conHexToDec(userNum);
        outRes = conDecToOctal(tempRes);
        rESULT(outRes);
      }

      if (resSystem === 16 && userNum === "0") {
        rESULT(0);
      } else if (resSystem === 16 && curSystem === 2) {
        tempRes = conBinToDec(userNum);
        outRes = conDecToHex(tempRes);
        rESULT(outRes);
      } else if (resSystem === 16 && curSystem === 8) {
        tempRes = conOctalToDec(userNum);
        outRes = conDecToHex(tempRes);
        rESULT(outRes);
      } else if (resSystem === 16 && curSystem === 10) {
        outRes = conDecToHex(userNum);
        rESULT(outRes);
      }
    } else {
      Error();
    }
  } else {
    Error();
  }
}

converting(userExpression);
