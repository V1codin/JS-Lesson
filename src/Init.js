import StorageData from "./StorageData";
import RenderHtml from "./RenderHtml";
import HistoryData from "./HistoryData";
import RequestData from "./RequestData";
import Warnings from "./Warnings";

/**
 * Creates initial elements and objects from imported classes.
 * @class
 */
class InitElements {
  constructor(propObject, projSetts) {
    const {
      inputId,
      submitButtonId,
      clearButtonId,
      outDataClass,
      historyDataClass,
      historyListClass,
      hiddenClass,
    } = propObject;

    const { apiKey, baseUrl } = projSetts;

    this.apiKey = apiKey;
    this.baseUrl = baseUrl;

    this.dataInput = document.querySelector(`#${inputId}`);
    this.submitData = document.querySelector(`#${submitButtonId}`);
    this.clearButton = document.querySelector(`#${clearButtonId}`);

    this.outDataContainer = document.querySelector(`.${outDataClass}`);
    this.historyDataContainer = document.querySelector(`.${historyDataClass}`);

    this.hiddenCont = document.querySelectorAll(`.${hiddenClass}`);

    this.historyList = document.querySelector(`.${historyListClass}`);

    this.historyData = new HistoryData();
    this.localData = new StorageData(this);
    this.request = new RequestData(this);
    this.renderer = new RenderHtml();

    this.warnings = new Warnings(this.renderer);

    this.mask = /^\d{14}$/;

    this.submitData.onclick = () => {
      const validation = this.validateNumber(this.dataInput.value);
      if (validation) {
        this.request
          .getTrackingData(this)
          .then((r, rej) => {
            if (r.data[0].StatusCode != 3 && r.data[0].StatusCode != 2) {
              this.historyData.updateHistory(this);
              this.hiddenCont.forEach(
                (item) => (item.style = "display: block")
              );
              return r;
            } else {
              throw this.warnings.checker(this.renderer, 1, this);
            }
          })
          .then((q) => {
            this.displayData(q);
            return q;
          });
      }
    };

    this.clearButton.onclick = () => {
      this.warnings.clear();
      this.historyData.clearHistory(this);
    };
  }
  /**
   * Validate number of user's delivery via regular expression.
   * @param {number} - Number of user's delivery.
   */
  validateNumber(number) {
    if (number && this.mask.test(number)) {
      const userNumber = this.dataInput.value;
      if (!this.historyData.dataObj.linkNames.hasOwnProperty(userNumber)) {
        return true;
      } else {
        return this.warnings.checker(this.renderer, 2, this);
      }
    } else {
      this.dataInput.value = null;
      return this.warnings.checker(this.renderer, 3, this);
    }
  }
  /**
   * Display result of sended HTTP request.
   * @param {Object} - Object with properties (result of promise).
   */
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
