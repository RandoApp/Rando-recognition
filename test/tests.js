var fs = require("fs");
var async = require("async");

var nude = require("../lib/scans/nude").scan;
var face = require("../lib/scans/face").scan;
var rgbHistogram = require("../lib/scans/rgbHistogram").scan;

function runAllTests () {
  async.parallel({
    facePositive(done) { runTests("test/assets/face/positive/", face, "face", done); },
    faceNegative(done) { runTests("test/assets/face/negative/", face, undefined, done); },
    nudePositive(done) { runTests("test/assets/nude/positive/", nude, "nude", done); },
    nudeNegative(done) { runTests("test/assets/nude/negative/", nude, undefined, done); },
    rgbHistogramPositive(done) { runTests("test/assets/rgbHistogram/positive/", rgbHistogram, "monocolor", done); },
    rgbHistogramNegative(done) { runTests("test/assets/rgbHistogram/negative/", rgbHistogram, undefined, done); }
  },
   function (err, results) {
    var report = generateReport(results);
    fs.writeFileSync("report.html", report);
  });
}

function runTests (assetsFolder, testFunction, expectedCondition, callback) {
  var assetsFiles = fs.readdirSync(assetsFolder);
  async.filterLimit(assetsFiles, 100, (fileName, done) => {
    testFunction(assetsFolder + fileName, function (err, result) {
      done(null, result !== expectedCondition);
    });
  }, (err, result) => {
    if (result) {
      for (var i = 0; i < result.length; i++) {
        result[i] = assetsFolder + result[i];
      }
    }
    callback(err, result);
  });
}

function generateReport (results) {
  var html = "<html><head><body>";
  for (testName in results) {
    html += "<h1>Fail assets for " + testName + " :</h1>";
    for (var i = 0; i < results[testName].length; i++) {
      html += "<h2>" + results[testName][i] + "</h2>";
      html += "<img src='" + results[testName][i] + "'>";
      html += "<br/><br/>";
    }
    html += "<hr/>";
  }
  html += "</body></html>";
  return html;
}

runAllTests();
