const express = require("express"),
  router = express.Router()
      
router.get("/", (req, res, next) => {
  res.render("403login");
});


module.exports = router;