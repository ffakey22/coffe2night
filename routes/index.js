const express = require("express"),
  router = express.Router(),
  bcrypt = require("bcryptjs"),
  passport = require("passport");

const { getDatabase, ref, set, onValue } = require("firebase/database");

router.get("/", (req, res, next) => {
    res.render("index")
})

router.post('/',
    passport.authenticate('local', { 
        
        successRedirect: `/home?${username}`, 
        failureRedirect: '/errorlogin?fail=true' 

        
    }))

module.exports = router;
