import Render from "./RenderHtml";

class Select {
  constructor(settsObject) {
    const { selectClass, optionsText } = settsObject;
    this.select = null;

    this.selectClass = selectClass;
    this.optionsText = optionsText;

    this.counter = 0;
    this.selectedValue = null;
  }
  createSelect() {
    const render = new Render();

    const parent = document.querySelector(".container");
    this.select = render.renderSelect(this, parent);

    this.setParams();

    this.select.onchange = () => {
      this.selectedValue = this.select.value;
      this.deleteSelect();
    };

    this.counter++;
  }
  setParams() {
    this.select.name = "requestName";
  }

  deleteSelect() {
    this.counter = 0;
    const parent = document.querySelector(".container");
    parent.removeChild(this.select);

    this.select = null;
  }
}

export default Select;
