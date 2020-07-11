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

export default RequestData;
