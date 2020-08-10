/**
 * Creates HTTP request.
 * @class
 */
class RequestData {
  getCityRef(obj) {
    const { apiKey, baseUrl, city } = obj;
    return fetch(baseUrl, {
      method: "POST",
      dataType: "json",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        apiKey: apiKey,
        modelName: "Address",
        calledMethod: "getCities",
        methodProperties: {
          Language: "ru",
          FindByString: city,
        },
      }),
    })
      .then((r) => r.json())
      .catch((r) => console.log(r));
  }

  getDeliveryCost(obj) {
    const { apiKey, baseUrl, refCityFrom, refCityTo, deliveryWeight } = obj;
    return fetch(baseUrl, {
      method: "POST",
      dataType: "json",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        MarketplacePartnerToken: "005056b2fc3d-ab8b-11e7-7857-d4f086bf",
        apiKey: apiKey,
        calledMethod: "getDocumentPrice",
        language: "ua",
        methodProperties: {
          CityRecipient: refCityTo,
          CitySender: refCityFrom,
          Cost: "200",
          Weight: Number(deliveryWeight),
        },
        modelName: "InternetDocument",
      }),
    });
    /*
      .then((res) => {
        return res.json();
      })
      .then(({ data }) => {
        console.log("delivery cost data", data);
      });
      */
  }

  /**
   * Create and send HTTP request and process it.
   * @param {Object} - Object with properties.
   * @param {number} - Number of user's delivery.
   */
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
    })
      .then((r) => {
        return r.json();
      })
      .catch((r) => console.log(r));
  }
  /**
   * Create and send HTTP request and process it.
   * @param {Object} - Object with properties.
   * @param {string} - City the requested branches are in.
   */
  getBranchLoc(obj, city) {
    const { apiKey, baseUrl } = obj;
    return fetch(baseUrl, {
      method: "POST",
      dataType: "json",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        apiKey: apiKey,
        modelName: "AddressGeneral",
        calledMethod: "getWarehouses",
        methodProperties: {
          CityName: city,
          Language: "ru",
        },
      }),
    })
      .then((r) => {
        return r.json();
      })
      .catch((r) => console.log(r));
  }
}

export default RequestData;
