import StorageData from "./StorageData";
import RenderHtml from "./RenderHtml";
import HistoryData from "./HistoryData";
import RequestData from "./RequestData";
import Warnings from "./Warnings";
import Select from "./Select";
import selectSetts from "./SelectSetts.json";

/**
 * Creates initial elements and objects from imported classes.
 * @class
 */
class InitElements {
  constructor(propObject, projSetts) {
    const {
      userNumberId,
      initButtonId,
      clearButtonId,
      outDataClass,
      historyDataClass,
      historyListClass,
      hiddenClass,
      userCityId,
    } = propObject;

    const { apiKey, baseUrl } = projSetts;

    this.apiKey = apiKey;
    this.baseUrl = baseUrl;

    this.dataInput = document.querySelector(`#${userNumberId}`);
    this.userCity = document.querySelector(`#${userCityId}`);
    this.initBtn = document.querySelector(`#${initButtonId}`);
    this.clearButton = document.querySelector(`#${clearButtonId}`);

    this.outDataContainer = document.querySelector(`.${outDataClass}`);
    this.historyDataContainer = document.querySelector(`.${historyDataClass}`);

    this.hiddenCont = document.querySelectorAll(`.${hiddenClass}`);

    this.historyList = document.querySelector(`.${historyListClass}`);

    this.historyData = new HistoryData();
    this.localData = new StorageData(this);
    this.request = new RequestData();
    this.renderer = new RenderHtml();
    this.select = new Select(selectSetts);

    this.warnings = new Warnings(this.renderer);

    this.mask = /^\d{14}$/;

    this.initBtn.onclick = () => {
      this.select.createSelect(this.renderer);
      this.select.btn.onclick = (e) => {
        e.preventDefault();
        this.select.extractValues();
        this.initiateRequest();
      };
    };

    this.clearButton.onclick = () => {
      this.warnings.clear();
      this.historyData.clearHistory(this);
    };
  }
  initiateRequest() {
    const selectValues = this.select.selectValues;
    const city = this.userCity.value;

    if (selectValues.length > 0) {
      selectValues.forEach((item) => {
        if (item === "getTrackingData") {
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
        }
        if (item === "getBranchLoc" && city) {
          this.request
            .getBranchLoc(this, city)
            .then((r) => console.log(r.data))
            .catch((er) => console.log(er));
        } else if (item === "getBranchLoc" && !city) {
          return this.warnings.checker(this.renderer, 5, this);
        }
      });
    } else {
      return this.warnings.checker(this.renderer, 4, this);
    }
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
