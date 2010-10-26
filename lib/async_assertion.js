var Assertion = require("./assertion").Assertion;

var AsyncAssertion = function (description, block) {
  this.finished = false;
  Assertion.apply(this, arguments);
  _topLevelAsyncAssertions.push(this);
};

AsyncAssertion.prototype = new Assertion();

AsyncAssertion.prototype.run = function (context) {
  var that = this;
  context.finish = function () {
    that.finished = true;
  };
  this.block.call(context);
};

AsyncAssertion.prototype.success = function () {};
AsyncAssertion.prototype.notFinished = function () {};
AsyncAssertion.prototype.finished = function () {};

exports.AsyncAssertion = AsyncAssertion;
