// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNR3iNuDVUOo_BIRb8FUiTMjtiAQZEiVs",
  authDomain: "ece196-sp21-proj.firebaseapp.com",
  databaseURL: "https://ece196-sp21-proj-default-rtdb.firebaseio.com",
  projectId: "ece196-sp21-proj",
  storageBucket: "ece196-sp21-proj.appspot.com",
  messagingSenderId: "53304839199",
  appId: "1:53304839199:web:7743d3d5b51336a944992a",
  measurementId: "G-YPT6WF7F1P",
};

firebase.initializeApp(firebaseConfig);
database = firebase.database();

//Update room temp
var tempButton = document.getElementById("tempBut");
var FAN_ref = database.ref("FAN");
tempButton.addEventListener("click", function () {
  FAN_ref.set(0);
});
var tempButON = document.getElementById("tempButON");
var FAN_ref = database.ref("FAN");
tempButON.addEventListener("click", function () {
  FAN_ref.set(1);
});

var submitTemp = document.getElementById("SubmitTemp");
var WTEMP_ref = database.ref("WTEMP");
submitTemp.addEventListener("click", function () {
  let wanted_temp = document.getElementById("Wanted_temp");
  WTEMP_ref.set(Number(wanted_temp.value));
  wanted_temp.value = null;
});
//database.ref("temp").set(10);
var temp_ref = database.ref("temp");
temp_ref.on("value", (snapshot) => {
  const data = snapshot.val();
  var tempLabel = document.getElementById("temp");
  tempLabel.innerText = data;
  console.log("update");
});

//Add tasks to database
var taskArr = [];
var TodoButton = document.getElementById("task button");

TodoButton.addEventListener("click", function () {
  var Task = document.getElementById("task");
  var TODO_ref = database.ref("TODO/" + "TASK" + taskArr.length);
  TODO_ref.set(Task.value);
  taskArr.push(Task.value);
  Task.value = null;
});
//remove tasks from database
var delButton = document.getElementById("Del button");
delButton.addEventListener("click", function () {
  TODO_ref = database.ref("TODO/" + "TASK" + taskArr.length);
  if (taskArr.length != 0) {
    TODO_ref.remove();
  } else {
    TODO_ref.set(0);
  }
  taskArr.pop();
});
// lights
let RLEDOn = document.getElementById("Ron");
let RLEDOff = document.getElementById("ROff");
let RLED_ref = database.ref("RLED");
RLEDOn.addEventListener("click", function () {
  RLED_ref.set(1);
});
RLEDOff.addEventListener("click", function () {
  RLED_ref.set(0);
});
//Music
let MUSIC_ref = database.ref("MUSIC");
let musicName = document.getElementById("song title");
let music = document.getElementById("Song");

MUSIC_ref.on("value", (snapshot) => {
  const data = snapshot.val();
  switch (data) {
    case 0:
      musicName.innerText = "None";
      music.pause();
      break;
    case 1:
      music.src = "./Music/Glitter.mp3";
      musicName.innerText = "Glitter";
      music.play();
      break;
    case 2:
      music.src = "./Music/All.mp3";
      musicName.innerText = "All the time";
      music.play();
      break;
  }
});
//Security
let SECURITY_ref = database.ref("SECURITY");
let alarm = document.getElementById("alarm");
SECURITY_ref.on("value", (snapshot) => {
  const data = snapshot.val();
  if (data == 1) {
    alarm.innerText = "INTRUDER";
  } else {
    alarm.innerText = "";
  }
});
