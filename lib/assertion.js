var util = require('util');
var Block = require("./block").Block;
var color = require("./colors").color;
var reporter = require("./reporter").reporter;

var Assertion = function (description, block, parent) {
  Block.apply(this, arguments);
  this.status = "not-finished";
};

Assertion.prototype = new Block();

Assertion.prototype.run = function (before, after) {
  // we create a new object to act as the scope for the tests
  // this way we know we're starting with a blank slate
  var context = {};

  // if there was a beforeBlock setup for this describe block
  // then we should use it.
  before.call(context);
  try {
    this.block.call(context);
    this.success();
  } catch (e) {
    this.failed(e);
  }
  after.call(context);
};

Assertion.prototype.chainedDescription = function () {
  if (this.parent) {
    return this.parent.chainedDescription() + " " + this.description;
  } else {
    return this.description;
  }
};

Assertion.prototype.failed = function (e) {
  this.status = "failed";
  this.exception = e;
  reporter.trigger("/test/failed", [this]);
};

Assertion.prototype.success = function () {
  this.status = "success";
  reporter.trigger("/test/success", [this]);
};

exports.Assertion = Assertion;
