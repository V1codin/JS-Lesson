var out = document.getElementById("out");
var btn = document.getElementById("btn");
var inp = document.getElementById("inp");

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
 * @return {obj}
 */

function decToBase(strNum, base) {
  var res = {};

  while (strNum) {
    if (strNum % base !== 0 && strNum >= 1) {
      res[strNum] = strNum % base;
      strNum = Math.floor(strNum / base);
    } else if (strNum !== base && strNum % base === 0) {
      res[strNum] = "0";
      strNum = strNum / base;
    } else if (strNum < base) {
      res[strNum] = "0";
      strNum = Math.floor(strNum / base);
    }
    if (strNum === 1 || strNum === base) {
      res[strNum] = Math.floor(strNum % base);
      strNum = Math.floor(strNum / base);
    } else if (strNum === 0) {
      break;
    }
  }
  return res;
}

function init() {
  var num = extractNumsAndBases(inp.value);
  console.log("num.namber", num.number);

  var res = decToBase(baseToDec(num.number, num.curSystem), num.resSystem);
  console.log("res", res);

  var num = extractNumsAndBases(inp.value);

  if (num.resSystem === 16) {
    var replace = {
      "10": "A",
      "11": "B",
      "12": "C",
      "13": "D",
      "14": "E",
      "15": "F",
    };

    var hexR = "";
    var numStr = "";
  }
  // 10/10>16
}

btn.onclick = init;

/*
var out = document.getElementById("out");
var btn = document.getElementById("btn");
var inp = document.getElementById("inp");

function replaceHexLetters(str) {
  var tempArr = str.split("");

  var replace = {
    "10": "A",
    "11": "B",
    "12": "C",
    "13": "D",
    "14": "E",
    "15": "F",
  };

  for (k = 0; k < tempArr.length; k++) {
    for (item in replace) {
      if (tempArr[k] === replace[item]) {
        tempArr.splice(k, 1, item);
      }
    }
  }

  var nStr = tempArr.join("");
  return nStr;
}

function extractNumsAndBases(str) {
  var numsAndBases = {};

  var tempNum;

  for (item of str) {
    tempNum = str.slice(0, checkingIndex(str, "/"));
    numsAndBases.curSystem = +str.slice(
      checkingIndex(str, "/") + 1,
      checkingIndex(str, ">")
    );
    numsAndBases.resSystem = +str.slice(checkingIndex(str, ">") + 1);
  }

  numsAndBases.number = tempNum;

  return numsAndBases;
}

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

function reverse(str) {
  var arr = str.split("");
  arr = arr.reverse();
  var nStr = arr.join("");
  return nStr;
}
function baseToDec(strNum, base) {
  var res = 0;

  var str = reverse(strNum);

  var n;

  for (i = 0; i < str.length; i++) {
    if (!isNaN(str[i])) {
      n = str[i];
      res += n * base ** i;
    } else if (isNaN(str[i])) {
      n = replaceHexLetters(str[i]);
      res += n * base ** i;
    }
  }
  return res;
}

function decToBase(strNum, base) {
  var res = {};

  while (strNum) {
    if (strNum % base !== 0 && strNum >= 1) {
      res[strNum] = strNum % base;
      strNum = Math.floor(strNum / base);
    } else if (strNum !== base && strNum % base === 0) {
      res[strNum] = "0";
      strNum = strNum / base;
    } else if (strNum < base) {
      res[strNum] = "0";
      strNum = Math.floor(strNum / base);
    }
    if (strNum === 1 || strNum === base) {
      res[strNum] = Math.floor(strNum % base);
      strNum = Math.floor(strNum / base);
    } else if (strNum === 0) {
      break;
    }
  }
  return res;
}

function init() {
  var num = extractNumsAndBases(inp.value);

  if (num.number === "0") {
    out.innerHTML = 0;
  } else {
    var replace = {
      "10": "A",
      "11": "B",
      "12": "C",
      "13": "D",
      "14": "E",
      "15": "F",
    };

    var resObj = decToBase(baseToDec(num.number, num.curSystem), num.resSystem);
    var res = "";


    if (num.resSystem === 16) {
      for (item in resObj) {
        for (rep in replace) {
          if (resObj[item] == rep) {
            resObj[item] = replace[rep];
          }
        }
      }
    }
    for (item in resObj) {
      res += resObj[item];
    }
    out.innerHTML = res;
  }
}

btn.onclick = init;

*/
