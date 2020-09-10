class Warnings {
  constructor() {
    this.warnContainer = null;

    this.createWarningContainer();

    this.noNumberWarning = "Посилка з таким номером не знайдена";
    this.numberIsAvailableWarning = "Такий номер ТТН вже є в історії пошуку";
    this.incorrectNumberWarning = "Введіть коректний номер ТТН";
    this.incorrectCityWarning = "Введіть коректну назву міста";
    this.incorrectSelectedDataWarning = "Виберіть послугу";
    this.incorrectCityBranchWarning =
      "Введіть коректну назву міста та номер відділення";
    this.incorrectBranchWarning = "Введіть коректний номер відділення";
    this.incorrectCity = `  - некоректна назва міста`;
    this.incorretWeight = "Введіть коректну вагу посилки";
  }

  /**
   * Create container for warnings and insert it to "body" element (div).
   */
  createWarningContainer() {
    this.warnContainer = document.createElement("div");
    this.warnContainer.className = "warning";

    const parent = document.querySelector("body");
    parent.insertBefore(this.warnContainer, parent.firstChild);
  }

  /**
   * Initiating warning.
   * @param {Object} - Object with render methods.
   * @param {number} - Number for identification which warning to render.
   * @param {Object} - Object with properties.
   * @param {string} - Name of incorrect city (on demand).
   */
  checker(renderObj, checker, initObj, cityName) {
    switch (checker) {
      case 1:
        return this.warning(
          renderObj,
          this.noNumberWarning,
          this.warnContainer,
          initObj
        );
      case 2:
        return this.warning(
          renderObj,
          this.numberIsAvailableWarning,
          this.warnContainer,
          initObj
        );

      case 3:
        return this.warning(
          renderObj,
          this.incorrectNumberWarning,
          this.warnContainer,
          initObj
        );
      case 4:
        return this.warning(
          renderObj,
          this.incorrectSelectedDataWarning,
          this.warnContainer,
          initObj,
          true
        );
      case 5:
        return this.warning(
          renderObj,
          this.incorrectCityWarning,
          this.warnContainer,
          initObj,
          true
        );
      case 6:
        return this.warning(
          renderObj,
          this.incorrectCityBranchWarning,
          this.warnContainer,
          initObj,
          true
        );
      case 7:
        return this.warning(
          renderObj,
          this.incorrectBranchWarning,
          this.warnContainer,
          initObj,
          true
        );
      case 8:
        return this.warning(
          renderObj,
          cityName + this.incorrectCity,
          this.warnContainer,
          initObj
        );
      case 9:
        return this.warning(
          renderObj,
          this.incorretWeight,
          this.warnContainer,
          initObj
        );
    }
  }

  /**
   * Render warning.
   * @param {Object} - Object with render methods.
   * @param {string} - Text of the warning to render.
   * @param {Object} - Object of parent element for the warning to append.
   * @param {Object} - Object with properties.
   * @param {string} - Name of incorrect city (on demand).
   * @param {boolean} - Is city warning needed.
   */
  warning(renderObj, warnText, warnContainer, initObj, isCity) {
    return renderObj.renderWarning(warnText, warnContainer, initObj, isCity);
  }

  /**
   * Hide warning block and clear its text.
   */
  clear() {
    this.warnContainer.style = "display: none";
    this.warnContainer.innerHTML = null;
  }
}

export default Warnings;
