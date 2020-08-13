class Select {
  constructor(settsObject) {
    const { selectClass, optionsText, articleText, requestName } = settsObject;
    this.select = null;

    this.selectValues = [];

    this.selectClass = selectClass;
    this.optionsText = optionsText;
    this.articleText = articleText;
    this.requestName = requestName;

    this.btn = null;
  }
  createSelect(renderObj) {
    this.clear();

    const parent = document.querySelector(".container");

    const selectBtn = document.createElement("button");
    selectBtn.className = "selector__button";
    selectBtn.innerHTML = "Зробити запит";

    this.btn = selectBtn;

    this.select = renderObj.renderSelect(this, parent);
    this.select.appendChild(selectBtn);
  }
  extractValues() {
    const selectForm = this.select.elements;

    for (let item in selectForm) {
      if (selectForm[item].type === "checkbox" && selectForm[item].checked) {
        this.selectValues.push(selectForm[item].previousSibling.requestValue);
      }
    }
    if (this.selectValues.length > 0) {
      this.deleteSelect();
    } else {
      return false;
    }
  }

  deleteSelect() {
    const parent = document.querySelector(".container");
    parent.removeChild(this.select);
  }
  clear() {
    this.selectValues = null;
    this.selectValues = [];

    this.counter = 0;
    this.select = null;
  }
}

export default Select;
