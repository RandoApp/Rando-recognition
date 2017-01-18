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
  }
};
