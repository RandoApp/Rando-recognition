var winston = require("winston");
var nude = require("./scans/nude").scan;
var rgbHistogram = require("./scans/rgbHistogram").scan;

module.exports = {
  recognize (imagePath, callback) {
    async.parallel([
      (done) => { nude(imagePath, done); },
      (done) => { rgbHistogram(imagePath, done); },
    ], callback);
  }
};
