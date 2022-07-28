const express = require("express"),
  router = express.Router()
      
router.get("/", (req, res, next) => {
  res.render("clientarea");
});


module.exports = router;