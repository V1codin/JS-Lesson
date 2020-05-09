var controls = {
  box: document.querySelector(".box"),
  initBtn: document.querySelector("#initBtn"),
  popUpWindow: {},
};

controls.initBtn.onclick = function popup(event) {
  controls.popUpWindow = window.open(
    "/popup.html",
    "Popup",
    `
    scrollbars=no,
    width=420px, 
    height=300px,
    top=${event.screenY - 150}, 
    left=${event.screenX - 195},
    `
  );
  document.body.style = "background-color: #333333";

  controls.popUpWindow.onbeforeunload = function () {
    document.body.style = "background-color: white";
  };

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
