var xhr = new XMLHttpRequest();

var btnSend = document.querySelector(".send");
var btnGet = document.querySelector(".get");
var inp = document.querySelector("#inp");

var url = "http://localhost:3000/posts/";

btnGet.onclick = get;

btnSend.onclick = post;

function get(e) {
  e.preventDefault();

  xhr.open("GET", url);

  xhr.responseType = "json";

  xhr.send();

  xhr.onload = function () {
    console.log(xhr.status);
    console.log(xhr.response);
  };
}

function post(e) {
  e.preventDefault();

  var value = inp.value;

  var obj = {
    name: value,
  };

  var toSend = JSON.stringify(obj);
  /*
  fetch(url, {
    method: "POST",
    body: toSend,
  });

  */
  xhr.open("POST", url, true);

  xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");

  xhr.responseType = "json";

  console.log(xhr.status);

  xhr.send(toSend);

  inp.value = null;
}
