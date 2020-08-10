export default class Notifications {
  constructor(htmlSetts, initSets) {
    const {
      numberNotificationId,
      cityNotificationId,
      branchNumberNotificationId,
      citySenderNotificationId,
      cityRecipientotificationId,
      deliveryWeightId,
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
    this.citySenderNot = document.querySelector(`#${citySenderNotificationId}`);
    this.cityRecipientNot = document.querySelector(
      `#${cityRecipientotificationId}`
    );
    this.deliveryWeightNot = document.querySelector(`#${deliveryWeightId}`);

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
    this.userCitySender.onfocus = () => {
      this.citySenderNot.style = "display:block";
    };
    this.userCitySender.onblur = () => {
      this.citySenderNot.style = "display:none";
    };
    this.userCityRecipient.onfocus = () => {
      this.cityRecipientNot.style = "display:block";
    };
    this.userCityRecipient.onblur = () => {
      this.cityRecipientNot.style = "display:none";
    };
    this.userDeliveryWeight.onfocus = () => {
      this.deliveryWeightNot.style = "display:block";
    };
    this.userDeliveryWeight.onblur = () => {
      this.deliveryWeightNot.style = "display:none";
    };
  }
}
