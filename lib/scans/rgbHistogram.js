var histogram = require("histogram");
var config = require("config");

module.exports = {
  scan (imagePath, callback) {
    histogram(imagePath, function (err, data) {
      if (data && data.colors && data.colors.rgba <= config.app.rgbHistogram.threshold) {
        callback(err, "monocolor");
      } else {
        callback(err);
      }
    });
  }
};
