var list = document.getElementById("list");
var userText = prompt("Enter your list of words and wrapper pattern");

function wrapping(arr, tag) {
  var wrappedStr = "";
  if (arr.length > 0) {
    for (item of arr) {
      item = `<${tag}>${item}</${tag}>`;
      wrappedStr += item;
    }
  }
  return wrappedStr;
}
