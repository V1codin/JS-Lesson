var newBlock = document.getElementById("newBlock");

var blockArr = [];

/**
 * Rendering html elements in document and returning object with access to them
 * @return {object}
 */

function renderControls() {
  var box = document.createElement("div");
  box.className = "box";
  box = document.body.appendChild(box);

  var cont = document.createElement("div");
  cont.className = "container";
  cont = document.body.appendChild(cont);

  var outBlock = document.createElement("div");
  outBlock.id = "out";
  outBlock = cont.appendChild(outBlock);

  var input = document.createElement("input");
  input.type = "text";
  input.id = "inp";
  input = box.appendChild(input);

  var pushBtn = document.createElement("button");
  pushBtn.id = "btn";
  pushBtn.innerText = "Push";
  pushBtn.className = "push";
  pushBtn = box.appendChild(pushBtn);

  var clearBtn = document.createElement("button");
  clearBtn.id = "btnClear";
  clearBtn.innerText = "Clear";
  clearBtn.className = "clear";
  clearBtn = box.appendChild(clearBtn);
  return { pushBtn, clearBtn, input, outBlock };
}
var controls = renderControls();

/**
 * Deleting data and clearing outBlock and hiding it.
 */

function clear() {
  blockArr.length = 0;
  controls.input.value = null;
  controls.outBlock.style = "display: none";
  controls.outBlock.innerHTML = null;
}

/**
 * Creating a new block, assigning the block ID, and name, adding the block to HTML if the block is unique  .
 */

function createBlock() {
  controls.outBlock.style = "display: block";

  var inpValue = controls.input.value;

  var newDiv = document.createElement("div");
  newDiv.id = "newBlock";

  newDiv.name = inpValue;

  if (blockArr.every((item) => item.name !== inpValue)) {
    blockArr.push(newDiv);
    newDiv.innerText = `${inpValue}. Index of this block : ${blockArr.indexOf(
      newDiv
    )}`;
    controls.outBlock.insertBefore(newDiv, newBlock);
    controls.input.value = null;
  } else {
    alert("The block exists");
    controls.input.value = null;
  }
}

controls.clearBtn.onclick = clear;

controls.pushBtn.onclick = createBlock;
