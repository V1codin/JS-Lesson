export default class Notifications {
  constructor(htmlSetts, initSets) {
    const {
      numberNotificationId,
      cityNotificationId,
      branchNumberNotificationId,
    } = htmlSetts;

    const {
      dataInput,
      userCity,
      userBranchNumber,
      userCitySender,
      userCityRecipient,
      userDeliveryWeight,
    } = initSets;

    this.userNumber = dataInput;
    this.userCity = userCity;
    this.userBranchNumber = userBranchNumber;
    this.userCitySender = userCitySender;
    this.userCityRecipient = userCityRecipient;
    this.userDeliveryWeight = userDeliveryWeight;

    this.numberNot = document.querySelector(`#${numberNotificationId}`);
    this.cityNot = document.querySelector(`#${cityNotificationId}`);
    this.branchNot = document.querySelector(`#${branchNumberNotificationId}`);

    this.initNotifications();
  }
  initNotifications() {
    this.userNumber.onfocus = () => {
      this.numberNot.style = "display:block";
    };
    this.userNumber.onblur = () => {
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
}
