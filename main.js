const elemSettings = {
  inputId: "input-container_user-input",
  submitButtonId: "wrapper_submit-tracking",
  clearButtonId: "wrapper_clear-history",
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
      submitButtonId,
      clearButtonId,
      outDataClass,
      historyDataClass,
      historyListClass,
    } = propObject;

    const { apiKey, baseUrl } = projSetts;

    this.apiKey = apiKey;
    this.baseUrl = baseUrl;

    this.dataInput = document.querySelector(`#${inputId}`);
    this.submitData = document.querySelector(`#${submitButtonId}`);
    this.clearButton = document.querySelector(`#${clearButtonId}`);

    this.outDataContainer = document.querySelector(`.${outDataClass}`);
    this.historyDataContainer = document.querySelector(`.${historyDataClass}`);

    this.historyList = document.querySelector(`.${historyListClass}`);

    this.historyCounter;
    this.historyData = {
      links: [],
      linkNames: [],
    };

    this.mask = /^\d{14}$/;
  }
}

class RequestData extends InitElements {
  constructor() {
    super(elemSettings, projectSettings);

    this.submitData.onclick = () => {
      if (this.dataInput.value && this.mask.test(this.dataInput.value)) {
        const userNumber = this.dataInput.value;

        if (this.historyData.linkNames.every((item) => item !== userNumber)) {
          this.getTrackingData(userNumber)
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
          alert("Такий номер ТТН вже є в історії пошуку");
        }
      } else {
        alert("Введіть коректний номер ТТН");
        this.dataInput.value = null;
      }
    };

    this.clearButton.onclick = this.clearHistory.bind(this);
  }

  clearHistory() {
    this.historyData.links.length = 0;
    this.historyData.linkNames.length = 0;
    this.historyList.innerHTML = null;
    this.dataInput.value = null;
    this.outDataContainer.innerHTML = null;
  }

  // adding links with number of invoice to history list
  updateHistory(userNumber) {
    const historyLink = document.createElement("a");

    historyLink.onclick = () => {
      this.getTrackingData(userNumber).then((r) => {
        this.displayData(r);
        this.dataInput.value = userNumber;
        return r;
      });
    };

    historyLink.name = userNumber;
    this.historyData.linkNames.push(historyLink.name);
    this.historyCounter = this.historyData.linkNames.length;

    historyLink.classList.add(`history_link_${this.historyCounter}`);
    historyLink.href = "#out";

    const historyEl = document.createElement("li");
    historyEl.classList.add(`history_element_№_${this.historyCounter}`);

    this.historyData.links.push(historyLink);

    historyLink.innerHTML += `ЕН посилки ${userNumber}`;

    this.historyList
      .insertBefore(historyEl, this.historyList.firstChild)
      .appendChild(historyLink);
  }

  // getting data from server of user's invoice number
  getTrackingData(data) {
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
              DocumentNumber: data,
            },
          ],
        },
      }),
    }).then((res) => {
      return res.json();
    });
  }

  displayData(promiseRes) {
    let res = promiseRes.data[0];
    let userNumber = res.Number;

    this.historyData.links.forEach((item) => (item.parentElement.id = ""));

    let activeLink = this.historyData.links.filter(
      (item) => userNumber === item.name
    );
    activeLink[0].parentElement.id = "active";

    this.outDataContainer.innerHTML = `<p>Статус: ${res.Status}</p>`;
    this.outDataContainer.innerHTML += `<p>Статус код: ${res.StatusCode}</p>`;
  }
}

const init = new RequestData();
