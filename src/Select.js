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

  /**
   * Create select via "render" object. Create button of the select and insert it to parent container (button).
   * @param {Object} - Object with render methods.
   */
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

  /**
   * Extract values from the selector to array. If selector has no values delete the selector from DOM (onclick selector button function).
   */
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

  /**
   * Delete the selector from DOM.
   */
  deleteSelect() {
    const parent = document.querySelector(".container");
    parent.removeChild(this.select);
  }

  /**
   * Clear values of the selector and clear link for deleted select in this object.
   */
  clear() {
    this.selectValues = null;
    this.selectValues = [];

    this.select = null;
  }
}

export default Select;
