const express = require("express"),
  router = express.Router()
      
router.get("/", (req, res, next) => {
  res.render("getsession");
});


module.exports = router;