const { redirect } = require("statuses");

const express = require("express"),
  router = express.Router()
      
router.get("/", (req, res, next) => {
  res.render("index");
});


const request = require('request');


router.post("/", (req, res, next) => {

const username = req.body.username
const password = req.body.password


const fs = require("fs")

const accountdb = JSON.parse(fs.readFileSync("./accdb.json", "utf8"));
  
  if(!accountdb[username]) {
      res.statusCode = 302;
      res.setHeader("Location", "/errorlogin");
       res.end();

    
    return;
  }

  function redirectS() {
    const token = accountdb[username].password
    res.cookie("userData", username)
    res.statusCode = 302;
    res.setHeader("Location", `/getsession?session=${token}`);
     res.end();



 }

  function redirectF() {
    res.statusCode = 302;
    res.setHeader("Location", "/errorfail")
    res.end();
  }



  if(accountdb[username]) {
    const userPass = accountdb[username].password


      var bcrypt = require ('bcrypt')
      var salt = bcrypt.genSaltSync(10)
    

      bcrypt.compare(password, userPass, function(err, res) {
        if (err){
         console.log("error")
        }

        if (res) {
          redirectS()
        }  else {
          redirectF()
        }
        })
      
      


  }

  
  

})

module.exports = router;
