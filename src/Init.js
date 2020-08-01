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
      userBranchNumberId,
      numberNotificationId,
      cityNotificationId,
      branchNumberNotificationId,
    } = propObject;

    const { apiKey, baseUrl } = projSetts;

    this.apiKey = apiKey;
    this.baseUrl = baseUrl;

    this.dataInput = document.querySelector(`#${userNumberId}`);
    this.userCity = document.querySelector(`#${userCityId}`);
    this.userBranchNumber = document.querySelector(`#${userBranchNumberId}`);

    this.initBtn = document.querySelector(`#${initButtonId}`);
    this.clearButton = document.querySelector(`#${clearButtonId}`);

    this.numberNot = document.querySelector(`#${numberNotificationId}`);
    this.cityNot = document.querySelector(`#${cityNotificationId}`);
    this.branchNot = document.querySelector(`#${branchNumberNotificationId}`);

    this.outDataContainer = document.querySelector(`.${outDataClass}`);
    this.historyDataContainer = document.querySelector(`.${historyDataClass}`);

    this.hiddenCont = document.querySelectorAll(`.${hiddenClass}`);

    this.historyList = document.querySelector(`.${historyListClass}`);

    this.historyData = new HistoryData();
    this.localData = new StorageData(this);
    this.request = new RequestData();
    this.renderer = new RenderHtml();
    this.select = new Select(selectSetts);

    this.warnings = new Warnings();

    this.maskNumber = /^\d{14}$/;
    this.maskCity = /^([а-яА-ЯёЁії]+[-]?[а-яА-ЯёЁії]*[-]?[а-яА-ЯёЁії]*[-]?[а-яА-ЯёЁії]*)$/i;

    this.initNotifications();

    this.initBtn.onclick = () => {
      this.initiateSelect();
    };

    this.clearButton.onclick = () => {
      this.warnings.clear();
      this.historyData.clearHistory(this);
    };
  }
  initNotifications() {
    this.dataInput.onfocus = () => {
      this.numberNot.style = "display:block";
    };
    this.dataInput.onblur = () => {
      this.numberNot.style = "display:none";
    };
    this.userCity.onfocus = () => {
      this.cityNot.style = "display:block";
    };
    this.userCity.onblur = () => {
      this.cityNot.style = "display:none";
    };
    this.userBranchNumber.onfocus = () => {
      this.branchNot.style = "display:block";
    };
    this.userBranchNumber.onblur = () => {
      this.branchNot.style = "display:none";
    };
  }

  initiateSelect() {
    this.select.createSelect(this.renderer);
    this.select.btn.onclick = (e) => {
      e.preventDefault();
      this.outDataContainer.innerHTML = null;
      this.select.extractValues();
      this.initiateRequest();
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
              .then((r) => {
                if (
                  r.data[0].StatusCode !== "3" &&
                  r.data[0].StatusCode !== "2"
                ) {
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
                if (!city) {
                  this.request
                    .getBranchLoc(this, q.data[0].CityRecipient)
                    .then((r) => {
                      this.userCity.value = q.data[0].CityRecipient;
                      this.userBranchNumber.value =
                        q.data[0].WarehouseRecipientNumber;
                      this.displayBranchLocationData(r);
                      return r;
                    });
                  this.displayTrackingData(q);
                  return q;
                } else {
                  this.displayTrackingData(q);
                  return q;
                }
              });
          }
        }
        if (item === "getBranchLoc" && city) {
          const validation = this.validationBranch(
            this.userCity.value,
            this.userBranchNumber.value
          );
          if (validation) {
            this.request.getBranchLoc(this, city).then((r) => {
              const t0 = performance.now();
              this.displayBranchLocationData(r);
              const t1 = performance.now();
              console.log("time", t1 - t0);
              return r;
            });
          } else {
            return this.warnings.checker(this.renderer, 6, this);
          }
        } else if (item === "getBranchLoc" && !city) {
          return this.warnings.checker(this.renderer, 5, this);
        }
      });
    } else {
      return this.warnings.checker(this.renderer, 4, this);
    }
  }

  /**
   * Validate city and branch number of a user.
   * @param {string} - Name of user's city.
   * @param {sting} - Number of user's branch.
   */
  validationBranch(city, branchNum) {
    if (this.maskCity.test(city)) {
      if (city && branchNum && isFinite(branchNum)) {
        return true;
      } else if (!city && !branchNum) {
        return this.warnings.checker(this.renderer, 6, this);
      } else if (!city && branchNum) {
        return this.warnings.checker(this.renderer, 5, this);
      } else if (city && !branchNum) {
        return this.warnings.checker(this.renderer, 7, this);
      } else if (city && !isFinite(branchNum)) {
        return this.warnings.checker(this.renderer, 7, this);
      }
    } else {
      return this.warnings.checker(this.renderer, 5, this);
    }
  }
  /**
   * Validate number of user's delivery via regular expression.
   * @param {string} - Number of user's delivery.
   */
  validateNumber(number) {
    if (number && this.maskNumber.test(number)) {
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
   * Display result of sended HTTP tracking delivery request.
   * @param {Object} - Object with properties (result of promise).
   */
  displayTrackingData(promiseRes) {
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

    this.renderer.renderTracking(res, this.outDataContainer);
  }
  /**
   * Display result of sended HTTP branch location request.
   * @param {Object} - Object with properties (result of promise).
   */
  displayBranchLocationData(promiseRes) {
    const branchNum = this.userBranchNumber.value;

    const { data } = promiseRes;
    if (data.length > 0) {
      const res = data.filter((item) => item.Number === branchNum);
      if (res.length) {
        this.renderer.renderBranchLoc(res, this.outDataContainer);
      } else {
        return this.warnings.checker(this.renderer, 7, this);
      }
    } else {
      return this.warnings.checker(this.renderer, 6, this);
    }
  }
}

export default InitElements;
