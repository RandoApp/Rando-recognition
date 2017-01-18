var nude = require('nude');

module.exports = {
  scan (imagePath, callback) {
    nude.scan(imagePath, function(res) {
      if (res) {
        callback(null, "nude");
      } else {
        callback();
      }
    });
  }
};
