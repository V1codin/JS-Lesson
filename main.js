// supplyNumber: "59000527233015",

const projectSettings = {
  inputId: "input-container_user-input",
  buttonId: "wrapper_submit-tracking",
  outDataClass: "container_out",
  historyDataClass: "container_history",
  historyListClass: "history_list",

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
      historyListClass,
    } = set;

    this.apiKey = apiKey;
    this.baseUrl = baseUrl;

    this.dataInput = document.querySelector(`#${inputId}`);
    this.submitData = document.querySelector(`#${buttonId}`);

    this.outDataContainer = document.querySelector(`.${outDataClass}`);
    this.historyDataContainer = document.querySelector(`.${historyDataClass}`);

    this.historyList = document.querySelector(`.${historyListClass}`);

    this.historyCounter;
    this.historyData = [];

    this.submitData.onclick = () => {
      if (this.dataInput.value) {
        const userNumber = this.dataInput.value;

        this.getTrackingData().then((r) => {
          this.updateHistory(userNumber);

          this.outDataContainer.innerHTML += `<p>${r.data[0].Status}</p>`;
        });

        this.outDataContainer.style = "display: block";
        this.historyDataContainer.style = "display: block";
      } else {
        alert("Введіть номер ТТН");
      }
      console.log(this);
    };
  }

  // adding links with number of invoice to history list
  updateHistory(userNumber) {
    let historyEl = document.createElement("li");
    historyEl.classList.add(`history_element_№_${this.historyCounter}`);

    let historyLink = document.createElement("a");
    historyLink.classList.add(`history_link_${this.historyCounter}`);
    historyLink.href = "#";
    historyLink.name = userNumber;

    this.historyData.push(historyLink.name);
    this.historyCounter = this.historyData.length;

    historyLink.innerHTML += `ЕН посилки ${userNumber}`;

    this.historyList.appendChild(historyEl).appendChild(historyLink);
  }

  // getting data from server of user's invoice number
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

  displayData() {
    console.log("check");
  }
}

const test = new RequestData(projectSettings);
