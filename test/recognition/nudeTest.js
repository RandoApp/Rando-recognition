var should = require("should");
var sinon = require("sinon");
var nude = require("../../lib/scans/nude").scan;
var fs = require("fs");
var async = require("async");

describe("Nude scaner.", function () {
  it("Should detect nude content", function (done) {
    var assetsFolder = "test/assets/nude/positive/";
    var assetsWithNude = fs.readdirSync(assetsFolder);
    async.filterLimit(assetsWithNude, 4, (fileName, callback) => {
      nude(assetsFolder + fileName, function (err, result) {
        callback(null, result !== "NUDE DETECTED");
      });
    }, (err, result) => {
      result.should.be.empty();
      done();
    });
  }).timeout(1000000);

  it("Should pass not a nude content", function (done) {
    var assetsFolder = "test/assets/nude/negative/";
    var assetsWithoutNude = fs.readdirSync(assetsFolder);
    async.filterLimit(assetsWithoutNude, 4, (fileName, callback) => {
      nude(assetsFolder + fileName, function (err, result) {
        callback(null, result === "NUDE DETECTED");
      });
    }, (err, result) => {
      result.should.be.empty();
      done();
    });
  }).timeout(1000000);
});
