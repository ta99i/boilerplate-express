let express = require("express");
let bodyParser = require("body-parser");
let app = express();
app.use("/public", express.static(__dirname + "/public"));
app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
app.get("/json", (req, res) => {
  if (process.env["MESSAGE_STYLE"] == "uppercase") {
    response = { message: "HELLO JSON" };
  } else {
    response = { message: "Hello json" };
  }
  res.json(response);
});
app.get(
  "/now",
  (req, res, next) => {
    const ttime = new Date().toString();
    req.time = { time: ttime };
    next();
  },
  (req, res) => {
    res.send(req.time);
  }
);
app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});
app.post("/name", (req, res) => {
  res.json({ name: req.body.first + " " + req.body.last });
});
module.exports = app;
