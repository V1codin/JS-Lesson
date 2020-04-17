var out = document.getElementById("out");
// var userText = prompt("Enter text");
// var userWords = prompt("Enter words for check");

var testText = "8/10>2";

var num = 111;

function converting(str) {
  var userNum;
  var userSystem;

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

  for (item of str) {
    userNum = str.slice(0, checkingIndex(str, "/"));
  }
  console.log("userNum: ", userNum);

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
      } else {
        break;
      }
    }

    function reverseString(str) {
      var reverseArr = [];
      var splitString = str.split("");

      reverseArr = splitString.reverse();

      var res = reverseArr.join("");

      return res;
    }
    var resStr = reverseString(strRest);

    return alert(`Your result: ${resStr}`);
  }
  if (userSystem === 2) {
    conDecToBin(userNum);
  }
}

converting(testText);
