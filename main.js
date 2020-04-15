var out = document.getElementById("out");
var userText = prompt("Enter your list of words and wrapper pattern");

function wrappingText(str) {
  if (str) {
    var wrappedStr = "";

    for (item of str) {
      if (item >= "A" && item <= "Z" && item !== "." && item !== " ") {
        wrappedStr += `<p>`;
      }
      if (!isNaN(item) && item !== " ") {
        wrappedStr += `<b style="color:red">${item}</b>`;
      }
      if ((item !== "." && isNaN(item)) || item === " ") {
        wrappedStr += item;
      } else if (item === ".") {
        wrappedStr += `.</p> `;
      }
    }

    return wrappedStr;
  } else {
    alert("You missed to input data");
  }
}
out.innerHTML = wrappingText(userText);
