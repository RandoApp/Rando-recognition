var cv = require("opencv");

var j =0;
module.exports = {
  scan (imagePath, callback) {
    cv.readImage(imagePath, (err, im) => {
      im.detectObject(cv.FACE_CASCADE, {}, (err, faces) => {
        if (faces.length > 0) {
          callback(null, "FACE DETECTED");
        } else {
          callback(err);
        }
      });
    });
  }
}
