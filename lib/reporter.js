var util = require('util')
var color = require("./colors").color
var Evented = require("evented").Evented;

var Reporter = function () {
  Evented.apply(this, arguments);

  this.failures = [];
  this.successes = [];

  var that = this;

  this.bind("/suite/started", function () {
  });

  this.bind("/suite/finished", function () {
    that.failures.forEach(function (a) {
      util.puts("");
      util.puts("");
      util.puts(color.bold("red", a.chainedDescription()));
      util.puts(a.exception.stack.replace(/^/, "    "));
    });
    util.puts("");
    util.puts("");
    var _color = that.failures.length > 0 ? "red" : "green"
    var total = that.failures.length + that.successes.length
    util.puts(color(_color, total + " examples, " + that.failures.length + " failures"));
  });

  var that = this;
  this.bind("/test/success", function (assertion) {
    that.successes.push(assertion);
    util.print(color("green", "."));
  });

  this.bind("/test/failed", function (assertion) {
    that.failures.push(assertion);
    util.print(color("red", "x"));
  });
};

Reporter.prototype = new Evented();
exports.reporter = new Reporter();
