import StorageData from "./StorageData";
import RenderHtml from "./RenderHtml";
import HistoryData from "./HistoryData";
import RequestData from "./RequestData";

class InitElements {
  constructor(propObject, projSetts) {
    const {
      inputId,
      submitButtonId,
      clearButtonId,
      outDataClass,
      historyDataClass,
      historyListClass,
    } = propObject;

    const { apiKey, baseUrl } = projSetts;

    this.apiKey = apiKey;
    this.baseUrl = baseUrl;

    this.dataInput = document.querySelector(`#${inputId}`);
    this.submitData = document.querySelector(`#${submitButtonId}`);
    this.clearButton = document.querySelector(`#${clearButtonId}`);

    this.outDataContainer = document.querySelector(`.${outDataClass}`);
    this.historyDataContainer = document.querySelector(`.${historyDataClass}`);

    this.historyList = document.querySelector(`.${historyListClass}`);

    this.historyData = new HistoryData();
    this.localData = new StorageData(this);
    this.request = new RequestData(this);
    this.renderer = new RenderHtml();

    this.mask = /^\d{14}$/;

    this.submitData.onclick = () => {
      const validation = this.validateNumber(this.dataInput.value);
      if (validation) {
        this.request
          .getTrackingData(this)
          .then((r, rej) => {
            if (r.data[0].StatusCode != 3 && r.data[0].StatusCode != 2) {
              this.historyData.updateHistory(this);

              this.outDataContainer.style = "display: block";
              this.historyDataContainer.style = "display: block";
              return r;
            } else {
              throw new Error("Посилка з таким номером не знайдена");
            }
          })
          .then((q) => {
            this.displayData(q);
            return q;
          })
          .catch(alert);
      }
    };

    this.clearButton.onclick = () => {
      this.historyData.clearHistory(this);
    };
  }

  validateNumber(number) {
    if (number && this.mask.test(number)) {
      const userNumber = this.dataInput.value;
      if (!this.historyData.dataObj.linkNames.hasOwnProperty(userNumber)) {
        return true;
      } else {
        return alert("Такий номер ТТН вже є в історії пошуку");
      }
    } else {
      this.dataInput.value = null;
      return alert("Введіть коректний номер ТТН");
    }
  }

  displayData(promiseRes) {
    const { data } = promiseRes;
    const res = data[0];

    const userNumber = res.Number;

    this.historyData.dataObj.links.forEach(
      (item) => (item.parentElement.id = "")
    );

    let activeLink = this.historyData.dataObj.links.filter(
      (item) => userNumber === item.name
    );
    activeLink[0].parentElement.id = "active";

    this.renderer.renderResult(res, this.outDataContainer);
  }
}

export default InitElements;
