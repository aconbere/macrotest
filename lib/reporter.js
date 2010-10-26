var sys = require("sys")
var color = require("./colors").color
var Evented = require("evented").Evented;

var Reporter = function () {
  Evented.apply(this, arguments);

  this.exceptions = [];

  var that = this;

  this.bind("/suite/started", function () {
  });

  this.bind("/suite/finished", function () {
    that.exceptions.forEach(function (a) {
      sys.puts("");
      sys.puts("");
      sys.puts(color.bold("red", a.chainedDescription()));
      sys.puts(a.exception.stack.replace(/^/, "    "));
    });
    sys.puts("");
  });

  this.bind("/test/success", function (assertion) {
    sys.print(color("green", "."));
  });

  this.bind("/test/failed", function (assertion) {
    that.exceptions.push(assertion);
    sys.print(color("red", "x"));
  });
};

Reporter.prototype = new Evented();
exports.reporter = new Reporter();
