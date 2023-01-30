const express = require("express"),
  router = express.Router(),
  crypto = require("crypto"),
  bcrypt = require("bcrypt");
  var salt = bcrypt.genSaltSync(10)
  const { getDatabase, ref, onValue , child, get, push, set} = require("@firebase/database");
  var admin = require("firebase-admin");

  var serviceAccount = require("../serviceAccountKey.json");
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://coffe2night-db-default-rtdb.firebaseio.com"
  });


  
router.get("/", async (req, res, next) => {
  res.render("registro");


  
});







router.post("/", async (req, res) => {


  const db = getDatabase();
  const usersRef = ref(db, 'users/');



  const snapshot = await get(ref(db, 'users/'))
  let alldata = [];
  snapshot.forEach(childSnapshot => {
      let key = childSnapshot.key,
          data = childSnapshot.val();
      alldata.push({ key, data })
  });

  
    
  

  

  if(alldata.find((item) => item.data.email === req.body.email)) {
    return res.redirect("/exists");
  } else {

    
    push(ref(db, 'users/'), {
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt)
    })
    return res.redirect("/rsucess")

  }







/*
  onValue(usersRef, (snapshot) => {

    snapshot.forEach(childSnapshot => {
        let key = childSnapshot.key,
            data = childSnapshot.val();
      
      if(req.body.email === data.email) {
       res.redirect("/404")
       return;
      } else {
      
        push(ref(db, 'users/'), {
          username: req.body.username,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, salt)
        })
        res.redirect("/")
        return;
      }
    });
*/

  });


module.exports = router;