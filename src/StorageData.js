/**
 * Creates a storage for history data and processes local storage.
 * @class
 */
class StorageData {
  constructor(obj) {
    this.localHistory = [];
    this.checker(obj);
  }
  /**
   * Add number of user's delivery from HISTORY OBJECT
   * to created array and to local storage.
   * @param {number} - Number of user's delivery.
   * @param {number} - Counter of user's deliveries.
   */
  addNumber(number, index) {
    this.localHistory.push(number);
    localStorage.setItem(`number ${index}`, number);
  }

  /**
   * Add number of user's delivery from LOCAL STORAGE to created array.
   */
  extractData() {
    for (let item in localStorage) {
      if (item.includes("number")) {
        this.localHistory.push(localStorage[item]);
      }
    }
  }

  /**
   * Display history data.
   * @param {Object} - Object with properties.
   */
  render(obj) {
    this.localHistory.forEach((item) => {
      obj.historyData.updateHistory(obj, item);
    });
    obj.outDataContainer.style = "display: block";
    obj.historyDataContainer.style = "display: block";
  }

  /**
   * Check for inputed data in local storage.
   * @param {Object} - Object with properties.
   */
  checker(obj) {
    if (localStorage.length > 0) {
      this.extractData();
      this.render(obj);
    }
  }

  /**
   * Clear history array and local storage.
   */
  clearData() {
    this.localHistory.length = 0;
    localStorage.clear();
  }
}

export default StorageData;
