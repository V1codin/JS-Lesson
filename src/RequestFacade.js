class RequestFacade {
  getTrackingData(obj) {
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
          if (!city && !selectValues.includes("getBranchLoc")) {
            this.getBranchLoc(obj, q.data[0].CityRecipient).then((r) => {
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

  // 59000527233015
  getBranchLoc(obj, trackedCity) {
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
  getDeliveryCost() {
    console.log("getDeliveryCost");
  }

  init(obj) {
    const selectValues = obj.select.selectValues;

    if (selectValues.length) {
      selectValues.forEach((item) => {
        this[item](obj);
      });
    } else {
      return obj.warnings.checker(obj.renderer, 4, obj);
    }

    /*
                this.request.getCityRef(this).then(({ data }) => {
                  const res = data.filter(
                    (item) =>
                      item.DescriptionRu === firstCity.value ||
                      item.DescriptionRu === secondCity.value
                  );
                  console.log("ttttttttt", res);
                });
          */
    /*
    if (selectValues.length > 0) {
      selectValues.forEach((item) => {
        if (item === "getTrackingData") {
          const validationNumber = this.validateNumber(this.dataInput.value);
          if (validationNumber) {
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
                if (!city && selectValues.includes("getBranchLoc")) {
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
        if (item === "getBranchLoc" && !city) {
          const validationNumber = this.validateNumber(this.dataInput.value);
          if (validationNumber) {
            this.request.getTrackingData(this).then((q) => {
              this.request
                .getBranchLoc(this, q.data[0].CityRecipient)
                .then((r) => {
                  this.userCity.value = q.data[0].CityRecipient;
                  this.userBranchNumber.value =
                    q.data[0].WarehouseRecipientNumber;
                  this.displayBranchLocationData(r);
                  return r;
                });
            });
          }
        } else if (item === "getBranchLoc" && city) {
          const validation = this.validationBranch(
            this.userCity.value,
            this.userBranchNumber.value
          );
          if (validation) {
            this.request.getBranchLoc(this, city).then((r) => {
              this.displayBranchLocationData(r);
              return r;
            });
          } else {
            return this.warnings.checker(this.renderer, 6, this);
          }
        }
      });
    }
    */
  }
}

export default RequestFacade;
