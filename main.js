var out = document.getElementById("out");
var userText = prompt("Enter text");
var userWords = prompt("Enter words for check");

function checkingWOrds(strText, strWords) {
  var resultObj = {};

  var result = "";

  var tempArrText = [];

  var tempArrWords = [];

  function creatingArrWithReplace(str) {
    var tempStrText = "";
    var arr = [];
    for (item of str) {
      if (item === ".") {
        item = item.replace(".", " ");
      } else if (item === ",") {
        item = item.replace(",", " ");
      }
      tempStrText += item;
      arr = tempStrText.split(" ");
    }
    return arr;
  }
  function addingDataInObj(obj, arr) {
    for (item of arr) {
      obj[item] = 0;
    }
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
  addingDataInObj(resultObj, tempArrWords);
  for (item in resultObj) {
    for (i of tempArrText) {
      if (item === i) {
        resultObj[item]++;
      }
    }
  }
  for (item in resultObj) {
    result += `<p>${item}: ${resultObj[item]}</p>`;
  }

  out.innerHTML = result;
}
checkingWOrds(userText, userWords);
