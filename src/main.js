import Select from "./select";
import selectSetts from "./selectSetts.json";

const btn = document.querySelector(".btn");

const createSel = document.querySelector(".newSelect");

const s = new Select(selectSetts);

createSel.onclick = () => {
  s.createSelect();
};

btn.onclick = () => {
  console.log(s.selectedValue);
};
