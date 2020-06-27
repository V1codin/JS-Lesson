// 59000527233015

class DeliveryData {
  constructor(inputId, buttonId, outDataClass, historyDataClass) {
    this.dataInput = document.querySelector(`#${inputId}`);
    this.submitData = document.querySelector(`#${buttonId}`);

    this.outDataContainer = document.querySelector(`.${outDataClass}`);
    this.historyDataContainer = document.querySelector(`.${historyDataClass}`);

    this.submitData.onclick = () => {
      console.log("url", this.myUrl);
      console.log("api", this.myApi);
      console.log("inp value", this.dataInput.value);

      if (this.dataInput.value) {
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
          .then((r) => console.log(r.data[0]));

        this.outDataContainer.style = "display: block";
        this.historyDataContainer.style = "display: block";
      }
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
  "wrapper_submit-tracking",
  "container_out",
  "container_history"
);
