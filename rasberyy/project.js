const spawn = require("child_process").spawn;

var firebase = require("firebase/app");
require("firebase/database");
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
db = firebase.database();

//var FAN_ref = database.ref("FAN");
var BLED_ref = db.ref("BLED");
//RLED_ref = db.ref("RLED");
BLED_ref.on("value", (snapshot) => {
  //const data = snapshot.val();
  console.log("hi");
  const pythonProcess = spawn("python", ["BLED.py"]);
});
