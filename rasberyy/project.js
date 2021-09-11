const spawn = require("child_process").spawn;

var firebase = require("firebase/app");
require("firebase/database");


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
