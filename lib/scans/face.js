var cv = require("opencv");

var j =0;
module.exports = {
  scan (imagePath, callback) {
    cv.readImage(imagePath, (err, im) => {
      im.detectObject(cv.FACE_CASCADE, {}, (err, faces) => {
        if (faces && faces.length > 0) {
          callback(null, "face");
        } else {
          callback(err);
        }
      });
    });
  }
}
