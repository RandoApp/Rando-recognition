var histogram = require('histogram');

module.exports = {
  scan (imagePath, callback) {
    histogram(imagePath, function (err, data) {
    	console.log(imagePath + " > " + data.colors.rgba);
      if (data.colors.rgba <= 4000) {
        callback(err, "ONLY ONE COLOR");
      } else {
        callback(err);
      }
    });
  }
};
