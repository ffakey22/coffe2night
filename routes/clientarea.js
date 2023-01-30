const { redirect } = require("statuses");
const express = require("express"),
  router = express.Router(),
  fs = require("fs")
      
router.get("/", (req, res, next) => {
  res.render("clientarea")
});


module.exports = router;