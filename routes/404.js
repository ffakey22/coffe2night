const express = require("express"),
  router = express.Router()
      
router.get("/", (req, res, next) => {
  res.render("404");
});


module.exports = router;