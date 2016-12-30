var should = require("should");
var sinon = require("sinon");
var face = require("../../lib/scans/face").scan;
var fs = require("fs");
var async = require("async");

describe("Face scaner.", function () {
  it("Should detect face content", function (done) {
    var assetsFolder = "test/assets/face/positive/";
    var assetsWithFace = fs.readdirSync(assetsFolder);
    async.filterLimit(assetsWithFace, 4, (fileName, callback) => {
      face(assetsFolder + fileName, function (err, result) {
        console.log(result);
        callback(null, result !== "FACE DETECTED");
      });
    }, (err, result) => {
      result.should.be.empty();
      done();
    });
  }).timeout(1000000);

  it("Should pass not a face content", function (done) {
    var assetsFolder = "test/assets/face/negative/";
    var assetsWithoutFace = fs.readdirSync(assetsFolder);
    async.filterLimit(assetsWithoutFace, 4, (fileName, callback) => {
      face(assetsFolder + fileName, function (err, result) {
        callback(null, result === "FACE DETECTED");
      });
    }, (err, result) => {
      result.should.be.empty();
      done();
    });
  }).timeout(1000000);
});
