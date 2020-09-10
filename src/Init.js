import StorageData from "./StorageData";
import RenderHtml from "./RenderHtml";
import HistoryData from "./HistoryData";
import RequestData from "./RequestData";
import Warnings from "./Warnings";
import Select from "./Select";
import selectSetts from "./SelectSetts.json";
import Notifs from "./Notifications";

import RequestFacade from "./RequestFacade";

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
      userDeliveryWeightId,
      costSenderId,
      costRecipientId,
    } = propObject;

    const { apiKey, baseUrl } = projSetts;

    this.apiKey = apiKey;
    this.baseUrl = baseUrl;

    this.dataInput = document.querySelector(`#${userNumberId}`);

    this.userCity = document.querySelector(`#${userCityId}`);
    this.userBranchNumber = document.querySelector(`#${userBranchNumberId}`);

    this.costCitySender = document.querySelector(`#${costSenderId}`);
    this.costCityRecipient = document.querySelector(`#${costRecipientId}`);
    this.userDeliveryWeight = document.querySelector(
      `#${userDeliveryWeightId}`
    );

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
    this.Notifs = new Notifs(propObject, this);

    this.warnings = new Warnings();

    this.maskNumber = /^\d{14}$/;
    this.maskCity = /^([а-яА-ЯёЁії]+[-]?[а-яА-ЯёЁії]*[-]?[а-яА-ЯёЁії]*[-]?[а-яА-ЯёЁії]*)$/i;

    this.initiateCitiesRequest();

    this.initBtn.onclick = () => {
      this.initiateSelect();
    };

    this.clearButton.onclick = () => {
      this.warnings.clear();
      this.historyData.clearHistory(this);
    };
  }
  /**
   * Initiating HTTP request to get information from server about referral codes of cities where Nova Poshta has branches.
   */
  initiateCitiesRequest() {
    this.request.getCityRef(this).then(({ data }) => {
      data.forEach((item) => {
        this.renderer.renderCities(
          item,
          this.costCitySender,
          this.costCityRecipient
        );
      });
    });
  }
  /**
   * Initiating rendering a selector with application options.
   */
  initiateSelect() {
    this.select.createSelect(this.renderer);
    this.select.btn.onclick = (e) => {
      e.preventDefault();

      this.outDataContainer.innerHTML = null;
      this.select.extractValues();
      if (this.select.selectValues.length > 0) {
        new RequestFacade(this).init();
      } else {
        return this.warnings.checker(this.renderer, 4, this);
      }
    };
  }

  /**
   * Validate weight.
   * @param {number} - Weight of user's delivery.
   */
  validationWeight(weight) {
    if (weight && isFinite(weight)) {
      return true;
    } else {
      return this.warnings.checker(this.renderer, 9, this);
    }
  }

  /**
   * Validate city.
   * @param {string} - Name of user's city.
   */
  validationCity(city) {
    if (this.maskCity.test(city)) {
      return true;
    } else {
      return this.warnings.checker(this.renderer, 8, this, city);
    }
  }
  /**
   * Validate city and branch number of a user.
   * @param {string} - Name of user's city.
   * @param {sting} - Number of user's branch.
   */
  validationBranch(city, branchNum) {
    if (this.validationCity(city)) {
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
  /**
   * Display result of sended HTTP delivaery cost request.
   * @param {Object} - Object with properties (result of promise).
   */
  displayDeliveryCost(promiseRes) {
    const sender = this.costCitySender.selectedOptions[0].innerText;
    const recipient = this.costCityRecipient.selectedOptions[0].innerText;

    const { data } = promiseRes;
    if (data.length > 0) {
      const res = {
        cost: data[0].CostWarehouseWarehouse,
        sender: sender,
        reciver: recipient,
        weight: this.userDeliveryWeight.value,
      };
      this.renderer.renderDeliveryCost(res, this.outDataContainer);
    }
  }
}

export default InitElements;
