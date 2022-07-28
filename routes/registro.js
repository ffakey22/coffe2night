const express = require("express"),
  router = express.Router(),
  crypto = require("crypto");
  
router.get("/", (req, res, next) => {
  res.render("registro");
});




router.post('/', (req, res, next) => {

  

  const fs = require("fs")
  let usersdb = JSON.parse(fs.readFileSync("./accdb.json", "utf8"));

  
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password
  if (!usersdb[username]) {
    if (!usersdb[email]) {
      if (!usersdb[password]) {



        var bcrypt = require ('bcrypt')
        var salt = bcrypt.genSaltSync(10)
        var senhaParaSalvar = bcrypt.hashSync(password, salt)


          usersdb[username] = {
          password: senhaParaSalvar,
          email: email
        }






        fs.writeFile("./accdb.json", JSON.stringify(usersdb), (x) => {
          if (x) console.error(x)
        });


        res.statusCode = 302;
        res.setHeader("Location", "/");
        res.end();



      
    } 

  }

  } else {
    
         res.statusCode = 302;
        res.setHeader("Location", "/registro");
        res.end();
  }
  
  
})

module.exports = router;