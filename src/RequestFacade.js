class RequestFacade {
  constructor(initObj) {
    this.props = initObj;
  }

  tracking(obj) {
    const city = obj.userCity.value;
    const selectValues = obj.select.selectValues;

    const validationNumber = obj.validateNumber(obj.dataInput.value);
    if (validationNumber) {
      obj.request
        .getTrackingData(obj)
        .then((r) => {
          if (r.data[0].StatusCode !== "3" && r.data[0].StatusCode !== "2") {
            obj.historyData.updateHistory(obj);
            obj.hiddenCont.forEach((item) => (item.style = "display: block"));
            return r;
          } else {
            throw obj.warnings.checker(obj.renderer, 1, obj);
          }
        })
        .then((q) => {
          if (!city && !selectValues.includes("branchLoc")) {
            this.branchLoc(obj, q.data[0].CityRecipient).then((r) => {
              obj.userCity.value = q.data[0].CityRecipient;
              obj.userBranchNumber.value = q.data[0].WarehouseRecipientNumber;
              obj.displayBranchLocationData(r);
              return r;
            });
            obj.displayTrackingData(q);
            return q;
          } else {
            obj.displayTrackingData(q);
            return q;
          }
        })
        .catch((e) => console.log("Error", e));
    }
  }

  branchLoc(obj, trackedCity) {
    if (trackedCity) {
      return obj.request.getBranchLoc(obj, trackedCity);
    } else {
      let city = obj.userCity.value;
      if (city) {
        const validation = obj.validationBranch(
          obj.userCity.value,
          obj.userBranchNumber.value
        );
        if (validation) {
          return obj.request.getBranchLoc(obj, city).then((r) => {
            obj.displayBranchLocationData(r);
            return r;
          });
        }
      } else if (!obj.userCity.value && !trackedCity) {
        return obj.warnings.checker(obj.renderer, 5, obj);
      }
    }
  }
  cost(obj) {
    obj.request
      .getDeliveryCost(obj)
      .then((r) => {
        console.log(r);

        // obj.displayDeliveryCost(r);
      })
      .catch((e) => {
        throw Error(e);
      });
  }
  reducer() {
    for (let item of arguments) {
      this[item](this.props);
    }
  }

  init() {
    const { selectValues } = this.props.select;

    if (selectValues.length) {
      this.reducer.apply(this, selectValues);
    } else {
      return obj.warnings.checker(obj.renderer, 4, obj);
    }
  }
}

export default RequestFacade;
