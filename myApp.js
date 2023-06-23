let express = require("express");
let app = express();
console.log("Hello World");
app.get("/", (req, res) => {
  const path = __dirname + "./views/index.html";
  res.send(path);
});
module.exports = app;
