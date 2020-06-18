var btnTest = document.querySelector(".promise");

var cont = document.querySelector(".container");

var btnSend = document.querySelector(".send");
var btnGet = document.querySelector(".get");
var inpName = document.querySelector("#inpName");
var inpAge = document.querySelector("#inpAge");
var inpDel = document.querySelector("#deletingId");

var postId = 4;

btnTest.onclick = function () {
  if (inpDel.value) {
    fetch(url + inpDel.value, {
      method: "DELETE",
    })
      .then(() => console.log("Post with your id is deleted"))
      .catch(() => console.log("Something went wrong"));
  } else {
    alert("Enter id of the post to delete");
  }
  inpDel.value = null;
};

// var xhr = new XMLHttpRequest();

const url = "http://localhost:3000/posts/";

// btnGet.onclick = get;

var promise = () => {
  console.log("Getting data...");
  return new Promise((resolve) =>
    resolve(
      fetch(url, {
        method: "GET",
      })
    )
  );
};

function getData() {
  return promise()
    .then((res) => res.json())
    .then((data) => console.log(data));
}

function post(e) {
  e.preventDefault();

  if (inpName.value && inpAge.value) {
    console.log("Sending data...");

    var nameV = inpName.value;

    var inpAgeV = inpAge.value;

    var obj = {
      name: nameV,
      age: inpAgeV,
      type: "user",
    };

    var toSend = JSON.stringify(obj);

    fetch(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: toSend,
      },
      true
    );
    /*
  xhr.open("POST", url, true);

  xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");

  xhr.responseType = "json";

  console.log(xhr.status);

  xhr.send(toSend);
*/
    inpName.value = null;
    inpAge.value = null;
  } else {
    alert("Input correct data");
  }
}

btnGet.onclick = getData;

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
*/

/*
const promise = new Promise((resolve, reject) => {
  let xhr = new XMLHttpRequest();
  let url = "http://localhost:3000/posts/";

  xhr.open("GET", url);

  xhr.responseType = "json";

  xhr.send();

  function checking() {
    if (xhr.response) {
      resolve(xhr.response);
    } else {
      reject(xhr.response);
    }
  }

  xhr.onload = checking;
  */
/*
  let test = fetch("http://localhost:3000/posts", {
    method: "GET",
  });

  test.onload = resolve(test.response);
});

promise.then((data) => {
  console.log(data);
});
*/

/*
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

  */
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
