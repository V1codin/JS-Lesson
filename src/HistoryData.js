/**
 * Creates a storage for history and its elements.
 * Also displays them.
 * @class
 */
class HistoryData {
  constructor() {
    this.historyCounter = 0;
    this.dataObj = {
      links: [],
      linkNames: {},
    };
  }
  /**
     * creating HTML "a" element and adding: 
      className, attribute "name", increasing history counter,
      attribute "id", onclick function
      and added the name to linkNames object
     * @param {object} - Object with properties.
     * @param {number} - Number of user's delivery.
     */
  updateHistory(obj, index) {
    const { dataInput } = obj;
    const userNumber = dataInput.value;

    const historyLink = document.createElement("a");
    historyLink.className = "list_link";
    historyLink.onclick = (e) => {
      obj.request.getTrackingData(obj, e.target.name).then((r) => {
        obj.displayData(r);
        obj.dataInput.value = e.target.name;
        return r;
      });
    };
    if (index) {
      historyLink.name = index;
    } else {
      historyLink.name = userNumber;
    }
    this.historyCounter++;
    this.dataObj.linkNames[historyLink.name] = historyLink.name;

    historyLink.id = `history_link_${this.historyCounter}`;
    historyLink.href = "#";

    /*creating HTML "li" element and adding: 
      className, attribute "id", added the element to links array
      */
    const historyEl = document.createElement("li");
    historyEl.className = "list_element";
    historyEl.id = `history_element_№_${this.historyCounter}`;

    this.dataObj.links.push(historyLink);

    if (index) {
      historyLink.innerHTML += `ЕН посилки ${index}`;
    } else {
      historyLink.innerHTML += `ЕН посилки ${userNumber}`;
    }

    obj.historyList
      .insertBefore(historyEl, obj.historyList.firstChild)
      .appendChild(historyLink);
    if (!index) {
      obj.localData.addNumber(historyLink.name, this.historyCounter);
    }
  }
  /**
   *Clearing records of history
   * @param {object} - Object with properties.
   */
  clearHistory(obj) {
    this.historyCounter = 0;
    this.dataObj.links.length = 0;

    for (let member in this.dataObj.linkNames)
      delete this.dataObj.linkNames[member];

    obj.historyList.innerHTML = null;
    obj.dataInput.value = null;
    obj.outDataContainer.innerHTML = null;

    obj.outDataContainer.style = "display: none";
    obj.historyDataContainer.style = "display: none";

    obj.localData.clearData();
  }
}

export default HistoryData;
