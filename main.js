var list = document.getElementById("list");
// var userText = prompt("Enter your list of words and wrapper pattern");
var userText = "Text. Valera. Check";

function wrapping(str, tag) {
  var wrappedStr = "";

  for (item of str) {
    if (item < "a" && item !== " " && item !== ".") {
      wrappedStr += `<${tag}>`;
    }
    if (item !== ".") {
      wrappedStr += item;
    } else {
      wrappedStr += `.</${tag}>`;
    }
  }
  console.log(wrappedStr);
  return wrappedStr;
}

wrapping(userText, "p");

// console.log("A" > "a");

// console.log("A".codePointAt(0));
// console.log("a".codePointAt(0));
