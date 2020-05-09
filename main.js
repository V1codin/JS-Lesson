var controls = {
  box: document.querySelector(".box"),
  initBtn: document.querySelector("#initBtn"),
  closeBtn: document.querySelector(".closeBtn"),
  close: document.querySelector("#close"),
  send: document.querySelector("#send"),
  inps: document.querySelector(".inps"),
  form: document.querySelector(".form"),

  outInps: document.querySelectorAll(".outInps"),
};

console.log(controls.form);

controls.initBtn.onclick = (event) => {
  console.log("event: ", event);

  window.open(
    "/popup.html",
    "Popup",
    `
    width=400px, 
    height=300px, 
    top=${event.screenY - 150}, 
    left=${event.screenX - 195}
    `
  );

  controls.box.style = "background-color: #052afc";
};
