class Warnings {
  constructor(renderObj) {
    this.warnContainer = null;

    this.createWarningContainer();

    this.noNumberWarning = "Посилка з таким номером не знайдена";
    this.numberIsAvailableWarning = "Такий номер ТТН вже є в історії пошуку";
    this.incorrectNumberWarning = "Введіть коректний номер ТТН";
    this.incorrectCity = "Введіть коректну назву міста";
    this.incorrectSelectedData = "Виберіть послугу";
  }
  createWarningContainer() {
    this.warnContainer = document.createElement("div");
    this.warnContainer.className = "warning";

    const parent = document.querySelector("body");
    parent.insertBefore(this.warnContainer, parent.firstChild);
  }
  checker(object, checker, initObj) {
    switch (checker) {
      case 1:
        return this.warning(
          object,
          this.noNumberWarning,
          this.warnContainer,
          initObj
        );
      case 2:
        return this.warning(
          object,
          this.numberIsAvailableWarning,
          this.warnContainer,
          initObj
        );

      case 3:
        return this.warning(
          object,
          this.incorrectNumberWarning,
          this.warnContainer,
          initObj
        );
      case 4:
        return this.warning(
          object,
          this.incorrectSelectedData,
          this.warnContainer,
          initObj,
          true
        );
      case 5:
        return this.warning(
          object,
          this.incorrectCity,
          this.warnContainer,
          initObj,
          true
        );
    }
  }
  warning(object, warnText, warnContainer, initObj, isCity) {
    return object.renderWarning(warnText, warnContainer, initObj, isCity);
  }
  clear() {
    this.warnContainer.style = "display: none";
    this.warnContainer.innerHTML = null;
  }
}

export default Warnings;
