var btnTest = document.querySelector(".promise");

var cont = document.querySelector(".container");

var btnSend = document.querySelector(".send");
var btnGet = document.querySelector(".get");
var inp = document.querySelector("#inp");

/*
var xhr = new XMLHttpRequest();
var url = "http://localhost:3000/posts/";
btnGet.onclick = get;
*/
btnSend.onclick = post;

/*
var test = new Promise(function (resolve, reject) {
  get();
  if (xhr.response) {
    resolve(console.log("works"));
  }
});

test.then(function () {
  console.log(xhr.response);
});
*/

btnSend.onclick = post;
/*
function get() {
  xhr.open("GET", url);

  xhr.responseType = "json";

  xhr.send();

  xhr.onload = function () {
    console.log(xhr.status);
    console.log(xhr.response);

    for (item of xhr.response) {
      cont.innerHTML += `<p>${item.name}</p>`;
    }
  };
}
get();
*/

var test = new Promise(function (resolve, reject) {
  var xhr = new XMLHttpRequest();
  var url = "http://localhost:3000/posts/";

  xhr.open("GET", url);

  xhr.responseType = "json";

  xhr.send();

  xhr.onload = function () {
    if (xhr.response) {
      resolve(xhr.response);
    } else {
      reject(xhr.response);
    }
  };
});

test
  .then(function (data) {
    console.log(data);
    var check = data[0];
    return check;
  })
  .then(function (ar) {
    console.log(ar.name);
  })
  .catch(function (err) {
    console.log(err);
  });

/*
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
*/

function post(e) {
  e.preventDefault();

  var nameV = inp.value;

  var obj = {
    name: nameV,
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
