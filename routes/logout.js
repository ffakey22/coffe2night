const express = require("express"),
  router = express.Router()
      
router.get("/", (req, res, next) => {
  res.render("logout");
});


module.exports = router;