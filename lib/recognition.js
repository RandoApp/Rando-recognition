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
      ], (err, tags) => {
        if (Array.isArray(tags)) {
          tags = tags.filter((tag) => { return tag && tag.length > 0});
        }

        callback(err, tags)
    });
  },
  recognizeWithScaners (imagePath, scaners, callback) {
    if (!Array.isArray(scaners)) {
      callback("Scaners should be array of strings");
    }

    var executeScaners = [];
    
    if (scaners.indexOf("nude") != -1) {
      executeScaners.push((done) => { nude(imagePath, done); })
    }

    if (scaners.indexOf("rgbHistogram") != -1) {
      executeScaners.push((done) => { rgbHistogram(imagePath, done); })
    }

    if (scaners.indexOf("face") != -1) {
      executeScaners.push((done) => { face(imagePath, done); })
    }

    async.parallel(executeScaners), (err, tags) => {
        if (Array.isArray(tags)) {
          tags = tags.filter((tag) => { return tag && tag.length > 0});
        }

        callback(err, tags)
    });
  }
};
