"use strict";

var request = require("request");
var express = require("express");
var app = express();
var indexRoute = require("./routes/");
var bodyParser = require("body-parser");
var logger = require("morgan");
var fs = require("fs");
var cors = require("cors");
var path = require("path")

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", indexRoute);

app.use(express.static(path.join(__dirname, 'client/build')));

var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log(
    "Ruby Gems proxy API is now running at: http://localhost:" + port
  );
});
