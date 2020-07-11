/**
 * Creates HTML elements and adds them to HTML file.
 * @class
 */
class RenderHtml {
  /**
   * Create P elements and add them to parent element.
   * @param {object} - Object with properties.
   * @param {object} y - Object of parent element for the elements to append.
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
}

export default RenderHtml;
