var histogram = require('histogram');

module.exports = {
  scan (imagePath, callback) {
    histogram(imagePath, function (err, data) {
      if (data.colors.rgba <= 4000) {
        callback(err, "monocolor");
      } else {
        callback(err);
      }
    });
  }
};
