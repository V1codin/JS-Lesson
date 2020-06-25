class DeliveryData {
  constructor(inputId, buttonId) {
    this.dataInput = document.querySelector(`#${inputId}`);
    this.submitData = document.querySelector(`#${buttonId}`);
    this.submitData.onclick = () => console.log("works");
  }

  get myApi() {
    return "e0922b249ed537a7bd58d7b9ad06f827";
  }
}

const test = new DeliveryData(
  "input-container_user-input",
  "wrapper_submit-tracking"
);
