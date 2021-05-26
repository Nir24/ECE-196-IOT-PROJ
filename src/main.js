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

var temp_ref = database.ref("temp");
temp_ref.on("value", (snapshot) => {
  const data = snapshot.val();
  var tempLabel = document.getElementById("temp");
  tempLabel.innerText = data;
  console.log("update");
});

//Add tasks to database
var taskArr = ["chill", "chill", "chill"];
var TodoButton = document.getElementById("task button");
var index = 0;

TodoButton.addEventListener("click", function () {
  if (index != 2) {
    var Task = document.getElementById("task");
    for (let i = 0; i < 3; i++) {
      if (taskArr[i] == "chill") {
        index = i;
        break;
      }
    }
    var tasklabel = document.getElementById("task" + index);
    tasklabel.innerText = "Task 1: " + Task.value;
    var TODO_ref = database.ref("TODO/" + "TASK" + index);
    TODO_ref.set(Task.value);
    taskArr[index] = Task.value;
    print(taskArr);
    Task.value = null;
  }
});

//remove tasks from database
var delButton = document.getElementById("Del button");
delButton.addEventListener("click", function () {
  TODO_ref = database.ref("TODO/" + "TASK" + index);
  TODO_ref.set("chill");
  taskArr[index] = "chill";
  var tasklabel = document.getElementById("task" + index);
  tasklabel.innerText = "Task " + index + ": chill";
  if (index > 0) {
    index = index - 1;
  }
});

// lights
let RLEDOn = document.getElementById("Ron");
let RLEDOff = document.getElementById("ROff");
let RLED_ref = database.ref("RLED");
let BLEDOn = document.getElementById("Bon");
let BLEDOff = document.getElementById("Boff");
let BLED_ref = database.ref("BLED");
RLEDOn.addEventListener("click", function () {
  RLED_ref.set(1);
});
RLEDOff.addEventListener("click", function () {
  RLED_ref.set(0);
});
BLEDOn.addEventListener("click", function () {
  BLED_ref.set(1);
});
BLEDOff.addEventListener("click", function () {
  BLED_ref.set(0);
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
      music.src = "./Music/All1.mp3";
      musicName.innerText = "All the time";
      music.play();
      break;
  }
});
//Security
let alarmOn = document.getElementById("sec-on");
let INTR_ref = database.ref("INTR");
let SECURITY_ref = database.ref("SECURITY");
alarmOn.addEventListener("click", function () {
  SECURITY_ref.set(1);
});
let alarmOff = document.getElementById("sec-Off");
alarmOff.addEventListener("click", function () {
  SECURITY_ref.set(0);
  INTR_ref.set(0);
});

INTR_ref.on("value", (snapshot) => {
  const data = snapshot.val();
  if (data == 1) {
    document.getElementById("body").style.backgroundColor = "Red";
  } else {
    document.getElementById("body").style.backgroundColor = "white";
  }
});
