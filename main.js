var controls = {
  initBtn: document.querySelector("#initBtn"),
  popUpWindow: {},
};

/**
 * Function for onbeforeunload event changing background color of tag body
 */
function changeBodyColor() {
  document.body.style = "background-color: white";
}

controls.initBtn.onclick = function (event) {
  controls.popUpWindow = window.open(
    "/popup.html",
    "Popup",
    `
    width=420px, 
    height=300px,
    top=${event.screenY - 150}, 
    left=${event.screenX - 195},
    `
  );
  document.body.style = "background-color: #333333";

  controls.popUpWindow.onbeforeunload = changeBodyColor;

  controls.popUpWindow.onload = function () {
    controls.popUpWindow.send = controls.popUpWindow.document.querySelector(
      "#send"
    );

    controls.popUpWindow.send.onclick = function (event) {
      event.preventDefault();
      controls.popUpWindow.close();
      document.body.style = "background-color: white";
    };
  };
};
