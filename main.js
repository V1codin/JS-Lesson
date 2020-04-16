var out = document.getElementById("out");
// var userText = prompt("Enter text");
// var userWords = prompt("Enter words for check");

var userText =
  "Text text  text text text. Text word1 text text text text text text my word1 text. text text text text 32 word2 text text text ";
var userWords = "text, 32, dsl;sd;l";

function checkingWOrds(strText, strWords) {
  var dataTest = {};

  var tempArrText = [];
  var tempStrText = "";

  var tempArrWords = [];

  function creatingArrWithReplace(str) {
    var tempStrText = "";
    var arr = [];
    for (item of str) {
      if (item === ".") {
        item = item.replace(".", "");
      } else if (item === ",") {
        item = item.replace(",", "");
      }
      tempStrText += item;
      arr = tempStrText.split(" ");
    }
    return arr;
  }

  if (strText) {
    tempArrText = creatingArrWithReplace(strText);
  } else {
    alert("You missed to input data");
  }
  if (strWords) {
    tempArrWords = creatingArrWithReplace(strWords);
  } else {
    alert("You missed to input data");
  }
  console.log(tempArrWords);
  console.log(tempArrText);
}
checkingWOrds(userText, userWords);
