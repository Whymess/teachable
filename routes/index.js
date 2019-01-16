"use strict";

var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path");
var RUBY_GEMS_URL = "https://rubygems.org";
var request = require("request");

router.get("/api/**/*", function(req, res) {
  var url = "" + RUBY_GEMS_URL + req.originalUrl;
  request.get(url, function(err, response, body) {
    if (response.statusCode === 400) {
      res.send([]);
    } else {
      res.send(body);
    }
  });
});

router.get("/savedGems", function(req, res) {
  fs.readFile("./database.json", "utf-8", function(err, data) {
    var arrayOfObjects = JSON.parse(data);
    res.send(data);
    res.status(200);
  });
});

router.delete("/savedGems/:sha", function(req, res, next) {
  fs.readFile("./database.json", "utf-8", function(err, data) {
    var arrayOfObjects = JSON.parse(data);
    var modifiedListOfObjects = arrayOfObjects.filter((el, i) => {
      return el["sha"] !== req.params.sha;
    });

    fs.writeFile(
      "./database.json",
      JSON.stringify(modifiedListOfObjects),
      "utf-8",
      function(err) {
        if (err) {
          res.send(err);
        } else {
          res.send({ msg: "gem removed" });
        }
      }
    );
  });
});

router.post("/savedGems", function(req, res, next) {
  fs.readFile("./database.json", "utf-8", function(err, data) {
    var arrayOfObjects = JSON.parse(data);
    arrayOfObjects.push(req.body);

    fs.writeFile(
      "./database.json",
      JSON.stringify(arrayOfObjects),
      "utf-8",
      function(err) {
        if (err) {
          res.send(err);
        } else {
          res.send({ msg: "gem saved" });
        }
      }
    );
  });
});

module.exports = router;
