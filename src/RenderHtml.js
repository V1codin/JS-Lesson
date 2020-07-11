class RenderHtml {
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
