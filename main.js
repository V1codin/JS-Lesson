var list = document.getElementById("list");
var userText = prompt("Enter your list of words and wrapper pattern");

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
function renderingNames(str) {
  if (str) {
    var wrapperPattern = "";
    var namesStr = "";
    var names = [];

    var result = "";

    function extractingPattern(str) {
      var indexOfSlash = "";

      indexOfSlash = checkingIndex(str, "/");

      for (item of str) {
        if (item === "/") {
          wrapperPattern += str.slice(indexOfSlash + 1);
          namesStr += str.slice(0, indexOfSlash);
          namesStr = namesStr.replace(/\s/g, "");
          names = namesStr.split(",");
          break;
        }
      }
      if (wrapperPattern.includes("$")) {
        wrapperPattern = wrapperPattern.replace("$", "");
      } else if (wrapperPattern.includes(" ")) {
        wrapperPattern = wrapperPattern.replace(/\s/g, "");
      }
      return wrapperPattern;
    }
    function renderingRes(names, wrapperPattern) {
      var tempAr = [];
      var tempStr1 = "";
      var tempStr2 = "";
      var indexOfCloseTagSighn;
      indexOfCloseTagSighn = checkingIndex(wrapperPattern, "/");
      for (char of wrapperPattern) {
        if (char === "/") {
          tempStr1 = wrapperPattern.slice(0, indexOfCloseTagSighn - 1);
          tempStr2 = wrapperPattern.slice(indexOfCloseTagSighn - 1);
        }
      }
      for (tempitem of names) {
        tempAr.push(`<li>${tempStr1}${tempitem}${tempStr2}</li>`);
      }
      for (item of tempAr) {
        result += item;
      }
      result = result.replace(/\s/g, "");
      return (list.innerHTML = result);
    }

    extractingPattern(str);

    renderingRes(names, wrapperPattern);
  } else {
    alert("You missed to input data");
  }
}
renderingNames(userText);
