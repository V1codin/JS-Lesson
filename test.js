// let i1 = document.querySelector(".i1");
// let button1 = document.querySelector(".button1");
// let button2 = document.querySelector(".button2");
// let block = document.querySelector(".block");

// button1.onclick = function() {
//   let block = document.querySelector(".block");
//   let valueI2 = document.querySelector(".i2").value;
//   document.querySelector(".cont").style.background = valueI2;
//   console.log(valueI2);
// };

// button2.onclick = function() {
//   let LOH = document.querySelector(".i3").value;
//   block.innerHTML = LOH;
// };

// let box = document.querySelector(".box");

// let a = "Ivan";
// let b = 37;
// let c = "Ship";

// let d = ["Ivan", 37, "Ship"];
// let e = [];
// console.log(d);
// console.log(d.length);

// for (i = 1; i < 10; i++) {
//   for (k = 1; k < 11; k++) {
//     box.innerHTML += `${i}*${k}=${i * k}<br>`;
//   }
//   box.innerHTML += `<hr>`;
// }

let inp = document.querySelector(".inp");
let btn = document.querySelector(".btn");
let out = document.querySelector(".out");
// let pas = 13;

// btn.onclick = () => {
//   let val = +inp.value;

//   if (val == false) {
//     console.log("ПАРРОЛЬ??");
//   } else if (val !== pas) {
//     console.log("----------------------");
//     console.log(
//       val + " это что вообще? День рождения твоей мамы?" + " Не верно"
//     );
//     inp.value = null;
//   } else {
//     console.log("Добро пожаловать!");
//     inp.value = null;
//   }
// };
// МАССИВ-------------------------------
// let k = 100;
// let w = 0;
// let arr = [
//   5,
//   512,
//   -3,
//   -2,
//   0,
//   541,
//   5,
//   -2,
//   -8,
//   -90,
//   8,
//   64,
//   52,
//   7,
//   1,
//   5,
//   2,
//   7,
//   56,
//   92,
//   47,
//   2,
//   1
// ];
//  let sq;
//  let sum = 0;
//  let average = 0;

//  while (w < arr.length) {
//    sum += arr[w];
//    w++;
//  }
//  average = sum / arr.length;
//  console.log(average);
// МАССИВ-------------------------------
// ОБЪЕКТ ----------------------------------
// let val;

// let propVal;
// let Valera = {
//   name: "Valera",
//   age: 25,
//   Eyes: 2
// };
// let arr;
// function cloneObj(obj) {
//   let newBox = {};
//   for (k in obj) {
//     newBox[k] = obj[k];
//   }
//   return newBox;
// }
// let newBox = cloneObj(Valera);
// // console.log(newBox);

// newBox.name = "Egor";
// // console.log(newBox);
// // console.log(box);

// // console.log("newBox: ", newBox);

// Valera.swim = true;

// Valera["skills"] = {
//   run: true,
//   walk: true,
//   scream: false
// };

// let skillsForNewBox = cloneObj(Valera.skills);

// newBox.skills = skillsForNewBox;

// newBox.skills.run = false;

// let runExch = newBox.skills.run;
// Valera.skills.run = runExch;

// Valera["money"] = "$";
// Valera.money = "&";

// Valera.skills["paint"];
// let paintSkill = confirm("Умеешь ли ты рисовать?");

// Valera.skills["paint"] = paintSkill;
// console.log("paintSkill: ", paintSkill);
// console.log(Valera.skills);
// ОБЪЕКТ ----------------------------------

// let prmt = +prompt("Введите своё число', ''");

// if (prmt) {
//   console.log(prmt);
//   console.log(typeof prmt);
// } else {
//   console.log("Ничего нет");
// }

// while (prmt.value) {
//   console.log(prmt.value);
//   break;
// }
// ПРОВЕРКА НА ЧЁТНОСТЬ---------------------------
// function evenCheck(b) {
//   let a;
//   a = b % 2;
//   if (a == 0) {
//     console.log("Число " + b + " чётное");
//   } else {
//     console.log("Число " + b + " не чётное");
//   }
// }
// var evenCheck = function(b) {
//   var a;
//   a = b % 2;
//   if (a == 0) {
//     console.log("Число " + b + " чётное");
//   } else {
//     console.log("Число " + b + " не чётное");
//   }
// };
// ПРОВЕРКА НА ЧЁТНОСТЬ---------------------------

// let sum = 0;

// let i = 1;

// while (i <= 100) {
//   let a;
//   if ((a = i % 2 == false)) {
//     sum += i;
//   }

//   i++;
// }
// console.log(sum);

// ВЫВОД ЦИФР ИЗ ВВЕДЁННОЙ ПОЛЬЗОВАТЕЛЕМ СТРОКИ

// let v = "1Va12era";
// let numbersFromStr = "";

// function parsing(str) {
//   for (i = 0; i < str.length; i++) {
//     if (isNaN(str[i])) {
//       continue;
//     } else {
//       numbersFromStr += str[i];
//     }
//   }
//   return +numbersFromStr;
// }
// console.log(parsing(v));

// ВЫВОД ЦИФР ИЗ ВВЕДЁННОЙ ПОЛЬЗОВАТЕЛЕМ СТРОКИ

// function arrAndElementsDisplay(arr, item) {
//   return arr[item];
// }

// var testArr = [1, 0, 0, 0, 0, 0, 0, 0, 0];
// var k = testArr.length;

// console.log(testArr);
// btn.onclick = () => {
//   var d = 0;
//   var p = d + 1;
//   var q = k - 1;
//   testArr.unshift(testArr[q]);
//   testArr.pop();
//   console.log(testArr);
// };
