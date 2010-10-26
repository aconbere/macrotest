var sys = require("sys");
var Block = require("./block").Block;
var color = require("./colors").color;
var reporter = require("./reporter").reporter;

var Assertion = function (description, block, parent) {
  Block.apply(this, arguments);
};

Assertion.prototype = new Block();

Assertion.prototype.run = function (context) {
  this.block.call(context);
};

Assertion.prototype.failed = function (e) {
  this.exception = e;
  reporter.trigger("/test/failed", [this]);
};

Assertion.prototype.chainedDescription = function () {
  return this.parent.chainedDescription() + " " + this.description;
};

Assertion.prototype.success = function () {
  reporter.trigger("/test/success", [this]);
  //sys.puts(color.bold("green", this.chainedDescription()));
};

exports.Assertion = Assertion;
