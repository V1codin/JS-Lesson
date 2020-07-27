import Select from "./select";
import selectSetts from "./selectSetts.json";

import Render from "./RenderHtml";

const btn = document.querySelector(".btn");

const createSel = document.querySelector(".newSelect");

const s = new Select(selectSetts);

createSel.onclick = () => {
  s.createSelect(new Render());
};

btn.onclick = () => {
  console.log("btn");
};
