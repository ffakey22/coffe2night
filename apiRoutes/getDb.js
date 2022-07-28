const express = require("express"),
router = express.Router();
router.get("/", (req, res, next) => {
const fs = require("fs")
const dbacess = JSON.parse(fs.readFileSync("./public/src/js/dbacess.json"))

if(dbacess["dba"] === 1) {
const data = JSON.parse(fs.readFileSync("./accdb.json"))
res.send(data);
} else {
    res.send("ACESSO NEGADO.")
}
});


module.exports = router;
