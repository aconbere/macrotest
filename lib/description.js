var Block = require("./block").Block;
var Assertion = require("./assertion").Assertion;
var AsyncAssertion = require("./async_assertion").AsyncAssertion;

DescriptionBlock = function (p) {
  this.p = p;
  this.assertions = [];
  this.descriptions = [];
  this.beforeBlock = function () {};
  this.afterBlock = function () {};
};

DescriptionBlock.prototype.describe = function (description, block) {
  var d = new Description(description, block, this.p);
  this.descriptions.push(d);
  return d;
};

DescriptionBlock.prototype.it = function (description, block) {
  var a = new Assertion(description, block, this.p);
  this.assertions.push(a);
  return a;
}

DescriptionBlock.prototype.itA = function (description, block) {
  var a = new AsyncAssertion(description, block, this.p);
  this.assertions.push(a);
  return a;
};

DescriptionBlock.prototype.before = function (block) {
  this.beforeBlock = block;
}

DescriptionBlock.prototype.after = function (block) {
  this.afterBlock = block;
}


var Description = function (description, block) {
  Block.apply(this, arguments);
};

Description.prototype.run = function () {
  // this sets up the scope we'll use when running a describe block
  var collection = new DescriptionBlock(this);

  // we run the describe block with the aformentioned scope
  // we can think of this as the "collection" stage, since
  // none of the tests nore inner describe blocks are run at
  // this time.
  this.block.call(collection);

  // now that we've collected the tests in our current describe
  // block we run them
  var that = this;
  collection.assertions.forEach(function (a) {
    a.run(collection.beforeBlock, collection.afterBlock);
  });

  // And chain down into each of the inner describe blocks
  collection.descriptions.forEach(function (d) {
    d.run();
  });
};

Description.prototype.chainedDescription = function () {
  if (this.parent) {
    return this.parent.chainedDescription() + " " + this.description;
  } else {
    return this.description;
  }
};

exports.Description = Description;
