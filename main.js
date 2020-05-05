var out = document.getElementById("out");
var newBlock = document.getElementById("newBlock");

var btn = document.getElementById("btn");
var clear = document.getElementById("btnClear");

var inp = document.getElementById("inp");

var blocks = {
  nums: 0,
};

clear.onclick = function clear() {
  out.style = "display: none";
  blocks.nums = 0;
  out.innerHTML = null;
};

btn.onclick = function createBlock() {
  out.style = "display: block";
  blocks.nums++;

  var newDiv = document.createElement("div");
  newDiv.id = "newBlock";
  newDiv.innerText = `${blocks.nums} ${inp.value}`;

  out.insertBefore(newDiv, newBlock);
};
