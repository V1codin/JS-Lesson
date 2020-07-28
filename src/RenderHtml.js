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
  renderBranchLoc(obj, parentEl) {
    const branchData = obj[0];

    const {
      Monday,
      Tuesday,
      Wednesday,
      Thursday,
      Friday,
      Saturday,
      Sunday,
    } = branchData.Schedule;

    let scheduleDays = {
      Понеділок: Monday,
      Вівторок: Tuesday,
      Середа: Wednesday,
      Четверг: Thursday,
      "П'ятниця": Friday,
      Субота: Saturday,
      Неділя: Sunday,
    };

    let outBranchLoc = document.querySelector(".out__branch-loc");

    if (!outBranchLoc) {
      outBranchLoc = document.createElement("div");
      outBranchLoc.className = "out__branch-loc";
    }
    outBranchLoc.innerHTML = null;

    const article = document.createElement("h3");
    article.className = "out__article";
    article.innerHTML = `Відділення №${branchData.Number}`;

    const description = document.createElement("p");
    description.innerHTML = `Опис: ${branchData.Description}`;

    const status = document.createElement("p");
    if (branchData.WarehouseStatus === "Working") {
      status.style = "color: #03f703";
      status.innerHTML = "Працює";
    } else {
      status.style = "color: #ff1818";
      status.innerHTML = "Не працює";
    }

    const schedule = document.createElement("p");
    schedule.innerHTML = `Графік роботи`;

    const scheduleList = document.createElement("ul");
    scheduleList.className = "branch-loc__list";

    for (let item in scheduleDays) {
      let listEl = document.createElement("li");
      listEl.innerHTML = `${item}: ${scheduleDays[item]}`;

      scheduleList.appendChild(listEl);
    }

    outBranchLoc.appendChild(article);
    outBranchLoc.appendChild(description);
    outBranchLoc.appendChild(status);
    outBranchLoc.appendChild(schedule);
    outBranchLoc.appendChild(scheduleList);

    parentEl.appendChild(outBranchLoc);

    parentEl.style = "display:block";
  }

  /**
   * Create P elements and add them to parent element.
   * @param {Object} - Object with properties.
   * @param {Object} - Object of parent element for the elements to append.
   */
  renderTracking(obj, parentEl) {
    const { Status, CitySender, CityRecipient } = obj;

    let outTracking = document.querySelector(".out__tracking");

    if (!outTracking) {
      outTracking = document.createElement("div");
      outTracking.className = "out__tracking";
    }
    outTracking.innerHTML = null;

    const article = document.createElement("h3");
    article.className = "out__article";
    article.innerHTML = "Відстеження";

    const status = document.createElement("p");
    status.innerHTML = `Статус: ${Status}`;

    const citySender = document.createElement("p");
    citySender.innerHTML = `Маршрут: ${CitySender} - ${CityRecipient}`;

    outTracking.appendChild(article);
    outTracking.appendChild(status);
    outTracking.appendChild(citySender);
    parentEl.insertBefore(outTracking, parentEl.firstChild);

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
