var out = document.getElementById("out");
var userText = prompt("Enter text");

function checkingChars(str) {
  if (str) {
    var checkedStr = "";

    for (item of str) {
      if (
        (item >= "A" && item <= "z") ||
        (item >= "а" && item <= "і") ||
        item === "." ||
        item === " " ||
        item === "," ||
        isFinite(item)
      ) {
        checkedStr += item;
      }
    }

    return checkedStr;
  } else {
    alert("You missed to input data");
  }
}

out.innerHTML = checkingChars(userText);
