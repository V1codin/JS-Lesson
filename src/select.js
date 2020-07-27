class Select {
  constructor(settsObject) {
    const { selectClass, optionsText, articleText } = settsObject;
    this.select = null;

    this.selectValues = {};

    this.selectClass = selectClass;
    this.optionsText = optionsText;
    this.articleText = articleText;

    this.counter = 0;
  }
  createSelect(renderObj) {
    this.clear();

    const parent = document.querySelector(".container");

    const selectBtn = document.createElement("button");
    selectBtn.className = "selector__button";
    selectBtn.innerHTML = "Відіслати";

    selectBtn.onclick = (e) => {
      e.preventDefault();
      this.extractValues();
    };

    this.select = renderObj.renderSelect(this, parent);
    this.select.appendChild(selectBtn);

    this.counter++;
  }
  extractValues() {
    const selectForm = this.select.elements;

    for (let item in selectForm) {
      if (selectForm[item].type === "checkbox" && selectForm[item].checked) {
        this.selectValues[item] = selectForm[item].previousSibling.innerText;
      }
    }
    console.log(this.selectValues);
    this.deleteSelect();
  }

  deleteSelect() {
    const parent = document.querySelector(".container");
    parent.removeChild(this.select);
  }
  clear() {
    this.selectValues = null;
    this.selectValues = {};
    this.counter = 0;
    this.select = null;
  }
}

export default Select;
