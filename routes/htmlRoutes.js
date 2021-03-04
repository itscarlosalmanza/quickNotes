// require relative path and express 
const path = require("path");
const router = require("express").Router();

//this route responds with notes.html
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

//this route responds with index.html
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});


module.exports = router;
