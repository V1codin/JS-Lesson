class DeliveryData {
  constructor(inputId, buttonId) {
    this.dataInput = document.querySelector(`#${inputId}`);
    this.submitData = document.querySelector(`#${buttonId}`);
    this.submitData.onclick = () => {
      console.log("url", this.myUrl);
      console.log("api", this.myApi);
      console.log("inp value", this.dataInput.value);

      fetch(this.myUrl, {
        method: "POST",
        dataType: "json",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          apiKey: this.myApi,
          modelName: "TrackingDocument",
          calledMethod: "getStatusDocuments",
          methodProperties: {
            Documents: [
              {
                DocumentNumber: this.dataInput.value,
                Phone: "",
              },
              {
                DocumentNumber: this.dataInput.value,
                Phone: "",
              },
            ],
          },
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => console.log(data));
    };
  }

  displayTracking() {
    console.log("track");
  }

  get myApi() {
    return "04ddf8bdb4d9138f496898f46480d4a2";
  }
  get myUrl() {
    return "https://api.novaposhta.ua/v2.0/json/";
  }
}

const test = new DeliveryData(
  "input-container_user-input",
  "wrapper_submit-tracking"
);
