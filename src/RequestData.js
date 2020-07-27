/**
 * Creates HTTP request.
 * @class
 */
class RequestData {
  /**
   * Create and send HTTP request and process it.
   * @param {Object} - Object with properties.
   * @param {number} - Number of user's delivery.
   * @return {Object} - Object with result of the request.
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
          Limit: 5,
          Language: "ru",
        },
      }),
    }).then((r) => r.json());
  }
}

export default RequestData;
