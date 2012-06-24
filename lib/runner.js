// Runner only works in Node
var util = require('util');
var ch = require("child_process");
var path = require("path");
var color = require("./colors").color;

var Runner = function (options) {};

Runner.prototype.collectTests = function (block) {
  var that = this;

  var testFiles = [];
  ch.exec('find . -name "*_test.js"', function (err, stdout, stderr) {
    var paths = stdout.split('\n')
    paths.pop();
    for (var i = 0; i < paths.length; i++) {
      var path = paths[i];
      testFiles.push(path);
    }
    if (block) { block.call(null, testFiles) };
  });
};

Runner.prototype.run = function (testFiles, block) {
  testFiles = testFiles || [];

  for (var i = 0; i < testFiles.length; i++) {
    var file = testFiles[i];
    var p = path.join(process.cwd(), file.slice(0, -3));
    try {
      require(p);
    } catch (e) {
      util.puts(color("red", "Test File Include Failed"));
      util.puts(e.stack);
    }
  };
  if (block) { block.call() };
};

exports.runner = new Runner();
