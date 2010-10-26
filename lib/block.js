var Block = function (description, block, parent) {
  this.description = description;
  this.block = block || function () {};
  this.parent = parent;
};

Block.prototype.run = function (context) {
  this.block.call(context);
};

exports.Block = Block;
