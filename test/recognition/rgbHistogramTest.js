var should = require("should");
var sinon = require("sinon");
var rgbHistogram = require("../../lib/scans/rgbHistogram").scan;
var fs = require("fs");
var async = require("async");

describe("rgbHistogram scaner.", function () {
  it("Should detect boring images", function (done) {
    var assetsFolder = "test/assets/rgbHistogram/positive/";
    var assetsWithBoringImages = fs.readdirSync(assetsFolder);
    async.filterLimit(assetsWithBoringImages, 4, (fileName, callback) => {
      rgbHistogram(assetsFolder + fileName, function (err, result) {
        callback(null, result !== "ONLY ONE COLOR");
      });
    }, (err, result) => {
      result.should.be.empty();
      done();
    });
  }).timeout(1000000);

  it("Should pass not a boring images", function (done) {
    var assetsFolder = "test/assets/rgbHistogram/negative/";
    var assetsWithoutBoringImages = fs.readdirSync(assetsFolder);
    async.filterLimit(assetsWithoutBoringImages, 4, (fileName, callback) => {
      rgbHistogram(assetsFolder + fileName, function (err, result) {
        callback(null, result === "ONLY ONE COLOR");
      });
    }, (err, result) => {
      result.should.be.empty();
      done();
    });
  }).timeout(1000000);
});
