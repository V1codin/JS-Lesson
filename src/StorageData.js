class StorageData {
  constructor(obj) {
    this.localHistory = [];
    this.checker(obj);
  }
  addNumber(number, index) {
    this.localHistory.push(number);
    localStorage.setItem(`number ${index}`, number);
  }
  extractData() {
    for (let item in localStorage) {
      if (item.includes("number")) {
        this.localHistory.push(localStorage[item]);
      }
    }
  }
  render(obj) {
    for (let i = 0; i < this.localHistory.length; i++) {
      obj.historyData.updateHistory(obj, this.localHistory[i]);
    }
    obj.outDataContainer.style = "display: block";
    obj.historyDataContainer.style = "display: block";
  }
  checker(obj) {
    if (localStorage.length > 0) {
      this.extractData();
      this.render(obj);
    }
  }
  clearData() {
    this.localHistory.length = 0;
    localStorage.clear();
  }
}

export default StorageData;
