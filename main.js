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

controls.initBtn.onclick = () => {
  controls.box.style = "background-color: #5a5a5a; transition: 2s;";

  controls.form.id = "out";

  controls.send.style = `animation-name: sendBtnAnimation;
  animation-duration: 2.5s;`;

  controls.close.style = `animation-name:closeBtnAnimation; animation-duration: 1s`;

  controls.outInps.forEach(
    (item) =>
      (item.style = `animation-name: outInpsAnimation;
    animation-duration: 1.5s;`)
  );
  controls.outInps.forEach((item) => (item.className = "inpOut"));
};

controls.close.onclick = (event) => {
  event.preventDefault();
  controls.box.style = "background-color: #c1e3ff; transition: 2s;";
  controls.form.id = "form";

  controls.send.style = `animation-name: none;`;
  controls.close.style = `animation-name: none;`;

  controls.outInps.forEach((item) => (item.style = `animation-name: none`));
  controls.outInps.forEach((item) => (item.value = null));
};

controls.send.onclick = (event) => {
  event.preventDefault();
  controls.box.style = "background-color: #c1e3ff; transition: 2s;";
  controls.form.id = "form";

  controls.send.style = `animation-name: none;`;
  controls.close.style = `animation-name: none;`;

  controls.outInps.forEach((item) => (item.style = `animation-name: none`));
  controls.outInps.forEach((item) => (item.value = null));
};
