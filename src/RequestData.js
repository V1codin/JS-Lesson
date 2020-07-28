/**
 * Creates HTTP request.
 * @class
 */
class RequestData {
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
    }).then((res) => {
      return res.json();
    });
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
