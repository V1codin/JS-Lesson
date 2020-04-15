var list = document.getElementById("list");
var userText = prompt("Enter your list of words and wrapper pattern");

function renderingNames(str) {
  if (str) {
    var wrapperPattern = "";
    var namesStr = "";
    var names = [];

    var result = "";

    function extractingPattern(str) {
      for (item of str) {
        if (item === "/") {
          var indexOfWrapperSighn = str.indexOf(item);
          wrapperPattern += str.slice(indexOfWrapperSighn + 1);
          namesStr += str.slice(0, indexOfWrapperSighn);
          namesStr = namesStr.replace(/\s/g, "");
          names = namesStr.split(",");
          break;
        }
      }
      if (wrapperPattern.includes(" ")) {
        wrapperPattern = wrapperPattern.replace(/\s/g, "");
      }
      return wrapperPattern;
    }
    function renderingRes(names, wrapperPattern) {
      var tempAr = [];
      var tempStr1 = "";
      var tempStr2 = "";
      var indexOfCloseTagSighn;
      for (char of wrapperPattern) {
        if (char === "/") {
          indexOfCloseTagSighn = wrapperPattern.indexOf(char);
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
