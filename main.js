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

    this.historyData = new historyData();
    this.request = new RequestData(this);

    this.mask = /^\d{14}$/;

    this.submitData.onclick = () => {
      if (this.dataInput.value && this.mask.test(this.dataInput.value)) {
        const userNumber = this.dataInput.value;

        if (!this.historyData.dataObj.linkNames.hasOwnProperty(userNumber)) {
          this.request
            .getTrackingData(this)
            .then((r, rej) => {
              if (r.data[0].StatusCode != 3 && r.data[0].StatusCode != 2) {
                this.historyData.updateHistory(this);

                return r;
              } else {
                throw new Error("Посилка з таким номером не знайдена");
              }
            })
            .then((q) => {
              this.displayData(q);
              return q;
            })
            .catch(alert);

          this.outDataContainer.style = "display: block";
          this.historyDataContainer.style = "display: block";
        } else {
          return alert("Такий номер ТТН вже є в історії пошуку");
        }
      } else {
        this.dataInput.value = null;
        return alert("Введіть коректний номер ТТН");
      }
    };

    this.clearButton.onclick = () => {
      this.historyData.clearHistory(this);
    };
  }
  displayData(promiseRes) {
    let res = promiseRes.data[0];

    let userNumber = res.Number;

    this.historyData.dataObj.links.forEach(
      (item) => (item.parentElement.id = "")
    );

    let activeLink = this.historyData.dataObj.links.filter(
      (item) => userNumber === item.name
    );
    activeLink[0].parentElement.id = "active";

    this.outDataContainer.innerHTML = `<p>Статус: ${res.Status}</p>`;
    this.outDataContainer.innerHTML += `<p>Маршрут: ${res.CitySender} - ${res.CityRecipient}</p>`;
  }
}

class historyData {
  constructor() {
    this.historyCounter = 0;
    this.dataObj = {
      links: [],
      linkNames: {},
    };
  }
  updateHistory(obj) {
    const { dataInput } = obj;
    const userNumber = dataInput.value;

    const historyLink = document.createElement("a");
    historyLink.className = "list_link";
    historyLink.onclick = (e) => {
      obj.request.getTrackingData(obj, e.target.name).then((r) => {
        obj.displayData(r);
        dataInput.value = userNumber;
        return r;
      });
    };
    historyLink.name = userNumber;
    this.historyCounter++;
    this.dataObj.linkNames[historyLink.name] = historyLink.name;

    historyLink.id = `history_link_${this.historyCounter}`;
    historyLink.href = "#out";

    const historyEl = document.createElement("li");
    historyEl.className = "list_element";
    historyEl.id = `history_element_№_${this.historyCounter}`;

    this.dataObj.links.push(historyLink);

    historyLink.innerHTML += `ЕН посилки ${userNumber}`;

    obj.historyList
      .insertBefore(historyEl, obj.historyList.firstChild)
      .appendChild(historyLink);
  }
  clearHistory(obj) {
    this.historyCounter = 0;
    this.dataObj.links.length = 0;

    for (let member in this.dataObj.linkNames)
      delete this.dataObj.linkNames[member];

    obj.historyList.innerHTML = null;
    obj.dataInput.value = null;
    obj.outDataContainer.innerHTML = null;
  }
}

class RequestData {
  getTrackingData(obj, userNubmer) {
    const { apiKey, baseUrl, dataInput } = obj;
    let userValue;
    if (userNubmer) {
      userValue = userNubmer;
    } else if (!userNubmer) {
      userValue = dataInput.value;
    }
    return fetch(baseUrl, {
      method: "POST",
      dataType: "json",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        apiKey: apiKey,
        modelName: "TrackingDocument",
        calledMethod: "getStatusDocuments",
        methodProperties: {
          Documents: [
            {
              DocumentNumber: userValue,
            },
          ],
        },
      }),
    }).then((res) => {
      return res.json();
    });
  }
}

const initBlock = new InitElements(elemSettings, projectSettings);
