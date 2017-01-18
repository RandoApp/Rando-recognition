var winston = require("winston");
var async = require("async");
var nude = require("./scans/nude").scan;
var rgbHistogram = require("./scans/rgbHistogram").scan;
var face = require("./scans/face").scan;

module.exports = {
  recognize (imagePath, callback) {
    async.parallel([
      (done) => { nude(imagePath, done); },
      (done) => { rgbHistogram(imagePath, done); },
      (done) => { face(imagePath, done); },
      ], callback);
  }
};
