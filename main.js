// supplyNumber: "59000527233015",

const elemSettings = {
  inputId: "input-container_user-input",
  buttonId: "wrapper_submit-tracking",
  outDataClass: "container_out",
  historyDataClass: "container_history",
  historyListClass: "history_list",
};

const projectSettings = {
  apiKey: "04ddf8bdb4d9138f496898f46480d4a2",
  baseUrl: "https://api.novaposhta.ua/v2.0/json/",
};

class InitElements {
  constructor(propObject, projSetts) {
    const {
      inputId,
      buttonId,
      outDataClass,
      historyDataClass,
      historyListClass,
    } = propObject;

    const { apiKey, baseUrl } = projSetts;

    this.apiKey = apiKey;
    this.baseUrl = baseUrl;

    this.dataInput = document.querySelector(`#${inputId}`);
    this.submitData = document.querySelector(`#${buttonId}`);

    this.outDataContainer = document.querySelector(`.${outDataClass}`);
    this.historyDataContainer = document.querySelector(`.${historyDataClass}`);

    this.historyList = document.querySelector(`.${historyListClass}`);

    this.historyCounter;
    this.historyData = {
      linkNames: [],
    };
  }
}

class RequestData extends InitElements {
  constructor() {
    super(elemSettings, projectSettings);

    this.submitData.onclick = () => {
      if (this.dataInput.value) {
        const userNumber = this.dataInput.value;

        this.getTrackingData()
          .then((r) => {
            this.updateHistory(userNumber);

            return r;
          })
          .then((q) => {
            this.displayData(q);

            return q;
          });

        this.outDataContainer.style = "display: block";
        this.historyDataContainer.style = "display: block";
      } else {
        alert("Введіть номер ТТН");
      }
    };
  }

  // adding links with number of invoice to history list
  updateHistory(userNumber) {
    const historyLink = document.createElement("a");
    historyLink.name = userNumber;
    this.historyData.linkNames.push(historyLink.name);
    this.historyCounter = this.historyData.linkNames.length;

    historyLink.classList.add(`history_link_${this.historyCounter}`);
    historyLink.href = "#";

    const historyEl = document.createElement("li");
    historyEl.classList.add(`history_element_№_${this.historyCounter}`);

    this.historyData.userNumber = historyLink;

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
          ],
        },
      }),
    }).then((res) => {
      return res.json();
    });
  }

  displayData(promiseRes) {
    this.outDataContainer.innerHTML = `<p>${promiseRes.data[0].Status}</p>`;
    console.log("check");
  }
}

// const request = new RequestData(projectSettings);

const elems = new RequestData();
