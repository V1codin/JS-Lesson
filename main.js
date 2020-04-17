var out = document.getElementById("out");
var userText = prompt("Enter expression");

function converting(str) {
  var userNum;

  var curSystem;

  var resSystem;

  var strRest = "";

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

  function reverseString(nStr) {
    var reverseArr = [];
    var splitString = nStr.split("");

    reverseArr = splitString.reverse();

    var res = reverseArr.join("");

    return res;
  }

  for (item of str) {
    userNum = +str.slice(0, checkingIndex(str, "/"));
    curSystem = +str.slice(
      checkingIndex(str, "/") + 1,
      checkingIndex(str, ">")
    );
    resSystem = +str.slice(checkingIndex(str, ">") + 1);
  }

  function conDecToBin(userNum) {
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

    return alert(`Your result: ${resStr}`);
  }
  if (resSystem === 2 && curSystem === 10) {
    conDecToBin(userNum);
  } else {
    alert("Your data is incorrect");
  }
}

converting(userText);
