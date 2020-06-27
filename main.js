// supplyNumber: "59000527233015",
const projectSettings = {
  inputId: "input-container_user-input",
  buttonId: "wrapper_submit-tracking",
  outDataClass: "container_out",
  historyDataClass: "container_history",

  apiKey: "04ddf8bdb4d9138f496898f46480d4a2",
  baseUrl: "https://api.novaposhta.ua/v2.0/json/",
};

class RequestData {
  constructor(set) {
    const {
      inputId,
      buttonId,
      outDataClass,
      historyDataClass,
      apiKey,
      baseUrl,
    } = set;

    this.apiKey = apiKey;
    this.baseUrl = baseUrl;

    this.dataInput = document.querySelector(`#${inputId}`);
    this.submitData = document.querySelector(`#${buttonId}`);

    this.outDataContainer = document.querySelector(`.${outDataClass}`);
    this.historyDataContainer = document.querySelector(`.${historyDataClass}`);

    this.submitData.onclick = () => {
      if (this.dataInput.value) {
        this.getTrackingData().then((r) => console.log(r.data[0]));
        this.outDataContainer.style = "display: block";
        this.historyDataContainer.style = "display: block";
      } else {
        alert("Введіть номер ТТН");
      }
    };
  }

  getTrackingData() {
    return fetch(this.baseUrl, {
      method: "POST",
      dataType: "json",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        apiKey: this.apiKey,
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
    }).then((res) => {
      return res.json();
    });
  }
}

const test = new RequestData(projectSettings);
