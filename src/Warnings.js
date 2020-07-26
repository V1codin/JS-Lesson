class Warnings {
  constructor(renderObj) {
    this.warnContainer = document.querySelector(".warning");

    this.noNumberWarning = "Посилка з таким номером не знайдена";
    this.numberIsAvailableWarning = "Такий номер ТТН вже є в історії пошуку";
    this.incorrectNumberWarning = "Введіть коректний номер ТТН";
  }
  checker(object, checker) {
    switch (checker) {
      case 1:
        return this.warning(object, this.noNumberWarning, this.warnContainer);
      case 2:
        return this.warning(
          object,
          this.numberIsAvailableWarning,
          this.warnContainer
        );

      case 3:
        return this.warning(
          object,
          this.incorrectNumberWarning,
          this.warnContainer
        );
    }
  }
  warning(object, warnText, warnContainer) {
    return object.renderWarning(warnText, warnContainer);
  }
  clear() {
    this.warnContainer.style = "display: none";
    this.warnContainer.innerHTML = null;
  }
}

export default Warnings;
