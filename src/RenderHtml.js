/**
 * Creates HTML elements and adds them to HTML file.
 * @class
 */
class RenderHtml {
  renderSelect(propObj, parentEl) {
    const { selectClass, optionsText, articleText, requestName } = propObj;

    const select = document.createElement("form");
    select.className = selectClass;

    const article = document.createElement("h3");
    article.className = "select__article";
    article.innerHTML = articleText;
    select.append(article);

    for (let i = 0; i < optionsText.length; i++) {
      let option = document.createElement("div");
      option.className = "selector__option";

      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "selector__checkbox";
      checkbox.id = i;

      let label = document.createElement("label");
      label.className = "selector__label";
      label.setAttribute("for", i);
      label.innerHTML = optionsText[i];
      label.requestValue = requestName[i];

      option.append(label, checkbox);
      select.appendChild(option);
    }

    parentEl.insertBefore(select, parentEl.firstChild);

    return select;
  }
  /**
   * Create P elements and add them to parent element.
   * @param {Object} - Object with properties.
   * @param {Object} - Object of parent element for the elements to append.
   */
  renderResult(obj, parentEl) {
    parentEl.innerHTML = null;

    const { Status, CitySender, CityRecipient } = obj;

    const status = document.createElement("p");
    status.innerHTML = `Статус: ${Status}`;

    const citySender = document.createElement("p");
    citySender.innerHTML = `Маршрут: ${CitySender} - ${CityRecipient}`;

    parentEl.appendChild(status);
    parentEl.appendChild(citySender);

    parentEl.style = "display:block";
  }
  /**
   * Create DIV P and BUTTON and appent those to warning container.
   * Add a function to the BUTTON to clear warning container and hide it.
   * @param {string} - Text of the warning to display.
   */
  renderWarning(warningText, parentEl, obj, isCity) {
    if (parentEl.innerHTML.includes("div")) {
      return false;
    } else {
      const warnHeader = document.createElement("div");
      warnHeader.className = "warning_header";
      warnHeader.innerHTML = "Упс! Щось пішло не так";

      const warnArticle = document.createElement("p");
      warnArticle.className = "article_font-mod";
      warnArticle.innerHTML = warningText;

      const okBtn = document.createElement("button");
      okBtn.className = "warning_closeBtn";
      okBtn.innerHTML = "Зрозуміло";
      okBtn.onclick = () => {
        parentEl.style = "display: none";
        parentEl.innerHTML = null;
      };

      parentEl.append(warnHeader, warnArticle, okBtn);

      if (obj.dataInput.value && !isCity) {
        const deliveryNumber = document.createElement("p");
        deliveryNumber.style = "color:red";
        deliveryNumber.innerHTML = obj.dataInput.value;

        parentEl.insertBefore(deliveryNumber, warnArticle);
      }

      parentEl.style = "display: flex";
    }
  }
}

export default RenderHtml;
